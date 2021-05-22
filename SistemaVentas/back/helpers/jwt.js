var jwt = require('jwt-simple');
var moment = require('moment');
var secretkey = 'codigodesecretkey';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(50, 'days').unix(),
    }

    return jwt.encode(payload, secretkey);
}