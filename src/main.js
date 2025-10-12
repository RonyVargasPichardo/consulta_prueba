
// Core Vue import
import { createApp } from 'vue';

// Main App component
import App from './App.vue';

// 🔹 PrimeVue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

// 🔹 Estilos de PrimeVue
import 'primeicons/primeicons.css'   
import 'primeflex/primeflex.css'

// 🔹 Tema moderno de PrimeVue 4+
import Aura from '@primeuix/themes/aura'

// Bootstrap styles and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Optionally import global styles
// import './style.css';

// Create and configure app
const app = createApp(App);

// use PrimeVue with custom configuration
app.use(PrimeVue, {
  ripple: true,
  theme: { preset: Aura }
})
app.use(ToastService)
app.component('Toast', Toast)

app.mount('#app');
