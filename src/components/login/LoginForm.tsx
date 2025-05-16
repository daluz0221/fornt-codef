import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    id: string;
    password: string;
};


export const LoginForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: FormValues) => {
        console.log("Datos del formulario:", data);
      };


    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-100 mr-10 ml-10 mb-10 mt-5">
            <div>
                <label className="block font-bold mb-1">Número de Cédula</label>
                <input
                    {...register("id", { required: 'Este campo es obligatorio', validate:{
                        isNumber: (value) => {
                            const regex = /^[0-9]+$/;
                            return regex.test(value) || "El número de cédula debe ser numérico";
                        },
                    } })}
                    className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
                    placeholder='Ingresa tu número de cédula'
                />
                {errors.id && (
                    <span className="text-red-500">{errors.id.message}</span>
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
