import { useState } from 'react'
import Image from "@/node_modules/next/image";
import { Input } from "@/components/ui/input";
import { dataCard } from "@/constants/data"
import useCartService from '@/lib/hooks/useCartStore';
import CardListGas from '@/components/CardListGas';

export default function Home() {

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
      <CardListGas data={dataCard} />
    </>
  );
}
