import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "./context/themeContext.jsx"
import { Provider } from 'react-redux'
import { store } from './store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <ThemeProvider>
 <Provider store={store}>
     <App />
 </Provider>
   </ThemeProvider>
   </BrowserRouter>
  </StrictMode>,
)
