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

function CardGas({ name, color, title, price, selected, handleSelected }: { name: string, color: string, title: string, price: number, selected: string, handleSelected: any }) {
  const { addToCart, handleChangeLitre, valueLitre, handleQty } = useCartService()

  const handleTest = (title: string) => () => {
    handleSelected(title)
    addToCart({ name, title, price })
  }

  return (
    <div>
      <div className={`w-[250px] h-[250px] rounded-3xl flex items-center overflow-hidden border-[15px] border-solid border-current`} style={{ background: `${color}`, borderColor: selected === title ? `#21212130` : ''  }}>
        <span className='font-bold text-[11rem] translate-x-5'>{name}</span>
      </div>
      <div className='text-left pl-2 mt-2'>
        <h2 className='text-primary-100 font-bold'>{title}</h2>
        <div className='flex justify-between space-x-5 h-[40px] items-center mt-1'>

          {selected !== title ? (
            <>
              <span className='text-primary-100 font-bold text-nowrap	'>$ {price.toFixed(2)}</span>
              <button className='text-primary-100 bg-primary-500 w-full h-full rounded-3xl' onClick={handleTest(title)}>+</button>
            </>
          ) : (
            <div className='flex space-x-2'>
              <Select onValueChange={(value) => handleQty(value)}>
                <SelectTrigger className="w-[60px] bg-primary-500 text-primary-100 rounded-2xl border-none">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input value={valueLitre} onChange={(e) => handleChangeLitre(e.target.value)} className='bg-primary-500 border-none rounded-2xl text-primary-100 w-[50px]' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardGas
