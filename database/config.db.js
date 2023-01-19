const mongoose = require('mongoose');

const dbConnetion = async() => {

    try {

        mongoose.set('strictQuery', false);

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Online database');

    } catch (error) {
        console.log(error);
        throw new Error('Erro starting DataBase');
    }
}

module.exports = {
    dbConnetion
}