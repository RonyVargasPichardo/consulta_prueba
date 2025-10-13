<template>
  <section class="pagina-consulta">
    <div class="container d-flex justify-content-center">
      <div class="card-consulta shadow-sm">

        <!-- 🔹 Título dinámico -->
        <h2 v-if="!resultados" class="titulo-principal">
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
            <!-- <div v-if="libramientos.length" class="bloque">
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
            </div> -->


            <!-- PAGOS DIRECTOS -->
            <!-- <div v-if="pagosDirectos.length" class="bloque">
              <h5 class="seccion-titulo">Pagos Directos</h5>
              <div v-for="(item, i) in pagosDirectos" :key="'p-' + i" class="card card-item">
                <strong>{{ item.Código }}</strong> — {{ item.Institución }} <br>
                <small>Monto: {{ formatoMoneda(item.Monto) }}</small>
              </div>
            </div> -->

            <!-- CONTRATOS -->
            <!-- <div v-if="contratos.length" class="bloque">
              <h5 class="seccion-titulo">Contratos</h5>
              <div v-for="(item, i) in contratos" :key="'c-' + i" class="card card-item">
                <strong>{{ item.Código }}</strong> — {{ item.Institución }} <br>
                <small>Monto: {{ formatoMoneda(item.Monto) }}</small>
              </div>
            </div> -->


            <!-- 🔹 Datos generales del proveedor -->
            <div v-if="beneficiarioGeneral" class="resumen-general card shadow-sm p-3 mb-4">
              <h5 class="titulo-principal">Resultados de la Consulta</h5>

              <div class="resumen-datos d-flex flex-wrap justify-content-start align-items-center">
                <p class="mb-1"><strong>Beneficiario:</strong> {{ beneficiarioGeneral }}</p>
                <p class="mb-1"><strong>No. Documento:</strong> {{ documentoGeneral }}</p>
              </div>
            </div>

            <Accordion multiple>
              <AccordionTab header="Libramientos" v-if="libramientos.length">
                <div v-for="(item, i) in libramientos" :key="'l-' + i" class="card card-item shadow-sm"
                  :ref="'libramiento-' + i">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <strong>{{ item.name || '—' }}</strong>
                    <button class="btn btn-outline-primary btn-sm" @click="descargarPDF(item, 'Libramiento')">
                      <i class="pi pi-download me-1"></i> Descargar PDF
                    </button>
                  </div>

                  <div class="card-body">
                    <div class="dato-item">
                      <span class="label">Institución:</span>
                      <span class="valor">{{ item.username || '—' }}</span>
                    </div>
                    <div class="dato-item">
                      <span class="label">Beneficiario:</span>
                      <span class="valor">{{ item.address?.street || '—' }}</span>
                    </div>
                    <div class="dato-item">
                      <span class="label">Documento:</span>
                      <span class="valor">{{ item.address?.suite || '—' }}</span>
                    </div>
                    <div class="dato-item">
                      <span class="label">Ciudad:</span>
                      <span class="valor">{{ item.address?.city || '—' }}</span>
                    </div>
                  </div>
                </div>
              </AccordionTab>



              <AccordionTab header="Pagos Directos" v-if="pagosDirectos.length">
                <div v-for="(item, i) in pagosDirectos" :key="'p-' + i" class="card card-item">
                  <strong>{{ item.Código }}</strong> — {{ item.Institución }} <br>
                  <small>Monto: {{ formatoMoneda(item.Monto) }}</small>
                </div>
              </AccordionTab>

              <AccordionTab header="Contratos" v-if="contratos.length">
                <div v-for="(item, i) in contratos" :key="'c-' + i" class="card card-item">
                  <strong>{{ item.Código }}</strong> — {{ item.Institución }} <br>
                  <small>Monto: {{ formatoMoneda(item.Monto) }}</small>
                </div>
              </AccordionTab>
            </Accordion>


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
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import html2pdf from "html2pdf.js"

