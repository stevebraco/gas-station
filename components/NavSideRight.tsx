'use client'
import React from 'react'
import { usePathname } from '@/node_modules/next/navigation'
import Image from '@/node_modules/next/image'
import Link from '@/node_modules/next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NavSideRight = () => {
  const pathName = usePathname();

  return (
    <aside className='sticky top-0 left-3 h-screen w-[30%] flex flex-col justify-center space-y-5 mr-3'>
      <div className='bg-primary-200 w-full h-[67%] rounded-2xl p-5'>
        <h1 className='text-primary-100 font-bold text-center'>GAS POS</h1>
        <nav className='flex flex-col justify-between h-[75%] mt-9'>
          <div className='flex flex-col gap-6'>
            <Link className={`text-primary-100 flex space-x-3 	items-center p-2 pl-4 ${pathName === '/' ? 'bg-[#edb05517]  rounded-2xl' : ''}`} href='/'>
              <Image src='/assets/fuel.png' className={pathName === '/' ? '' : 'grayscale'} width={20} height={20} alt='fuel' />
              <span className={`${pathName === '/' ? 'text-primary-400' : ''}`}>Fuel</span>
            </Link>
            <Link className={`text-primary-100 flex space-x-3 	items-center p-2 pl-4 ${pathName === '/food' ? 'bg-[#edb05517]  rounded-2xl' : ''}`} href='/food'>
              <Image src='/assets/hamburger.png' className={pathName === '/food' ? '' : 'grayscale'} width={20} height={20} alt='fuel' />
              <span className={`${pathName === '/food' ? 'text-primary-400' : ''}`}>Food</span>
            </Link>
            <Link className={`text-primary-100 flex space-x-3 	items-center p-2 pl-4 ${pathName === '/drinks' ? 'bg-[#edb05517]  rounded-2xl' : ''}`} href='/drinks'>
              <Image src='/assets/drinks.png' className={pathName === '/drinks' ? '' : 'grayscale'} width={20} height={20} alt='fuel' />
              <span className={`${pathName === '/drinks' ? 'text-primary-400' : ''}`}>Drinks</span>
            </Link>
          </div>
          <div className='flex flex-col gap-6'>
            <Link className={`text-primary-100 flex space-x-3 	items-center p-2 pl-4 ${pathName === '/service' ? 'bg-[#edb05517]  rounded-2xl' : ''}`} href='/service'>
              <Image src='/assets/service.png' className={pathName === '/service' ? '' : 'grayscale'} width={20} height={20} alt='service' />
              <span className={`${pathName === '/service' ? 'text-primary-400' : ''}`}>Service</span>
            </Link>
            <Link className={`text-primary-100 flex space-x-3 	items-center p-2 pl-4 ${pathName === '/help' ? 'bg-[#edb05517]  rounded-2xl' : ''}`} href='/help'>
              <Image src='/assets/help.png' className={pathName === '/help' ? '' : 'grayscale'} width={20} height={20} alt='help' />
              <span className={`${pathName === '/help' ? 'text-primary-400' : ''}`}>Help</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className='bg-primary-200 w-full h-[27%] rounded-2xl p-5'>
        <div className='flex flex-col h-full justify-around'>
          <div className='flex items-center justify-between'>
            <h3 className='text-primary-100 '>Cashier</h3>
            <span className='text-primary-100'>94 orders</span>
          </div>
          <div className='flex items-center space-x-3 mt-3 rounded-full px-3 py-" bg-primary-500'>
            <Avatar className='w-[60px] h-[60px]'>
              <AvatarImage src="/assets/avatar2.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <span className='text-primary-100  font-bold'>Anthony Welc</span>
              <span className='text-primary-400 font-bold block text-xs'>Order In Progress...</span>
            </div>
          </div>
          <div className='flex justify-between mt-3 px-3'>
            <Avatar className='w-[60px] h-[60px]'>

              <AvatarImage src="/assets/avatar1.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className='w-[60px] h-[60px]'>

              <AvatarImage src="/assets/avatar3.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className='w-[60px] h-[60px]'>

              <AvatarImage src="/assets/avatar4.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button className='bg-primary-500 rounded-full'>
              <Image src='/assets/parameter.png' width={20} height={20} alt='help' />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default NavSideRight
