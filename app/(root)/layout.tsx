import LeftSideBar from "@/components/LeftSideBar";
import NavSideRight from "@/components/NavSideRight";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`bg-primary-300`}>
      <div className='flex justify-between'>
        <NavSideRight />
        <div className="w-full mx-auto p-2 pt-10">
          {children}
        </div>
        <LeftSideBar />
      </div>
    </main>
  );
};

export default Layout;