export default {
  name: 'ConsultaInicio',
  components: { ConsultaForm, Accordion, AccordionTab },
  data() {
    return {
      resultados: false, // para mostrar u ocultar
      libramientos: [],
      pagosDirectos: [],
      contratos: [],
      beneficiarioGeneral: "",
      documentoGeneral: ""
    }
  },
  methods: {
    async descargarPDF(item, tipo = "Libramiento") {
      // 🏛️ Logo institucional (ajusta la ruta si tu componente está en otra carpeta)
      const logo = new URL('../assets/LogoContraloriaMobile.png', import.meta.url).href

      // 🧩 Contenido HTML del PDF
      const contenido = `
        <div style="font-family: Arial, sans-serif; padding: 20px 40px; color: #222;">
          <!-- 🔷 Franja institucional superior -->
          <div style="background-color:#002e6d; height:2px; border-radius:3px; margin-bottom:15px;"></div>

          <!-- 🏛️ Encabezado -->
          <div style="text-align:center; margin-bottom:25px;">
            <img src="${logo}" width="240" alt="Logo Contraloría"/>
            <h2 style="color:#002e6d; margin:10px 0;">Contraloría General de la República Dominicana</h2>
            <h3 style="color:#444; font-size:1.1rem; margin:0;">Consulta de Trámites de Proveedores del Estado</h3>
          </div>

          <!-- 📘 Datos del trámite -->
          <div style="border:1px solid #d0d7e2; border-radius:8px; padding:20px; background:#fafafa;">
            <h5 style="color:#002e6d; margin-top:0;">${tipo}</h5>
            <p><strong>Nombre:</strong> ${item.name || '—'}</p>
            <p><strong>Institución:</strong> ${item.username || '—'}</p>
            <p><strong>Beneficiario:</strong> ${item.address?.street || '—'}</p>
            <p><strong>Documento:</strong> ${item.address?.suite || '—'}</p>
            <p><strong>Ciudad:</strong> ${item.address?.city || '—'}</p>
          </div>

          <!-- 🔹 Pie de página institucional -->
          <div style="margin-top:40px; text-align:center; font-size:0.85rem; color:#555;">
            <hr style="margin-bottom:10px; border:none; border-top:1px solid #ccc;">
            <p>Generado automáticamente por el sistema de <strong>Consulta de Trámites de Proveedores del Estado</strong></p>
            <p>Contraloría General de la República Dominicana</p>
            <p style="font-style:italic; color:#777;">${new Date().toLocaleDateString('es-DO', {
        year: 'numeric', month: 'long', day: 'numeric'
      })}</p>
          </div>
        </div>
      `

      // ⚙️ Configuración del PDF
      const opciones = {
        margin: 10,
        filename: `${tipo}_${item.name || 'documento'}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      }

      // 📄 Generar y descargar PDF
      await html2pdf().from(contenido).set(opciones).save()
    },
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


      // 🧾 Si hay datos, tomamos los generales del primer elemento
      const primerTramite = tramites_libramiento_pago[0] || tramites_contrato[0] || null
      if (primerTramite) {
        this.beneficiarioGeneral = primerTramite.beneficiario || primerTramite.Beneficiario || primerTramite.name || "—"
        this.documentoGeneral = primerTramite.Documento || primerTramite.documento || "40237523669"
      }

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

      tramites_libramiento_pago.forEach(tramite => {
        this.libramientos.push(tramite)
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

.resumen-general {
  background-color: #f8fbff;
  border: 1px solid #cfe2ff;
  border-radius: 10px;
}

.resumen-general h5 {
  color: #002e6d;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.resumen-datos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.resumen-datos p {
  font-size: 0.95rem;
  color: #333;
  margin: 0;
}

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
  background-color: #ffffff;
  border: 1px solid #d9e1ec;
  border-left: 5px solid #002e6d;
  /* Azul institucional */
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: box-shadow 0.2s ease, transform 0.1s ease;
}

.card-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  background-color: #f5f7fb;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e6ef;
  font-size: 1rem;
  font-weight: 600;
  color: #002e6d;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-body {
  padding: 0.75rem 1rem;
  font-size: 0.92rem;
  color: #333;
  line-height: 1.6;
}

.dato-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.4rem;
}

.label {
  color: #002e6d;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.valor {
  color: #333;
  text-align: left;
  font-weight: 400;
}


.badge {
  font-size: 0.75rem;
  padding: 0.35rem 0.55rem;
  border-radius: 6px;
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
   .resumen-datos {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
