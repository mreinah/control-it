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

// Creamos los enrutadores para utilizarlo en nuestra API
const computers = require('./routes/computers')
const computerservice = require('./routes/computer-service');


app.use('/computers', computers);

// Creamos el servidor y lo ponemos a escuchar a la vez comprobamos que tenemos conexión con la BD
const server = http.createServer(app);

computerservice.connectDb((err) => {
    if (err) {
        console.log('Could not connect with MongoDB – computerService', err);
        process.exit(1);
    }

    



        server.listen(PORT, () => {
            console.log('Server up and running on localhost:' + PORT);
        });


});
