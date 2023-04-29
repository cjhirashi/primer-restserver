const { request, response } = require("express");



const isAdminRole = ( req = request, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { role, email } = req.user;

    if ( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${email} no tiene autorización para eliminar usuarios`
        });
    }

    next();

}

const hasRole = ( ...roles ) => {


    return ( req = request, res = response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.user.role )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}