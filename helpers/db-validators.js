const Role = require('../models/role.model');
const User = require('../models/user.model');


const isValidRole = async( role = '' ) => {

    const roleExist = await Role.findOne({ role });
    if ( !roleExist ) {
        throw new Error(`El role ${ role } es invalido`);
    }

}

const existEmail = async( email = '' ) => {

    const mailExist = await User.findOne({ email });

    if ( mailExist ) {
        throw Error(`Correo ${email} ya existe`);
    }

}

const existUserById = async( id ) => {

    const userExist = await User.findById( id );

    if ( !userExist ) {

        throw Error(`El usuario <${id}> no existe...`);

    }

}

module.exports = {
    isValidRole,
    existEmail,
    existUserById
}