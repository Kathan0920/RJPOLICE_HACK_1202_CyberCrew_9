from PIL import Image
import pytesseract
import fitz  #PyMuPDF
from urllib.parse import urlparse
import tldextract
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def is_pdf(path_to_pdf):
    try:
        with fitz.open(path_to_pdf) as pdf_document:
            return pdf_document.is_pdf  
    except:
        return False

def is_image(path_to_image):
    try: 
        with Image.open(path_to_image):
            return True   
    except:
        return False


def extract_text_from_pdf(path_to_pdf):
    doc = fitz.open(path_to_pdf)
    text = ""
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()
    return text

def extract_text_from_image(path_to_image):
    image = Image.open(path_to_image)
    text = pytesseract.image_to_string(image)

    return text

def extract_urls(text):
    # Regular expression pattern to match URLs
    url_pattern = re.compile(r'https?://\S\s*+|www\s*\S+|\.com\S\s+|://\S+|htt\S+')
    # url_pattern = url_pattern = re.compile(r'(?:https?://|www\s*\.)\S+')
    # url_pattern = re.compile(r'\bh(?:ttps?)?(:?//|www\.|com|)\S*')
    # url_pattern = re.compile(r'\bh(?:ttps?)?[:/\.]|www\.|com\S*')
    # Find all matches of the pattern in the text
    urls = re.findall(url_pattern, text)
    return urls

# def extract_urls(text):
#     extractor = tldextract.TLDExtract()
#     urls = []
#     for match in re.finditer(r'http[s]?://(?:[a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(?:/[^/\s]*)*',text):
#         url = match.group(0)
#         parts = extractor(url)
#         if parts.domain and parts.suffix:
#             corrected_url = f"{parts.scheme}://{parts.domain}.{parts.suffix}"
#             urls.append(corrected_url)

#     # raw_urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text)

#     # urls = [urlparse(url)._replace(path=urlparse(url).path.replace(' ', '%20')).geturl() for url in raw_urls]
#     # return urls
#     return urls

def extract_keywords(text):
    keywords = [
        "unauthorized access", "unauthorized login", "login from unknown location",
        "suspicious activity", "unusual behavior", "phishing attempt",
        "account compromise", "email takeover", "security alert",
        "password reset", "2FA disabled", "changes in account settings",
        "login from new device", "device information mismatch",
        "changes in account settings", "reported suspicious email",
        "service provider alert", "incredible savings", "unbelievable discounts", 
        "too-good-to-be-true deals", "exclusive offers", "limited time only", "act now",
        "last chance", "only a few left", "payment required for access",
        "payment for a supposed free offer", "guaranteed success", "guaranteed earnings"
        "guaranteed results", "instant wealth", "link", "URL", "scam", "warning", "attached",
        "redirection", "new device", "withdrawal", "purchase", "transaction", "payment", "alert",
        "unknown website", "unauthorized access", "suspicious login",
        "unknown device login", "unusual activity detected", "unrecognized device login",
        "investment", "job offer", "lottery", "work from home", "Password change", "account restricted",
        "account deleted", "account", "restricted", "download file", "download attached document",
        "download app", "file attached", "call us", "reset password", "visit our website",
        "someone unknown", "tried to access"
    ]

    pattern = re.compile(r'\b(?:' + '|'.join(re.escape(keyword) for keyword in keywords) + r')\b', flags=re.IGNORECASE)
    matches = re.findall(pattern, text)

    return matches

def get_user_input():
    file_path = input("Enter the file path: ")
    file_type = ''

    if is_pdf(file_path):
        file_type = 'PDF'
        print(f"The file is a {file_type}.")
    elif is_image(file_path):
        file_type = 'Image'
        print(f"The file ia a {file_type}.")
    else:
        print("The file is neither a PDF nor an Image.")

    # extracted_text = ''
    if file_type == 'PDF':
        extracted_text = extract_text_from_pdf(file_path)
    elif file_type == 'Image':
        extracted_text = extract_text_from_image(file_path)
    else:
        print("Please provide PDF or Image only.")

    print(extracted_text)

    result = ''
    if extracted_text:
        matches = list(set(extract_keywords(extracted_text)))
        urls = extract_urls(extracted_text)
        if matches:
            # print("keywords found:", matches)
            result = 1
            print(result)
        else:
            # print(f"No keywords found in the {file_type}.")
            result = 0
            print(result)
        if urls:
            print(f"URLs found in the {file_type}:", urls)
        else:
            print(f"No URLs found in the {file_type}.")
    else:
        print(f"failed to extract text from {file_type}")

    return result


