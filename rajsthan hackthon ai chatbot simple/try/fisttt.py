import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC  # Example algorithm, consider others
from sklearn.metrics import accuracy_score

# Load and preprocess dataset
data = pd.read_csv("your_legal_dataset.csv")
X = data[["features"]]  # Select relevant features
y = data["outcome"]  # Target variable

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = SVC()  # Adjust hyperparameters as needed
model.fit(X_train, y_train)

# Make predictions on the test set
predictions = model.predict(X_test)

# Evaluate model performance
accuracy = accuracy_score(y_test, predictions)
print("Accuracy:", accuracy)
