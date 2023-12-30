import random

def get_user_input():
    return input("You: ")

def respond_to_greeting():
    responses = ["Hello! How can I assist you today?", "Hi there! How can I help?", "Greetings! What can I do for you?"]
    return random.choice(responses)

def respond_to_complaint():
    return "I'm here to help you file a cybercrime complaint. Let's get started."

def handle_cybercrime_complaint(complainant_info):
    # Implement your logic to handle the cybercrime complaint, e.g., save to a file, send to authorities, etc.
    # For now, let's print the details.
    print("\nSummary of Information:")
    print("Complainant Information:", complainant_info)
    print("Additional processing can be added here.\n")

    return "Thank you for providing the information. Your complaint has been recorded."

def main_chatbot():
    print("Cybercrime Complaint Chatbot: Hello! I'm here to assist you.")
    complainant_info = {}

    while True:
        user_input = get_user_input()

        if 'exit' in user_input.lower():
            print("Chatbot: Goodbye!")
            break

        elif any(greeting in user_input.lower() for greeting in ["hello", "hi", "hey"]):
            print("Chatbot:", respond_to_greeting())

        elif 'file complaint' in user_input.lower():
            print("Chatbot:", respond_to_complaint())
            complainant_info['name'] = input("Your Name: ")
            complainant_info['address'] = input("Your Address: ")
            complainant_info['contact_number'] = input("Your Contact Number: ")
            complainant_info['email'] = input("Your Email Address: ")
            complainant_info['id_proof'] = input("Your Identification Proof (upload link or mention 'NA' if not applicable): ")

            # Optional Information
            complainant_info['website_urls'] = input("Suspected Website URLs (if applicable): ")
            complainant_info['social_media_handles'] = input("Suspected Social Media Handles (if applicable): ")

            print("\nOptional Suspect Details (if available):")
            complainant_info['suspect_mobile'] = input("Suspect's Mobile Number (if available): ")
            complainant_info['suspect_email'] = input("Suspect's Email ID (if available): ")
            complainant_info['bank_account_no'] = input("Suspect's Bank Account Number (if available): ")
            complainant_info['suspect_address'] = input("Suspect's Address (if available): ")
            complainant_info['suspect_photo'] = input("Upload a photograph of the suspect (JPEG, JPG, PNG format, not more than 5 MB): ")
            complainant_info['other_identification'] = input("Any other document through which the suspect can be identified (upload link or mention 'NA' if not applicable): ")

            print("Chatbot:", handle_cybercrime_complaint(complainant_info))
            break  # End the conversation after handling the complaint

        else:
            print("Chatbot: I'm sorry, I didn't understand that. Can you please rephrase or ask a different question?")

# Main loop for the chatbot
main_chatbot()
