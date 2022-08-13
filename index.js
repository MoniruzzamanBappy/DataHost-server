const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,GET,PATCH,OPTIONS,PUT,DELETE",
  };
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(X),
  };
  return response;
};

const uri = `mongodb+srv://dbuser1:TuKAGyXAVaONttf5@bappy-practice-db.nb2hg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const todoCollection = client.db("DataHost").collection("product");

    // get all product
    app.get("/product", async (req, res) => {
      const result = await todoCollection.find().toArray();
      res.send(result);
    });

    // add product
    app.post("/product", async (req, res) => {
      const newTodo = req.body;
      const result = await todoCollection.insertOne(newTodo);
      res.send(result);
    });

    // // update user
    // app.put("/todo/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const updatedTodo = req.body;
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       isComplete: updatedTodo.isComplete,
    //     },
    //   };
    //   const result = await todoCollection.updateOne(query, updateDoc, options);

    //   res.send(result);
    // });

    // // user delete
    // app.delete("/todo/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await todoCollection.deleteOne(query);

    //   res.send(result);
    // });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
