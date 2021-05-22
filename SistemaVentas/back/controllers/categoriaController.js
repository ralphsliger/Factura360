var Categoria = require('../models/categoria');

function registrar(req, res){
    var data = req.body;
    var categoria = new Categoria();
    categoria.titulo = data.titulo;
    categoria.descripcion = data.descripcion;

    categoria.save((err, categoria_save)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        } else{
            if(categoria_save){
                res.status(200).send({categoria: categoria_save});
            } else {
                res.status(403).send({message: 'La categoria no se pudo registrar'});
            }
        }
    });
}

function obtener_categoria(req, res){
    var id = req.params['id'];
    console.log(id);
    Categoria.findById({_id: id},(err, categoriaData) =>{
        if(err){
            res.status(500).send({message: 'Algo ha fallado'});
        }else{
            if(categoriaData){
                res.status(200).send({categoria: categoriaData});
            } else {
                res.status(403).send({message: 'la categoria no se ha encontrado'});
            }
        }
    });
}

module.exports = {
    registrar,
    obtener_categoria,
}