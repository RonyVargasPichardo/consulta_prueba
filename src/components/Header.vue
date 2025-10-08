<template>
    <header class="header shadow-sm">
        <div class="container-fluid d-flex align-items-center justify-content-start flex-wrap py-3 px-4 header-content">

            <!-- Logo institucional -->
            <a href="https://www.contraloria.gob.do" target="_blank"
                class="text-decoration-none d-flex align-items-center">
                <!-- Logo versión escritorio -->
                <img src="/src/assets/LogoContraloriaWeb.png" alt="Logo Contraloría General de la República Dominicana"
                    class="logo logo-desktop" />

                <!-- Logo versión móvil -->
                <img src="/src/assets/LogoContraloriaMobile.png"
                    alt="Logo Contraloría General de la República Dominicana" class="logo logo-mobile" />
            </a>


            <!-- Título del sistema -->
            <h1 class="titulo-sistema mb-0 mr-5">
                Consulta de Trámites de Proveedores del Estado
            </h1>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
</script>

<style scoped>
.header {
    background-color: #FAFAFA;
    border-bottom: 1px solid #E0E0E0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    padding-left: 3rem;
}

.header-content {
    gap: 40px;
    
}


/* Logo base */
.logo {
    height: 90px;
    display: block;
    object-fit: contain;
}

/* Versión escritorio */
.logo-desktop {
    max-width: 220px;
}

/* Versión móvil (oculta por defecto) */
.logo-mobile {
    display: none;
    height: auto;
    max-width: 160px;
}

.titulo-sistema {
    font-size: 1.27rem;
    /* ~22px */
    font-weight: 600;
    color: #002E6D;
    font-family: "Segoe UI", Arial, sans-serif;
    line-height: 1.2;
    padding-top: 2rem;
    letter-spacing: 0.5px;
}

/* Responsivo */
@media (max-width: 768px) {

    .header {
        padding-left: 0;
    }

    .header-content {
        flex-direction: column;
        text-align: center;
        gap: 0;
    }

    /* Mostrar logo móvil y ocultar desktop */
    .logo-desktop {
        display: none;
    }

    .logo-mobile {
        display: block;
    }

    .titulo-sistema {
        font-size: 1.1rem;
    }

    .titulo-sistema {
    padding-top: 0.5rem;
  }
}
</style>
