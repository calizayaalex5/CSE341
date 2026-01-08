require('dotenv').config();

const { MongoClient } = require('mongodb');

async function main() {
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databaseList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}

// Ejecuta el script con: node week01/introduccion/index.js
// Asegúrate de tener instalado el paquete mongodb: npm install mongodb
// Reemplaza la URI con tus propias credenciales de MongoDB si es necesario.
// Este script se conecta a una base de datos MongoDB y lista todas las bases de datos disponibles.
// Recuerda manejar tus credenciales de forma segura y no exponerlas en el código fuente.