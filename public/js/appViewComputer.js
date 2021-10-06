var app = new Vue({
    el: '#app',
    // Creamos el data para los datos de nuestra aplicación
    data: {
        computer: {},
        id: "",
        newStatus: {}
    },

    mounted: function () {

        // Se crea el mounted para que cargue la página directamente al acceder, 

        const path = window.location.pathname;
        this.id = path.replace("/ordenadores/", "")

        this.getComputer(this.id);
    },

    // Creamos todas las funciones necesarios para nuestra app, los metodos
    methods: {

        // Creamos la función para obtener los viajes
        getComputer: function (id) {
            axios.get(
                '/computers/' + id
            ).then(res => {
                this.computer = res.data[0];
            });
        },

        addStatus: function () {
            if (this.newStatus.date == undefined || this.newStatus.status == undefined) {
                alert("Todos los campos deben estar rellenos antes de agregar un nuevo estado");
            } else {
                if (this.computer.hasOwnProperty("statuses")) {   // Tenemos que veruifcar si t¡ya tiene un estado con la propiedad statuses
                    this.computer.statuses.push({ date: this.newStatus.date, status: this.newStatus.status });
                } else {
                    this.computer.statuses = [{ date: this.newStatus.date, status: this.newStatus.status }];
                }

                this.updateComputer();
            }
        },


        updateComputer: function () {
            axios.put(
                '/computers/' + this.computer._id,
                this.computer
            ).then(res => {
                console.log('Ordenador Editado', res);
                this.newStatus = {};
                this.getComputer(this.id);

            }).catch(e => {
                console.log("Error añadiendo", e);
            })
        },

        deleteStatus: function(status){
            let index = this.computer.statuses.findIndex(s=>s.date==status.date && s.status == status.status); // Buscamos el indice del objeto en el array
            this.computer.statuses.splice(index,1); // Eliminamos 
            this.updateComputer();
        }




    }

});

