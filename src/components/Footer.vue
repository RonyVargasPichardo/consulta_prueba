<template>
  <footer class="footer shadow-sm">
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
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  background-color: #ffffff; /* Igual que el header */
  border-top: 1px solid #e5e8ef; /* línea institucional suave */
  font-family: "Open Sans", sans-serif;
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
  z-index: 5;
}

/* Texto */
.texto-footer {
  color: #5f6368;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  letter-spacing: 0.1px;
}

/* Separador visual */
.separator {
  color: #b0b0b0;
}

/* Pequeño acento superior tipo header */
.footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #0d47a1, #1565c0);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
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
