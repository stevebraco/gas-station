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
        <aside className='sticky top-0 right-3 h-screen w-[800px] flex items-center space-y-5'>
          <div className='bg-primary-200 w-full h-[97%] rounded-2xl'></div>
        </aside>
      </div>
    </main>
  );
};

export default Layout;