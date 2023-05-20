//===============================================================================================================
//TITLE: EXPRESIONES REGULARES
//DESCRIPTION: EXPRESIONES REGULARES PARA VALIDACION DE CAMPOS
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

// const validacion = //
// texto.match( validacion ) //Regresa todas las coincidencias en una lista
// validacion.test( texto ) //Regresa True o False si coincide la validación

// const regex = /Vino(=?\s\w+)/g;
// const text = "Vino blanco"
// text.match( regex )

// const regex = /Java\s(?!8|9)/g;
// const text = "Java 1"
// text.match( regex )

//_______________________________________________________________________________________________________________
//EXPRESIONES REGULARES
const expresionesRegulares = {
    nombre: /^([a-zA-ZÀ-ÿ]+\s?){1,5}$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?+._-])(?!\s)[a-zA-Z\d#$@!%&*?+._-]{8,16}$/, // 4 a 12 digitos.
	correo: /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]+$/,
    url: /^(https:\/\/|http:\/\/)?(www+\.)?([a-z0-9-]+\.){1,}[a-z]+$/,
	telefono: /^\+?\d{1,3}?[ -\.\(]?\d{1,3}[\)\- \.]?\d{3,4}[ \.\-]?\d{4}$/, // 7 a 14 numeros.
    mongoId: /^[a-z0-9]{24}$/
};

//VALIDACION DE NOMBRE
const validarNombre = ( nombre ) => {

    const validacion = expresionesRegulares.nombre;

    return validacion.test( nombre );
}

//VALIDACION DE CORREO
const validarCorreo = ( correo ) => {

    const validacion = expresionesRegulares.correo;

    return validacion.test( correo );
}

//VALIDACION DE PASSWORD
const validarPassword = ( password ) => {

    const validacion = expresionesRegulares.password;

    return validacion.test( password );
}

//VALIDACION DE TELEFONO
const validarTelefono = ( telefono ) => {

    const validacion = expresionesRegulares.telefono;

    return validacion.test( telefono );

}

//VALIDACION DE ID MONGO
const validarMongoId = ( mongoId ) => {

    const validacion = expresionesRegulares.mongoId;

    return validacion.test( mongoId );

}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    validarNombre,
    validarCorreo,
    validarPassword,
    validarTelefono,
    validarMongoId
}