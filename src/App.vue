<template>
  <div id="App">
     <HeaderComponent />

   
    <ConsultaTramites v-if="vista === 'consulta'" @validacion-correcta="mostrarInstituciones"  />
<!--
    
    <InstitucionesList v-if="vista === 'instituciones'" :instituciones="instituciones"
      @seleccionar-institucion="mostrarTramites" />-->
    <FooterComponent /> 
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';
import ConsultaTramites from './components/ConsultaTramites.vue'
// import InstitucionesList from './components/InstitucionesList.vue'
import FooterComponent from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ConsultaTramites,
    // InstitucionesList,
    FooterComponent,
  },
  data() {
    return {
      vista: 'consulta', 
      instituciones: [],
      tramites: [],
    }
  },
  methods: {
    mostrarInstituciones(data) {
      this.instituciones = data.instituciones
      this.vista = 'instituciones'
    },
    mostrarTramites(institucion) {
      console.log('Institución seleccionada:', institucion)
      this.vista = 'tramites'
    }
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
