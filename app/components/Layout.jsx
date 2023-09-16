'use client'

import React from 'react'
import Nav from './Nav';
import { signIn, useSession, signOut } from 'next-auth/react';
import Home from '../page';

const Layout = ({children}) => {
    const { data: session } = useSession();

    console.log(session);
  
    if (!session) {
      return (
        <div className="bg-bgGray w-screen h-screen flex items-center">
          <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
            
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-blue-900 w-screen h-screen flex">
        <Nav />
          {/* <div className="text-center w-full"> */}
          <div className="bg-white flex-grow mt-2 rounded-lg p-4 mb-2 mr-2">{children}</div>
          {/* </div> */}
        </div>
    );
}

export default Layout