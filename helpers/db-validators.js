const Role = require('../models/role.model');


const isValidRole = async( role = '' ) => {
    const roleExist = await Role.findOne({ role });
    if ( !roleExist ) {
        throw new Error(`El role ${ role } es invalido`)
    }
}

module.exports = {
    isValidRole
}