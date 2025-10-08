<template>
    <section class="usuario">
        <h2>Datos del Usuario</h2>

        <!-- Texto -->
        <p><strong>Nombre:</strong>{{ nombre }}</p>

        <!-- numero -->
        <p><strong>Edad:</strong>{{ edad }} años</p>


        <button @click="enviarDatosActualizados">Enviar nombre y edad</button>
        <!-- Booleano -->
        <p><strong>Activos:</strong>{{ activo ? 'Si' : 'No' }}</p>

        <!-- Arreglo -->
        <p><strong>Tramites:</strong></p>
        <ul>
            <li v-for="(tramite, index) in tramites" :key="index">
                {{ tramite }}
            </li>
        </ul>

        <!-- Objeto -->
        <p><strong>Direccion:</strong>{{ direccion.calle }}, {{ direccion.ciudad }}</p>

        <!-- Botones para actualizar -->
        <div class="botones">
            <button @click="cambiarNombre">Cambiar nombre</button>
            <button @click="cumplirAnios">+1 año</button>
            <button @click="toggleActivo">Activar/Desactivar</button>
            <button @click="agregarTramite">Agregar Tramite</button>
            <button @click="eliminarTramite">Eliminar Tramite</button>
            <button @click="cambiarDireccion">Cambiar Direccion</button>
        </div>
    </section>
</template>


<script>
export default {
    name: 'DatosUsuarioComponent',
    data() {
        return {
            nombre: 'Carlos Lora',
            nombreNuevo: 'María Fernández',
            edadNueva: 35,
            edad: 28,
            activo: true,
            tramites: ['Pasaporte', 'Licencia de conducir'],
            direccion: {
                calle: 'Av. Central 123',
                ciudad: 'Madrid'
            }
        }
    },
    methods: {
        cambiarNombre() {
            this.nombre = 'Maria Magdalena'
        },
        enviarDatosActualizados() {

            // Emitimos ambos valores al padre (dos parámetros)
            this.$emit('usuario-actualizado', this.nombreNuevo, this.edadNueva)
        },
        cumplirAnios() {
            this.edad++
        },
        toggleActivo() {
            this.activo = !this.activo
        },
        agregarTramite() {
            this.tramites.push('Nuevo tramite ' + (this.tramites.length + 1))
        },
        eliminarTramite() {
            this.tramites.pop()
        },
        cambiarDireccion() {
            this.direccion = {
                calle: 'Calle Nueva 45',
                ciudad: 'Barcelona'
            }
        }
    }
}
</script>

<style scoped>
.usuario {
    padding: 20px;
    background: #fff;
    margin: 40px auto;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    color: #0056b3;
}

.botones {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

button {
    background-color: #0056b3;
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background-color: #003f80;
}
</style>