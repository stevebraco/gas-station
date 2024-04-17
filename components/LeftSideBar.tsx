'use client'

import useCartService from '@/lib/hooks/useCartStore'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import { Input } from './ui/input'
import EmptyCart from './EmptyCart'

const LeftSideBar = () => {
  const { items, handleDelete } = useCartService()

  const quantity = ['1', '2', '3', '4', '5']

  return (
    <aside className='sticky top-0 right-3 h-screen w-[55%] flex items-center space-y-5'>
      <div className='bg-primary-200 w-full h-[97%] rounded-2xl py-8 px-10'>
        <div className='flex justify-between items-baseline'>
          <h1 className='text-primary-100 font-bold'>Order #95</h1>
          <Select>
            <SelectTrigger className="w-[100px] bg-primary-500 text-primary-100 rounded-2xl border-none">
              <SelectValue placeholder="E-Wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">E-Wallet</SelectItem>
                <SelectItem value="2">Cash</SelectItem>
                <SelectItem value="3">Card</SelectItem>
                <SelectItem value="4">Paypal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='mt-5 h-[90%] flex justify-between flex-col'>
          {items.length > 0 ? (
            <>
            {items.map(item => (
              <div key={item.title} className='flex justify-between items-center mb-9 hover:bg-gray-100/10 p-3 rounded-3xl'>
                <div className='flex items-center space-x-3'>
                <div className='w-[70px] h-[70px] bg-red-900 rounded-2xl flex items-center justify-center'>
                <Image src='/assets/fuel.png' width={32} height={32} alt={item.title} />
                </div>
                <div className='flex flex-col space-y-3'>
                <span className='text-primary-100 font-bold tracking-wider'>{item.title} {item.qty}</span>
                <div className='flex space-x-2'>
                <Select disabled> 
                  <SelectTrigger className="w-[60px] bg-primary-500 text-primary-100 rounded-2xl border-none">
                    <SelectValue placeholder={item.qty} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {quantity.map(qty => 
                      <SelectItem key={qty} value={qty}>{qty}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input disabled value={item.litre} className='bg-primary-500 border-none rounded-2xl text-primary-100 w-[50px]' />
              </div>
                </div>
                </div>
                <div className='flex flex-col h-full space-y-4'>
                <button onClick={() => handleDelete(item.title)} className='text-primary-100 self-end'><span className='w-[10px] h-[10px] bg-[#D97B7B] block rounded-full'></span></button>
                <span className='text-primary-100 font-bold tracking-wider'>$ {item.total}</span>
                </div>
              </div>
            ))}
            <div className=''>
              <div className='flex justify-between'>
              <span className='text-primary-600 font-bold'>Subtotal</span>
              <span className='text-primary-100 font-bold'>$ 559.63</span>
              </div>
              <div className='flex justify-between'>
              <span className='text-primary-600 font-bold'>Discount</span>
              <span className='text-primary-100 font-bold'>-$ 4.13</span>
              </div>
              <div className='flex justify-between'>
              <span className='text-primary-100 font-bold'>Total pay</span>
              <span className='text-primary-100 font-bold'>$ 55.50</span>
              </div>
            </div>
              </>
          ) : <EmptyCart />}
        </div>
      </div>
    </aside>)
}

export default LeftSideBar