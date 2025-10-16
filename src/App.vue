<template>
  <Toast />

  <transition name="fade-slide" appear>
    <div id="App" class="portal-consulta d-flex flex-column min-vh-100">
      
      <!-- 🔹 CONTENIDO PRINCIPAL SIN HEADER -->
      <main class="flex-grow-1 d-flex align-items-center justify-content-center bg-gradiente">
        <div class="container py-5 position-relative z-1">
          <ConsultaInicio />
        </div>
      </main>

      <!-- 🔹 FOOTER -->
      <FooterComponent />
    </div>
  </transition>
</template>

<script>
import ConsultaInicio from './components/ConsultaInicio.vue'
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    ConsultaInicio,
    FooterComponent
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");

/* 🔹 Fondo institucional (gradiente 4 esquinas) */
body {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  background: radial-gradient(
      circle at top left,
      rgba(13, 71, 161, 0.1),
      transparent 65%
    ),
    radial-gradient(
      circle at top right,
      rgba(13, 71, 161, 0.1),
      transparent 65%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(13, 71, 161, 0.1),
      transparent 65%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(13, 71, 161, 0.1),
      transparent 65%
    ),
    #ffffff;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  color: #333;
  min-height: 100vh;
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
</style>
