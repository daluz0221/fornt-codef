
import { FaUserCircle } from 'react-icons/fa'

export const HeaderLogin = () => {
  return (

    <div className='flex flex-col items-center w-[83%] mt-10'>
        <FaUserCircle className='text-blue-600 mb-4 rounded-2xl w-12 h-12' />
      <h2 className='font-bold text-3xl mb-3'>Iniciar Sesión</h2>
      <p className='text-md text-gray-500'>Ingrese sus credenciales para continuar</p>
    </div>
  )
}
