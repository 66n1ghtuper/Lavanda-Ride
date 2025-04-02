import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ScooterStats.css';
import CommentSystem from './CommentSystem';

const ScooterStats = () => {
  const { t } = useTranslation();
  const [animated, setAnimated] = useState(false);
  const scooterCanvasRef = useRef(null);
  const usersCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimated(true);
    
    let startTime = null;
    const duration = 2000;
    
    const animateGraph = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animateGraph);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateGraph);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const drawScooterGraph = () => {
      const canvas = scooterCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const padding = 60;
      const graphWidth = width - padding * 2;
      const graphHeight = height - padding * 2;
      
      ctx.clearRect(0, 0, width, height);
      
      const dataPoints = [200, 300, 500, 900, 1000];
      const maxValue = 1000;
      const barWidth = (graphWidth / dataPoints.length) * 0.6;
      const gap = (graphWidth / dataPoints.length) * 0.4;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 4; i++) {
        const y = height - padding - (i * graphHeight / 4);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${i * 250}`, padding - 10, y + 4);
      }
      
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(padding, padding);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();
      
      dataPoints.forEach((value, i) => {
        const x = padding + i * (barWidth + gap);
        const barHeight = (value / maxValue) * graphHeight * progress;
        const y = height - padding - barHeight;
        
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, `hsl(${200 + i * 40}, 100%, 60%)`);
        gradient.addColorStop(1, `hsl(${200 + i * 40}, 100%, 40%)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.shadowColor = `hsla(${200 + i * 40}, 100%, 50%, 0.5)`;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 5;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.shadowColor = 'transparent';
        
        if (progress > i * 0.2) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(value.toString(), x + barWidth / 2, y - 10);
        }
      });
      
      const labels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
      dataPoints.forEach((_, i) => {
        const x = padding + i * (barWidth + gap) + barWidth / 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, height - padding + 20);
      });
      
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(t('scooterStats.scooterGrowthTitle'), width / 2, 30);
    };

    const drawUsersGraph = () => {
      const canvas = usersCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const padding = 60;
      const graphWidth = width - padding * 2;
      const graphHeight = height - padding * 2;
      
      ctx.clearRect(0, 0, width, height);
      
      const dataPoints = [100, 250, 500, 750, 1000];
      const maxValue = 1000;
      const barWidth = (graphWidth / dataPoints.length) * 0.6;
      const gap = (graphWidth / dataPoints.length) * 0.4;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 4; i++) {
        const y = height - padding - (i * graphHeight / 4);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(`${i * 250}K`, padding - 10, y + 4);
      }
      
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(padding, padding);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();
      
      dataPoints.forEach((value, i) => {
        const x = padding + i * (barWidth + gap);
        const barHeight = (value / maxValue) * graphHeight * progress;
        const y = height - padding - barHeight;
        
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, `hsl(${30 + i * 40}, 100%, 60%)`);
        gradient.addColorStop(1, `hsl(${30 + i * 40}, 100%, 40%)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.shadowColor = `hsla(${30 + i * 40}, 100%, 50%, 0.5)`;
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 5;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.shadowColor = 'transparent';
        
        if (progress > i * 0.2) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${value}K`, x + barWidth / 2, y - 10);
        }
      });
      
      const labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май'];
      dataPoints.forEach((_, i) => {
        const x = padding + i * (barWidth + gap) + barWidth / 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, height - padding + 20);
      });
      
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(t('scooterStats.userGrowthTitle'), width / 2, 30);
    };

    drawScooterGraph();
    drawUsersGraph();
  }, [progress, t]);

  const handleInvestorClick = () => {
    window.location.href = "https://api.whatsapp.com/send/?phone=905051038350&text&type=phone_number&app_absent=0"; // Замените на нужный URL
  };

  return (
    <>
      <section className="scooter-stats-container">
        <div className="stats-text-section">
          <div className={`stats-content-wrapper ${animated ? 'animated' : ''}`}>
            <div className="stats-header">
              <h2 className="stats-main-title">{t('scooterStats.mainTitle')}</h2>
              <p className="stats-subtitle">{t('scooterStats.subtitle')}</p>
            </div>
            
            <div className="stats-numbers-block">
              <div className="stats-number-item">
                <div className="stats-big-number">20+</div>
                <div className="stats-number-description">
                  <span className="highlighted-text">{t('scooterStats.scootersOnRoad')}</span> {t('scooterStats.scootersGrowth')}
                </div>
                <div className="stats-divider-line"></div>
              </div>
              
              <div className="stats-number-item">
                <div className="stats-big-number">1M+</div>
                <div className="stats-number-description">
                  <span className="highlighted-text">{t('scooterStats.usersPerDay')}</span> {t('scooterStats.recordRides')}
                </div>
                <div className="stats-divider-line"></div>
              </div>
              
              <div className="stats-number-item">
                <div className="stats-big-number">$10K</div>
                <div className="stats-number-description">
                  {t('scooterStats.dailyEarnings')} <span className="highlighted-text">{t('scooterStats.monthlyEarnings')}</span>
                </div>
              </div>
            </div>
            
            <div className="stats-quote-box">
              <svg className="quote-symbol" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 17H3V12C3 7 6 4 11 4V7C8 7 7 8 7 11V17Z" fill="currentColor"/>
                <path d="M21 17H17V12C17 7 20 4 25 4V7C22 7 21 8 21 11V17Z" fill="currentColor" transform="translate(-8)"/>
              </svg>
              <p>{t('scooterStats.quote')}</p>
            </div>
            
            <button className="stats-action-button" onClick={handleInvestorClick}>
              {t('scooterStats.joinInvestors')}
              <svg className="arrow-symbol" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="stats-graphics-section">
          <div className="graph-box">
            <canvas 
              ref={scooterCanvasRef} 
              width={500} 
              height={300}
              className="animated-chart"
            />
          </div>
          <div className="graph-box" style={{marginTop: '30px'}}>
            <canvas 
              ref={usersCanvasRef} 
              width={500} 
              height={300}
              className="animated-chart"
            />
          </div>

          <div className="investment-info-box">
            <h3 className="investment-box-title">{t('scooterStats.investmentTitle')}</h3>
            <div className="investment-steps-list">
              <div className="investment-step-item">
                <div className="step-indicator">1</div>
                <div className="step-info">
                  <h4>{t('scooterStats.step1Title')}</h4>
                  <p>{t('scooterStats.step1Text')}</p>
                </div>
              </div>
              <div className="investment-step-item">
                <div className="step-indicator">2</div>
                <div className="step-info">
                  <h4>{t('scooterStats.step2Title')}</h4>
                  <p>{t('scooterStats.step2Text')}</p>
                </div>
              </div>
              <div className="investment-step-item">
                <div className="step-indicator">3</div>
                <div className="step-info">
                  <h4>{t('scooterStats.step3Title')}</h4>
                  <p>{t('scooterStats.step3Text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="usage-instructions">
        <CommentSystem />
      </section>
    </>
  );
};

export default ScooterStats;