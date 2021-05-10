var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function registrar(req, res){
    var params = req.body;
    var user = new User();

    if(params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
            if(hash){
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.email = params.email;
                user.role = params.role;

                user.save((err, user_save)=>{
                    if(err){
                        res.status(500).send({error: "No se ha ingresado el usuario"});
                    }else{
                        res.status(200).send({user: user_save});
                    }
                });
            }
        });
    } else{
        res.status(403).send({error: "No ingreso su contraseña"});
    }

}

module.exports= {
    registrar
}