import express from "express";
//controller file that the route uses
import travelctrl from "./travel.controller.js";
import reviewctrl from "./review.controller.js";

const router = express.Router();

//demonstration route add routes later on
router.route("/").get(travelctrl.apiGetTrips);

router 
    .route("/review")
    .post(travelctrl.apiPostReview)
    .put(travelctrl.apiUpdateReview)
    .delete(travelctrl.apiDeleteReview);
export default router;

// all routes start with this /api/v1/travel
// localhost:5000/api/v1/travel
