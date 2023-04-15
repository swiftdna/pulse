const express = require('express');
const passport = require('passport');
const moment = require('moment');
const router = express.Router();
const {addPost, getPosts} = require('./modules/Posts');

const pusher = (req, res, next) => {
  let {model, model: {data: response}} = req;
  if (model && response) {
    if (response.data && typeof response.data === 'string') {
      response.data = JSON.parse(response.data);
    }
    res.json(response);
    return;
  }
  return next();
};

router.get('/', isLoggedIn, (req, res) => {
	res.json({success: true, message: 'Welcome to API page!'});
});

// router.post('/farmuser', isLoggedIn, FarmUserDroneDetails, pusher);
router.post('/share', isLoggedIn, addPost, pusher);
router.get('/posts', isLoggedIn, getPosts);
router.get('/poll', isLoggedIn, async (req, res) => {
  const {last_count} = req.query;
  let postData = [];
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const checkData = async () => {
    const {db} = COREAPP;
    const posts = db.collection('posts');
    postData = await posts.find({}).sort( { 'created': -1 } ).toArray();
    postData.map(pd => pd.created_date = moment.unix(pd.created).fromNow());
  };
  await checkData();
  while (last_count && postData.length <= Number(last_count)) {
    await checkData();
    console.log('checked -> ', postData.length);
    await sleep(2000);
  }
  console.log('checked out -> ', postData.length);
  return res.json({ success: true, data: postData });
});

router.get('/session', isLoggedIn, async (req, res, next) => {
  if (req.user) {
    const {user} = req;
    res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user._id, username: user.username, name: user.name, imageurl: user.imageurl, role: user.role, status: user.status} });
  } else {
    res.status(401).json({message: "Not authorized", success: false});
  }
});

async function isLoggedIn(req, res, next) {
  const {pl_token} = req.cookies;
  req.headers.authorization = `Bearer ${pl_token}`;
  return passport.authenticate('jwt', {session: false}, async (err, user) => {
    if (process.env.NODE_ENV === 'test') {
      // for testing only
      return next();
    }
    if (user && user._id) {
      req.user = user;
      return next();
    }
    res.status(401).json({message: "Not authorized to see this page. Please login!", status: 401});
  })(req, res, next);
}

module.exports = router;