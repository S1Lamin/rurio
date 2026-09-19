import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { PhoneFrame } from './components/PhoneFrame';
import { MissionList } from './components/missions/MissionList';
import { TownMapView } from './components/map/TownMapView';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { BackpackView } from './components/profile/BackpackView';

const AppContent = () => {
  const { activeTab } = useGame();

  return (
    <PhoneFrame>
      {activeTab === 'missions' && <MissionList />}
      {activeTab === 'map' && <TownMapView />}
      {activeTab === 'market' && <MarketplaceView />}
      {activeTab === 'backpack' && <BackpackView />}
    </PhoneFrame>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
