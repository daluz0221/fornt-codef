import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';


type FormValues = {
  cedula: number;
  names: string;
  lastNames: string;
  departments: string;
  city: string;
  address: string;
  email: string;
  cellphone: number;
  password: string;
};


type Departamento = {
  id: number;
  name: string;
};
type City = {
  id: number;
  name: string;
};
export const Registerform = () => {


  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  const [departments, setDepartments] = useState<Departamento[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const selectedDepartmentId = watch("departments");
  const passwordValue = watch("password") || "";


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://api-colombia.com/api/v1/Department");
        if (!res.ok) throw new Error("Error al obtener los usuarios");
        const data = await res.json();
        const sortedData: Departamento[] = data.map((dpto: any) => ({
          name: dpto.name,
          id: dpto.id
        })).sort((a, b) => a.name.localeCompare(b.name));
 
        setDepartments(sortedData);



      } catch (err: any) {
        throw new Error(err.message);
      } finally {
        console.log("Fetch users completed");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedDepartmentId) return;

      console.log(selectedDepartmentId);

      setLoadingCities(true);
      try {
        const res = await fetch(`https://api-colombia.com/api/v1/Department/${selectedDepartmentId}/cities`);
        const data = await res.json();

        const mapped: City[] = data.map((c: any) => ({
          id: c.id,
          name: c.name,
        }));

        setCities(mapped);
      } catch (err: any) {
        console.error("Error al obtener ciudades:", err.message);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [selectedDepartmentId]);


  const onSubmit = (data: FormValues) => {
    console.log("Datos del formulario:", data);
    const resp = fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      return response.json();
    }).then((data) => {
      console.log("Respuesta del servidor:", data);
      window.location.href = '/login';
      alert("Usuario registrado correctamente");
     
    }).catch((error) => {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    });

  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-100 mr-10 ml-10 mb-10 mt-5">
      <div>
        <label className="block font-bold mb-1">Cédula</label>
        <input
          {...register("cedula", { required: 'Este campo es obligatorio' })}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
          placeholder='Ingresa tu número de cédula'
        />
        {errors.cedula && (
          <span className="text-red-500">{errors.cedula.message}</span>
        )}
      </div>

      <div>
        <label className="block font-bold mb-1">Nombres</label>
        <input
          {...register("names", { required: 'Este campo es obligatorio' })}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
          placeholder='Ingresa tu nombre'
        />
        {errors.names && (
          <span className="text-red-500">{errors.names.message}</span>
        )}
      </div>

      <div>
        <label className="block font-bold mb-1">Apellidos</label>
        <input
          {...register("lastNames", { required: 'Este campo es obligatorio' })}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
          placeholder='Ingresa tus apellidos'
        />
        {errors.lastNames && (
          <span className="text-red-500">{errors.lastNames.message}</span>
        )}
      </div>


      <div>
        <label className="block font-bold mb-1 text-sm font-medium">Departamento</label>
        <select
          {...register("departments", { required: "Este campo es obligatorio" })}
          className="w-full border p-4 border-gray-300 focus:border-blue-900 outline-none rounded"
          defaultValue=""
        >
          <option value="" disabled>Selecciona un departamento</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {errors.departments && <p className="text-red-500">{errors.departments.message}</p>}
      </div>

      <div>
        <label className="block font-bold mb-1 font-medium">Ciudad</label>
        <select
          {...register("city", { required: "Este campo es obligatorio" })}
          className="w-full border p-4 border-gray-300 focus:border-blue-900 outline-none rounded"
          disabled={loadingCities || !cities.length}
          defaultValue=""
        >
          <option value="" disabled>Selecciona una ciudad</option>
          {cities.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>

      <div>
        <label className="block font-bold mb-1">Dirección</label>
        <input
          {...register("address", { required: "Este campo es obligatorio" })}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full h-20" width={100} height={100}
          placeholder="Ingresa tu dirección completa"
        />
        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}
      </div>

      <div>
        <label className="block font-bold mb-1">Email</label>
        <input
          {...register("email", { required: "Este campo es obligatorio" })}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
          placeholder="correo@ejemplo.com"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label className="block font-bold mb-1">Celular</label>
        <input
          {...register("cellphone")}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
          placeholder="Ingresa tu número de celular"
        />
        {errors.cellphone && (
          <span className="text-red-500">{errors.cellphone.message}</span>
        )}
      </div>

      <div className="relative">
        <label className="block font-bold mb-1">Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Este campo es obligatorio",
            validate: {
              hasSpecialChar: (v) =>
                /[^A-Za-z0-9]/.test(v) || "Debe tener al menos 1 carácter especial",
              hasNumber: (v) =>
                /\d/.test(v) || "Debe tener al menos 1 número",
            }
          })}
          className="border p-4 border-gray-300 focus:border-blue-900 outline-none rounded w-full"
          placeholder='Crea tu contraseña'
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
      <div className="mt-2 text-sm space-y-1">
        <p className={/[^A-Za-z0-9]/.test(passwordValue) ? "text-green-600" : "text-gray-400"}>
          ✅ Debe tener al menos 1 carácter especial
        </p>
        <p className={/\d/.test(passwordValue) ? "text-green-600" : "text-gray-400"}>
          ✅ Debe tener al menos 1 número
        </p>
      </div>

      <button type="submit" className="bg-blue-500 w-full rounded-2xl text-white p-4 border-gray-300 focus:border-blue-900 outline-none hover:bg-blue-600 transition-all duration-300">
        Crear Cuenta
      </button>
    </form>
  )
}
