const injectModel = (req, res, next) => {
    if (req.path.includes('/api/')) {
        req.model = {};
    }
    return next();
};

module.exports = {
	injectModel
};