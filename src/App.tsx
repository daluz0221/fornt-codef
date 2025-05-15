import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Layout } from './components/layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-blue-900 text-white min-h-screen flex items-center justify-center">
      <Layout />
    </div>
  )
}

export default App
