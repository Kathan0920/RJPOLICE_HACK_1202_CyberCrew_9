import random

def simple_chatbot(input_text):
    input_text = input_text.lower()

    # Define patterns and corresponding responses
    patterns = [
        {'pattern': 'hello', 'response': ['Hi there!', 'Hello!', 'Hey!']},
        {'pattern': 'how are you', 'response': ['I\'m good, thanks!', 'I\'m doing well.', 'Not bad.']},
        {'pattern': 'what is your name', 'response': ['I\'m a chatbot.', 'I don\'t have a name. Call me bot.']},
        {'pattern': 'bye', 'response': ['Goodbye!', 'See you later!', 'Bye!']},
    ]

    # Check for matches in input_text
    response = None
    for pattern_set in patterns:
        if any(keyword in input_text for keyword in pattern_set['pattern'].split()):
            response = random.choice(pattern_set['response'])
            break

    # If no match found, provide a default response
    if response is None:
        response = "I'm sorry, I don't understand that."

    return response

# Main loop for the chatbot
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        print("Chatbot: Goodbye!")
        break

    bot_response = simple_chatbot(user_input)
    print("Chatbot:", bot_response)
