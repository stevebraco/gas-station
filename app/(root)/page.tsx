'use client'
import { useState } from 'react'
import CardGas from "@/components/CardGas";
import Image from "@/node_modules/next/image";
import { Input } from "@/components/ui/input";
import { dataCard } from "@/constants/data"
import useCartService from '@/lib/hooks/useCartStore';

export default function Home() {
  const [selected, setSelected] = useState('')
  const { items } = useCartService()
  console.log(items)


  const handleSelected = (title: string) => {
    setSelected(title === selected ? '' : title)
  }
  return (
    <>
      <div
        className="relative w-full max-w-[300px] max-lg:hidden pb-10 pl-10"
      >
        <div className="bg-primary-500 relative flex min-h-[45px] grow items-center gap-1 rounded-full px-4">
          <Image
            src="/assets/search.png"
            alt="search"
            width={15}
            height={15}
            className="cursor-pointer"
          />

          <Input
            type="text"
            placeholder="Search"

            className="text-primary-100 paragraph-regular no-focus placeholder border-none bg-transparent shadow-none outline-none"
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-5 justify-items-center	'>
        {dataCard.map(data => <CardGas name={data.label} color={data.color} title={data.name} price={data.price} selected={selected} handleSelected={handleSelected} />)}
      </div>
    </>
  );
}
