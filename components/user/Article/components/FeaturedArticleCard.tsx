import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Props = {}

const FeaturedArticleCard = (props: Props) => {
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
      ctx.strokeStyle = '#c1c1c1'
      ctx.lineWidth = 1

      function draw() {
        cancelAnimationFrame(rafID)
        drawPolygon(vertices, 10, () => {})
      }

      draw()
    }
  }, [])

  return (
    <motion.article
      className='featured-article-card relative col-span-1 min-w-[320px] md:min-w-[360px]'
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link href={'#'}>
        <div className='group relative flex w-full py-3'>
          <div className='w-[120px] flex-shrink-0 md:w-[160px]'>
            <div className='relative w-full pt-[100%]'>
              <div className='absolute bottom-0 left-0 right-0 top-0 overflow-hidden'>
                <Image
                  className='object-cover transition-transform duration-500'
                  src='http://res.cloudinary.com/duc2gaec9/image/upload/v1692362652/league-of-legends-1692362650.jpg'
                  alt='Article thumb'
                  title='Article Thumb'
                  fill
                />
              </div>
            </div>
          </div>
          <div className='flex flex-1 flex-col px-3'>
            <div className='px-2 md:px-0 md:pb-2'>
              <p className='mb-1 text-12 uppercase text-color-primary md:text-12'>World War II</p>
              <h3 className='mb-2.5 line-clamp-2 text-14 font-bold text-color-white md:text-18'>
                Tiger Tank - Legendary Germany Hihi Muahaha
              </h3>
              <p className='mb-2.5 line-clamp-2 text-12 text-color-white md:text-14'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quaerat quo eligendi totam animi corporis
                pariatur placeat et culpa repellat.
              </p>
              <p className='text-12 font-light italic text-color-white md:text-14'>18-08-2023 10:10:10</p>
            </div>
          </div>
          <div className='featured-article-card-border'>
            <canvas className='h-full w-full' ref={canvasRef}></canvas>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default FeaturedArticleCard
