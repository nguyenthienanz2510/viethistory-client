import React, { useEffect, useRef } from 'react'

type Props = {}

function Hero({}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoHero = 'https://www.leagueoflegends.com/static/hero-c35bd03ceaa5f919e98b20c905044a3d.webm'

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
        { x: canvas.width - 30, y: 0 },
        { x: canvas.width, y: 30 },
        { x: canvas.width, y: canvas.height },
        { x: 0, y: canvas.height },
        { x: 0, y: 0 }
      ]
      ctx.strokeStyle = '#EC4899'
      ctx.lineWidth = 2

      function draw() {
        cancelAnimationFrame(rafID)
        drawPolygon(vertices, 20, () => console.log('done'))
      }

      draw()
    }
  }, [])

  return (
    <section>
      <div className='relative p-0 md:p-16'>
        <div className='absolute bottom-0 left-0 right-0 top-0 overflow-hidden'>
          <div className='h-[500px] overflow-hidden md:h-[700px]'>
            <video className='w-full object-cover object-center blur-md' autoPlay loop muted>
              <source src={videoHero} type='video/webm' />
            </video>
          </div>
        </div>
        <div className='relative z-[1] mx-auto max-w-[1600px]'>
          <video className='h-[500px] w-full object-cover object-center md:h-[700px]' autoPlay loop muted>
            <source src={videoHero} type='video/webm' />
          </video>
          <div className='absolute -bottom-4 -top-4 left-4 right-4 z-[2] hidden md:block'>
            <canvas className='h-full w-full' ref={canvasRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
