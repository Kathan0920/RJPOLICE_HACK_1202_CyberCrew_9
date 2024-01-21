from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model and fitted vectorizer
model = joblib.load('your_model.pkl')
vectorizer = joblib.load('your_vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        input_mail = data.get('description')
        print(input_mail)
        # Transform input data using the fitted vectorizer
        input_data_features = vectorizer.transform([input_mail])
        
        prediction = model.predict(input_data_features)[0]
        if prediction == 1:
            result = "true"
        else:
            result = "false"

        return jsonify({'legitment': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True,port=5000)
