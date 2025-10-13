<template>
  <Toast />

  <!-- 💫 Transición global -->
  <transition name="fade-slide" appear>
    <div id="App">
      <!-- HEADER -->
      <HeaderComponent />

      <!-- CONTENIDO PRINCIPAL -->
      <main class="contenido-principal">
        <ConsultaInicio />
        <ConsultaTramites />
      </main>

      <!-- FOOTER -->
      <FooterComponent />
    </div>
  </transition>
</template>

<script>
import HeaderComponent from './components/Header.vue'
import ConsultaTramites from './components/ConsultaTramites.vue'
import ConsultaInicio from './components/ConsultaInicio.vue'
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ConsultaTramites,
    ConsultaInicio,
    FooterComponent,
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
  background-color: #f9f9f9;
}

/* 🔹 Transición global */
.fade-slide-enter-active {
  transition: all 0.6s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* 🔹 Estructura */
#App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenido-principal {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: fadeIn 0.8s ease-out;
}

/* 💫 Pequeño efecto extra al aparecer el contenido */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
