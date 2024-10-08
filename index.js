const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5174/','https://mfs-server-pink.vercel.app/'],
  Credential: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('Hello from Bangladesh.....')
})

const uri = "mongodb+srv://mfsUser:3mpQsRG0wzxuu6HV@cluster0.s8jaol5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const dataCollection = client.db('mfsDb').collection('mfs')
    

    app.get('/products', async (req,res)=>{
      const result = await dataCollection.find().toArray()
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) => {
    res.send('mfs running')
})

app.listen(port, () =>{
    console.log(`mfs is running on port ${port}`);
})

