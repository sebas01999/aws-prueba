const mongoose =require ("mongoose");
const estudianteesquema= mongoose.Schema({
    nombre:{
        type:String,
        require:true   
    },

    carrera:{
        type:String,
        require:true
    },
    semestre:{
        type:Number,
        require:true
    },
    cedula:{
        type:Number,
        require:true
    }
})

module.exports= mongoose.model('estudiante',estudianteesquema)