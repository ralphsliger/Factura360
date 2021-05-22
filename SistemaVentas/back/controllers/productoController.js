var Producto = require('../models/Producto');

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

module.exports = 
{
    registrar,
}