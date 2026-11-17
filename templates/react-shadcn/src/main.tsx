import {createRoot} from 'react-dom/client'
import {App} from './app/app'
import './app/global.css'

createRoot(document.getElementById('app')!).render(<App/>)
