const jwt = require('jsonwebtoken');

//Verificar Token

let verificaToken = (req, res, next) => {

    let token = req.get('token'); //generalmente en los headers se usa Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        console.log(token);

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })

};

//Verifica Admin_Role

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    //console.log(usuario.role);

    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Privilegios insuficientes'
            }
        })
    }

    next();

}



module.exports = {
    verificaToken,
    verificaAdmin_Role
}