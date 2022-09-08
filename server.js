const express= require('express');
const cors= require('cors');
const app= express();
const mongoose= require("mongoose");

const routes=require('./rutas');
const path=require("path");
const whitelist='http://3.88.114.158:3000';
const whitelistIP='3.88.114.158:3000';
//swagger
const swaggerUI=require("swagger-ui-express");
const swaggerJsDoc=require("swagger-jsdoc");
const swaggerSpec={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "API con MongoDB",
            version: "1.0.0"
        },
        servers:[
            {
                url:"http://52.73.32.215:3000"
            },
        ],
    },
    apis:[`${path.join(__dirname, "./rutas.js")}`]
};

app.set('port', process.env.PORT || 3000);
const corsOptionsDelegate = function (req, callback) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    let corsOptions;
    
    if (whitelist.indexOf(req.header('Origin')) !== -1 || whitelistIP.indexOf(ip) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
//conexion a mongodb
mongoose.connect('mongodb+srv://sebastian1999:SG99201st@cluster0.1aem6ri.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("Conectadooo")) // utilizamos la varibale ambiente .env
.catch((error) => console.error(error));
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use('/api',routes);
app.use("/api-doc",swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));



//rutas......


app.get('/',(req, res)=>{
    res.send('bienvenido a mi API');
})


///...................


app.listen(app.get('port'), ()=>{
    console.log('server corriendo por el puerto ', app.get('port'));
})