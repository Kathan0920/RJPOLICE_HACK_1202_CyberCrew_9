import spacy

def extract_entities(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    entities = {}

    for ent in doc.ents:
        entities[ent.label_] = ent.text

    return entities

def gather_file_complaint_details():
    print("File-related complaint detected. Gathering information:")

    fields = ["state", "email", "mobile number", "name", "address", "dob", "gender"]
    gathered_info = {}

    for field in fields:
        user_input = input(f"Please provide your {field}: ")
        gathered_info[field] = user_input

    print("\nFile-related complaint details gathered:")
    for field, value in gathered_info.items():
        print(f"{field.capitalize()}: {value}")

def gather_incident_details():
    print("Incident details detected. Gathering information:")

    fields = ["category of complaint", "lost money", "bank details", "account", "ifsc", "time of fraud"]
    gathered_info = {}

    for field in fields:
        user_input = input(f"Please provide {field}: ")
        gathered_info[field] = user_input

    print("\nIncident details gathered:")
    for field, value in gathered_info.items():
        print(f"{field.capitalize()}: {value}")

def main():
    prompt = input("Please provide your complaint details: ")

    if "file" in prompt.lower() and "complaint" in prompt.lower():
        gather_file_complaint_details()
    elif "incident" in prompt.lower() and "details" in prompt.lower():
        gather_incident_details()
    else:
        print("Sorry, I couldn't detect the type of complaint.")

if __name__ == "__main__":
    main()
