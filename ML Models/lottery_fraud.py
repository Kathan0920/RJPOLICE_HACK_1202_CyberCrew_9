# Importing the Dependencies
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Read the dataset (replace 'your_lottery_dataset.csv' with the actual path to your dataset)
q_data = pd.read_csv('C:\Users\bansa\OneDrive\Desktop\python\lottery_data.csv')

# Replace missing values with empty string
data = q_data.where((pd.notnull(q_data)), '')

# Print the first few rows of the data
print(data.head())

# Map labels to 0 and 1
data['label'] = data['label'].map({'legitimate': 0, 'fraud': 1})

# Separate data
X = data['message']
Y = data['label']

# Split the data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.1, random_state=3)

# Transform text data to feature vectors using TF-IDF
feature_extraction = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True)

X_train_features = feature_extraction.fit_transform(X_train)
X_test_features = feature_extraction.transform(X_test)

# Convert Y_train and Y_test values to integers
Y_train = Y_train.astype('int')
Y_test = Y_test.astype('int')

# Create a Logistic Regression instance
model = LogisticRegression()

# Train the Logistic Regression model using the training data
model.fit(X_train_features, Y_train)

# Evaluate the trained model
Y_pred = model.predict(X_test_features)
accuracy_of_model = accuracy_score(Y_test, Y_pred)

print("Accuracy: ", accuracy_of_model * 100, "%")

# Test with a new message
input_mail = ["Congratulations! You've won the lottery! Claim your prize now by calling 1-800-123-4567."]
input_data_features = feature_extraction.transform(input_mail)

prediction = model.predict(input_data_features)

if prediction[0] == 1:
    print("Lottery fraud")
else:
    print("Not fraud")
