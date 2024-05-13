from flask import Flask, request, jsonify
import threading
import requests
import time
import argparse

from predict import predict
from utils import init_logger

init_logger()
app = Flask(__name__)

pred_config = argparse.Namespace(
    model_dir="./model",
    batch_size=32,
    no_cuda=True
)

def process_data(text, callback_url):
    result = predict(text)
    
    # TODO test connection
    requests.post('http://backend:8000/api/diary/emotion', json={""})

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.json
    text = data.get('content', '')
    diary = data.get('diary', '')

    # Start the processing in a background thread
    thread = threading.Thread(target=process_data, args=(text))
    thread.start()
    
    # Immediately respond that the request has been received
    return jsonify({"message": "Data received, processing started."}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)