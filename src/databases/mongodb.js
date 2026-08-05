import { MongoClient } from "mongodb";

export async function mongodbModule() {

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {

        await client.connect();

        console.log("Connected to MongoDB Successfully!");

        const database = client.db(process.env.MONGODB_DATABASE);

        const collection = database.collection(process.env.MONGODB_COLLECTION);

        console.log("Collection Ready:", process.env.MONGODB_COLLECTION);

        await collection.insertOne({
    message: "MongoDB Backup Test",
    createdAt: new Date()
});

console.log("Test document inserted successfully!");

    }

    catch (error) {

        console.log("MongoDB Connection Failed!");
        console.log(error.message);

    }

    finally {

        await client.close();

        console.log("MongoDB Connection Closed Successfully!");

    }

}