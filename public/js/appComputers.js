var app = new Vue({
    el: '#app',
// Creamos el data para los datos de nuestra aplicación
    data:{
        computers:[],
        newComputer:{},
        editMode: false
    },

    mounted: function(){

        // Se crea el mounted para que cargue la página directamente al acceder, 
        this.getComputers();
    },

    // Creamos todas las funciones necesarios para nuestra app, los metodos
methods:{

    // Creamos la función para obtener los viajes
    getComputers: function(){
        axios.get(
            '/computers'
        ).then(res => {
            this.computers = res.data;
        });
    },

    // Creamos método para añadir un ordenador
    addComputers: function(){
        axios.post(
            '/computers',
            this.newComputer
        ).then(res =>{
            console.log('Ordenador Añadido',res);
            this.newComputer={};
            this.getComputers();
        }).catch(e => {
            console.log("Error añadiendo", e);
        })

    },

    // Creamos el método para preparar el modo de edición
    editComputer: function(computer){
        this.editMode = true;
        this.newComputer = computer;       
    },

    // Método para editar tras prepararlo con el metodo editComputer
    editComputers: function(){
        axios.put(
            '/computers/' + this.newComputer._id,
            this.newComputer
        ).then(res =>{
            console.log('Ordenador Editado',res);
            this.newComputer={};
            this.editMode = false;
            this.getComputers();
            
        }).catch(e => {
            console.log("Error añadiendo", e);
        })
    },

    removeComputer: function(computer){
        axios.delete('/computers/' + computer._id)
        .then(res => {
            this.getComputers(); // Va a recargar los ordenadores
        })
        .catch(e => {
            console.log('Error actualizando', e);
        })
    }
        
}
    
});

