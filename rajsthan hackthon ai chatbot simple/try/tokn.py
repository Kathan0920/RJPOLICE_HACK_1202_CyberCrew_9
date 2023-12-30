from transformers import GPT2LMHeadModel, GPT2Tokenizer

def initialize_model():
    model_name = "gpt2"
    model = GPT2LMHeadModel.from_pretrained(model_name)
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    return model, tokenizer

def generate_response(model, tokenizer, user_input, max_length=100):
    input_ids = tokenizer.encode(user_input, return_tensors="pt")
    output = model.generate(input_ids, max_length=max_length, num_beams=5, no_repeat_ngram_size=2, top_k=50, top_p=0.95, temperature=0.7)
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    return response

def main():
    model, tokenizer = initialize_model()
    print("Chatbot: Hello! I'm your chatbot. You can start chatting or type 'exit' to end the conversation.")

    while True:
        user_input = input("You: ")
        
        if user_input.lower() == 'exit':
            print("Chatbot: Goodbye!")
            break

        response = generate_response(model, tokenizer, user_input)
        print("Chatbot:", response)

if __name__ == "__main__":
    main()
