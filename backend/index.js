// connect db and start server 
import app from './server.js'
import mongodb from'mongodb'
import dotenv from 'dotenv'
import travelDAO from './dao/travelDAO.js'
dotenv.config()
const MongoClient = mongodb.MongoClient

const port=process.env.PORT || 8000 // orignally its 5000 but if that cannot be accessed use this instead
MongoClient.connect(
    process.env.travel_DB_URI,
    {
      poolSize: 50,
      wtimeout: 2500,
      useNewUrlParse: true }
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
        await travelDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })

    //connect database
    // start webserver
//pass db uri 
