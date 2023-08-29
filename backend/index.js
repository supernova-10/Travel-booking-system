// connect db and start server
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import travelDAO from "./dao/travelDAO.js";
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000; // orignally its 5000 but if that cannot be accessed use this instead
MongoClient.connect(process.env.travel_DB_URI, {
	maxPoolSize: 50,
	wtimeoutMS: 2500,
	useNewUrlParser: true,
})
	.catch((error) => console.log(error.message))
	.then(async (client) => {
		await travelDAO.injectDB(client);
		app.listen(port, () => {
			console.log(`listening on http://127.0.0.1:${port}`);
		});
	});

//connect database
// start webserver
//pass db uri
