from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # This will allow all domains. You can restrict it if needed.
model = joblib.load("emotion_model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    message = data.get("message", "")
    print("Received message:", message)  # 👈 Log input
    prediction = model.predict([message])[0]
    print("Model prediction:", prediction)  # 👈 Log prediction
    
    response_map = {
        "sad": "I'm here for you. It's okay to feel sad.",
        "happy": "That's wonderful! Stay happy!",
        "anxious": "Take a deep breath. You're doing okay.",
        "angry": "Let's talk about it calmly.",
        "lonely": "You're not alone. I'm listening.",
    }

    return jsonify({
        "success": True,
        "prediction": response_map.get(prediction, "I'm here to listen.")
    })
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to the DeepTalk Model Server",
        "status": "Running"
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8800, debug=True)
