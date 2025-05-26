# 🧪 React App - Login y Registro

Este proyecto es una aplicación en React que incluye formularios de **login** y **registro**, integrados con un backend (mock o real) para pruebas de autenticación.

---

## 🚀 Cómo ejecutar el proyecto

Sigue estos pasos:

1. **Clona el repositorio o accede al directorio del proyecto:**

   ```bash
   cd nombre-del-proyecto
   ```
2. **Instala las dependencias**
  
  ```bash
    npm install
  ```

3. **Correr el proyecto en modo desarollo**
```bash
  npm run dev
```

La app estará disponible en http://localhost:5173 (si usas Vite) o http://localhost:3000 (si usas Create React App).

🔐 Autenticación
Al hacer login exitoso, se guarda un token en localStorage.

Solo los usuarios autenticados pueden acceder a la ruta principal /.

Si no hay token, el usuario es redirigido al login (/login).