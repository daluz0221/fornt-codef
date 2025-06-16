import { useState } from "react";
import { useForm } from "react-hook-form";





export const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ current: string; newPass: string; confirm: string }>({ defaultValues: { current: "", newPass: "", confirm: "" } });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const onSubmit = async (data: { current: string; newPass: string; confirm: string }) => {
    if (data.newPass !== data.confirm) {
      setError("confirm", { type: "manual", message: "Las contraseñas no coinciden" });
      return;
    }
    if (data.current === data.newPass) {
      setError("newPass", { type: "manual", message: "La nueva contraseña debe ser diferente de la actual" });
      return;
    }

    // TODO: Llamar tu API para cambiar la contraseña
    console.log("Cambiar contraseña:", data);
    alert("Contraseña cambiada ✅");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-black shadow-md rounded p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">Cambiar contraseña</h2>

      <div className="relative">
        <label className="block text-sm font-medium mb-1">Contraseña actual</label>
        <input type={showPassword1 ? "text" : "password"} {...register("current", { required: "Obligatorio" })} className="w-full border rounded px-4 py-2" />
        {errors.current && <p className="text-red-500 text-sm">{errors.current.message}</p>}
        <button
          type="button"
          onClick={() => setShowPassword1((prev) => !prev)}
          className="absolute right-3 top-[40px] transform -translate-y-1/2 text-xl"
        >
          {showPassword1 ? "🙈" : "👁️"} {/* Puedes cambiarlo por íconos reales */}
        </button>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
        <input type={showPassword2 ? "text" : "password"}  {...register("newPass", { required: "Obligatorio" })} className="w-full border rounded px-4 py-2" />
        {errors.newPass && <p className="text-red-500 text-sm">{errors.newPass.message}</p>}
        <button
          type="button"
          onClick={() => setShowPassword2((prev) => !prev)}
          className="absolute right-3 top-[40px] transform -translate-y-1/2 text-xl"
        >
          {showPassword2 ? "🙈" : "👁️"} {/* Puedes cambiarlo por íconos reales */}
        </button>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
        <input type={showPassword3 ? "text" : "password"} {...register("confirm", { required: "Obligatorio" })} className="w-full border rounded px-4 py-2" />
        {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
        <button
          type="button"
          onClick={() => setShowPassword3((prev) => !prev)}
          className="absolute right-3 top-[40px] transform -translate-y-1/2 text-xl"
        >
          {showPassword3 ? "🙈" : "👁️"} {/* Puedes cambiarlo por íconos reales */}
        </button>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-2 rounded">
        {isSubmitting ? "Enviando..." : "Cambiar contraseña"}
      </button>
    </form>
  );
}