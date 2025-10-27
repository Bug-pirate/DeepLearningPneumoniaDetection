import sys
import json
import numpy as np
from tensorflow import keras
from PIL import Image
import os

IMG_SIZE = 224
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.h5')

def load_model():
    try:
        model = keras.models.load_model(MODEL_PATH)
        return model
    except Exception as e:
        print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
        sys.exit(1)

def preprocess_image(image_path):
    try:
        img = Image.open(image_path).convert('RGB')
        img = img.resize((IMG_SIZE, IMG_SIZE))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        print(json.dumps({"error": f"Failed to process image: {str(e)}"}))
        sys.exit(1)

def predict(image_path):
    model = load_model()
    img_array = preprocess_image(image_path)
    
    prediction = model.predict(img_array, verbose=0)
    confidence = float(prediction[0][0])
    
    if confidence > 0.5:
        result = "Pneumonia Detected"
    else:
        result = "Normal"
        confidence = 1 - confidence
    
    output = {
        "result": result,
        "confidence": round(confidence, 4)
    }
    
    print(json.dumps(output))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python predict.py <image_path>"}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(json.dumps({"error": "Image file not found"}))
        sys.exit(1)
    
    predict(image_path)
