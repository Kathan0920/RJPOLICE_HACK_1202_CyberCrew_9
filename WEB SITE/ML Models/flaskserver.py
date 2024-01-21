from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import pandas as pd

import text_extraction
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)

def base64_to_image(base64_string, output_file):
    # Decode the base64 string
    image_data = base64.b64decode(base64_string)

    # Create a BytesIO object from the decoded data
    image_stream = BytesIO(image_data)

    # Open the image using Pillow
    image = Image.open(image_stream)

    # Save the image to the specified output file
    image.save(output_file)


# Load the trained model and fitted vectorizer
model = joblib.load('your_model.pkl')
vectorizer = joblib.load('your_vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()


        input_desc = input_data.get('description')
        print(input_desc)
        # Transform input data using the fitted vectorizer
        input_data_features = vectorizer.transform([input_desc])
        
        prediction1 = model.predict(input_data_features)[0]
        print("prediction 1 ",prediction1)

        output_file_path = f"{input_data.get('applicationNo')}.png"
        base64_string = input_data.get('proof')
        base64_string = base64_string.replace("data:image/png;base64,", "")
        base64_to_image(base64_string, output_file=output_file_path)

        prediction2 = text_extraction.get_user_input(f"{input_data.get('applicationNo')}.png")
        print("prediction2",prediction2)
        
        if prediction1 == 1 and prediction2==1:
            result = "true"
        else:
            result = "false"
        print('model',result)
        return jsonify({'legitment': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True,port=5000)
