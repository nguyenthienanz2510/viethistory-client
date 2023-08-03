import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    <footer className='border-t border-slate-800'>
      <div className='container flex h-16 items-center'>
        <p className='w-full text-center text-14'>Copyright &copy; 2023 Andree Nguyen</p>
      </div>
    </footer>
  )
}

export default Footer
