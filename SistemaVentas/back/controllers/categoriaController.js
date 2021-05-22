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

function obtener(req, res){
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


function editar(req, res){
    var id = req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({_id: id}, {titulo: data.titulo, descripcion: data.descripcion}, (err, categoria_edit)=>{
        if(err){
            res.status(500).send({message: "error en el servidor"});
        }else{
            if(categoria_edit){
                res.status(200).send({categoria: categoria_edit});
            }else{
                res.status(403).send({message: "la categoria no se puedo actualizar"});
            }
        }
    });

}


function  eliminar(req, res){
    var id = req.params['id'];
    Categoria.findByIdAndDelete({_id:id},(err, categoria_delete)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidr'});
        }else{
            if(categoria_delete){
                res.status(200).send({categoria: categoria_delete});
            }else{
                res.status(403).send({message: 'No se pudo eliminar el registro'});
            }
        }
    });
}


function listar(req, res){
    var titulo = req.params['titulo'];

    Categoria.find({titulo: new RegExp(titulo, 'i')}, (err, categoria_lista) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(categoria_lista){
       res.status(200).send({categorias: categoria_lista});
        } else{
            res.status(403).send({message: "no se encuentran categorias con la descripcion suministrada"});
        } 
    }
    });
}

module.exports = {
    registrar,
    obtener,
    editar,
    eliminar,
    listar,
}