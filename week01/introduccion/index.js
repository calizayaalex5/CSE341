// Se trae el paquete dotenv para manejar variables de entorno
require('dotenv').config();

// Se trae el cliente de MongoDB
const { MongoClient } = require('mongodb');

// Función principal para ejecutar las operaciones de la base de datos
async function main() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();

        //await updateListByName(client, "The Great Train Robbery", { title: "The great Train Robbery 2"  });  //esto actualiza el titulo de la pelicula
        //await findListWithGenrer(client, { genrer: "Comedy" });  //esto busca todas las peliculas con el genero comedia
        //await findOneListingByName(client, "Andrea");  //esto busca un comentario por nombre
        //await upsertListingByName(client, "Traffic in Souls", { title: "The Great Traffic in Souls" }); //esto actualiza o inserta un nuevo documento si no existe          
        //await updateAllListingsToHavePropertyType(client); //esto actualiza todos los documentos que no tienen la propiedad property_type                                                
        //await deleteListingParamByName(client, "The great Train Robbery 2"); //esto elimina un documento por su nombre
        //await deletePropertyTypeFromAllString(client); //esto elimina muchos documentos por su propiedad
        
        await deleteListingsScrappedForCity(client, "Sparks")
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function deleteListingsScrappedForCity(client, city) {
    const result = await client
                    .db("sample_mflix")
                    .collection("theaters")
                    .deleteMany({ "location.address.city" : city})
        
        console.log(`Listings in the city'${city}' deleted.`);
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deletePropertyTypeFromAllString(client) {
    const result = await client
                    .db("sample_mflix")
                    .collection("movies")
                    .updateMany(
                        { property_type: { $exists: true } },
                        { $unset: { property_type: "" } }
                    );

    console.log(`${result.modifiedCount} document(s) had property_type removed.`);         
}

async function updateAllListingsToHavePropertyType(client) {
    const result = await client.db("sample_mflix").collection("movies").updateMany(
        { rated: "TV-PG" },
        { $set: { rated: "PG" } } 
    );

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function deleteListingParamByName(client, nameOfListing) {
    const result = await client
                    .db("sample_mflix") 
                    .collection("movies")
                    .deleteOne({ title: nameOfListing})
        
        console.log(`Listing with the name'${nameOfListing}' deleted.`);
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
        const result = await client
                        .db("sample_mflix")
                        .collection("movies")
                        .updateOne(
                                { title: nameOfListing }, 
                                { $set: updatedListing}
                        );
        
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);

        if (result.upsertedCount > 0) {
            console.log(`One document was inserted with the id ${result.upsertedId._id}`);
        } else {
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
        }               
}

async function updateListByName(client, nameOfListing, updatedListing) {
    const result = await client
                        .db("sample_mflix")
                        .collection("movies")
                        .updateOne(
                                { title: nameOfListing }, 
                                { $set: updatedListing}
                        );

    console.log(`Listing with the name'${nameOfListing}' updated.`);
    console.log(`${result.modifiedCount} document(s) was/were modified.`);
}
    

async function findListWithGenrer(client, {
    genrer = "Drama"} = {}) {
    const cursor = await client.db("sample_mflix").collection("movies").find({ genres: genrer }).sort({ lastupdated: -1 });
    
    const result = await cursor.toArray();

    if (result.length > 0) {
        console.log(`Found listing(s) with the genrer '${genrer}':`);
        result.forEach((r, i) => {
            console.log();
            console.log(`${i + 1}.`);
            console.log(`    title: ${r.title}`);
            console.log(`    genre: ${r.genres}`)
            console.log(`    lastupdated: ${r.lastupdated}`);
            console.log(`    _id: ${r._id}`);
        })
    } else {
        console.log(`No listings found with the genrer '${genrer}'`);
    }
}                                                                           

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_mflix").collection("comments").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function findOneMovieListingByName(client, nameOfListing) {
    const result = await client.db("sample_mflix").collection("movies").findOne({ title: nameOfListing });
    
    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result); //esto muestra todo los datos
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function createMultipleListings(client, newListing) {
    const result = await client.db("sample_mflix").collection("comments").insertMany(newListing);

    console.log(`${result.insertedCount} new listing(s) created with the following ids:`);
    console.log(result.insertedIds);
}

async function createListing(client, newListing) {
    const result = await client.db("sample_mflix").collection("comments").insertOne(newListing);

    console.log("New listing created with the following id:", result.insertedId);
}

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