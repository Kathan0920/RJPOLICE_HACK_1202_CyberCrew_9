#!/usr/bin/env python
# coding: utf-8

# In[3]:


import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Assuming your data is in a CSV file named 'fraud_data.csv'
data = pd.read_csv("./Datasets/Final_dataset.csv")

# Convert "Amount" column to numeric format
data['Amount'] = data['Amount'].replace('[\$,]', '', regex=True).astype(float)

# Split the data into features and target variable
X = data.drop("Legitimate", axis=1)
y = data["Legitimate"]

# Define categorical and numerical features
categorical_features = ["Complainant_Name", "Fraud_Type", "Description", "IP_Address"]
numerical_features = ["Amount"]

# Preprocessing for numerical data
numerical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler())
])

# Preprocessing for categorical data
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

# Bundle preprocessing for numerical and categorical data
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Define the model (XGBoost)
model = XGBClassifier(random_state=42)

# Bundle preprocessing and modeling code in a pipeline
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                             ('classifier', model)])

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
pipeline.fit(X_train, y_train)

# Make predictions on the test set
y_pred = pipeline.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
joblib.dump(model, 'legitimate.pkl')

print(f"Model Accuracy: {accuracy:.2f}")
print("\nClassification Report:\n", report)

# Function to preprocess input data
def preprocess_input(input_data):
    # Assuming input_data is a dictionary with keys corresponding to the column names
    # You may need to modify this based on the actual input format
    input_df = pd.DataFrame([input_data])
    
    # Convert "Amount" column to numeric format
    input_df['Amount'] = input_df['Amount'].replace('[\$,]', '', regex=True).astype(float)
    
    # Perform other necessary preprocessing steps
    
    return input_df

# Function to predict legitimacy
def predict_legitimacy(input_data):
    # Preprocess the input data
    input_df = preprocess_input(input_data)
    
    # Make predictions
    prediction = pipeline.predict(input_df)
    
    return prediction[0]

# Example input (you can modify this based on your actual input format)
input_data = {
    'Complaint_ID': 284,
    'Complainant_Name': 'Divya verme',
    'Date_Time': '2026-01-04 12:00:00',
    'Fraud_Type': 'UPI',
    'Amount': '500',
    'Description': 'Hey folks, just got hit with some wild E-wallet rollercoaster during my digital spending spree. Tried to make it rain with funds, but my wallet decided to ghost me. Check out the deets Im tossing your way—need some magic to resurrect my cash, like, pronto!',
    'IP_Address': '192.168.1.10'
}

# Predict legitimacy

prediction_result = predict_legitimacy(input_data)

if prediction_result == 1:
    print("The input is predicted to be legitimate.")
else:
    print("The input is predicted to be fraudulent.")

joblib.dump(pipeline, 'fraud_detection_pipeline.pkl')




# %%
