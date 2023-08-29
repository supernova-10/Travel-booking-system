//create a variable tostore a reference to the database
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let travel;

export default class travelDAO {
	static async injectDB(conn) {
		if (travel) {
			return;
		}
		try {
			travel = await conn.db(process.env.travel_NS).collection("trips");
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in travelDAO: ${e}`,
			);
		}
	}

	static async getTrips({ filters = null, page = 0, tripsPerPage = 20 } = {}) {
		let query;
		if (filters) {
			if ("Destination" in filters) {
				query = { Destination: { $search: filters["Destination"] } };
			} else if ("Duration" in filters) {
				query = { Duration: { $eq: filters["Duration"] } }; //datafield
			} else if ("Traveler name" in filters) {
				query = { $text: { $eq: filters["Traveler name"] } };
			}
		}
		let cursor;
		try {
			cursor = await travel.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { tripsList: [], totalNumTrips: 0 };
		}
		const displayCursor = cursor.limit(tripsPerPage).skip(tripsPerPage * page);
		try {
			const tripsList = await displayCursor.toArray();
			const totalNumTrips = await travel.countDocuments(query);

			return { tripsList, totalNumTrips };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`,
			);
			return { tripsList: [], totalNumTrips: 0 };
		}
	}
}
