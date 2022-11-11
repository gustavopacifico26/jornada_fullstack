const express = require('express');
const { MongoClient, ObjectID, MONGO_CLIENT_EVENTS, ObjectId } = require("mongodb");

//const url = "mongodb+srv://admin:LdQHrR3iAM9u4Mtw@cluster0.0tjjv1e.mongodb.net";
const url = "mongodb+srv://guga_pacifico:VgYnkNChyWaAQAfV@cluster0.afnlcle.mongodb.net";
const bancoDadosNome = "ocean_jornadaFullstack_gustavo";

async function main() {

    //obtendo o acesso ao client, ao banco de dados e a collection
    const client = await MongoClient.connect(url);
    const bancoDados = client.db(bancoDadosNome);
    const collection = bancoDados.collection("personagens");


const app = express();


//sinalizar o uso de json no body
app.use(express.json());


//endpoint principal
app.get("/", function(req, res) {
	res.send("Essas são as estatísticas de overwach de flufox");
});


//endpoint READ ALL
app.get('/personagens', async function (req, res){

    //le todos os documentos da collection e envia como resposta para o endpoint
    const documentos = await collection.find().toArray();
    res.send(documentos);

});


app.post('/personagens', async function (req, res){

    const nome = req.body;
    await collection.insertOne(nome);
    res.send('personagem criado com sucesso');

});


// endpoint READ BY ID
app.get('/personagens/:id', async function (req, res){

    const id = req.params.id;

    const item = await collection.findOne({
        _id: new ObjectId(id),
      });

    res.send(item);
});

// endpoint para update(pelo id)
app.put('/personagens/:id', async function (req, res){
    const id = req.params.id;
    const item = req.body;

    await collection.updateOne({
        _id: new ObjectId(id)
    }, { $set:item});

    res.send('item atualizado');
});

// endpoint para delete(pelo id)
app.delete('/personagens/:id', async function (req, res){
    const id = req.params.id;
    
    await collection.deleteOne({
        _id: new ObjectId(id),
    });

    res.send('item deletado');
});

app.listen(3000, function () {
    console.log('Servidor rodando em http://localhost:3000');
});

}

main();