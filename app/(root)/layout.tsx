import LeftSideBar from "@/components/LeftSideBar";
import NavSideRight from "@/components/NavSideRight";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`bg-primary-300`}>
      <div className='flex justify-between'>
        <NavSideRight />
        <div className="w-full mx-auto p-2 pt-10">
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
          {children}
        </div>
        <LeftSideBar />
      </div>
    </main>
  );
};

export default Layout;