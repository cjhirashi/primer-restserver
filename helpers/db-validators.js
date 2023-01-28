const Role = require('../models/role.model');
const User = require('../models/user.model');


const isValidRole = async( role = '' ) => {

    const roleExist = await Role.findOne({ role });
    if ( !roleExist ) {
        throw new Error(`El role ${ role } es invalido`);
    }

}

const existEmail = async( email_address = '' ) => {

    const mailExists = await User.findOne({ email_address });

    if ( mailExists ) {
        throw Error(`Correo ${email_address} ya existe`);
    }

}

module.exports = {
    isValidRole,
    existEmail
}