<template>
  <section class="pagina-consulta">
    <div class="container d-flex justify-content-center">
      <div class="card-consulta shadow-sm">
        <!-- Título principal -->
        <h2 class="titulo-principal">Consulta de Trámites</h2>

        <!-- Mensaje de bienvenida con alerta -->
        <div
          class="alert alert-info alert-dismissible fade show mensaje-alerta d-flex align-items-start"
          role="alert"
        >
          <!-- Ícono informativo -->
          <div class="icono-info me-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path 
                d="m9.99 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 .875-.252 1.02-.598l.088-.416c.066-.306.12-.518.287-.518.168 0 .168.212.168.306 0 .214-.08.52-.166.852l-.03.14c-.094.436-.224.979-.424 1.31-.273.456-.746.69-1.372.69-.986 0-1.469-.547-1.249-1.533l.738-3.467c.194-.897-.105-1.319-.808-1.319-.545 0-.875.252-1.02.598l-.088.416c-.066.306-.12.518-.287.518-.168 0-.168-.212-.168-.306 0-.214.08-.52.166-.852l.03-.14c.094-.436.224-.979.424-1.31.273-.456.746-.69 1.372-.69.986 0 1.469.547 1.249 1.533l-.738 3.467c-.194.897.105 1.319.808 1.319.545 0 .875-.252 1.02-.598l.088-.416c.066-.306.12-.518.287-.518.168 0 .168.212.168.306 0 .214-.08.52-.166.852l-.03.14c-.094.436-.224.979-.424 1.31-.273.456-.746.69-1.372.69-.986 0-1.469-.547-1.249-1.533l.738-3.467c.194-.897-.105-1.319-.808-1.319-.545 0-.875.252-1.02.598l-.088.416c-.066.306-.12.518-.287.518-.168 0-.168-.212-.168-.306 0-.214.08-.52.166-.852l.03-.14c.094-.436.224-.979.424-1.31.273-.456.746-.69 1.372-.69.986 0 1.469.547 1.249 1.533l-.738 3.467c-.194.897.105 1.319.808 1.319.545 0 .875-.252 1.02-.598l.088-.416c.066-.306.12-.518.287-.518.168 0 .168.212.168.306 0 .214-.08.52-.166.852l-.03.14c-.094.436-.224.979-.424 1.31-.273.456-.746.69-1.372.69-.986 0-1.469-.547-1.249-1.533l.738-3.467c.194-.897-.105-1.319-.808-1.319-.545 0-.875.252-1.02.598l-.088.416c-.066.306-.12.518-.287.518-.168 0-.168-.212-.168-.306 0-.214.08-.52.166-.852l.03-.14c.094-.436.224-.979.424-1.31.273-.456.746-.69 1.372-.69z"
              />
              <circle cx="8" cy="4" r="1.2" />
            </svg>
          </div>

          <!-- Texto del mensaje -->
          <div>
            Bienvenido(a). Este sistema le permite consultar el estado de sus
            trámites de manera rápida y segura. Ingrese su información para
            continuar con la verificación.
          </div>

          <!-- Botón de cierre -->
          <button
            type="button"
            class="btn-close ms-auto"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>

        <!-- Zona donde luego irá el formulario -->
        <div class="contenido-placeholder">
          <p class="text-muted">[ Aquí se mostrará el formulario de consulta ]</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ConsultaTramites",
};
</script>

<style scoped>
/* Fondo de la página */
.pagina-consulta {
  background-color: #f7f8fa; /* gris claro institucional */
  min-height: calc(100vh - 160px); /* espacio entre header y footer */
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
}

/* Contenedor principal */
.card-consulta {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  border: 1px solid #E0E0E0;
}

/* Título */
.titulo-principal {
  font-size: 1.8rem;
  font-weight: 700;
  color: #002e6d;
  font-family: "Segoe UI", Arial, sans-serif;
  margin-bottom: 1rem;
}


/* Alerta personalizada */
.mensaje-alerta {
  font-size: 1rem;
  font-family: "Segoe UI", Arial, sans-serif;
  color: #002e6d;
  border: 1px solid #b6dcff;
  border-radius: 10px;
  line-height: 1.5;
}

/* Ícono */
.icono-info {
  color: #002e6d;
  flex-shrink: 0;
}



/* Placeholder del contenido */
.contenido-placeholder {
  border: 2px dashed #e0e0e0;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .card-consulta {
    padding: 1.5rem;
    margin: 0 1rem;
  }

  .titulo-principal {
    font-size: 1.5rem;
    text-align: center;
  }

     .mensaje-alerta {
    font-size: 0.95rem;
    text-align: justify;
  }

  .btn-close {
   
    align-self: center;
  }
}
</style>
