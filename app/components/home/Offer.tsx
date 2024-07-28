import React from 'react'

const Offer = () => {
  return (
    <>
      <h1 className='text-[35px] text-center'>Potrebujete...</h1>
      <div className='flex flex-col justify-center items-center my-16 text-[25px]'>
        <div className='flex flex-row gap-4'>
          <p>Moderný web?</p>
          <p>Modernizáciu starého webu?</p>
        </div>
        <div className='flex flex-row gap-4'>
          <p>Mikro stránku?</p>
          <p>Web portál?</p>
        </div>
      </div>
    </>
  )
}

export default Offer
