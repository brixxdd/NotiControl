import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { showCreatorMessage } from './utils/creatorMessage.ts'

// Llama a la función aquí o simplemente impórtala para que se ejecute el código que la adjunta a window
// Si solo la importas, el código fuera de las funciones (como la asignación a window) se ejecutará.
// Descomenta la siguiente línea temporalmente si quieres verificar si el archivo se está ejecutando:
showCreatorMessage(); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
