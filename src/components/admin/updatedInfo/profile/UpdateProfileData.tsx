import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface FormData {
    name: string;
    lastName: string;
    departamento: string; // guardamos el ID como string
    city: string;
    address: string;
    phone: string;
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
    const defaultDept = "2"; // Antioquia por ejemplo
    const defaultCity = "12";

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "Juan",
            lastName: "Pérez",
            departamento: defaultDept,
            city: defaultCity,
            address: "Calle 50",
            phone: "6157464",
        },
    });

    const [success, setSuccess] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [departments, setDepartments] = useState<Departamento[]>([]);
    const [cities, setCities] = useState<City[]>([]);

    // Observamos el departamento seleccionado (ID)
    const selectedDepartmentId = useWatch({ control, name: "departamento" });

    /** ---------------------------------------------------------
     * 1️⃣ Cargar departamentos al montar el componente
     * --------------------------------------------------------*/
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch("https://api-colombia.com/api/v1/Department");
                if (!res.ok) throw new Error("Error al obtener departamentos");

                const data = await res.json();
                const mapped: Departamento[] = data
                    .map((d: any) => ({ id: d.id, name: d.name }))
                    .sort((a, b) => a.name.localeCompare(b.name));
        

                setDepartments(mapped);

                /**
                 * Si el valor por defecto NO existe en la lista (p.e. porque vino vacía la BD),
                 * seleccionamos el primero para evitar que el campo quede vacío
                 */
                const defaultExists = mapped.some((d) => d.id.toString() === defaultDept);
                setValue("departamento", defaultExists ? defaultDept : mapped[0]?.id.toString() || "");
            } catch (err) {
                console.error(err);
            }
        };

        fetchDepartments();
    }, [defaultDept, setValue]);

    /** ---------------------------------------------------------
     * 2️⃣ Cargar ciudades cada vez que cambie el departamento
     * --------------------------------------------------------*/
    useEffect(() => {
        const fetchCities = async () => {
            if (!selectedDepartmentId) return;

            setLoadingCities(true);
            try {
                const res = await fetch(
                    `https://api-colombia.com/api/v1/Department/${selectedDepartmentId}/cities`
                );
                const data = await res.json();

                const mapped: City[] = data.map((c: any) => ({ id: c.id, name: c.name })).sort((a, b) => a.name.localeCompare(b.name));
                setCities(mapped);
                        console.log('logs ct', mapped);
                /**
                 * Establecemos ciudad por defecto: si el usuario tenía una guardada la respetamos,
                 * de lo contrario la primera de la lista.
                 */
                const currentCity = watch("city");

                // Si ya hay una ciudad válida, no hacemos nada
                const defaultExists = mapped.some((c) => c.id.toString() === currentCity)
                if (currentCity && defaultExists){
                    console.log('llego aca');
                    setValue("city", defaultExists ? defaultCity : mapped[0]?.id.toString() || "");
                };

                // Si hay una ciudad por defecto válida, la usamos
                if (defaultCity && mapped.some((c) => c.id.toString() === defaultCity)) {
                    setValue("city", defaultCity);
                    return;
                }

                

                // Si no, seleccionamos la primera disponible
                setValue("city", mapped[0]?.name || "");
            } catch (err) {
                console.error("Error al obtener ciudades:", err);
            } finally {
                setLoadingCities(false);
            }
        };

        fetchCities();
    }, [selectedDepartmentId, setValue, watch]);

    /** ---------------------------------------------------------
     * 3️⃣ Envío del formulario
     * --------------------------------------------------------*/
    const onSubmit = (data: FormData) => {
        // Validación de teléfono
        if (!/^\d{7,15}$/.test(data.phone)) {
            return alert("Teléfono inválido");
        }

        console.log("Formulario enviado:", data);
        setSuccess(true);
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
                    {...register("name", { required: "Nombre requerido" })}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
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
                    {...register("departamento", { required: "Este campo es obligatorio" })}
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
                {errors.departamento && (
                    <p className="text-sm text-red-500">{errors.departamento.message}</p>
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
                    {...register("phone", { required: "Teléfono requerido" })}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
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
