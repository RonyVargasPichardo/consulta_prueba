<template>
  <header class="header-institucional shadow-sm">
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <div class="d-flex align-items-center">
          <img
            src="../assets/LogoContraloriaWeb.png"
            alt="Logo Institucional"
            class="me-3"
            style="height: 50px"
          />
          <div>
            <h5 class="mb-0 fw-semibold text-primary">Contraloría General</h5>
            <small class="text-muted">República Dominicana</small>
          </div>
        </div>

        <!-- Texto o botón opcional -->
        <div class="d-none d-md-block">
          <button class="btn btn-outline-primary btn-sm px-3">
            Volver al Portal Institucional
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header-institucional {
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
</style>
