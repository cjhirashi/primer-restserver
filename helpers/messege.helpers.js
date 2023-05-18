
//===============================================================================================================
//TITLE: AUTH ROUTER
//DESCRIPTION: RUTAS DE CONTROLES DE ACCESO PARA AUTENTIFICACION
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//_______________________________________________________________________________________________________________
//ESTRUCTURA DE MENSAJES
const messageStructure = ( status, msEn, msEs, erEn, erEs, object, objects, total=0, from=1, limit=1, token )=>{
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

const messageToken = ( code, english, spanish, token) => {
    return messageStructure(
        code,
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

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    messageSuccess,
    messageError,
    messageObject,
    messageObjects,
    messageToken,
    msgObjects
}