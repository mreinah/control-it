//Importamos las librería necesarias para el proyecto
const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

// Configuramos la aplicación de express
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}))


// Creamos el servidor y lo ponemos a escuchar a la vez comprobamos que tenemos conexión con la BD
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log('Server up and running on localhost:' + PORT);
});


