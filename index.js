const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port 3000`);
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://b022210161:wafa020211@cluster0.xby6dhm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch(err => {
    console.error("Failed to connect to MongoDB Atlas", err);
});

const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

app.post('/user', async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        let result = await client.db("wafa").collection("lab").insertOne({
            name: req.body.name,
            email: req.body.email,
            year: req.body.year,
            password: hash,
        });
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/user/:username', async (req, res) => {
    try {
        let result = await client.db("wafa").collection("lab").findOne({ user: req.params.username });
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch('/user/:id', async (req, res) => {
    try {
        let result = await client.db("wafa").collection("lab").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { email: req.body.email } }
        );
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/user/:id', async (req, res) => {
    try {
        let result = await client.db("wafa").collection("lab").deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
});
