<template>
  <section class="home">
    <h3>Bienvenido al sistema de Consulta de Trámites</h3>
    
    <p>Aquí podrás verificar el estado de tus trámites de manera rápida y sencilla.</p>
    <h2>{{ mensaje }}</h2>
    <button @click="cambiarMensaje">Cambiar mensaje</button>
  </section>
  <h2 class="text-center text-primary">Bootstrap está funcionando 🎉</h2>
</template>

<script>
export default {
  name: 'HomeComponent',
  data() {
    return {
        mensaje: 'Bienvenido a Consulta de Tramites'
    }
  },
  methods:{
    cambiarMensaje() {
        if(this.mensaje == 'Bienvenido a Consulta de Tramites'){
            this.mensaje = 'Mensaje actualizado con Vue'
        }else {
            this.mensaje = 'Bienvenido a Consulta de Tramites'
        }
        
    }
  }
}
</script>

<style scoped>
.home {
  padding: 40px;
  text-align: center;
}
</style>
