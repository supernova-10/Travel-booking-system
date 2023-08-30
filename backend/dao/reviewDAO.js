import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID; // get access to objetc od convert string to object id

let reviews; // store reference to reviews collection

export default class ReviewDAO { // class to handle all db operations 
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.travel_NS).collection("reviews");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in reviewDAO: ${e}`,
            );
        }
    }

    static async addReview(travelId, user, review, date) {
        try {
            const reviewDoc = { // create review document
                Traveler_name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                trip_id: ObjectId(Trip_id), // convert string to object id
            }

            return await reviews.insertOne(reviewDoc) // insert review document into reviews collection
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }   

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) }, // find review by user id and review id
                { $set: { text: text, date: date } }, // set text and date
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }