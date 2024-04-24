'use client'
import useCartService from '@/lib/hooks/useCartStore'
import React from 'react'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import { quantity } from "@/constants/utils"


function CardGas({ data, selected, handleSelected }: { data: { name: string, color: string, price: number, category: string, label: string, img: string }, selected: string, handleSelected: any }) {
  const { addToCart, handleChangeLitre, valueLitre, handleQty, quantity: qtyCart , increase, decrease } = useCartService()

  const { name, color, price, category, label, img } = data

  const handleTest = (data: { name: string, color: string, price: number, category: string, label: string }) => () => {
    handleSelected(data.name)
    addToCart(data)
  }

  if (category === 'fuel')
    return (
      <div>
        <div className={`w-[250px] h-[250px] rounded-3xl flex items-center justify-center overflow-hidden border-[15px] border-solid border-current`} style={{ background: `${color}`, borderColor: selected === name ? `#21212130` : '' }}>
          <span className='font-bold text-[11rem] translate-x-5'>{label}</span>
        </div>
        <div className='text-left pl-2 mt-2'>
          <h2 className='text-primary-100 font-bold'>{name}</h2>
          <div className='flex justify-between space-x-5 h-[40px] items-center mt-1'>

            {selected !== name ? (
              <>
                <span className='text-primary-100 font-bold text-nowrap	'>$ {price.toFixed(2)}</span>
                <button className='text-primary-100 bg-primary-500 w-full h-full rounded-3xl' onClick={handleTest(data)}>+</button>
              </>
            ) : (
              <div className='flex space-x-2'>
                <Select onValueChange={(value) => handleQty(value)}>
                  <SelectTrigger className="w-[60px] bg-primary-500 text-primary-100 rounded-2xl border-none">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {quantity.map(qty =>
                        <SelectItem key={qty} value={qty}>{qty}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className='flex items-center bg-primary-500 rounded-2xl px-2'>
                  <span className='text-primary-100 font-bold'>V</span>
                  <Input type='number' value={valueLitre} onChange={(e) => handleChangeLitre(e.target.value)} className='bg-primary-500 no-focus border-none rounded-2xl text-primary-100 w-[50px] input-number' />
                  <span className='text-primary-100 font-bold'>l</span>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )

  return (
    <div>
      <div className={`w-[250px] h-[250px] rounded-3xl flex items-center justify-center bg-green-500`}>
        <Image src={img} width={120} height={120} alt={name} />
      </div>
      <div className='text-left pl-2 mt-2'>
        <h2 className='text-primary-100 font-bold'>{name}</h2>
        <div className='flex justify-between space-x-5 h-[40px] items-center mt-1'>

          {selected !== name ? (
            <>
              <span className='text-primary-100 font-bold text-nowrap	'>$ {price.toFixed(2)}</span>
              <button className='text-primary-100 bg-primary-500 w-full h-full rounded-3xl' onClick={handleTest(data)}>+</button>
            </>
          ) : (
            <div className='flex items-center justify-center space-x-2 bg-primary-500 w-full h-full rounded-full'>
              <div className='flex justify-between w-full items-center px-9'>
               <button className='text-primary-100'onClick={decrease(data)}>-</button>
               <span className='text-primary-100'>{qtyCart}</span>
               <button className='text-primary-100' onClick={increase(data)}>+</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardGas
