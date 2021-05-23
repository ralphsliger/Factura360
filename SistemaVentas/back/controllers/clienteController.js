var Cliente = require('../models/cliente');



function registrar(req, res){
var data = req.body;
var cliente = new Cliente();

cliente.nombres = data.nombres;
cliente.correo = data.correo;
cliente.cedula = data.cedula;
cliente.puntos = 10;

cliente.save((err, cliente_save)=>{
    if(cliente_save){
        res.status(200).send({cliente: cliente_save});
    }else{
        res.status(500).send(err);
    }
});


}

function editar(req,res){
let id = req.params['id'];
let data = req.body;

Cliente.findOneAndUpdate(id, {nombres: data.nombres, correo: data.correo} , (err, cliente_editar)=>{
     if(cliente_editar){
        res.status(200).send({cliente: cliente_editar});
     }else{
        res.status(500).send(err);
     }
})


}

function eliminar(req, res){
    var id = req.params['id'];
    Cliente.findByIdAndRemove(id,(err, cliente_delete)=>{
        if(cliente_delete){
            res.status(200).send({cliente: cliente_delete});
        }else{
            res.status(500).send(err);
        }
    });
}

module.exports= {
registrar,
editar, 
eliminar,
}