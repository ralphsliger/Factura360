var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

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
                        res.status(400).send({error: "No se ha ingresado el usuario"});
                    }else{
                        res.status(200).send({user: user_save});
                    }
                });
            }
        });
    } else{
        res.status(400).send({error: "No ingreso su contraseña"});
    }

}

function login(req, res){
    var params = req.body;

    User.findOne({email: params.email}, (err, user_params)=>{
        if(err){
            res.status(400).send({message: 'Error, algo ha fallado'});
        } else {
            if(user_params){
                bcrypt.compare(params.password, user_params.password, function(err, check){
                    if(check){
                        if(params.getToken){
                            res.status(200).send({
                                jwt: jwt.createToken(user_params),
                                users: user_params
                            });
                        }else{
                            res.status(200).send({
                                user: user_params, 
                                message: 'No tiene token asignado',
                                jwt: jwt.createToken(user_params)

                            });
                        }
                        
                    }else{
                        res.status(400).send({message: 'La contraseña o el correo no coinciden'});
                    }
                });
            }else {
                res.status(400).send({message: 'La contraseña o el correo no coinciden'});
            }
        }
    });
}

module.exports= {
    registrar,
    login,
}