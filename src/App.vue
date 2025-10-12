<template>
  <Toast />
  <div id="App">
    <HeaderComponent />

    <ConsultaInicio />
    <ConsultaTramites />

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';
import ConsultaTramites from './components/ConsultaTramites.vue'
import ConsultaInicio from './components/ConsultaInicio.vue';
import FooterComponent from './components/Footer.vue';

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
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f9f9f9;
}
</style>
