# Importing the Dependencies

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

raw_data = pd.read_csv('Datasets/phishing_data.csv')

data = raw_data.where((pd.notnull(raw_data)),'')
print(data.head())
# print(data.shape)
# giving label: spam as 1; ham as 0
data.loc[data['Category'] == 'ham', 'Category'] = 0
data.loc[data['Category'] == 'spam', 'Category'] = 1

# separating data
X = data['Message']
Y = data['Category']
# print(X)
# print(Y)

# splitting data into test and training data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=3)
# print(X.shape)
# print(X_train)
# print(X_test)

# Transforming text data to feature vectors that can be used as input to the logistic regression
feature_extraction = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True)

X_train_features = feature_extraction.fit_transform(X_train)
X_test_features = feature_extraction.transform(X_test)

# convert Y_train and Y_test values as integers
Y_train = Y_train.astype('int')
Y_test = Y_test.astype('int')

# Creating Logistic Regression instance
model = LogisticRegression()

# Training the Logistic Regression model using the training data
model.fit(X_train_features, Y_train)

# Evaluating the trained model
Y_pred = model.predict(X_test_features)
accuracy_of_model = accuracy_score(Y_test, Y_pred)

print("Accuracy: ", accuracy_of_model * 100, "%")

# input_mail = ["URGENT! Your Mobile No was awarded a £2,000 Bonus Caller Prize on 1/08/03! This is our 2nd attempt to contact YOU! Call 0871-4719-523 BOX95QU BT National Rate"]
# input_mail = ["URGENT: Your account requires immediate attention. Click now to verify your identity and prevent account suspension. Failure to act may result in service disruption."]
input_mail = ["Dear, your account has been temporarily locked due to multiple login attempts. Click the link to verify your identity and unlock your account. Ignoring this message may lead to account suspension."]
input_data_features = feature_extraction.transform(input_mail)

prediction = model.predict(input_data_features)
# accuracy_of_model = accuracy_score()
print(prediction)

if prediction[0] == 1:
    print("Spam mail")
else:
    print("Ham mail")