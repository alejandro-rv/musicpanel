// Importar configuraciones
const conf = require("./conf")

// Importar bibliotecas
const Sequelize = require("sequelize")
const db = new Sequelize(conf.sequelize.connUrl)

const fastify = require("fastify")({ logger: true })
const multer = require("fastify-multer")
const cors = require("fastify-cors")

// Importar rutas
const routes = require("./routes")

// Declarar funciones
async function serve() {
  try {
    // Comprobar que la conexión con MariaDB es correcta
    await db.authenticate()

    // Registrar los módulos del servidor: subida de ficheros y cabeceras CORS
    fastify.register(multer.contentParser)
    fastify.register(cors)

    // Registrar las rutas
    for (let i = 0; i < routes.length; i++) {
      fastify.route(routes[i])
    }

    // Lanzar el servicio HTTP en el puerto 3000, para todas las interfaces
    await fastify.listen(3000, "0.0.0.0")
  } catch (error) {
    fastify.log.error(error)
  }
}

// Código principal
serve()
