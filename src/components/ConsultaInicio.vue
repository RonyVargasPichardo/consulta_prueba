<template>
  <section class="inicio-consulta container py-5">
    <!-- 💫 Transición tipo canvas -->
    <transition name="canvas-slide" mode="out-in">
      <!-- 🔹 Vista inicial -->
      <div v-if="!mostrarResultado" key="inicio">
        <div class="row align-items-center justify-content-center g-5">
          <!-- 🔹 Columna izquierda: mensaje institucional -->
          <div class="col-12 col-lg-6 d-flex flex-column justify-content-center">
            <div class="info-text pe-lg-4">
              <h4 class="fw-semibold titulo-info mb-3">
                Consulta y Validación de Proveedores del Estado
              </h4>

              <p class="text-muted mb-4">
                Acceda al sistema oficial de la Contraloría General de la República para validar
                trámites de <strong>Contratos</strong>, <strong>Libramientos</strong> y
                <strong>Pagos Directos</strong> de forma rápida, segura y disponible las 24 horas.
              </p>

              <ul class="list-unstyled text-muted small mb-4">
                <li class="mb-2">
                  <i class="pi pi-check-circle text-primary me-2"></i>
                  Información verificada en registros institucionales.
                </li>
                <li class="mb-2">
                  <i class="pi pi-check-circle text-primary me-2"></i>
                  Resultados claros y actualizados en tiempo real.
                </li>
              </ul>

              <!-- 🔸 Botón institucional -->
              <a
                href="https://www.contraloria.gob.do"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline-primary btn-sm boton-portal"
              >
                <i class="pi pi-globe me-2"></i>
                Volver al Portal Web de la Contraloría
              </a>
            </div>
          </div>

          <!-- 🔹 Columna derecha: formulario -->
          <div class="col-12 col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <div class="text-center mb-4">
                <img
                  src="../assets/LogoContraloriaMobile.png"
                  alt="Logo institucional"
                  class="logo-mini mb-3"
                />
                <h5 class="fw-semibold titulo-consulta mb-1">
                  Consulta de Trámites
                </h5>
                <p class="text-muted small mb-0">
                  Ingrese su número de documento para verificar el estatus.
                </p>
              </div>

              <!-- 🧾 Formulario -->
              <form @submit.prevent="consultarTramites" class="text-start">
                <div class="mb-3">
                  <label for="rnc" class="form-label fw-semibold">Número de Documento</label>
                  <input
                    id="rnc"
                    v-model="rnc"
                    type="text"
                    maxlength="11"
                    class="form-control form-control-lg rounded-3"
                    placeholder="Digite su RNC o Cédula"
                    @input="soloNumeros"
                    required
                  />
                </div>

                <div class="d-grid mt-4 mb-3">
                  <button
                    type="submit"
                    class="btn btn-primary btn-thin"
                    :disabled="loading"
                  >
                    <i class="pi pi-search me-2"></i>
                    {{ loading ? "Consultando..." : "Validar Documento" }}
                  </button>
                </div>
              </form>

              <!-- 🔹 Línea y candado -->
              <div class="seguridad text-center pt-3 mt-3 border-top">
                <i class="pi pi-lock text-primary me-2"></i>
                <small class="text-muted">
                  Su consulta es confidencial y está protegida por protocolos de seguridad institucional.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔹 Vista de resultado (simulada) -->
      <div v-else key="resultado" class="resultado-container text-center p-5">
        <h3 class="fw-semibold text-primary mb-3">Resultado de la Consulta</h3>
        <p class="text-muted mb-4">
          Documento verificado exitosamente. No se encontraron incidencias registradas en los sistemas de Contraloría.
        </p>
        <button class="btn btn-outline-primary btn-sm" @click="volver">
          <i class="pi pi-arrow-left me-2"></i> Volver al Inicio
        </button>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "ConsultaInicio",
  data() {
    return {
      rnc: "",
      loading: false,
      error: null,
      mostrarResultado: false, // 👈 para alternar las vistas
    };
  },
  methods: {
    soloNumeros(e) {
      this.rnc = e.target.value.replace(/[^0-9]/g, "");
    },
    async consultarTramites() {
      if (!this.rnc) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.mostrarResultado = true; // 👈 activa la vista del resultado
      }, 1000);
    },
    volver() {
      this.mostrarResultado = false; // 👈 regresa a la vista inicial
    },
  },
};
</script>

<style scoped>
.inicio-consulta {
  font-family: "Open Sans", sans-serif;
}

/* 💫 Animación tipo “canvas-slide” */
.canvas-slide-enter-active,
.canvas-slide-leave-active {
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.canvas-slide-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.98);
}

.canvas-slide-leave-to {
  opacity: 0;
  transform: translateX(-60px) scale(0.98);
}

/* 🔹 Bloque institucional izquierdo */
.info-text {
  color: #444;
}

.titulo-info {
  color: #1a4fa3;
  font-size: 1.4rem;
  font-weight: 600;
}

.info-text p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
}

/* 🔹 Botón del portal */
.boton-portal {
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 0.4rem;
  padding: 0.45rem 0.9rem;
  transition: all 0.3s ease;
}

.boton-portal:hover {
  background-color: #0d47a1;
  color: #fff;
  border-color: #0d47a1;
}

/* 🔹 Logo pequeño */
.logo-mini {
  height: 150px;
  width: auto;
  opacity: 0.95;
}

/* 🔹 Card */
.card {
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
}

/* 🔹 Botón principal */
.btn-thin {
  background-color: #0d47a1;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-thin:hover {
  background-color: #093678;
  transform: translateY(-1px);
}

/* 🔹 Input */
.form-control {
  border-radius: 0.6rem;
  padding: 0.75rem 1rem;
  background-color: #0936780a;
  border: 1px solid #ced4da;
  font-size: 0.8rem;
}

.form-control:focus {
  border-color: #1565c0;
  box-shadow: 0 0 0 0.2rem rgba(21, 101, 192, 0.15);
}

/* 🔹 Resultado simulado */
.resultado-container {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
