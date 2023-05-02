//===============================================================================================================
//TITLE: MONGO db
//DESCRIPTION: BASE DE DATOS DEL SISTEMA
//AUTH: Carlos Jimenez @cjhirashi
//===============================================================================================================

//LIBRERIAS GLOBALES
const mongoose = require('mongoose');

//CONEXION A BASE DE DATOS DEL SISTEMA
const mongoConection = async() => {

    //CONEXION SATISFACTORIA.....................................................................................
    try {

        mongoose.set('strictQuery', false);

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Online database');

    //ERROR DE CONEXION...........................................................................................
    } catch (error) {

        console.log(error);
        throw new Error('Erro starting DataBase');

    }
}

//_______________________________________________________________________________________________________________
//EXPORTACION DE MODULOS DE CONTROL
module.exports = {
    mongoConection
}