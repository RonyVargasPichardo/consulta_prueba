<template>
  <div class="consulta-container">
    <!-- 🟢 Toast de PrimeVue -->
    <Toast />

    <form @submit.prevent="consultarTramites">
      <div class="mb-3">
        <label for="nodocumento" class="form-label fw-semibold">Cédula o RNC</label>
        <div class="input-group">
          <input
            id="nodocumento"
            v-model="nodocumento"
            type="text"
            maxlength="9"
            class="form-control"
            placeholder="Ingrese su RNC (9 dígitos)"
            @input="soloNumeros"
          />
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

      if (this.nodocumento.length !== 9) {
        this.error = "El documento debe contener exactamente 9 dígitos."
        this.$toast.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: this.error,
          life: 3000
        })
        return
      }

      this.loading = true

      try {
        const response = await api.get(`/api/Consulta/GetTramitesProveedor?nodocumento=${this.nodocumento}`)
        this.$emit("validacion-correcta", response.data)

        this.$toast.add({
          severity: 'success',
          summary: 'Consulta exitosa',
          detail: 'Trámites obtenidos correctamente.',
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
