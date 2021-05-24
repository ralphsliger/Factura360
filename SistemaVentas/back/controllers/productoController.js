var Producto = require('../models/Producto');
var fs = require('fs');
var path= require('path');

function registrar(req, res){
    var data = req.body;

    if(req.files){
        //Selecciono ruta imagen y la imagen
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen = name[2];

        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err, producto_save)=>{
            if(err){
                res.status(500).send({message: "error en el servidor"});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(403).send({message: 'no se registro el producto.'});
                }
            }
        });
    }else{
        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err, producto_save)=>{
            if(err){
                res.status(500).send({message: "error en el servidor"});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(403).send({message: 'no se registro el producto.'});
                }
            }
        });
    }
}

function listar(req,res){
    var titulo = req.params['titulo'];
    Producto.find({titulo: new RegExp(titulo, 'i')}).populate('idcategoria').exec((err, producto_lista)=>{
        if(err){
            res.status(500).send({message: "error en el servidor"});
        }else{
            if(producto_lista){
                res.status(200).send({productos: producto_lista});
            }else{
                res.status(403).send({message: 'no se han encontrado los productos.'});
            }
        }
    });
}

function editar(req,res){
    var data = req.body;
    var id = req.params['id'];
    var img = req.params['img'];

    if(req.files){
        fs.unlink('./uploads/productos/'+img, (err)=>{
            if(err) throw err;
        });
        var imagen_path = req.files.imagen.path;
        var nombre = imagen_path.split('\\');
        var nombre_imagen = nombre[2];

        Producto.findByIdAndUpdate({_id: id}, 
                {
                titulo: data.titulo, 
                descripcion: data.descripcion, 
                imagen: nombre_imagen, 
                precio_compra: data.precio_compra, 
                precio_venta: data.precio_venta, 
                stock: data.stock,
                idcategoria: data.idcategoria,
                puntos: data.puntos}, (err, producto_actualizado)=>{
                    if(err){
                    res.status(500).send({message: "error en el servidor"});
                    console.log(err);
                    }else{
                        if(producto_actualizado){
                        res.status(200).send({producto: producto_actualizado});
                    }else{
                            res.status(403).send({message: 'no se han editado los productos.'});
                        }
                    }
                });
    }else{
        Producto.findByIdAndUpdate({_id: id}, 
            {titulo: data.titulo, 
                descripcion: data.descripcion, 
                imagen: nombre_imagen, 
                precio_compra: data.precio_compra, 
                precio_venta: data.precio_venta, 
                stock: data.stock,
                idcategoria: data.idcategoria,
                puntos: data.puntos}, (err, producto_actualizado)=>{
                    if(err){
                    console.log(err);
                    res.status(500).send({message: "error en el servidor"});
                    }else{
                        if(producto_actualizado){
                        res.status(200).send({producto: producto_actualizado});}else{
                            res.status(403).send({message: 'no se han editado los productos.'});
                        }
                    }
                });
    }
    
}

function getProducto(req, res){
    var idproducto = req.params['id'];

    Producto.findOne({_id: idproducto}, (err, producto_data) =>{
        if(err){
            res.status(500).send({message: "error en el servidor"});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(403).send({message: 'no se han encontrado el producto.'});
            }
        }
    });
}

function eliminar(req,res){

    var id = req.params['id'];

    Producto.findOneAndRemove({_id: id}, (err, producto_delete)=>{
        if(err){
            res.status(500).send({message: "error en el servidor"});
        }else{
            if(producto_delete){
                fs.unlink('./uploads/productos/'+producto_delete.imagen, (err)=>{
                    if(err) throw err;
                });
                res.status(200).send({producto: producto_delete});
            }else{
                res.status(403).send({message: 'no se ha eliminado ningun producto.'});
            }
        }
        });
    }

    function updateStock(req, res){
        let id = req.params['id'];
        let data = req.body;

        Producto.findById(id,(err,producto_data)=>{
            if(producto_data){
                Producto.findByIdAndUpdate(id, {stock: parseInt(producto_data.stock) + parseInt(data.stock)}, (err,producto_edit)=>{
                    if(producto_edit){
                        res.status(200).send({producto: producto_edit});
                    }else{
                        res.status(403).send(err); 
                    }
                })
            }else{
                res.status(500).send(err);
            }
        })

    }

          
    function imagenProducto(req, res){
        var img = req.params['img'];
        if(img != "null"){
            let path_img = './uploads/productos' + img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/productos/default.jpeg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    }
    

module.exports = 
{
    registrar,
    listar, 
    editar,
    getProducto,
    eliminar,
    updateStock,
    imagenProducto

}