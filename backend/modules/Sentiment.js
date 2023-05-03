const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');
const natural = require('natural');
const path = require('path');

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const SEQUENCE_LENGTH = 300;

let model = null;
const handler = tfn.io.fileSystem(path.resolve(__dirname, 'model.json'));
tf.loadLayersModel(handler).then(function (mdl) {
//   console.log("model is: ", mdl);
  model = mdl;
});

async function buildDictionary(textData) {
    const tokenizer = new natural.WordTokenizer();
    const tfidf = new natural.TfIdf();

    // Add each text sample to the TF-IDF matrix
    for (const text of textData) {
        const tokens = tokenizer.tokenize(text);
        tfidf.addDocument(tokens);
    }

    // Build the dictionary
    const dictionary = {};
    for (const [index, term] of tfidf.listTerms().entries()) {
        dictionary[term.term] = index;
    }

    return dictionary;
}

function decode_sentiment(score, include_neutral=true) {
    const label = (score > 0.5) ? "Positive" : "Negative";
    if (include_neutral) {
        if (score < 0.45) {
            return "Negative";
        } else if (score > 0.55) {
            return "Positive";
        } else {
            return "Neutral";
        }
    }
    return label;
}
  
const getSetiment = async (req, res, next) => {
    // const postData = await posts.find({}).sort( { 'created': -1 } ).toArray();
    // const postData = await posts.find({}).sort( { 'created': -1 } ).toArray();
	const clean_text = req.query.input;
	// const start_at = Date.now();
	console.log('processing for -> ', clean_text);
    // Tokenize clean_text
    const start_at = Date.now();
    const tokenizer = new natural.WordTokenizer();
    const tfidf = new natural.TfIdf();
	const dictionary = await buildDictionary([clean_text]);
    // Add the clean_text to the TF-IDF matrix
    const tokens = tokenizer.tokenize(clean_text);
    tfidf.addDocument(tokens);

    // Convert tokens to index values using the dictionary
    const sequences = tokens.map((token) => dictionary[token] ?? -1); // Use -1 for unknown words
    // Remove unknown words
    const filtered_sequences = sequences.filter((index) => index !== -1);
    // Pad and truncate sequences to the desired length
    const padded_sequences = tf.pad(
        tf.tensor1d(filtered_sequences, 'int32'),
        [[0, SEQUENCE_LENGTH - filtered_sequences.length]],
        0
    ).slice([0], [SEQUENCE_LENGTH]);
    // Predict
    const score = model.predict(tf.expandDims(padded_sequences)).dataSync();
	const label = decode_sentiment(score, true);
	// const postData = model.predict(x_test).array();
    try {
		if (score) {
			res.json({
				success: true,
				score,
				label
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

module.exports = {
	getSetiment,
};