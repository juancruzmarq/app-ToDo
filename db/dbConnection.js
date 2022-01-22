const mongoose = require('mongoose');

const dataBase = async()=>{
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cdd6b.mongodb.net/${process.env.DB_NAME}`;

    try {
            await mongoose.connect(uri);
            console.log("Base de datos ON!");
    } catch (error) {
        console.error(error, 'Error al conectar a la base de datos!');
    }
}

module.exports = {
    dataBase
}
