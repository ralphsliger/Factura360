var Producto = require('../models/producto')
var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');


function registrar(req, res){
    //obtenemos los datos y rellenamos el objeto
    var data = req.body;
    var venta = new Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    //guardamos
    venta.save((err,venta_save)=>{
        if(venta_save){
            //si se guardo con exito, obtenemos el detalle ventas
            let detalles = data.detalles;
            detalles.forEach((element, index) => {
                //de cada detalle venta rellenamos su objeto
                var detalleventa= new DetalleVenta();
                detalleventa.idproducto = element.idproducto;
                detalleventa.cantidad = element.cantidad;
                detalleventa.venta = venta_save._id;
                detalleventa.save((err, detalle_save)=>{
                    if(detalle_save){
                       //si se hizo una compra, actualizamos el stock de los productos
                       Producto.findById({_id: element.idproducto}, (err, producto_datos)=>{
                        //   si encuentra un registro que coincida con el id del producto
                        if(producto_datos){
                            Producto.findByIdAndUpdate({_id: producto_datos._id},{stock: parseInt(producto_datos.stock) - parseInt(element.cantidad) }, (err, producto_edit) => {
                                res.end();
                            })
                           }else{
                            res.send("No se encontro el producto");
                           }
                       });
                    }else{
                        res.send("No se pudo registrar los datos");
                    }
                })
            });

            
        }else{
            res.status(403).send(err);
        }
    })
}

function listadoVentas(req, res){
    var id = req.params['id'];

    Venta.findById(id, (err,data_venta)=>{
        if(data_venta){
            DetalleVenta.find({idventa: id}, (err, data_detalle)=>{
                if(data_detalle){
                    res.status(200).send({venta: data_venta, detalles: data_detalle})
                }
            })
        }
    })
}

module.exports = {
    registrar,
    listadoVentas,
}