import Image from 'next/image'
import React from 'react'

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[700px]'>
      <Image src='/assets/gas-station.png' width={350} height={350} alt='gas station' />
      <p className='text-primary-100 font-bold tracking-wider text-xl pt-10'>Add products to the cart</p>
    </div>
  )
}

export default EmptyCart