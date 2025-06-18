import { useState } from "react";





export const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const userToken = localStorage.getItem("userToken");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo válido.");
      setSuccess(false);
      return;
    }

    // Aquí iría tu lógica para actualizar el correo, por ejemplo un fetch()
    // Simulación de éxito:

    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${userToken}`);

    const raw = JSON.stringify({
      "email": email
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const fetchUpdateEmail = async () => {

      try {
        await fetch("https://citasalud-back.onrender.com/api/userauth/change-email", requestOptions);
 
        setSuccess(false);
        setEmail("");
        setTimeout(() => {

          localStorage.setItem("email", email);
          window.location.href = '/';
        }, 100);
        return
      } catch (error) {
        console.log('algo falló, intenta más tarde', error);

      }

    };

    fetchUpdateEmail();

  }



  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Actualizar correo</h2>
      <hr className="bg-gray-300 h-1" />
      <p className="text-gray-600">Por favor, ingrese su correo actual y el nuevo correo electrónico</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo actual</label>
        <input
          type="text"
          readOnly
          value={`${localStorage.getItem("email") || "No disponible"}`}
          className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-700"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Nuevo correo electrónico
        </label>
        <input
          type="email"
          id="email"
          className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">Correo actualizado correctamente ✅</p>}

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
      >
        Guardar cambios
      </button>

    </form>
  );
}