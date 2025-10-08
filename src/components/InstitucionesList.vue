<template>
  <section class="instituciones container mt-4">
    <h3 class="text-center mb-4">Instituciones con trámites pendientes</h3>

    <!-- Si hay instituciones -->
    <div v-if="instituciones && instituciones.length > 0" class="row justify-content-center">
      <div
        v-for="inst in instituciones"
        :key="inst.id"
        class="col-md-6 col-lg-4 mb-3"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body text-center">
            <h5 class="card-title text-primary">{{ inst.nombre }}</h5>
            <p class="card-text">
              <strong>Trámites pendientes:</strong> {{ inst.tramites }}
            </p>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="$emit('seleccionar-institucion', inst)"
            >
              Ver trámites
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Si no hay instituciones -->
    <div v-else class="alert alert-info text-center">
      En este momento no tiene trámites pendientes en Contraloría.
    </div>
  </section>
</template>

<script>
export default {
  name: 'InstitucionesList',
  props: {
    instituciones: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.instituciones {
  max-width: 900px;
  margin: 0 auto;
}
.card {
  border-radius: 12px;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
</style>
