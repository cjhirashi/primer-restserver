//========================================================
//TITLE: OBJECT RESPONSE HELPER
//DESCRIPTION: GESTOR DE DATOS DE CONSULTA DE REGISTROS
//AUTH: Carlos Jimenez @cjhirashi
//========================================================

//Ajuste de valor "from" para consultas de objetos
const objectFrom = (from = 1)=>{
    let response;

    if ( from < 1 ) {
        response = 0;
    }else{
        response = from - 1;
    }

    return response;
}

//Ajuste de valor "limit" para consultas de objetos
const objectLimit = (limit = 1)=>{
    let response;

    if ( limit < 1 ) {
        response = 1;
    }

    return response;
}

//Gestor de mensaje de repuesta de consulta de registros
const replyMessageGetObjects = (total = 0, from = 1, limit = 1, registers)=>{
    //No hay registros en la base de datos
    if ( total < 1 ) { 
        return {
            status: 404,
            msg: {
                en: 'There are no objects in database...',
                es: 'No hay objetos en la base de datos...'
            }
        };
    }

    //No hay registros en la consulta
    if ( registers.length < 1 ) {
        return {
            status: 404,
            msg: {
                en: 'No objects found...',
                es: 'No se encontraron objetos...'
            },
            objects: total,
            queryResponse: {
                queryFrom: Number(from),
                queryLimit: Number(limit),
                first: 0,
                last: 0,
                objects:registers.length 
            },
            Objects: registers
        };
    //Hay registros en la consulta
    }else{
        let msg
        //Un solo registro encontrado
        if ( registers.length < 2 ) {
            msg = {
                en: `${registers.length} object found...`,
                es: `Se encontró ${registers.length} objeto...`
            };
        //Varios registros encontrados
        }else{
            msg = {
                en: `${registers.length} objects found...`,
                es: `Se encontraron ${registers.length} objetos...`
            };
        }

        return {
            status: 200,
            msg,
            objects: total,
            queryResponse: {
                queryFrom: Number(from),
                queryLimit: Number(limit),
                first: Number(from),
                last: Number(from) - 1 + registers.length,
                objects:registers.length
            },
            objectList: registers
        };
    }

}

//Gestor de mensaje de repuesta de consulta de registro
const replyMessageGetObject = (register)=>{

    //No se encontró el registro
    if ( !register ) {
        return {
            status: 404,
            msg: {
                en: 'Object not found...',
                es: 'No se encontró el objeto...'
            },

        };
    }

    //Se encontró el registro
    return {
        status: 200,
        msg: {
            en: 'Object found...',
            es: 'Se encontró el objeto...'
        },
        object: register

    };

}

//Gestor de mensaje de repuesta de consulta de registro
const replyMessagePutObject = (register)=>{

    //No se encontró el registro
    if ( !register ) {
        return {
            status: 404,
            msg: {
                en: 'Object not updated...',
                es: 'No se actualizó el objeto...'
            },
        };
    }

    //Se encontró el registro
    return {
        status: 200,
        msg: {
            en: 'Object updated...',
            es: 'Objeto actualizado...'
        },
    };
}

module.exports = {
    objectFrom,
    objectLimit,
    replyMessageGetObjects,
    replyMessageGetObject,
    replyMessagePutObject
}