import React from "react";
import { CiUser } from "react-icons/ci";
import { FaMapMarkerAlt, FaUserEdit } from "react-icons/fa";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { MdOutlineMailOutline } from "react-icons/md";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex flex-col w-full overflow-y-auto bg-white ">
            {/* Top menu */}
            <header className="min-h-16 bg-blue-800 shadow px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FaUserEdit className="text-3xl" />
                    <h1 className="text-xl font-bold">Mi Perfil</h1>
                </div>
                <div className="flex">
                    <span className="bg-white rounded-full p-2 text-black my-6 mx-6">JP</span>
                    <div className="mt-6">
                        <h6 className="font-bold text-xl">Juan Pérez</h6>
                        <p className="text-sm">juan.perez@udea.edu.co</p>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 text-white">
                {/* Sidebar */}
                <aside className="w-74 h-full bg-white p-4  pb-10space-y-4">
                    <div className="text-3xl font-semibold mb-8 mt-4  bg-blue-300 rounded-2xl p-2 text-center">Editar Datos</div>
                    <ul className="space-y-2">
                        <li className="bg-blue-300 h-70 mb-10 p-2 rounded-xl ">
                            <div className="flex gap-2 p-2 items-center">
                                <CiUser className="text-blue-700 text-xl" />
                                <h4 className="font-bold text-lg">
                                    Información Personal
                                </h4>
                            </div>
                            <ul className=" p-2">
                                <div>
                                    <h6 className="text-gray-500 text-sm">Nombre(s)</h6>
                                    <p>Juan</p>
                                </div>
                                <div>
                                    <h6 className="text-gray-500 mt-2 text-sm">Apellido(s)</h6>
                                    <p>Pérez</p>
                                </div>
                                <div>
                                    <h6 className="text-gray-500 mt-2 text-sm">Cédula</h6>
                                    <p>1234567890</p>
                                </div>
                                <div>
                                    <h6 className="text-gray-500 mt-2 text-sm">Teléfono</h6>
                                    <p>300487952</p>
                                </div>
                            </ul>
                        </li>
                        <li className="bg-blue-300 h-60 shadow-md p-2 mb-10 rounded-xl ">
                            <div className="flex gap-2 p-2 items-center">
                                <LiaMapMarkerAltSolid className="text-blue-700 text-xl" />
                                <h4 className="font-bold text-lg">
                                    Ubicación
                                </h4>
                            </div>
                            <ul className=" p-2">
                                <div>
                                    <h6 className="text-gray-500 text-sm">Departamento</h6>
                                    <p>Antioquia</p>
                                </div>
                                <div>
                                    <h6 className="text-gray-500 mt-2 text-sm">Apellido(s)</h6>
                                    <p>Pérez</p>
                                </div>
                                <div>
                                    <h6 className="text-gray-500 mt-2 text-sm">Dirección</h6>
                                    <p>Calle 50 # 40-20</p>
                                </div>

                            </ul>
                        </li>
                        <li className="bg-blue-300 h-30  p-2 rounded-xl ">
                            <div className="flex gap-2 p-2 items-center">
                                <MdOutlineMailOutline className="text-blue-700 text-xl" />
                                <h4 className="font-bold text-lg">
                                    Información de Cuenta
                                </h4>
                            </div>
                            <ul className=" p-2">
                                <div>
                                    <h6 className="text-gray-500 text-sm">Correo electrónico</h6>
                                    <p>juan.perez@udea.edu.co</p>
                                </div>
                            </ul>
                        </li>
                        <li className=" h-30   rounded-xl mt-8">
                            <div className="flex flex-col space-y-4">

                            <button className="bg-blue-500 px-4 py-2 rounded-xl">
                                Actualizar Datos
                            </button>
                            <button className="bg-blue-500 px-4 py-2 rounded-xl">
                                Actualizar Correo
                            </button>
                            <button className="bg-blue-500 px-4 py-2 mb-10 rounded-xl">
                                Actualizar Contraseña
                            </button>
                            </div>
                        </li>
                    </ul>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 p-6 overflow-auto bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
};
