<template>
  <div class="consulta-container">
    <!-- 🟢 Toast de PrimeVue -->
    <Toast />

    <form @submit.prevent="consultarTramites">
      <div class="mb-3">
        <label for="nodocumento" class="form-label fw-semibold">Cédula o RNC</label>
        <div class="input-group">
          <input id="nodocumento" v-model="nodocumento" type="text" maxlength="11" class="form-control"
            placeholder="Ingrese su Cédula (11 dígitos) o RNC (9 dígitos)" @input="soloNumeros" />
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? "Consultando..." : "Consultar" }}
          </button>
        </div>
      </div>

      <!-- 🔴 Mensaje visual -->
      <div v-if="error" class="alert alert-danger py-2 mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script>
// import api from '@/utilities/api.js'

export default {
  name: "ConsultaForm",
  data() {
    return {
      nodocumento: "",
      error: "",
      loading: false
    };
  },
  mounted() {
    this.inicializarCaptcha()
  },
  methods: {
    inicializarCaptcha() {
      if (window.grecaptcha) {
        console.log("♻️ reCAPTCHA ya cargado, no se reinicia")
        return
      }

      const script = document.createElement("script")
      script.src = "https://www.google.com/recaptcha/api.js?render=6LeOdOQrAAAAAKCizrTwk0HE81fJhP9I3nymZC3w"
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      console.log("✅ reCAPTCHA cargado por primera vez")
    },

    soloNumeros() {
      this.nodocumento = this.nodocumento.replace(/[^0-9]/g, "")
    },

    async consultarTramites() {
      this.error = ""

      const len = this.nodocumento.length

      // ✅ Validación combinada (RNC o Cédula)
      if (len !== 9 && len !== 11) {
        this.error = "Debe ingresar un RNC (9 dígitos) o una Cédula (11 dígitos)."
        this.$toast.add({
          severity: "warn",
          summary: "Advertencia",
          detail: this.error,
          life: 4000,
        });
        return
      }

      const tipo = len === 9 ? "RNC" : "Cédula"

      // ⚠️ Validación adicional para cédula
      if (tipo === "Cédula") {
        try {
          const fallecidoResponse = await api.get(`/api/Consulta/VerificarFallecido?cedula=${this.nodocumento}`);

          if (fallecidoResponse.data?.fallecido === true) {
            this.$toast.add({
              severity: "warn",
              summary: "Aviso importante",
              detail: "El número de cédula ingresado figura como perteneciente a una persona fallecida según los registros oficiales. Si considera que esta información es incorrecta, por favor contacte a la institución correspondiente.",
              life: 7000,
            });
            this.error = "El número de cédula ingresado figura como perteneciente a una persona fallecida según los registros oficiales. Si considera que esta información es incorrecta, por favor contacte a la institución correspondiente."
            return
          }
        } catch (error) {
          console.error("⚠️ Error al verificar fallecimiento:", error);
          this.$toast.add({
            severity: "info",
            summary: "Aviso",
            detail: "No se pudo verificar el estado de la cédula en este momento. Puede intentar nuevamente más tarde.",
            life: 4000,
          });

          this.error = "No se pudo verificar el estado de la cédula en este momento. Puede intentar nuevamente más tarde."
          return
        }
      }

      this.loading = true

      try {
        const response_libramiento_pago = await api.get(`/api/Consulta/GetTramitesProveedor?nodocumento=${this.nodocumento}`)
        const response_contrato = await api.get(`/api/Consulta/GetTramitesProveedor?nodocumento=${this.nodocumento}`)

        this.$emit("validacion-correcta", response_libramiento_pago.data, response_contrato.data)

        this.$toast.add({
          severity: 'success',
          summary: 'Consulta exitosa',
          detail: `Trámites obtenidos correctamente (${tipo}).`,
          life: 3000
        })
      } catch (err) {
        console.error("❌ Error al consultar trámites:", err)
        this.error = "Ocurrió un error al consultar los trámites."
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: this.error,
          life: 4000
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.consulta-container {
  max-width: 600px;
  padding: 20px;
}
</style>
