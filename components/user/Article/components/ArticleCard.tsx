import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

type Props = {}

const ArticleCard = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    let ctx: CanvasRenderingContext2D | null | undefined
    ctx = canvas?.getContext('2d')

    function getVectorFromTwoPoints(point1: any, point2: any) {
      return {
        x: point2.x - point1.x,
        y: point2.y - point1.y
      }
    }

    function getDistanceBetweenPoints(point1: any, point2: any) {
      const x = point1.x - point2.x
      const y = point1.y - point2.y
      return Math.sqrt(x * x + y * y)
    }

    const FRAME_DURATION = 1000 / 120 // 60fps frame duration ~16.66ms
    const getTime = Date.now

    // Global requestAnimationFrame ID
    let rafID: any

    // Function to animate line drawing
    function drawLine(startPoint: any, endPoint: any, drawingSpeed = 5, onAnimationEnd: any, startingLength = 0) {
      let lastUpdate = getTime()
      let currentPoint = startPoint
      const vector = getVectorFromTwoPoints(startPoint, endPoint)
      const startToEndDistance = getDistanceBetweenPoints(startPoint, endPoint)
      const lineStep = drawingSpeed / startToEndDistance

      const vectorStep = {
        x: vector.x * lineStep,
        y: vector.y * lineStep
      }

      const animate = () => {
        const now = getTime()
        const delta = (now - lastUpdate) / FRAME_DURATION

        const deltaVector = {
          x: vectorStep.x * delta,
          y: vectorStep.y * delta
        }

        if (startingLength) {
          const startingLengthFactor = startingLength / startToEndDistance
          deltaVector.x += vector.x * startingLengthFactor
          deltaVector.y += vector.y * startingLengthFactor
          startingLength = 0
        }

        let nextPoint = {
          x: currentPoint.x + deltaVector.x,
          y: currentPoint.y + deltaVector.y
        }

        let newStartingLength = 0
        let isFinished = false
        const startToNextPointDistance = getDistanceBetweenPoints(startPoint, nextPoint)

        if (startToNextPointDistance >= startToEndDistance) {
          newStartingLength = startToNextPointDistance - startToEndDistance
          isFinished = true
          nextPoint = endPoint
        }
        if (ctx) {
          ctx.beginPath()
          ctx.moveTo(currentPoint.x, currentPoint.y)
          ctx.lineTo(nextPoint.x, nextPoint.y)
          ctx.stroke()
        }

        if (isFinished) {
          if (onAnimationEnd) {
            onAnimationEnd(newStartingLength)
          }
          return
        }

        currentPoint = nextPoint
        lastUpdate = now

        rafID = requestAnimationFrame(animate)
      }

      animate()
    }

    // Function to draw a polygon
    function drawPolygon(
      vertices: Array<{ x: number; y: number }>,
      drawingSpeed = 5,
      onAnimationEnd: any,
      startingLength = 0,
      startingPointIndex = 0
    ) {
      const start = vertices[startingPointIndex]
      const end = vertices[startingPointIndex + 1]

      if (startingPointIndex + 1 >= vertices.length) {
        if (onAnimationEnd) {
          onAnimationEnd()
        }
        return
      }

      drawLine(
        start,
        end,
        drawingSpeed,
        (startingLength: any) => {
          const newIndex = startingPointIndex + 1
          drawPolygon(vertices, drawingSpeed, onAnimationEnd, startingLength, newIndex)
        },
        startingLength
      )
    }

    if (canvas && ctx) {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      const vertices = [
        { x: 0, y: 0 },
        { x: canvas.width - 20, y: 0 },
        { x: canvas.width, y: 20 },
        { x: canvas.width, y: canvas.height },
        { x: 0, y: canvas.height },
        { x: 0, y: 0 }
      ]
      ctx.strokeStyle = '#EC4899'
      ctx.lineWidth = 1

      function draw() {
        cancelAnimationFrame(rafID)
        drawPolygon(vertices, 10, () => console.log('done'))
      }

      draw()
    }
  }, [])

  return (
    <article className='article-card'>
      <Link href={'#'}>
        <div className='group flex max-w-[900px] py-3 md:gap-10'>
          <div className='max-w-[420px]'>
            <div className='relative w-[420px] pt-[56.25%]'>
              <div className='absolute bottom-0 left-0 right-0 top-0 overflow-hidden'>
                <Image
                  className='transition-transform duration-500 group-hover:scale-105'
                  src='http://res.cloudinary.com/duc2gaec9/image/upload/v1692362652/league-of-legends-1692362650.jpg'
                  alt='Article thumb'
                  title='Article Thumb'
                  fill
                />
              </div>
              <div className='article-card-thumb-border'>
                <canvas className='h-full w-full' ref={canvasRef}></canvas>
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-col items-center justify-center'>
            <div className='pb-2'>
              <p className='uppercase text-color-primary'>World War II</p>
              <h3 className='mb-2.5 text-24 font-bold text-color-white'>Tiger Tank - Legendary Germany Hihi Muahaha</h3>
              <p className='mb-2.5 line-clamp-2 text-color-white'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quaerat quo eligendi totam animi corporis
                pariatur placeat et culpa repellat.
              </p>
              <p className='mb-2.5 font-semibold text-color-white'>18-08-2023 10:10:10</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ArticleCard
