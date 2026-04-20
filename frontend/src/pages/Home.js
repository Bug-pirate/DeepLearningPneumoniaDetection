import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaBolt,
  FaBook,
  FaBrain,
  FaBullseye,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaExclamationTriangle,
  FaMicroscope,
  FaRocket,
  FaStar,
} from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Animated Background Elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <span className="badge-icon"><FaStar aria-hidden="true" /></span>
            <span>AI-Powered Medical Imaging</span>
          </div>
          
          <h1 className="hero-title">
            Pneumonia Detection
            <span className="gradient-text"> Powered by AI</span>
          </h1>
          
          <p className="hero-subtitle">
            Advanced deep learning ensemble model combining ResNet50 and DenseNet121 
            for accurate, instant pneumonia diagnosis from chest X-ray images.
          </p>
          
          <div className="hero-cta">
            <Link to="/detection" className="cta-button primary">
              <span className="btn-icon"><FaMicroscope aria-hidden="true" /></span>
              Start Detection
              <span className="arrow"><FaArrowRight aria-hidden="true" /></span>
            </Link>
            <a href="#how-it-works" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="features-section">
          <div className="section-header">
            <span className="section-badge">Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Three simple steps to get your chest X-ray analyzed
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card" data-step="1">
              <div className="feature-icon-wrapper">
                <span className="feature-icon"><FaCloudUploadAlt aria-hidden="true" /></span>
                <span className="step-number">01</span>
              </div>
              <h3>Upload X-Ray</h3>
              <p>Upload a chest X-ray image in JPEG, JPG, or PNG format. Our system accepts high-quality medical imaging.</p>
            </div>
            
            <div className="feature-card" data-step="2">
              <div className="feature-icon-wrapper">
                <span className="feature-icon"><FaBrain aria-hidden="true" /></span>
                <span className="step-number">02</span>
              </div>
              <h3>AI Analysis</h3>
              <p>Our ensemble model analyzes the image using advanced CNN architectures with attention mechanisms.</p>
            </div>
            
            <div className="feature-card" data-step="3">
              <div className="feature-icon-wrapper">
                <span className="feature-icon"><FaCheckCircle aria-hidden="true" /></span>
                <span className="step-number">03</span>
              </div>
              <h3>Get Results</h3>
              <p>Receive instant diagnosis with confidence score and detailed analysis in seconds.</p>
            </div>
          </div>
        </section>

        {/* Tech Section */}
        <section className="tech-section">
          <div className="section-header">
            <span className="section-badge">Technology</span>
            <h2 className="section-title">About the Technology</h2>
            <p className="section-subtitle">
              Built with cutting-edge deep learning architecture
            </p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon"><FaBullseye aria-hidden="true" /></div>
              <h3>High Accuracy</h3>
              <p>
                Our ensemble deep learning model combines ResNet50 and DenseNet121 
                with CBAM attention to achieve superior accuracy in pneumonia detection.
              </p>
              <div className="tech-tags">
                <span className="tag">ResNet50</span>
                <span className="tag">DenseNet121</span>
                <span className="tag">CBAM</span>
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon"><FaBolt aria-hidden="true" /></div>
              <h3>Fast Processing</h3>
              <p>
                Get results in seconds. Our optimized pipeline processes images 
                quickly using GPU acceleration without compromising on accuracy.
              </p>
              <div className="tech-tags">
                <span className="tag">PyTorch</span>
                <span className="tag">GPU Optimized</span>
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon"><FaMicroscope aria-hidden="true" /></div>
              <h3>Research-Based</h3>
              <p>
                Trained on a curated medical imaging dataset with thousands 
                of clinically validated chest X-ray images and rigorous testing protocols.
              </p>
              <div className="tech-tags">
                <span className="tag">Medical Dataset</span>
                <span className="tag">Validated</span>
              </div>
            </div>
            
            <div className="tech-card">
              <div className="tech-icon"><FaBook aria-hidden="true" /></div>
              <h3>Educational Purpose</h3>
              <p>
                This tool is designed for educational and research purposes to demonstrate 
                the potential of AI in medical imaging diagnostics.
              </p>
              <div className="tech-tags">
                <span className="tag">Educational</span>
                <span className="tag">Research</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Try?</h2>
            <p>Upload your chest X-ray and get instant AI-powered analysis</p>
            <Link to="/detection" className="cta-button primary large">
              <span className="btn-icon"><FaRocket aria-hidden="true" /></span>
              Start Detection Now
              <span className="arrow"><FaArrowRight aria-hidden="true" /></span>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="disclaimer">
          <div className="disclaimer-icon"><FaExclamationTriangle aria-hidden="true" /></div>
          <p>
            <strong>Medical Disclaimer:</strong> This application is for educational and research purposes only. 
            It is not intended to replace professional medical diagnosis. Always consult 
            with qualified healthcare providers for medical advice and treatment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
