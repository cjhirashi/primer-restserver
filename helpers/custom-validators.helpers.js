//========================================================
//TITLE: CUSTOM VALIDATORS HELPERS
//DESCRIPTION: VALIDADORES DE DATOS PERSONALES
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//BIBLIOTECAS
const Role = require('../models/role.model');
const User = require('../models/user.model');


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