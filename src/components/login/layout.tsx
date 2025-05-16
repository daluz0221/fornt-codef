import { Link } from "react-router-dom"
import { HeaderLogin } from "./HeaderLogin"
import { LoginForm } from "./LoginForm"



export const LoginLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] min-w-3/12 rounded-2xl bg-gray-100 text-black my-30 mx-20 shadow-lg">
        <HeaderLogin />
        <LoginForm />
        <p className="mt-2 text-sm text-gray-600 mb-4">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
                Regístrate
            </Link>
        </p>
    </div>
  )
}