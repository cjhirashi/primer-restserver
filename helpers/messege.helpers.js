
//===============================================================================================================
//TITLE: AUTH ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA AUTENTIFICACION
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//_______________________________________________________________________________________________________________
//ESTRUCTURA DE MENSAJES
const messageStructure = ( status, msEn, msEs, erEn, erEs, object, objects, total=0, from=1, limit=1, token, errorsys )=>{
    let response = {};

    if ( status ) {
        response.status = status;
    }

    if ( msEn && msEs ) {
        response.msg = {
            en: msEn,
            es: msEs
        };
    }

    if ( erEn && erEs ) {
        response.error = {
            en: erEn,
            es: erEs
        };
    }

    if ( object ) {
        response.object = object;
    }

    if ( objects ) {
        response.objects = {
            total,
            queryResponse: {
                queryFrom: Number(from),
                queryLimit: Number(limit),
                first: Number(from),
                last: Number(from) - 1 + objects.length,
                queryResults: objects.length
            },
            objects
        }
    }

    if ( token ) {
        response.tk = token;
    }

    if ( errorsys ) {
        response.errorsys = errorsys;
    }
    return response;
}

//_______________________________________________________________________________________________________________
//RESPUESTA SARISFACTORIA
const messageSuccess = (code, english, spanish) => {
    return messageStructure(
        code,
        english,
        spanish
    );
}

//RESPUESTA ERROR
const messageError = ( code, english, spanish ) => {
    return messageStructure(
        code,
        null,
        null,
        english,
        spanish
    );
}

//RESPUESTA OBJETO
const messageObject = ( code, english, spanish, object ) => {
    return messageStructure(
        code,
        english,
        spanish,
        null,
        null,
        object
    );
}

//RESPUESTA OBJETOS
const messageObjects = ( code, english, spanish, objects, total, from, limit ) => {
    return messageStructure(
        code,
        english,
        spanish,
        null,
        null,
        null,
        objects,
        total,
        from,
        limit
    );
}

//RESPUESTA TOKEN
const messageToken = ( english, spanish, token) => {
    return messageStructure(
        202,
        english,
        spanish,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        token
    );
}

const msgObjects = ( objects, total, from, limit ) => {
    let vCode;
    let vEnglish;
    let vSpanish;
    let vEnglishErr;
    let vSpanishErr;
    let vObjects;
    let vTotal;
    let vFrom;
    let vLimit;

    if ( total > 1 ) {

        vCode = 200;
        vEnglish = `${total} objets found...`;
        vSpanish = `${total} objetos encontrados...`;
        vEnglishErr = null;
        vSpanishErr = null;
        vObjects = objects;
        vTotal = total;
        vFrom = from;
        vLimit = limit;
        
    }else{

        if( total == 1 ){
        
            vCode = 200;
            vEnglish = `${total} objet found...`;
            vSpanish = `${total} objeto encontrado...`;
            vEnglishErr = null;
            vSpanishErr = null;
            vObjects = objects;
            vTotal = total;
            vFrom = from;
            vLimit = limit;
        
        }else{
        
            vCode = 404;
            vEnglish = null;
            vSpanish = null;
            vEnglishErr = 'Objects not found...';
            vSpanishErr = 'Objetos no encontrados...';
            vObjects = null;
            vTotal = null;
            vFrom = null;
            vLimit = null;

        }

    }

    return messageStructure(
        vCode,
        vEnglish,
        vSpanish,
        vEnglishErr,
        vSpanishErr,
        null,
        vObjects,
        vTotal,
        vFrom,
        vLimit
    );
}

const msgObject = ( object ) => {
    let vCode;
    let vEnglish;
    let vSpanish;
    let vEnglishErr;
    let vSpanishErr;
    let vObject;

    if ( !object ) {

        vCode = 404;
        vEnglish = null;
        vSpanish = null;
        vEnglishErr = 'Object not found...';
        vSpanishErr = 'Objeto no encontrado...';
        vObject = object;
        
    }else{

        vCode = 200;
        vEnglish = 'Object found...';
        vSpanish = 'Objeto encontrado...';
        vEnglishErr = null;
        vSpanishErr = null;
        vObject = object;

    }

    return messageStructure(
        vCode,
        vEnglish,
        vSpanish,
        vEnglishErr,
        vSpanishErr,
        vObject,
    );
}

