import pickle
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask import Flask, jsonify, request

SEQUENCE_LENGTH = 300
# Tokenize text
# tokenizer = Tokenizer()
tokenizer = pickle.load(open('tokenizer.pkl','rb'))

app = Flask(__name__)
app.config["DEBUG"] = True

def decode_sentiment(score, include_neutral=True):
    # SENTIMENT
    POSITIVE = "POSITIVE"
    NEGATIVE = "NEGATIVE"
    NEUTRAL = "NEUTRAL"
    SENTIMENT_THRESHOLDS = (0.4, 0.7)

    if include_neutral:        
        label = NEUTRAL
        if score <= SENTIMENT_THRESHOLDS[0]:
            label = NEGATIVE
        elif score >= SENTIMENT_THRESHOLDS[1]:
            label = POSITIVE

        return label
    else:
        return NEGATIVE if score < 0.5 else POSITIVE

def getTest(text, include_neutral=True):
    x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=SEQUENCE_LENGTH)
    # Predict
    return x_test

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/predict', methods=['GET'])
def predict():
    # Load the model
    args = request.args
    input_text = args.get('input')
    print(input_text)
    model = load_model('model.h5')
    # Get the input data from the request
    data = getTest(input_text)
    # data = getTest('It is a disaster near the mountains today')

    # Make a prediction using your trained model
    prediction = model.predict([data])
    label = decode_sentiment(prediction, include_neutral=True)

    # Return the prediction as a JSON object
    return jsonify({"label": label, "score": float(prediction[0])})


if __name__ == '__main__':
    app.run()
