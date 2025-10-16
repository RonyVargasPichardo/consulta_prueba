<template>
  <section class="resultado-consulta">
    <div class="mb-4 text-center">
      <h5 class="fw-semibold text-primary mb-2">Resultado de la Consulta</h5>
      <p class="text-muted small mb-0">
        Revise la información de su trámite registrada en el sistema.
      </p>
    </div>

    <!-- Datos simulados -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between">
            <span class="fw-semibold">Número de Trámite:</span>
            <span>TR-2025-00087</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span class="fw-semibold">Estado:</span>
            <span class="badge bg-warning text-dark">En revisión</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span class="fw-semibold">Fecha de Registro:</span>
            <span>10/10/2025</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span class="fw-semibold">Institución:</span>
            <span>Ministerio de Energía y Minas</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="d-grid">
      <button class="btn btn-outline-primary" @click="$emit('volver')">
        <i class="pi pi-arrow-left me-2"></i> Nueva Consulta
      </button>
    </div>
  </section>
</template>

<style scoped>
.resultado-consulta {
  font-family: "Open Sans", sans-serif;
}
.text-primary {
  color: #0d47a1 !important;
}
.btn-outline-primary {
  border-color: #0d47a1;
  color: #0d47a1;
  transition: 0.3s;
}
.btn-outline-primary:hover {
  background-color: #0d47a1;
  color: white;
}
.card {
  border-radius: 1rem;
}
.list-group-item {
  border: none;
  padding: 0.8rem 0;
  font-size: 0.95rem;
}
</style>
