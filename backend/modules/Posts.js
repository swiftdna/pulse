const moment = require('moment');
const axios = require('axios');

const getPosts = async (req, res, next) => {
	const {db} = COREAPP;
	const posts = db.collection('posts');
	const postData = await posts.find({}).sort( { 'created': -1 } ).toArray();
	try {
		if (postData) {
			postData.map(pd => pd.created_date = moment.unix(pd.created).fromNow());
			res.json({
				success: true,
				data: postData
			});
		}
	    return next();
	} catch(err) {
    	res.json({
	    	success: false,
	    	message: err.message
	    });
		return next();
    }
};

const addPost = async (req, res, next) => {
	const { body } = req;
	const {db} = COREAPP;
	const posts = db.collection('posts');
	// Image upload to be handled
	try {
		const sentiment_url = COREAPP.sentiment_url || `https://1734-2601-642-4c04-1af-bcb3-8703-61d1-eb15.ngrok-free.app`;
    	console.log(sentiment_url);
		const sent_resp = await axios.get(`${sentiment_url}/predict?input=${body.content}`);
    	console.log(sent_resp.data);
		const {label} = sent_resp.data;
		body.sentiment = label.toLowerCase();
		const postData = await posts.insertOne({
			...body,
			created: moment().unix()
		});
		if (!postData) {
            return res.json({success: false, message: 'Unable to add post'});
        }
        res.json({
        	success: true,
        	message: 'New post added!',
        	data: postData
        });
        return next();
	} catch(err) {
    	// console.log('addProduct ERR!! -> ', err);
    	res.json({
	    	success: false,
	    	message: err.message
	    });
		return next();
    }
};

module.exports = {
	getPosts,
	addPost
};