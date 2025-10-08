<template>
  <footer class="footer">
    <div class="container-fluid text-center py-3">
      <p class="mb-0 texto-footer">
        © 2025 Contraloría General de la República Dominicana
        <span class="separator">|</span>
        Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer {
  background-color: #FAFAFA; /* mismo tono que el header */
  border-top: 1px solid #E0E0E0;
  font-family: "Segoe UI", Arial, sans-serif;
  padding-top: 10px;
  padding-bottom: 10px;
}

.texto-footer {
  color: #6C757D;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Permite que se divida en móvil */
  gap: 6px; /* Espaciado entre elementos */
}

/* Separador visual */
.separator {
  color: #B0B0B0;
}

/* Responsive */
@media (max-width: 768px) {
  .texto-footer {
    flex-direction: column;
    text-align: center;
    font-size: 0.9rem;
    gap: 2px;
  }
  .separator {
    display: none;
  }
}
</style>
