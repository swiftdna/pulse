const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');
const natural = require('natural');
const path = require('path');
const { removeStopwords } = require('stopword');
const stemmer = natural.PorterStemmer;
const tokenizer = new natural.WordTokenizer();
const SEQUENCE_LENGTH = 300;

const handler = tfn.io.fileSystem(path.resolve(__dirname, 'new_h5/model.json'));


function padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = 0) {
    return sequences.map(seq => {
      if (seq.length > maxLen) {
        if (truncating === 'pre') {
          seq.splice(0, seq.length - maxLen);
        } else {
          seq.splice(maxLen, seq.length - maxLen);
        }
      }
  
      if (seq.length < maxLen) {
        const pad = [];
        for (let i = 0; i < maxLen - seq.length; ++i) {
          pad.push(value);
        }
        if (padding === 'pre') {
          seq = pad.concat(seq);
        } else {
          seq = seq.concat(pad);
        }
      }
  
      return seq;
    });
}

function decodeSentiment(score, includeNeutral=true) {
    const SENTIMENT_THRESHOLDS = [0.4, 0.6];
    const NEUTRAL = 'NEUTRAL';
    const POSITIVE = 'POSITIVE';
    const NEGATIVE = 'NEGATIVE';
  
    if (includeNeutral) {
      let label = NEUTRAL;
      if (score <= SENTIMENT_THRESHOLDS[0]) {
        label = NEGATIVE;
      } else if (score >= SENTIMENT_THRESHOLDS[1]) {
        label = POSITIVE;
      }
  
      return label;
    } else {
      return score < 0.5 ? NEGATIVE : POSITIVE;
    }
  }
  
  
const getSentiment = async (req, res, next) => {
    const text = req.query.input;
    const model = await tf.loadLayersModel(handler);
    console.log('processing for -> ', text);
    
    // Preprocess text
    const words = tokenizer.tokenize(text.toLowerCase());
    const noStopWords = removeStopwords(words);
    const final_words = noStopWords.map(word => stemmer.stem(word));
    const sequence = padSequences([final_words], SEQUENCE_LENGTH);

    // Predict
    const score = model.predict(tf.tensor2d(sequence));
    const label = decodeSentiment(score.arraySync()[0][0], true);;
    
    try {
        if (score) {
            res.json({
                success: true,
                score: score.arraySync()[0][0],
                label
            });
            return;
        }
        return next();
    } catch(err) {
        res.json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getSentiment,
};