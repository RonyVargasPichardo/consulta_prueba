<template>
  <section class="pagina-consulta">
    <div class="container d-flex justify-content-center">
      <div class="card-consulta shadow-sm">

        <!-- 🔹 Título dinámico -->
        <h2 class="titulo-principal">
          {{ resultados ? 'Resultados de la Consulta' : 'Consulta de Trámites' }}
        </h2>

        <!-- 🔹 Mensaje institucional (solo si no hay resultados) -->
        <transition name="fade" mode="out-in">
          <div v-if="!resultados" key="mensaje"
            class="alert alert-info alert-dismissible fade show mensaje-alerta d-flex align-items-start" role="alert">
            <div class="icono-info me-2">
              ℹ️
            </div>
            <div>
              Bienvenido(a). Este sistema le permite consultar el estado de sus
              trámites de manera rápida y segura. Ingrese su información para
              continuar con la verificación.
            </div>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </transition>

        <!-- 🔹 CONTENIDO PRINCIPAL -->
        <transition name="fade" mode="out-in">
          <!-- FORMULARIO -->
          <ConsultaForm v-if="!resultados" key="formulario"
            @validacion-correcta="clasificarTramitesLibramientoPagoContrato" />

          <!-- RESULTADOS -->
          <div v-else key="resultados" class="seccion-resultados">

            <!-- LIBRAMIENTOS -->
            <div v-if="libramientos.length" class="bloque">
              <h5 class="seccion-titulo">Libramientos</h5>
              <div v-for="(item, i) in libramientos" :key="'l-' + i" class="card card-item">
                <strong>{{ item.certificacion || '—' }}</strong><br>
                <div><strong>Institución:</strong> {{ item.Institucion || item.Institución || 'No especificada' }}</div>
                <div><strong>Beneficiario:</strong> {{ item.beneficiario || '—' }}</div>
                <div><strong>Documento:</strong> {{ item.Documento || item.documento || '—' }}</div>
                <div><strong>Monto:</strong> {{ formatoMoneda(item.monto || 0) }}</div>
                <div><strong>Fecha Registro:</strong> {{ formatoFecha(item.fecha_registro || item.Fecha_Registro) }}
                </div>
              </div>
            </div>


            <!-- PAGOS DIRECTOS -->
            <div v-if="pagosDirectos.length" class="bloque">
              <h5 class="seccion-titulo">Pagos Directos</h5>
              <div v-for="(item, i) in pagosDirectos" :key="'p-' + i" class="card card-item">
                <strong>{{ item.Código }}</strong> — {{ item.Institución }} <br>
                <small>Monto: {{ formatoMoneda(item.Monto) }}</small>
              </div>
            </div>

            <!-- CONTRATOS -->
            <div v-if="contratos.length" class="bloque">
              <h5 class="seccion-titulo">Contratos</h5>
              <div v-for="(item, i) in contratos" :key="'c-' + i" class="card card-item">
                <strong>{{ item.Código }}</strong> — {{ item.Institución }} <br>
                <small>Monto: {{ formatoMoneda(item.Monto) }}</small>
              </div>
            </div>

            <!-- SIN RESULTADOS -->
            <div v-if="!contratos.length && !libramientos.length && !pagosDirectos.length"
              class="alert alert-warning mt-3">
              No se encontraron resultados para este RNC.
            </div>

            <!-- BOTÓN NUEVA CONSULTA -->
            <div class="text-center mt-4">
              <button class="btn btn-outline-primary" @click="nuevaConsulta">
                Nueva consulta
              </button>
            </div>

          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import ConsultaForm from './ConsultaForm.vue'

export default {
  name: 'ConsultaInicio',
  components: { ConsultaForm },
  data() {
    return {
      resultados: false, // para mostrar u ocultar
      libramientos: [],
      pagosDirectos: [],
      contratos: []
    }
  },
  methods: {
    // 🔹 Clasificar según "Sistema"
    clasificarTramitesLibramientoPagoContrato(libramiento_pago, contrato) {
      console.log('✅ Datos recibidos del formulario:', libramiento_pago, contrato)

      // Reiniciamos las listas
      this.libramientos = []
      this.pagosDirectos = []
      this.contratos = []

      // Aseguramos que trabajamos con un array
      const tramites_libramiento_pago = Array.isArray(libramiento_pago) ? libramiento_pago : [libramiento_pago]
      const tramites_contrato = Array.isArray(contrato) ? contrato : [contrato]

      tramites_libramiento_pago.forEach(tramite => {
        // algunos campos pueden venir en minúsculas o con espacios
        const sistema = (tramite.Sistema || tramite.sistema || '').trim().toLowerCase()

        if (sistema.includes('libramiento')) {
          this.libramientos.push(tramite)
        } else if (sistema.includes('pago')) {
          this.pagosDirectos.push(tramite)
        } else {
          console.warn('⚠️ Sistema desconocido:', sistema, tramite)
        }
      })

      tramites_contrato.forEach(tramite => {
        this.contratos.push(tramite)
      })

      // Activamos la vista de resultados
      this.resultados = true

      console.log('📘 Libramientos:', this.libramientos)
      console.log('📗 Pagos directos:', this.pagosDirectos)
      console.log('📙 Contratos:', this.contratos)
    },
    formatoFecha(fecha) {
      if (!fecha) return '—'
      return new Date(fecha).toLocaleDateString('es-DO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    },
    formatoMoneda(valor) {
      if (!valor) return 'RD$ 0.00'
      return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP'
      }).format(valor)
    },
    nuevaConsulta() {
      this.resultados = false
      this.libramientos = []
      this.pagosDirectos = []
      this.contratos = []

      setTimeout(() => {
        window.location.reload();
      }, 300);
    },


  }
}
</script>

<style scoped>
/* ====== ESTRUCTURA GENERAL ====== */
.pagina-consulta {
  background-color: #f7f8fa;
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: flex-start;
  padding-top: 40px;

  padding-bottom: 40px;
}

.card-consulta {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  border: 1px solid #E0E0E0;
}

/* ====== TÍTULO ====== */
.titulo-principal {
  font-size: 1.3rem;
  font-weight: 700;
  color: #002e6d;
  font-family: "Segoe UI", Arial, sans-serif;
  margin-bottom: 1rem;
}

/* ====== ALERTA ====== */
.mensaje-alerta {
  font-size: 1rem;
  color: #002e6d;
  border: 1px solid #b6dcff;
  border-radius: 10px;
  background-color: #e9f4ff;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.icono-info {
  color: #002e6d;
  flex-shrink: 0;
}

/* ====== RESULTADOS ====== */
.seccion-resultados {
  margin-top: 1rem;
}

.bloque {
  margin-bottom: 1.5rem;
}

.seccion-titulo {
  font-size: 1.2rem;
  font-weight: 600;
  color: #002e6d;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.card-item {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
}

/* ====== TRANSICIONES ====== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ====== RESPONSIVO ====== */
@media (max-width: 768px) {
  .card-consulta {
    padding: 1.5rem;
    margin: 0 1rem;
  }

  .titulo-principal {
    font-size: 1.1rem;
    text-align: center;
  }

  .mensaje-alerta {
    font-size: 0.85rem;
    text-align: justify;
  }
}
</style>
