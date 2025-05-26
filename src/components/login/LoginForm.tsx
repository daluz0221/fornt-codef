import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    cedula: string;
    password: string;
};


export const LoginForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

    const [showPassword, setShowPassword] = useState(false);
    const [loginTries, setLoginTries] = useState(1);


    const onSubmit = async(data: FormValues) => {
        console.log("Datos del formulario:", data);

        const resp = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            return response.json();
        }
        ).then((data) => {
            console.log("Respuesta del servidor:", data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            } else {
                alert("Credenciales incorrectas");
            }
        }
        ).catch((error) => {
            console.error("Error al iniciar sesión:", error);
            setLoginTries((prev) => prev + 1);
            console.log("Intentos de inicio de sesión:", loginTries);
            alert("Error al iniciar sesión");
            
            if (loginTries >= 3) {
                alert("Has alcanzado el número máximo de intentos. Por favor, inténtalo más tarde.");
               
            }
        }
        );


    };


    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-100 mr-10 ml-10 mb-10 mt-5">
            <div>
                <label className="block font-bold mb-1">Número de Cédula</label>
                <input
                    {...register("cedula", { required: 'Este campo es obligatorio', validate:{
                        isNumber: (value) => {
                            const regex = /^[0-9]+$/;
                            return regex.test(value) || "El número de cédula debe ser numérico";
                        },
                    } })}
                    className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
                    placeholder='Ingresa tu número de cédula'
                />
                {errors.cedula && (
                    <span className="text-red-500">{errors.cedula.message}</span>
                )}
            </div>

            <div className="relative">
                <label className="block font-bold mb-1">Contraseña</label>
                <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                        required: "Este campo es obligatorio",
                       
                    })}
                    className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
                    placeholder='Ingresa tu contraseña'
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[42px] text-gray-500"
                >
                    {showPassword ? "🙈" : "👁️"} {/* Puedes cambiarlo por íconos reales */}
                </button>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </div>
            

            <button type="submit" className="bg-blue-500 w-full rounded-2xl text-white p-4 border-gray-300 focus:border-blue-900 outline-none hover:bg-blue-600 transition-all duration-300">
                Iniciar Sesión
            </button>
        </form>
    )
}
