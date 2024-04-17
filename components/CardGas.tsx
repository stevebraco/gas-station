'use client'
import useCartService from '@/lib/hooks/useCartStore'
import React from 'react'
import { useState } from 'react'
import { Input } from './ui/input'

function CardGas({ name, color, title, price, selected, handleSelected }: { name: string, color: string, title: string, price: number, selected: string, handleSelected: any }) {
  const { addToCart } = useCartService()

  const handleTest = (title: string) => () => {
    handleSelected(title)
    addToCart({ name, title, price })
  }
  // const handleSelected = (title: string) => () => {
  //   setSelected(title === selected ? '' : title)
  // }

  return (
    <div>
      <div className={`w-[200px] h-[200px] rounded-3xl flex items-center overflow-hidden`} style={{ background: `${color}` }}>
        <span className='font-bold text-[10rem] translate-x-4'>{name}</span>
      </div>
      <div className='text-left pl-2 mt-2 ' >
        <h2 className='text-primary-100 font-bold'>{title}</h2>
        <div className='flex justify-between space-x-5 h-[40px] items-center mt-1'>

          {selected !== title ? (
            <>
              <span className='text-primary-100 font-bold text-nowrap	'>$ {price}</span>
              <button className='text-primary-100 bg-primary-500 w-full h-full rounded-2xl' onClick={handleTest(title)}>+</button>
            </>
          ) : (
            <div>
              <Input value='10 l' className='bg-primary-500 border-none rounded-2xl text-primary-100 w-[50px]' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardGas
