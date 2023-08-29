import travelDAO from "../dao/travelDAO.js";
export default class travelController {
	static async apiGetTrips(req, res, next) {
		const tripsPerPage = req.query.tripsPerPage
			? parseInt(req.query.tripsPerPage, 10)
			: 20;
		const page = req.query.page ? parseInt(req.query.page, 10) : 0; //convert it to integer ig passed as a url
		let filters = {};
		if (req.query.Destination) {
			filters.Destination = req.query.Destination;
		} else if (req.query.Duration) {
			filters.Duration = req.query.Duration;
		} else if (req.query.Traveler_name) {
			filters.Traveler_name = req.query.Traveler_name;
		}
		const { tripsList, totalNumTrips } = await travelDAO.getTrips({
			filters,
			page,
			tripsPerPage,
		});
		let response = {
			trips: tripsList,
			page: page,
			filters: filters,
			entries_per_page: tripsPerPage,
			total_results: totalNumTrips,
		};
		res.json(response);
	}
}
