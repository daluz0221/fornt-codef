

export const Home = () => {

    const handleLogOut = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-4xl">Bienvenido al home</h1>
        <hr />
        <button onClick={handleLogOut} className="bg-red-500 text-white p-2 rounded">
            Cerrar Sesión
        </button>
    </div>
  )
}
