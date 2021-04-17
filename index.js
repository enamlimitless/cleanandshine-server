const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors())
app.use(express.json())


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ps1cs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const serviceCollection = client.db("cleanAndShine").collection("services");
  const testimonialCollection = client.db("cleanAndShine").collection("reviews");

  console.log('connected', err)

// add services server code end here

  app.post('/addService', (req, res) => {
    const newService = req.body;
    console.log('adding new service', newService)
    serviceCollection.insertOne(newService)
      .then(result => {
        console.log(result.insertedCount)
        res.send(insertedCount > 0)
      })
  })

  app.get('/service', (req, res) => {
    serviceCollection.find()
      .toArray((err, items) => {
        res.send(items)
        // console.log('from database items', items)
      })
  })

// add services server code end here


// add review server code end here


  app.post('/addTestimonial', (req, res) => {
    const newTestimonial = req.body;
    console.log('adding new review', newTestimonial)
    testimonialCollection.insertOne(newTestimonial)
      .then(result => {
        console.log(result.insertedCount)
        res.send(insertedCount > 0)
      })
  })

  app.get('/testimonial', (req, res) => {
    testimonialCollection.find()
      .toArray((err, review) => {
        res.send(review)
        console.log('from database items', review)
      })
  })

});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})