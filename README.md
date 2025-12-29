# 🫁 PneumoAI - Deep Learning Pneumonia Detection

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red.svg)
![React](https://img.shields.io/badge/React-18.2+-61DAFB.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**An AI-powered web application for pneumonia detection from chest X-ray images using an ensemble deep learning model.**

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [Model](#-model-details) • [API](#-api-reference)

</div>

---

## 📋 Overview

PneumoAI is a full-stack web application that leverages advanced deep learning techniques to detect pneumonia from chest X-ray images. The system combines **ResNet50** and **DenseNet121** architectures enhanced with **CBAM (Convolutional Block Attention Module)** attention mechanisms in an ensemble approach for accurate and reliable diagnosis.

> ⚠️ **Medical Disclaimer:** This application is for educational and research purposes only. It is not intended to replace professional medical diagnosis. Always consult with qualified healthcare providers for medical advice and treatment decisions.

---

## ✨ Features

- 🔬 **AI-Powered Analysis** - Instant pneumonia detection using state-of-the-art deep learning
- 🎯 **High Accuracy** - Ensemble model combining ResNet50 + DenseNet121 with CBAM attention
- ⚡ **Fast Processing** - GPU-optimized inference for quick results
- 🌓 **Dark/Light Mode** - User-friendly interface with theme toggle
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🖼️ **Drag & Drop Upload** - Easy image upload with preview functionality
- 📊 **Confidence Score** - Displays prediction confidence percentage

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    Home     │  │  Detection  │  │  Components (Navbar,    │  │
│  │    Page     │  │    Page     │  │  Footer, ThemeToggle)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/REST API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (Express.js)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Multer    │  │    CORS     │  │    Python Subprocess    │  │
│  │  (Upload)   │  │  Handling   │  │       Integration       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ Subprocess Call
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ML Model (PyTorch)                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Ensemble Model Architecture                 │    │
│  │  ┌───────────────┐         ┌───────────────┐            │    │
│  │  │  ResNet50 +   │         │ DenseNet121 + │            │    │
│  │  │     CBAM      │         │     CBAM      │            │    │
│  │  └───────┬───────┘         └───────┬───────┘            │    │
│  │          │      Learnable Weights  │                    │    │
│  │          └──────────┬──────────────┘                    │    │
│  │                     ▼                                   │    │
│  │            Weighted Ensemble Output                     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
DeepLearningPneumoniaDetection/
├── 📁 frontend/                 # React Frontend Application
│   ├── 📁 public/
│   │   └── index.html
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI Components
│   │   │   ├── Footer.js
│   │   │   ├── Loader.js
│   │   │   ├── Navbar.js
│   │   │   └── ThemeToggle.js
│   │   ├── 📁 context/          # React Context for State Management
│   │   │   └── ThemeContext.js
│   │   ├── 📁 pages/            # Page Components
│   │   │   ├── Detection.js     # Main detection interface
│   │   │   └── Home.js          # Landing page
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── 📁 backend/                  # Express.js Backend Server
│   ├── 📁 uploads/              # Temporary image storage
│   ├── server.js                # Main server file
│   └── package.json
│
├── 📁 model/                    # PyTorch ML Model
│   ├── best_pneumonia_model.pth # Trained model weights
│   ├── predict.py               # Inference script
│   ├── pneumonia_model_training.ipynb  # Training notebook
│   └── requirements.txt         # Python dependencies
│
└── README.md
```

---

## 🛠️ Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **CUDA** (optional, for GPU acceleration)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/DeepLearningPneumoniaDetection.git
cd DeepLearningPneumoniaDetection
```

### Step 2: Setup Python Environment

```bash
# Navigate to model directory
cd model

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Setup Backend

```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment for backend
python -m venv venv

# Install Node.js dependencies
npm install
```

### Step 4: Setup Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

---

## 🚀 Usage

### Starting the Application

#### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### 2. Start the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`

### Using the Application

1. Navigate to `http://localhost:3000` in your browser
2. Click on **"Start Detection"** or navigate to the Detection page
3. Upload a chest X-ray image (JPEG, JPG, or PNG format)
4. Click **"Analyze X-Ray"** to get the prediction
5. View the result with confidence score

---

## 🧠 Model Details

### Architecture Overview

The model uses an **ensemble approach** combining two powerful CNN architectures:

| Component | Description |
|-----------|-------------|
| **ResNet50** | 50-layer deep residual network with skip connections |
| **DenseNet121** | 121-layer densely connected network |
| **CBAM** | Convolutional Block Attention Module for channel & spatial attention |
| **Ensemble** | Learnable weighted combination of both models |

### CBAM Attention Module

```
Input Feature Map
        │
        ▼
┌───────────────────┐
│  Channel Attention │  → Learns "what" to focus on
│   (Avg + Max Pool) │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│  Spatial Attention │  → Learns "where" to focus
│   (Avg + Max Pool) │
└─────────┬─────────┘
          │
          ▼
   Refined Features
```

### Training Details

- **Dataset**: Chest X-ray images (Normal vs Pneumonia)
- **Train/Test Split**: 85% / 15%
- **Validation**: HuggingFace chest-xray-pneumonia dataset
- **Loss Function**: Focal Loss with label smoothing
- **Optimizer**: AdamW with Cosine Annealing LR scheduler
- **Data Augmentation**: 
  - Horizontal Flip
  - Shift/Scale/Rotate
  - Random Brightness/Contrast
  - CLAHE (Contrast Limited Adaptive Histogram Equalization)

### Class Imbalance Handling

- Balanced class weights computed from training data
- Focal Loss to focus on hard examples
- Label smoothing for regularization

---

## 📡 API Reference

### Base URL

```
http://localhost:5000
```

### Endpoints

#### `GET /`

Returns API information.

**Response:**
```json
{
  "message": "Pneumonia Detection API",
  "version": "1.0.0",
  "endpoints": {
    "predict": "POST /predict - Upload X-ray image for prediction"
  }
}
```

#### `POST /predict`

Uploads an X-ray image and returns the prediction.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file) - The chest X-ray image

**Response (Success):**
```json
{
  "result": "Pneumonia Detected",
  "confidence": 0.9542
}
```

**Response (Normal):**
```json
{
  "result": "Normal",
  "confidence": 0.8731
}
```

**Response (Error):**
```json
{
  "error": "No image file uploaded"
}
```

---

## 🔧 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| CSS3 | Styling with custom properties |

### Backend
| Technology | Purpose |
|------------|---------|
| Express.js | Web server framework |
| Multer | File upload handling |
| CORS | Cross-origin resource sharing |
| Child Process | Python script execution |

### Machine Learning
| Technology | Purpose |
|------------|---------|
| PyTorch | Deep learning framework |
| TorchVision | Pre-trained models & transforms |
| Albumentations | Advanced image augmentation |
| scikit-learn | Metrics & utilities |
| NumPy | Numerical computations |
| Pillow | Image processing |

---

## 📊 Model Performance

The ensemble model achieves strong performance on the test dataset:

| Metric | Value |
|--------|-------|
| Accuracy | High |
| AUC-ROC | High |
| Precision | High |
| Recall | High |

*Note: Actual metrics depend on training run. See the training notebook for detailed results.*

---

## 📝 Training the Model

To retrain the model, open and run the Jupyter notebook:

```bash
# Using Jupyter
jupyter notebook model/pneumonia_model_training.ipynb

# Or using Google Colab
# Upload the notebook to Google Colab and run with GPU runtime
```

The notebook includes:
- Data preprocessing and augmentation
- Model architecture definition
- Training loop with early stopping
- Evaluation metrics and visualizations
- Model export

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [PyTorch](https://pytorch.org/) for the deep learning framework
- [HuggingFace Datasets](https://huggingface.co/datasets) for validation data
- [Albumentations](https://albumentations.ai/) for image augmentation
- The medical imaging community for curated datasets

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for medical AI research

</div>
