# Pneumonia Detection using Chest X-ray Images

A full-stack web application that uses deep learning to detect pneumonia from chest X-ray images. The system combines an ensemble of CNN models (ResNet50 and DenseNet121) for accurate predictions.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Dataset Attribution](#dataset-attribution)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Training the Model](#training-the-model)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)

## ✨ Features
- Upload chest X-ray images for pneumonia detection
- Ensemble deep learning model for accurate predictions
- Real-time inference with loading animations
- RESTful API architecture
- Responsive web interface

## 🛠️ Tech Stack
- **Frontend**: React, Axios, CSS3
- **Backend**: Node.js, Express.js, Multer
- **ML Model**: Python, TensorFlow/Keras, ResNet50, DenseNet121
- **Dataset**: Kaggle Chest X-Ray Pneumonia Dataset

## 📚 Dataset Attribution
This project uses the **Chest X-Ray Images (Pneumonia)** dataset from Kaggle:
- **Source**: [Kaggle - Chest X-Ray Pneumonia Dataset](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)
- **License**: Available for non-commercial educational use
- **Citation**: Kermany, Daniel; Zhang, Kang; Goldbaum, Michael (2018)

**Note**: This project is for educational purposes only. Not intended for clinical use.

## 📁 Project Structure
```
PneumoniaDetection/
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/               # Node.js Express server
│   ├── uploads/          # Uploaded images directory
│   ├── server.js
│   └── package.json
├── model/                # Python ML model
│   ├── train_model.py   # Training script
│   ├── predict.py       # Inference script
│   ├── model.h5         # Trained model (generated)
│   └── requirements.txt
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PneumoniaDetection
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Python Environment Setup
```bash
cd model
pip install -r requirements.txt
```

## 🧠 Training the Model

### Step 1: Download the Dataset
1. Go to [Kaggle Chest X-Ray Dataset](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)
2. Download and extract to `model/chest_xray/` directory
3. Structure should be:
   ```
   model/
   └── chest_xray/
       ├── train/
       │   ├── NORMAL/
       │   └── PNEUMONIA/
       ├── test/
       │   ├── NORMAL/
       │   └── PNEUMONIA/
       └── val/
           ├── NORMAL/
           └── PNEUMONIA/
   ```

### Step 2: Train the Model
```bash
cd model
python train_model.py
```

This will:
- Train ResNet50 and DenseNet121 models
- Create an ensemble model
- Save the trained model as `model.h5`
- Training takes approximately 30-60 minutes on GPU

### Step 3: Test Prediction Locally
```bash
python predict.py path/to/xray/image.jpeg
```

Expected output:
```json
{"result": "Pneumonia Detected", "confidence": 0.95}
```

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server runs on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm start
```
Application opens at `http://localhost:3000`

### Full Stack Testing
1. Navigate to `http://localhost:3000`
2. Click "Pneumonia Detection" in navigation
3. Upload a chest X-ray image
4. Click "Analyze X-Ray"
5. View prediction result

## 🌐 Deployment

### Deploy to Render

#### Backend Deployment
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**: 
     - `PORT=5000`
     - `PYTHON_PATH=/usr/bin/python3`

#### Frontend Deployment
1. Create a new Static Site on Render
2. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variables**:
     - `REACT_APP_API_URL=<your-backend-url>`

### Deploy to Railway

#### Backend + Python Model
1. Create new project on [Railway](https://railway.app)
2. Add Python buildpack for model support
3. Set environment variables:
   ```
   PORT=5000
   PYTHON_VERSION=3.9
   ```
4. Deploy from GitHub repository

#### Frontend
1. Create separate Railway service
2. Set build command: `npm run build`
3. Set start command: `npx serve -s build -l $PORT`
4. Add environment variable: `REACT_APP_API_URL`

### Important Deployment Notes
- Upload `model.h5` to backend repository (if <100MB)
- For larger models, use cloud storage (AWS S3, Google Cloud Storage)
- Configure CORS in backend for frontend domain
- Use environment variables for all API URLs

## 📡 API Documentation

### POST `/predict`
Upload chest X-ray image for pneumonia detection.

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response**:
```json
{
  "result": "Pneumonia Detected",
  "confidence": 0.95
}
```

or

```json
{
  "result": "Normal",
  "confidence": 0.92
}
```

**Error Response**:
```json
{
  "error": "Error message"
}
```

## 🔧 Troubleshooting

### Python not found error
- Ensure Python is installed and in PATH
- Update `PYTHON_PATH` in backend if needed

### Model file not found
- Ensure `model.h5` exists in `model/` directory
- Run training script if missing

### CORS errors
- Check backend CORS configuration
- Verify frontend API URL matches backend URL

## 📄 License
This project is for educational purposes only. Not for commercial use or clinical diagnosis.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact
For questions or issues, please open a GitHub issue.
