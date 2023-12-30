import spacy
import random

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

def helpline_chatbot(input_text):
    input_text = input_text.lower()

    # Define patterns and corresponding responses
    patterns = [
        {'pattern': 'lost', 'response': 'Im sorry to hear that youve lost something. Please provide details so I can assist you further.'},
        {'pattern': 'accident', 'response': 'Im sorry to hear about the accident. Please provide information about the incident so we can guide you on the next steps.'},
        {'pattern': 'medical emergency', 'response': 'Im sorry youre experiencing a medical emergency. Please call emergency services immediately. If you need further assistance, provide more details.'},
        # Add more patterns based on the helpline's services
    ]

    # Use spaCy for tokenization and part-of-speech tagging
    doc = nlp(input_text)

    # Extract verbs from the user input
    verbs = [token.text for token in doc if token.pos_ == "VERB"]

    # Check for matches in input_text
    response = None
    for pattern_set in patterns:
        if any(keyword in input_text for keyword in pattern_set['pattern'].split()):
            response = pattern_set['response']
            break

    # If the user input contains a verb, generate a response based on the verb
    if not response and verbs:
        response = f"I don't have specific actions for verbs yet, but I noticed you mentioned {verbs[0]}."

    # If no match found, provide a default response
    if response is None:
        response = "I'm sorry, I don't have enough information to assist you. Please provide more details."

    return response

# Main loop for the chatbot
print("1930 Helpline Chatbot: Hello! How can I help you today?")
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        print("Chatbot: Goodbye!")
        break

    bot_response = helpline_chatbot(user_input)
    print("Chatbot:", bot_response)
