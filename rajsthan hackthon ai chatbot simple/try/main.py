import spacy
import random

# Load the English NLP model
nlp = spacy.load("en_core_web_sm")
gathered_info = {}

# Define a list of responses
responses = [
]

def process_input(input_text):
    # Process the input text using SpaCy
    doc = nlp(input_text)
    
    # Extract entities
    entities = input_text.split(' ')
    
    # Extract verbs
    verbs = [token.text for token in doc if token.pos_ == "VERB"]
    
    return entities, verbs

def generate_response(entities,verbs):
    # Placeholder for more sophisticated logic based on the processed input
    # For now, just return a random response
    # return random.choice(responses)
    if "file" in entities and "complaint" in entities:
        
        fields = ["category of complaint", "lost money", "bank details", "account", "ifsc", "time of fraud"]
        return {"fields":fields}
    elif "incident":
        fields = ["category of complaint", "lost money", "bank details", "account", "ifsc", "time of fraud"]
        return {"fields":fields}

    elif verbs:
        # If there are verbs, you can handle specific actions based on them
        return {'message':f"I noticed you mentioned a verb: {verbs[0]}"}
    else:
        return {"message":"no"}

# Main loop for chatting
while True:
    user_input = input("You: ")
    
    if user_input.lower() in ['exit', 'quit', 'bye']:
        print("Goodbye!")
        break
    
    # Process the user input
    entities,verbs = process_input(user_input)
    print(entities)
    # Generate a response based on the processed input
    bot_response = generate_response(entities,verbs)
    
    print("Bot:", bot_response)
