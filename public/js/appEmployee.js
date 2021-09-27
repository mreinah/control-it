var app = new Vue({
    el: '#app',

    data:{
        employees:[],
        newEmployee:{},
        editMode:false
    },

    mounted: function(){

        // Se crea el mounted para que cargue la página directamente al acceder, 
        this.getEmployees();
    },


methods:{

    // Creamos la función para obtener empleados
    getEmployees: function(){
        axios.get(
            '/employees'
        ).then(res => {
            this.employees = res.data;
        });
    },

    // Metodo patra añadir los datos de un empleado
    addEmployee: function(){
        axios.post(
            '/employees',
            this.newEmployee
        ).then(res =>{
            console.log('Empleado Añadido',res);
            this.newEmployee={};
            this.getEmployees();
        }).catch(e => {
            console.log("Error añadiendo", e);
        })

    },
    // Creamos el método para preparar el modo de edición
    editEmployee: function(employee){
        this.editMode = true;
        this.newEmployee = employee;       
    },

    // Método para editar tras prepararlo con el metodo editEmployee
    editEmployees: function(){
        axios.put(
            '/employees/' + this.newEmployee._id,
            this.newEmployee
        ).then(res =>{
            console.log('Empleado Editado',res);
            this.newEmployee={};
            this.editMode = false;
            this.getEmployees();
            
        }).catch(e => {
            console.log("Error añadiendo", e);
        })
    },

    removeEmployee: function(employee){
        axios.delete('/employees/' + employee._id)
        .then(res => {
            this.getEmployees(); // Va a recargar los Empleados
        })
        .catch(e => {
            console.log('Error actualizando', e);
        })
    }

}




});