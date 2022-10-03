import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <div className="grid-cols-[auto,1fr] desktop:max-w-7xl laptop:max-w-5xl max-w-2xl mx-auto">
        <header className="fixed">
          <div>
            <Sidebar />
          </div>
        </header>
        <main>
          <div className="grid grid-cols-[auto,1fr] desktop:ml-72 tablet:ml-20 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
