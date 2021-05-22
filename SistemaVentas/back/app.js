var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = express();

// Routes
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');

// Conexion bd
mongoose.connect('mongodb+srv://sAdmin:fTGaAuVO5qmPLlrd@f360-cluster.jljrw.mongodb.net/DatabaseF360?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true}, (error,res)=>{
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

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);

module.exports = app;

