var app = new Vue({
    el: '#app',
// Creamos el data para los datos de nuestra aplicación
    data:{      
        newMonitor:{},
        monitors:[],
        editMode: false
    },

    mounted: function(){

        // Se crea el mounted para que cargue la página directamente al acceder, 
        this.getMonitors();
    },

    // Creamos todas las funciones necesarios para nuestra app, los metodos
methods:{

    // Creamos la función para obtener los viajes
    getMonitors: function(){
        axios.get(
            '/monitors'
        ).then(res => {
            this.monitors = res.data;
        });
    },

    // Creamos método para añadir un ordenador
    addMonitors: function(){
        axios.post(
            '/monitors',
            this.newMonitor
        ).then(res =>{
            console.log('Monitor Añadido',res);
            this.newMonitor={};
            this.getMonitors();
        }).catch(e => {
            console.log("Error añadiendo", e);
        })

    },

    // Creamos el método para preparar el modo de edición
    editMonitor: function(monitor){
        this.editMode = true;
        this.newMonitor = monitor;       
    },

    // Método para editar tras prepararlo con el metodo editComputer
    editMonitors: function(){
        axios.put(
            '/monitors/' + this.newMonitor._id,
            this.newMonitor
        ).then(res =>{
            console.log('Monitor Editado',res);
            this.newMonitor={};
            this.editMode = false;
            this.getMonitors();
            
        }).catch(e => {
            console.log("Error añadiendo", e);
        })
    },

    removeMonitor: function(monitor){
        axios.delete('/monitors/' + monitor._id)
        .then(res => {
            this.getMonitors(); // Va a recargar los monitores
        })
        .catch(e => {
            console.log('Error actualizando', e);
        })
    }
        
}

});