import React from 'react' //coração do react com todas as suas funções e lógicas
import ReactDOM from 'react-dom/client' //integração do coração do react com a DOM - representação do html por meio do js
import { App } from './App.jsx'


//o ! é para dizer que o elemento existe, pois o ts não sabe disso
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
