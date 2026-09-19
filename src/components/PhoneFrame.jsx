import React, { useState, useEffect } from 'react';
import { Wifi, Battery, RotateCcw, PlusCircle, Coins, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { BottomNav } from './BottomNav';

export const PhoneFrame = ({ children }) => {
  const { points, resetDemo, addBonusPoints, setActiveTab, completedMissions, orders, coupons } = useGame();
  const [currentTime, setCurrentTime] = useState('11:42');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="desktop-container">
      {/* Mobile Drawer Overlay Backdrop */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Sidebar (Desktop left side / Mobile slide-out drawer) */}
      <aside className={`desktop-sidebar ${isDrawerOpen ? 'open' : ''}`}>
        <div className="sidebar-header-row">
          <div className="sidebar-brand">
            <div className="brand-logo-icon">🌿</div>
            <div>
              <div className="brand-title">RuRio</div>
              <div className="brand-subtitle">Rural Gamification & Marketplace</div>
            </div>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
            title="Close Drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Prototype Testing Controls */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Testing Controls</div>
          <button
            type="button"
            className="sidebar-action-btn primary"
            onClick={() => addBonusPoints(100)}
            title="Add +100 points to simulate mission rewards"
          >
            <PlusCircle size={18} />
            <div className="btn-text-wrap">
              <div className="btn-label">+100 Points</div>
              <div className="btn-sub">Add spending balance</div>
            </div>
          </button>

          <button
            type="button"
            className="sidebar-action-btn secondary"
            onClick={resetDemo}
            title="Reset points, missions, and orders"
          >
            <RotateCcw size={16} />
            <div className="btn-text-wrap">
              <div className="btn-label">Reset Demo</div>
              <div className="btn-sub">Restore initial state</div>
            </div>
          </button>
        </div>

        {/* Live Tourist Status */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Live Player Status</div>
          <div className="sidebar-stats-grid">
            <div
              className="sidebar-stat-card"
              onClick={() => {
                setActiveTab('backpack');
                setIsDrawerOpen(false);
              }}
              style={{ cursor: 'pointer' }}
            >
              <span className="stat-num" style={{ color: '#f59e0b' }}>{points}</span>
              <span className="stat-label">Points</span>
            </div>
            <div
              className="sidebar-stat-card"
              onClick={() => {
                setActiveTab('missions');
                setIsDrawerOpen(false);
              }}
              style={{ cursor: 'pointer' }}
            >
              <span className="stat-num" style={{ color: '#10b981' }}>{completedMissions.length}</span>
              <span className="stat-label">Quests</span>
            </div>
            <div
              className="sidebar-stat-card"
              onClick={() => {
                setActiveTab('backpack');
                setIsDrawerOpen(false);
              }}
              style={{ cursor: 'pointer' }}
            >
              <span className="stat-num" style={{ color: '#06b6d4' }}>{orders.length}</span>
              <span className="stat-label">Parcels</span>
            </div>
            <div
              className="sidebar-stat-card"
              onClick={() => {
                setActiveTab('backpack');
                setIsDrawerOpen(false);
              }}
              style={{ cursor: 'pointer' }}
            >
              <span className="stat-num" style={{ color: '#f43f5e' }}>{coupons.length}</span>
              <span className="stat-label">Coupons</span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        {/* <div className="sidebar-tips">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#34d399', fontWeight: 700 }}>
            <Sparkles size={14} />
            <span>Prototype Guide</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.72rem', lineHeight: 1.4, color: '#94a3b8' }}>
            Complete quests in <strong>Missions</strong> to earn points, then visit <strong>Market</strong> to purchase 3D magnets for home delivery or claim 50% off honey coupons.
          </p>
        </div> */}
      </aside>

      {/* Main Smartphone Screen Container */}
      <main className="desktop-main">
        <div className="phone-frame">
          {/* Dynamic Island Notch */}
          <div className="phone-island">
            <div className="camera-dot" />
          </div>

          {/* Smartphone Status Bar */}
          <div className="phone-status-bar">
            <span className="status-time">{currentTime}</span>
            <div className="status-icons">
              <Wifi size={13} />
              <Battery size={14} />
            </div>
          </div>

          {/* App Top Bar */}
          <div className="app-top-header">
            <div className="header-location">
              <span className="location-dot" />
              <div>
                <div className="location-name">San Xoán de Río</div>
                <div className="location-region">Ourense, Galicia</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Mobile Drawer Trigger Button */}
              <button
                type="button"
                className="mobile-drawer-trigger"
                onClick={() => setIsDrawerOpen(true)}
                title="Open Testing Controls"
              >
                <SlidersHorizontal size={13} />
                <span>Controls</span>
              </button>

              <button
                type="button"
                className="points-pill"
                onClick={() => setActiveTab('backpack')}
                title="View Points & Backpack"
              >
                <Coins size={14} />
                <span>{points} pts</span>
              </button>
            </div>
          </div>

          {/* App Screen Content & Navigation */}
          <div className="phone-screen">
            <div className="screen-content">{children}</div>
            <BottomNav />
          </div>
        </div>
      </main>
    </div>
  );
};
