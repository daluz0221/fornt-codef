

import { Registerform } from './Registerform'
import { HeaderRegister } from './HeaderRegister'
import { Link } from 'react-router-dom'

export const RegisterLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[800px] min-w-3/12 rounded-2xl bg-gray-100 text-black my-30 mx-20 shadow-lg">
        <HeaderRegister />
       <Registerform />
       <p className="mt-2 mb-4 text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}
