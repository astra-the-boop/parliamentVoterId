import base64
import os
from dotenv import load_dotenv
import hmac
import hashlib
import re

load_dotenv()

passw = os.getenv("ENCRYPT_KEY")

def xor_encrypt(data, key):
    key = (key * (len(data) // len(key) + 1))[:len(data)]
    return bytes([d ^ k for d, k in zip(data, key.encode())])


def custom_encrypt(plaintext, password):
    plaintext_bytes = plaintext.encode()
    xor_with_password = xor_encrypt(plaintext_bytes, password)

    base64_encoded = base64.b64encode(xor_with_password).decode()

    xor_with_plaintext = xor_encrypt(base64_encoded.encode(), plaintext)

    final_base64_encoded = base64.b64encode(xor_with_plaintext).decode()

    final_result = final_base64_encoded.rstrip("=")
    return final_result

def physicalCode(text, key):
    digest = hmac.new(key.encode(), text.encode(), hashlib.sha256).digest()

    base36 = hex(int.from_bytes(digest, 'big'))[2:]  # remove '0x'
    base36 = int(base36, 16)
    base36_str = base36_to_str(base36).upper()

    alphanum = re.sub(r'[^A-Z0-9]', '', base36_str)

    # Return first 6 chars, padded with 'X' if needed
    return alphanum[:6].ljust(6, 'X')

def base36_to_str(num):
    chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    result = ''
    while num > 0:
        num, i = divmod(num, 36)
        result = chars[i] + result
    return result or '0'

def voterBlock(input_str, key):
    digest = hmac.new(key.encode(), input_str.encode(), hashlib.sha256).digest()
    return digest[0] % 3

while True:
    if input("[d]igital or [p]hysical").lower() == "d":
        x = input("Enter voter ID_")
        y = input("Enter Slack ID_")
        if custom_encrypt(y, passw) == x:
            print("Not fraud!! Yayyy!")
        else:
            print("Fraud :(")
            print(custom_encrypt(y, passw))
            print(x)
    else:
        x = input("Enter voter ID_")
        y = input("Enter Slack ID_")
        z = input("Enter voter block_")

        if physicalCode(custom_encrypt(y, passw), passw) == x and voterBlock(custom_encrypt(y, passw), passw) == z:
            print("Not fraud!! Yayyy!")
        else:
            print("Fraud likely :(")
            print(physicalCode(custom_encrypt(y, passw), passw))
            print(voterBlock(custom_encrypt(y, passw), passw))
            print(x)
            print(z)
