
import { IoShieldCheckmarkOutline } from 'react-icons/io5'

export const HeaderValidateEmail = () => {
  return (

    <div className='flex flex-col items-center w-[83%] mt-10'>
      <div className='bg-blue-100 p-4 rounded-full text-blue-600 mb-4'>
        <IoShieldCheckmarkOutline className='text-blue-600  rounded-2xl w-12 h-12' />
      </div>
      <h2 className='font-bold text-3xl mb-3'>Validación de correo</h2>
      <p className='text-md text-center text-gray-500'>Ingresa el código de 6 dígitos enviado a tu correo electrónico</p>
      <span className='font-bold'>correo@udea.edu...</span>
    </div>
  )
}
