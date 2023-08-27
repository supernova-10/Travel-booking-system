// configure an express server 
// send and receive json by specific routes

import express from 'express'
import cors from 'cors'
import travel from "./api/travel.route.js"

const app = express() // used to make the server 
app.use(cors()) //middleware using cors module to allow cross origin requests
app.use(express.json()) //middleware to parse json data server can accept json in the body of the request sent by git 

//specify some initial routes
app.use("/api/v1/travel", travel)
// if smn tried to go to a different route, that doesnt exit 
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

// export app as a module 

export default app;
// import this module in the file that accesses the database, run this file to get the server running
