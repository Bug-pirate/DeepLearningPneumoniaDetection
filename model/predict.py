import sys
import json
import torch
import torch.nn as nn
import numpy as np
from PIL import Image
import os
from torchvision import transforms, models

# ----------------------------
# CONFIG
# ----------------------------
IMG_SIZE = 224
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "best_pneumonia_model.pth"
)

# ----------------------------
# CBAM MODULE (SAME AS TRAINING)
# ----------------------------
class CBAM(nn.Module):
    def __init__(self, channels, reduction=16):
        super().__init__()
        self.channel = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Conv2d(channels, channels // reduction, 1),
            nn.ReLU(),
            nn.Conv2d(channels // reduction, channels, 1),
            nn.Sigmoid()
        )
        self.spatial = nn.Sequential(
            nn.Conv2d(2, 1, kernel_size=7, padding=3),
            nn.Sigmoid()
        )

    def forward(self, x):
        x = x * self.channel(x)
        avg = torch.mean(x, dim=1, keepdim=True)
        mx, _ = torch.max(x, dim=1, keepdim=True)
        x = x * self.spatial(torch.cat([avg, mx], dim=1))
        return x

# ----------------------------
# MODEL DEFINITIONS
# ----------------------------
class ResNet50_CBAM(nn.Module):
    def __init__(self):
        super().__init__()
        base = models.resnet50(weights=None)
        self.features = nn.Sequential(*list(base.children())[:-2])
        self.cbam = CBAM(2048)
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Linear(2048, 2)

    def forward(self, x):
        x = self.features(x)
        x = self.cbam(x)
        x = self.pool(x).flatten(1)
        return self.fc(x)

class DenseNet121_CBAM(nn.Module):
    def __init__(self):
        super().__init__()
        base = models.densenet121(weights=None)
        self.features = base.features
        self.cbam = CBAM(1024)
        self.fc = nn.Linear(1024, 2)

    def forward(self, x):
        x = self.features(x)
        x = self.cbam(x)
        x = nn.functional.relu(x)
        x = nn.functional.adaptive_avg_pool2d(x, 1).flatten(1)
        return self.fc(x)

class EnsembleModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.r = ResNet50_CBAM()
        self.d = DenseNet121_CBAM()
        self.w = nn.Parameter(torch.tensor([0.5, 0.5]))

    def forward(self, x):
        w = torch.softmax(self.w, dim=0)
        return w[0] * self.r(x) + w[1] * self.d(x)

# ----------------------------
# LOAD MODEL
# ----------------------------
def load_model():
    model = EnsembleModel().to(DEVICE)

    state_dict = torch.load(MODEL_PATH, map_location=DEVICE)
    model.load_state_dict(state_dict)

    model.eval()
    return model



# ----------------------------
# IMAGE PREPROCESSING
# ----------------------------
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)
    return image.to(DEVICE)

# ----------------------------
# PREDICT
# ----------------------------
def predict(image_path):
    model = load_model()
    image = preprocess_image(image_path)

    with torch.no_grad():
        outputs = model(image)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred = torch.max(probs, dim=1)

    result = "Pneumonia Detected" if pred.item() == 1 else "Normal"

    print(json.dumps({
        "result": result,
        "confidence": round(confidence.item(), 4)
    }))

# ----------------------------
# ENTRY POINT
# ----------------------------
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python predict.py <image_path>"}))
        sys.exit(1)

    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        print(json.dumps({"error": "Image file not found"}))
        sys.exit(1)

    predict(image_path)
