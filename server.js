const express= require('express');
const cors= require('cors');
const app= express();
const mongoose= require("mongoose");

const routes=require('./rutas');
const path=require("path");
const whitelist='http://3.88.114.158:3000';
const corsOptions = {
	origin: whitelist,
    optionsSuccessStatus: 200
};
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
var corsOptionsDelegate = function (req, callback) {
    const corsOptions = {
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    };
  
    const myIpAddress = req.connection.remoteAddress; // This is where you get the IP address from the request
    if (whitelist.indexOf(myIpAddress) !== -1) {
        corsOptions.origin = true
    } else {
        corsOptions.origin = false
    }
    callback(null, corsOptions);
}
//conexion a mongodb
mongoose.connect('mongodb+srv://sebastian1999:SG99201st@cluster0.1aem6ri.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("Conectadooo")) // utilizamos la varibale ambiente .env
.catch((error) => console.error(error));
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api',cors(corsOptionsDelegate),routes);
app.use("/api-doc",swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));



//rutas......


app.get('/',cors(corsOptions),(req, res)=>{
    res.send('bienvenido a mi API');
})


///...................


app.listen(app.get('port'), ()=>{
    console.log('server corriendo por el puerto ', app.get('port'));
})