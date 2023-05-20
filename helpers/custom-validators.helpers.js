//========================================================
//TITLE: CUSTOM VALIDATORS HELPERS
//DESCRIPTION: VALIDADORES DE DATOS PERSONALES
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//BIBLIOTECAS
const { Role, User } = require('../models');

const isValidRole = async( role = '' ) => {

    const roleExist = await Role.findOne({ role });
    
    if ( !roleExist ) {
        throw new Error(`[${ role }] invalido`);
    }

}

const existEmail = async( email = '' ) => {

    const mailExist = await User.findOne({ email });

    if ( mailExist ) {
        throw Error(`[${email}] ya existe`);
    }

}

const existUserById = async( id ) => {

    const userExist = await User.findById( id );

    if ( !userExist ) {

        throw Error(`Usuario [${id}] no existe...`);

    }

}

module.exports = {
    isValidRole,
    existEmail,
    existUserById
}