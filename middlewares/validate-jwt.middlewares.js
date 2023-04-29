const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { messageStructure } = require('../helpers/object.helpers');

//Validar JWT
const validateJWT = async( req = request, res = response, next ) => {
    let response;

    const token = req.header('x-tk');

    if ( !token ) {
        response = messageStructure(
            status = 401,
            msEn = 'Dont have access to the app...',
            msEs = 'No tiene acceso a la aplicación...',
        );
        return res.status(response.status).json({
            response
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById( uid );

        if (!user) {
            response = messageStructure(
                status = 401,
                msEn = 'The user dont exist...',
                msEs = 'No existe el usuario...',
            );
            return res.status(response.status).json({
                response
            })
        }

        // Verificar si el uid está activo
        if (!user.state) {
            response = messageStructure(
                status = 401,
                msEn = 'Inactive user...',
                msEs = 'Usuario inactico...',
            );
            return res.status(response.status).json({
                response
            })
        }

        req.uid = uid;
        req.user = user;

        next();
    } catch (error) {
        response = messageStructure(
            status = 401,
            msEn = 'Token invalid...',
            msEs = 'Token no válido...',
        );
        res.status(response.status).json({
            response
        })
    }


}

module.exports = {
    validateJWT
}