//Importamos las librería necesarias para el proyecto
const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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
const employees = require('./routes/employees')
const employeeservice = require('./routes/employee-service');
const monitors = require('./routes/monitors')
const monitorservice = require('./routes/monitor-service');
const { use } = require('./routes/computers');

app.use('/computers', computers);
app.use('/employees', employees);
app.use('/monitors', monitors);


app.use('/', express.static('./public'));
app.use('/ordenadores', express.static(path.join(__dirname + '/public/crearComputer.html')));
app.use('/empleados', express.static(path.join(__dirname + '/public/crearEmpleado.html')));


// Creamos el servidor y lo ponemos a escuchar a la vez comprobamos que tenemos conexión con la BD
const server = http.createServer(app);

computerservice.connectDb((err) => {
    if (err) {
        console.log('Could not connect with MongoDB – computerService', err);
        process.exit(1);
    }

    employeeservice.connectDb((err) => {
        if (err) {
            console.log('Could not connect with MongoDB – employeeService', err);
            process.exit(1);
        }

        monitorservice.connectDb((err) => {
            if (err) {
                console.log('Could not connect with MongoDB – monitorService', err);
                process.exit(1);
            }



            server.listen(PORT, () => {
                console.log('Server up and running on localhost:' + PORT);
            });
        });
    });
});
