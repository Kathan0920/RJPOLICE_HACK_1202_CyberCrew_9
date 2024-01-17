from flask import Flask, jsonify, request
import joblib
app = Flask(__name__)
import Legitimate_model
# Load the trained pipeline
pipeline = joblib.load('fraud_detection_pipeline.pkl')
import json
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request
        input_data = request.get_json()
        inputt=''
        if input_data.get("bankbool")==True:
            
            inputt = {
            'Complaint_ID': input_data.get('applicationNo'),
            'Complainant_Name': input_data.get('email'),
            'Date_Time': input_data.get('date'),
            'Fraud_Type': input_data.get('subcategory'),
            'Amount': input_data.get('bank').get('amount') ,
            'Description': input_data.get('description'),
            'IP_Address': '192.168.1.10' 
            }
        else :
            inputt={
                 'Complaint_ID': input_data.get('applicationNo'),
            'Complainant_Name': input_data.get('email'),
            'Date_Time': input_data.get('date'),
            'Fraud_Type': input_data.get('subcategory'),
            'Amount': "0" ,
            'Description': input_data.get('description'),
            'IP_Address': '192.168.1.10' 
            }
   
        # Use the model for prediction
        result=''
        prediction = Legitimate_model.predict_legitimacy(inputt)
        if prediction == 1:
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
