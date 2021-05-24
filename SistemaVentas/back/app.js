var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = express();



// Routes
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');
var cliente_routes = require('./routes/cliente');
var venta_routes = require('./routes/venta');


// Conexion bd


var uri = 'mongodb+srv://sAdmin:fTGaAuVO5qmPLlrd@f360-cluster.jljrw.mongodb.net/DatabaseF360?retryWrites=true&w=majority'


mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser: true}, (error,res)=>{
    if(error){
        throw error;
    } else{
        console.log("Servidor encendido");
        app.listen(port, function(){
            console.log("Servidor conectado en : "+ port )
        });
    }
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//cors
app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);
app.use('/api', cliente_routes);
app.use('/api', venta_routes);

module.exports = app;

