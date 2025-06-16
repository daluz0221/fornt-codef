

export const AdminDashboard = () => {

    const handleLogOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-4xl text-black text-center">Bienvenido a la página de perfil</h1>
            {/* <button onClick={handleLogOut} className="bg-red-500 text-white p-2 rounded">
                Cerrar Sesión
            </button> */}
        </div>
    )
}
