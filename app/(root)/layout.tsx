import LeftSideBar from "@/components/LeftSideBar";
import NavSideRight from "@/components/NavSideRight";
import React from "react";
import Image from '@/node_modules/next/image'


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div>
         <Image 
        width={200}
        height={200}
        src='/assets/background.jpg' 
        style={{width: '100%', position: 'fixed', zIndex: -1 }}
        alt="background"
        />
    <main className={`bg-primary-300 max-w-[1940px] w-full mx-auto px-4`}>
       
      <div className='flex justify-between'>
        <NavSideRight />
        <div className="w-full mx-auto p-2 pt-10">
          {children}
        </div>
       <LeftSideBar />
      </div>
    </main>
      </div>
  );
};

export default Layout;