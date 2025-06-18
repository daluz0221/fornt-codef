import { Link } from "react-router-dom"
import { HeaderValidateEmail } from "./HeaderValidateEmail"
import { ValidateEmailForm } from "./ValidateEmailForm"



export const ValidateEmailLayout = () => {


  const onComplete = async (code: string) => {


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": localStorage.getItem("email"),
      "code": code
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    try {
      const resp = await fetch("https://citasalud-back.onrender.com/auth/verifyCode", requestOptions).then(resp => resp.json());

      const data = resp.token

      if (data){
        localStorage.setItem('userToken', data)
        window.location.href = '/'
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
    }

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] min-w-3/12 rounded-2xl bg-gray-100 text-black my-30 mx-20 shadow-lg">
      <HeaderValidateEmail />
      <ValidateEmailForm length={6} duration={300} onComplete={onComplete} />
      <p className="mt-2 text-sm text-gray-600 mb-4">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  )
}