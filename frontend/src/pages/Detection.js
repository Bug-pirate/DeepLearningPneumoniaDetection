import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import './Detection.css';

function Detection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
        setError('Please upload a valid image file (JPEG, JPG, or PNG)');
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.error || 
        'Failed to analyze image. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const isPneumonia = result?.result?.includes('Pneumonia');
  const confidencePercent = result ? (result.confidence * 100).toFixed(1) : 0;

  return (
    <div className="detection">
      {/* Background Elements */}
      <div className="detection-bg">
        <div className="bg-gradient"></div>
      </div>

      <div className="detection-container">
        {/* Header */}
        <div className="detection-header">
          <span className="page-badge">🔬 AI Analysis</span>
          <h1 className="page-title">Pneumonia Detection</h1>
          <p className="page-subtitle">
            Upload a chest X-ray image for instant AI-powered analysis
          </p>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-input"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            {!preview ? (
              <label htmlFor="file-input" className="upload-label">
                <div className="upload-icon-wrapper">
                  <div className="upload-icon-bg"></div>
                  <span className="upload-icon">📤</span>
                </div>
                <div className="upload-content">
                  <p className="upload-text">
                    <span className="upload-text-main">Drop your X-ray here</span>
                    <span className="upload-text-or">or</span>
                    <span className="upload-text-browse">Browse files</span>
                  </p>
                  <p className="upload-hint">
                    <span className="hint-formats">JPEG, JPG, PNG</span>
                    <span className="hint-divider">•</span>
                    <span className="hint-size">Max 10MB</span>
                  </p>
                </div>
              </label>
            ) : (
              <div className="preview-container">
                <div className="preview-wrapper">
                  <img src={preview} alt="X-ray Preview" className="preview-image" />
                  <div className="preview-overlay">
                    <span className="preview-filename">{selectedFile?.name}</span>
                  </div>
                </div>
                <button onClick={handleReset} className="reset-button">
                  <span className="reset-icon">✕</span>
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {selectedFile && !loading && !result && (
            <button onClick={handleUpload} className="analyze-button">
              <span className="btn-icon">🔬</span>
              Analyze X-Ray
              <span className="btn-arrow">→</span>
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && <Loader />}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <div className="error-icon-wrapper">
              <span className="error-icon">⚠️</span>
            </div>
            <div className="error-content">
              <h3 className="error-title">Analysis Failed</h3>
              <p className="error-message">{error}</p>
            </div>
            <button onClick={handleReset} className="error-retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="result-container">
            <div className={`result-card ${isPneumonia ? 'pneumonia' : 'normal'}`}>
              {/* Result Header */}
              <div className="result-header">
                <div className={`result-icon-wrapper ${isPneumonia ? 'danger' : 'success'}`}>
                  <span className="result-icon">
                    {isPneumonia ? '🚨' : '✅'}
                  </span>
                </div>
                <div className="result-badge">
                  {isPneumonia ? 'Pneumonia Detected' : 'Normal Result'}
                </div>
              </div>

              {/* Result Title */}
              <h2 className="result-title">{result.result}</h2>

              {/* Confidence Section */}
              <div className="confidence-section">
                <div className="confidence-header">
                  <span className="confidence-label">Confidence Score</span>
                  <span className={`confidence-value ${isPneumonia ? 'danger' : 'success'}`}>
                    {confidencePercent}%
                  </span>
                </div>
                <div className="confidence-bar">
                  <div className="confidence-track">
                    <div 
                      className={`confidence-fill ${isPneumonia ? 'danger' : 'success'}`}
                      style={{ width: `${confidencePercent}%` }}
                    >
                      <div className="confidence-glow"></div>
                    </div>
                  </div>
                </div>
                <div className="confidence-scale">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Action Button */}
              <button onClick={handleReset} className="new-analysis-button">
                <span className="btn-icon">🔄</span>
                Analyze Another Image
              </button>
            </div>

            {/* Disclaimer */}
            <div className="result-disclaimer">
              <span className="disclaimer-icon">ℹ️</span>
              <p>
                <strong>Important:</strong> This is an AI-generated result for educational purposes only. 
                Please consult a qualified healthcare professional for accurate medical diagnosis and treatment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detection;
