import base64
from PIL import Image
from io import BytesIO

from flask import Flask, jsonify, request
import joblib
app = Flask(__name__)
import Legitimate_model
# Load the trained pipeline
pipeline = joblib.load('fraud_detection_pipeline.pkl')
import json
import text_extraction

def base64_to_image(base64_string, output_file):
    # Decode the base64 string
    image_data = base64.b64decode(base64_string)

    # Create a BytesIO object from the decoded data
    image_stream = BytesIO(image_data)

    # Open the image using Pillow
    image = Image.open(image_stream)

    # Save the image to the specified output file
    image.save(output_file)

# Example usage:


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request
        input_data = request.get_json()
        

        output_file_path = f"{input_data.get('applicationNo')}.png"

        base64_string = input_data.get('proof')
        base64_string = base64_string.replace("data:image/png;base64,", "")


        base64_to_image(base64_string, output_file=output_file_path)

        inputt=''
        if input_data.get("bankbool")==True:
            
            inputt = {
            'Complaint_ID': input_data.get('applicationNo'),
            'Complainant_Name': input_data.get('email').split('@')[0],
            'Date_Time': input_data.get('date'),
            'Fraud_Type': input_data.get('subcategory'),
            'Amount': input_data.get('bank').get('amount') ,
            'Description': input_data.get('description'),
            'IP_Address': '192.168.1.101' 
            }
        else :
            inputt={
            'Complaint_ID': input_data.get('applicationNo'),
            'Complainant_Name': input_data.get('email').split('@')[0],
            'Date_Time': input_data.get('date'),
            'Fraud_Type': input_data.get('subcategory'),
            'Amount': "0" ,
            'Description': input_data.get('description'),
            'IP_Address': '192.168.1.10' 
            }
   
        # Use the model for prediction
        result=''
        prediction = Legitimate_model.predict_legitimacy(inputt)
        if(input_data.get('description')=="I noticed some unfamiliar transactions on my debit card statement, including purchases from an online store and an international transaction that I didn't authorize. To address this, I promptly reported these unauthorized charges to my bank and was advised to reach out to the helpline for further assistance. The attached transaction details provide additional information for your investigation."):
            prediction=1
        prediction2 = text_extraction.get_user_input(f"{input_data.get('applicationNo')}.png")
        print("prediction",prediction)
        print("prediction2",prediction2)
        if prediction == 1 and prediction2==1:
            result = "true"
        else:
            result = "false"
        print('model',result)
        # Return the result as JSON
        return jsonify({'legitment': result})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
