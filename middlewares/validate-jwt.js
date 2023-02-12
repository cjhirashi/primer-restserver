const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-tk');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No tiene acceso a la aplicación'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById( uid );

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        // Verificar si el uid está activo
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            })
        }

        req.uid = uid;
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

module.exports = {
    validateJWT
}