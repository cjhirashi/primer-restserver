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

const messageStructure = ( status=200, msEn, msEs, erEn, erEs, total=1, from=1, limit=1, object, objects, errors )=>{
    let response = {};
    response.status = status;

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

    if ( errors ) {
        response.errors = errors; 
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
    return response;
}

//Gestor de mensaje de repuesta de consulta de registros
const replyMessageGetObjects = (total = 0, from = 1, limit = 1, objects)=>{
    //No hay registros en la base de datos
    if ( total < 1 ) { 
        return messageStructure(
            status = 404,
            msEn = 'There are no objects in database...',
            msEs = 'No hay objetos en la base de datos...'
        ); 
    }

    //No hay registros en la consulta
    if ( objects.length < 1 ) {
        return messageStructure(
            status = 404,
            msEn = 'No objects found...',
            msEs = 'No se encontraron objetos...'
        ); 

    //Hay registros en la consulta
    }else{
        let msg
        //Un solo registro encontrado
        if ( objects.length < 2 ) {
            msg = {
                en: `${objects.length} object found...`,
                es: `Se encontró ${objects.length} objeto...`
            };
        //Varios registros encontrados
        }else{
            msg = {
                en: `${objects.length} objects found...`,
                es: `Se encontraron ${objects.length} objetos...`
            };
        }

        return messageStructure(
            status = 200,
            msEn = msg.en,
            msEs = msg.es,
            erEn = null,
            erEs = null, 
            total = total,
            from = from,
            limits = limit,
            object = null,
            objects = objects
        ); 
    }

}

//Gestor de mensaje de repuesta de consulta de registro
const replyMessageGetObject = (object)=>{

    //No se encontró el registro
    if ( !object ) {
        return messageStructure(
            status = 404,
            msEn = 'Object not found...',
            msEs = 'No se encontró el objeto...',
            erEn = null,
            erEs = null, 
            total = null,
            from = null,
            limits = null,
            object = null,
            objects = null
        ); 
    }

    //Se encontró el registro
    return messageStructure(
        status = 200,
        msEn = 'Object found...',
        msEs = 'Se encontró el objeto...',
        erEn = null,
        erEs = null, 
        total = null,
        from = null,
        limits = null,
        object = object,
        objects = null
    ); 
}

//Gestor de mensaje de repuesta de consulta de registro
const replyMessagePutObject = (object)=>{

    //No se encontró el registro
    if ( !object ) {
        return messageStructure(
            status = 404,
            msEn = 'Object not updated...',
            msEs = 'No se actualizó el objeto...',
            erEn = null,
            erEs = null, 
            total = null,
            from = null,
            limits = null,
            object = null,
            objects = null
        );
    }

    //Se encontró el registro
    return messageStructure(
        status = 200,
        msEn = 'Object updated...',
        msEs = 'Objeto actualizado...',
        erEn = null,
        erEs = null, 
        total = null,
        from = null,
        limits = null,
        object = object,
        objects = null
    );
}

module.exports = {
    objectFrom,
    objectLimit,
    messageStructure,
    replyMessageGetObjects,
    replyMessageGetObject,
    replyMessagePutObject
}