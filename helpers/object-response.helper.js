
const objectQuery = (from = 1)=>{
    let fromQuery;

    if ( from < 1 ) {
        fromQuery = 0;
    }else{
        fromQuery = from - 1;
    }

    return fromQuery;
}

const replyMessageGetObjects = (total = 0, from = 1, limit = 1, registers)=>{

    if ( total < 1 ) { 
        return {
            status: 404,
            msg: {
                en: 'There are no objects in database.',
                es: 'No hay objetos en la base de datos.'
            }
        };
    }

    if ( registers.length < 1 ) {
        return {
            status: 404,
            msg: {
                en: 'No objects found.',
                es: 'No se encontraron objetos.'
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
    }else{
        let msg
        if ( registers.length < 2 ) {
            msg = {
                en: `${registers.length} object found.`,
                es: `Se encontró ${registers.length} objeto`
            };
        }else{
            msg = {
                en: `${registers.length} objects found.`,
                es: `Se encontraron ${registers.length} objetos`
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

const replyMessageGetObject = (register)=>{

    if ( !register ) {
        return {
            status: 404,
            msg: {
                en: 'No object found.',
                es: 'No se encontró el objeto.'
            },

        };
    }

    return {
        status: 200,
        msg: {
            en: 'Object found.',
            es: 'Se encontró el objeto.'
        },
        object: register

    };

}

module.exports = {
    objectQuery,
    replyMessageGetObjects,
    replyMessageGetObject
}