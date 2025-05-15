
import React from 'react'
import { Registerform } from './Registerform'
import { HeaderRegister } from './HeaderRegister'

export const Layout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[800px] min-w-3/12 rounded-2xl bg-gray-100 text-black my-30 mx-20 shadow-lg">
        <HeaderRegister />
       <Registerform />
    </div>
  )
}
