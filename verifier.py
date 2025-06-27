import base64

pass = ""

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

while True:
    x = input("Enter voter ID_")
    y = input("Enter Slack ID_")
    if custom_encrypt(y, pass) == x:
        print("Not fraud!! Yayyy!")
    else:
        print("Fraud :(")
        print(custom_encrypt(y, pass))
        print(x)
