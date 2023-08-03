import React from 'react'

type Props = {}

function Hero({}: Props) {
  return (
    <section>
      <div className='container flex flex-col justify-between gap-5 py-10 md:py-14 xl:flex-row'>
        <div className='space-y-4 xl:flex-[7]'>
          <h1 className='cursor-wait text-5xl font-bold leading-[60px] text-color-text-primary transition-colors duration-1000 hover:text-color-primary md:text-7xl'>
            Vietnam History
          </h1>
          <p className='text-16 uppercase tracking-widest text-slate-300 md:text-24'>
            Embark on a Journey to Uncover the Stories of{' '}
            <span className='underline-secondary text-color-text-primary'>History</span> with Us.
          </p>
        </div>
        <div className='space-y-5 text-16 md:text-20 xl:flex-[5]'>
          <p className='font-bold text-color-text-primary'>
            Vietnam History | Germany History | World War I | World War II &amp; More!
          </p>
          <p className='font-normal'>
            Would you like to visit{' '}
            <a className='text-highlight-primary' href='https://nguyenthienanz.vercel.app/'>
              My personal blog
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
