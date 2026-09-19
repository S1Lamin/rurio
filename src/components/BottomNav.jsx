import React from 'react';
import { Compass, Map, Store, Backpack } from 'lucide-react';
import { useGame } from '../context/GameContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, orders, coupons, pendingMissions } = useGame();

  const totalBackpackItems = orders.length + coupons.length;

  return (
    <nav className="bottom-nav">
      <button
        type="button"
        className={`nav-item ${activeTab === 'missions' ? 'active' : ''}`}
        onClick={() => setActiveTab('missions')}
      >
        <div className="nav-icon-wrap">
          <Compass size={20} />
        </div>
        <span>Missions</span>
        {pendingMissions.length > 0 && (
          <span className="nav-badge-count">{pendingMissions.length}</span>
        )}
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
        onClick={() => setActiveTab('map')}
      >
        <div className="nav-icon-wrap">
          <Map size={20} />
        </div>
        <span>Map</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'market' ? 'active' : ''}`}
        onClick={() => setActiveTab('market')}
      >
        <div className="nav-icon-wrap">
          <Store size={20} />
        </div>
        <span>Market</span>
      </button>

      <button
        type="button"
        className={`nav-item ${activeTab === 'backpack' ? 'active' : ''}`}
        onClick={() => setActiveTab('backpack')}
      >
        <div className="nav-icon-wrap">
          <Backpack size={20} />
        </div>
        <span>Backpack</span>
        {totalBackpackItems > 0 && (
          <span className="nav-badge-count">{totalBackpackItems}</span>
        )}
      </button>
    </nav>
  );
};
