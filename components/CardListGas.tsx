'use client'

import React from 'react'
import CardGas from './CardGas'
import useCartService from '@/lib/hooks/useCartStore'

function CardListGas({ data }: { data: any }) {
  const { selected, handleSelected } = useCartService()


  return (
    <div className='grid grid-cols-3 gap-5 justify-items-center	'>
      {data.map(item => <CardGas key={item.label} name={item.label} color={item.color} title={item.name} price={item.price} selected={selected} handleSelected={handleSelected} />)}
    </div>
  )
}

export default CardListGas