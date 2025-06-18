import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { departamentosColombia } from "../../../../utils/departments";

interface FormData {
    firstName?: string;
    lastName?: string;
    department?: string;
    city?: string;
    address?: string;
    numberPhone?: string;
}

type Departamento = {
    id: number;
    name: string;
};

type City = {
    id: number;
    name: string;
};

export const UpdateProfileData = () => {
    /**
     * 👉 Ajusta aquí los valores iniciales que traigas de tu backend/estado global
     * Asegúrate de que "departamento" sea el **ID** del departamento como string.
     */
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData ? JSON.parse(userData) : {};
    const { dni, email, department, ...dataToUpdate } = parsedUserData

    const newDpto = departamentosColombia.find(dpto => dpto.name === department);
    if (newDpto) {
        dataToUpdate.department = newDpto.id
    } else {
        dataToUpdate.department = "";
    }




    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: dataToUpdate
    });

    const normalizeString = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const [success, setSuccess] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [departments, setDepartments] = useState<Departamento[]>([]);
    const [cities, setCities] = useState<City[]>([]);


    /* flag para saber si estamos en el primer render;
       así sólo seteamos la ciudad una vez */
    const isFirstLoad = useRef(true);

    // Observamos el departamento seleccionado (ID)


    /** ---------------------------------------------------------
     * 1️⃣ Cargar departamentos al montar el componente
     * --------------------------------------------------------*/
    const watchDepartment = watch("department");


    useEffect(() => {
        setDepartments(departamentosColombia);
        const actualDpto = departamentosColombia.find(dpto => {
            if (dpto.id === dataToUpdate.department) {
                return dpto.id
            }
        });


        if (actualDpto) {
            setTimeout(() => {
                setValue("department", actualDpto.id.toString());
            }, 0);
        };

        const fetchCities = async () => {
            if (!actualDpto) return;

            setLoadingCities(true);
            try {
                const res = await fetch(`https://api-colombia.com/api/v1/Department/${actualDpto.id}/cities`);
                const data = await res.json();

                const mapped: City[] = data.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                })).sort((a, b) => a.name.localeCompare(b.name));

                setCities(mapped);
                const actualCity = mapped.find(city => normalizeString(city.name) === normalizeString(dataToUpdate.city || ""));
                if (actualCity) {
                    setTimeout(() => {
                        setValue("city", actualCity.name);
                    }, 0);
                }
            } catch (err: any) {
                console.error("Error al obtener ciudades:", err.message);
            } finally {
                setLoadingCities(false);
            }
        }

        fetchCities();




    }, []);

    /** ---------------------------------------------------------
     * 2️⃣ Cargar ciudades cada vez que cambie el departamento
     * --------------------------------------------------------*/

    useEffect(() => {
        if (!watchDepartment) {
            setCities([]);
            setValue("city", "");          // blank
            return;
        };
        const fetchCities = async () => {



            setLoadingCities(true);
            try {
                const res = await fetch(`https://api-colombia.com/api/v1/Department/${watchDepartment}/cities`);
                const data = await res.json();

                const mapped: City[] = data.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                })).sort((a, b) => a.name.localeCompare(b.name));

                setCities(mapped);
                const actualCity = mapped.find(city => normalizeString(city.name) === normalizeString(dataToUpdate.city || ""));
                if (actualCity) {
                    setTimeout(() => {
                        setValue("city", actualCity.name);
                    }, 0);
                }

                if (isFirstLoad.current && dataToUpdate.city) {
                    const cityMatch = mapped.find(
                        (c) => normalizeString(c.name) === normalizeString(dataToUpdate.city)
                    );
                    if (cityMatch) {
                        setValue("city", cityMatch.name, { shouldDirty: false });
                    }
                    isFirstLoad.current = false; // ya no volvemos a entrar aquí
                }

                /* ---  B) Cambios posteriores: limpiar selección --- */
                if (!isFirstLoad.current) {
                    // Sólo borramos si el usuario cambió de dpto
                    setValue("city", "", { shouldDirty: true });
                }


            } catch (err: any) {
                console.error("Error al obtener ciudades:", err.message);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, [watchDepartment]);



    /** ---------------------------------------------------------
     * 3️⃣ Envío del formulario
     * --------------------------------------------------------*/
    const onSubmit = (data: FormData) => {
        // Validación de teléfono
        if (!/^\d{7,15}$/.test(data.numberPhone!)) {
            return alert("Teléfono inválido");
        }

        const dpto = data.department;
        const dptoName = departments.find(dpt => dpt.id === +dpto!);
        if (!dptoName) {
            return alert("Departamento inválido");
        }
        const newData = {
            ...data,
            department: dptoName.name, // Guardamos el nombre del departamento
        };
        // Aquí puedes hacer la llamada a tu API para actualizar los datos del usuario

        const userToken = localStorage.getItem("userToken");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Authorization", `Bearer ${userToken}`);

        const raw = JSON.stringify({
            "firstName": newData.firstName,
            "lastName": newData.lastName,
            "department": newData.department,
            "city": newData.city,
            "address": newData.address,
            "numberPhone": newData.numberPhone
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const fetchUpdateProfile = async () => {

            try {
                await fetch("https://citasalud-back.onrender.com/api/user/edit-profile", requestOptions);
                alert("Datos actualizada correctamente ✅");
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
                return

            } catch (error) {
                console.log('algo falló, intenta más tarde', error);

            }

        };

        fetchUpdateProfile();

    

    };

    /** ---------------------------------------------------------
     * 4️⃣ Render
     * --------------------------------------------------------*/
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded p-6 max-w-2xl mx-auto space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800">Editar datos personales</h2>
            {success && <p className="text-green-600 text-sm">Datos actualizados correctamente ✅</p>}

            {/* Nombre */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    {...register("firstName", { required: "Nombre requerido" })}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            {/* Apellido */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                    {...register("lastName", { required: "Apellido requerido" })}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>

            {/* Departamento */}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <select
                    {...register("department", { required: "Este campo es obligatorio" })}
                    className="w-full text-black border p-3 border-gray-300 rounded focus:border-blue-900 outline-none"
                >
                    <option value="" disabled>
                        Selecciona un departamento
                    </option>
                    {departments.map((d) => (
                        <option key={d.id} value={d.id.toString()} className="text-black">
                            {d.name}
                        </option>
                    ))}
                </select>
                {errors.department && (
                    <p className="text-sm text-red-500">{errors.department.message}</p>
                )}
            </div>


            {/* Ciudad */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <select
                    {...register("city", { required: "Este campo es obligatorio" })}
                    className="w-full text-black border p-3 border-gray-300 rounded focus:border-blue-900 outline-none"
                    disabled={loadingCities || !cities.length}
                >
                    <option value="" disabled>
                        Selecciona una ciudad
                    </option>
                    {cities.map((c) => (
                        <option key={c.id} value={c.name} className="text-black">
                            {c.name}
                        </option>
                    ))}
                </select>
                {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>

            {/* Dirección */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                    {...register("address", { required: "Dirección requerida" })}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    {...register("numberPhone", { required: "Teléfono requerido" })}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.numberPhone && <p className="text-sm text-red-500">{errors.numberPhone.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
                Guardar cambios
            </button>
        </form>
    );
};