const msgObjectUpdate = ( object ) => {
    let vCode;
    let vEnglish;
    let vSpanish;
    let vEnglishErr;
    let vSpanishErr;
    let vObject;

    if ( !object ) {

        vCode = 404;
        vEnglish = null;
        vSpanish = null;
        vEnglishErr = 'Object not found...';
        vSpanishErr = 'Objeto no encontrado...';
        vObject = object;
        
    }else{

        vCode = 200;
        vEnglish = 'Object updated...';
        vSpanish = 'Objeto actualizado...';
        vEnglishErr = null;
        vSpanishErr = null;
        vObject = object;

    }

    return messageStructure(
        vCode,
        vEnglish,
        vSpanish,
        vEnglishErr,
        vSpanishErr,
        vObject,
    );
}

const msgObjectCreate = ( object ) => {
    let vCode;
    let vEnglish;
    let vSpanish;
    let vEnglishErr;
    let vSpanishErr;
    let vObject;

    if ( !object ) {

        vCode = 404;
        vEnglish = null;
        vSpanish = null;
        vEnglishErr = 'Object not created...';
        vSpanishErr = 'Objeto no creado...';
        vObject = object;
        
    }else{

        vCode = 201;
        vEnglish = 'Object created...';
        vSpanish = 'Objeto creado...';
        vEnglishErr = null;
        vSpanishErr = null;
        vObject = object;

    }

    return messageStructure(
        vCode,
        vEnglish,
        vSpanish,
        vEnglishErr,
        vSpanishErr,
        vObject,
    );
}

const msgObjectDeleted = ( object ) => {
    let vCode;
    let vEnglish;
    let vSpanish;
    let vEnglishErr;
    let vSpanishErr;
    let vObject;

    if ( !object ) {

        vCode = 404;
        vEnglish = null;
        vSpanish = null;
        vEnglishErr = 'Object not found...';
        vSpanishErr = 'Objeto no encontrado...';
        vObject = null;
        
    }else{

        vCode = 200;
        vEnglish = 'Object deleted...';
        vSpanish = 'Objeto eliminado...';
        vEnglishErr = null;
        vSpanishErr = null;
        vObject = null;

    }

    return messageStructure(
        vCode,
        vEnglish,
        vSpanish,
        vEnglishErr,
        vSpanishErr,
        vObject,
    );
}

const msgObjectExist = () => {
    return messageStructure(
        400,
        null,
        null,
        'Object already exist...',
        'El objeto ya existe...',
    );
}

const msgObjectNotFound = (english, spanish) => {
    return messageStructure(
        404,
        null,
        null,
        `Object [ ${english} ] not found...`,
        `El objeto [ ${spanish} ] no encontrado...`,
    );
}

const msgAddObject = (english, spanish) => {
    return messageStructure(
        201,
        `Object [ ${english} ] added...`,
        `Objeto [ ${spanish} ] agregado...`,
    );
}

const msgUpdateObject = (english, spanish) => {
    return messageStructure(
        200,
        `Object [ ${english} ] updated...`,
        `Objeto [ ${spanish} ] actualizado...`,
    );
}

const msgDeleteObject = (english, spanish) => {
    return messageStructure(
        200,
        `Object [ ${english} ] deleted...`,
        `Objeto [ ${spanish} ] eliminado...`,
    );
}

const msgErrorServidor = (english, spanish) => {
    const code = 500;

    if ( english && spanish) {
        return messageStructure(
            code,
            null,
            null,
            english,
            spanish,
        );
    }
    return messageStructure(
        code,
        null,
        null,
        'Something went wrong, server error...',
        'Algo salió mal, error del servidor...',
    );
}

const msgErrServ = (error) => {
    const code = 500;

    return messageStructure(
        code,
        null,
        null,
        'Something went wrong, server error...',
        'Algo salió mal, error del servidor...',
        null,
        null,
        null,
        null,
        null,
        null,
        error
    );
    //status, msEn, msEs, erEn, erEs, object, objects, total=0, from=1, limit=1, token, errorsys
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    messageSuccess,
    messageError,
    messageObject,
    messageObjects,
    messageToken,
    msgObjects,
    msgObject,
    msgObjectUpdate,
    msgObjectCreate,
    msgObjectDeleted,
    msgObjectExist,
    msgObjectNotFound,
    msgAddObject,
    msgUpdateObject,
    msgDeleteObject,
    msgErrorServidor,
    msgErrServ
}