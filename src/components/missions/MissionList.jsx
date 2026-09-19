import React, { useState } from 'react';
import { Sparkles, UserCheck, Navigation, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { MISSIONS_DATA, CATEGORIES } from '../../data/missions';
import { useGame } from '../../context/GameContext';
import { MissionDetailModal } from './MissionDetailModal';
import { VerificationModal } from './VerificationModal';

export const MissionList = () => {
  const { completedMissions, pendingMissions } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMission, setActiveMission] = useState(null);
  const [verifyingMission, setVerifyingMission] = useState(null);

  const filteredMissions = MISSIONS_DATA.filter((m) => {
    if (selectedCategory === 'All') return true;
    return m.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getVerificationIcon = (type) => {
    switch (type) {
      case 'AI_VISION':
      case 'AI_IMPACT':
        return <Sparkles size={12} />;
      case 'HUMAN_REVIEW':
        return <UserCheck size={12} />;
      case 'GPS_CHECKIN':
        return <Navigation size={12} />;
      default:
        return <Sparkles size={12} />;
    }
  };

  return (
    <div>
      {/* Category Pills */}
      <div className="category-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Missions List */}
      <div className="missions-list-container">
        {filteredMissions.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);
          const isPending = pendingMissions.includes(mission.id);

          return (
            <div
              key={mission.id}
              className={`mission-card ${isCompleted ? 'completed' : ''}`}
              onClick={() => setActiveMission(mission)}
            >
              <div className="mission-img-header">
                <img
                  src={mission.sampleEvidence.url || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80'}
                  alt={mission.title}
                  className="mission-img"
                />
                <div className="card-top-badges">
                  <span className="type-tag">
                    {getVerificationIcon(mission.verificationType)}
                    <span>{mission.verificationLabel.split(' ')[0]}</span>
                  </span>
                  <span className="points-tag">+{mission.points} pts</span>
                </div>
              </div>

              <div className="mission-card-body">
                <h3 className="mission-title">{mission.title}</h3>
                <p className="mission-desc">{mission.shortDesc}</p>

                <div className="mission-card-footer">
                  <span className="footer-loc">
                    <MapPin size={12} color="#059669" />
                    <span>{mission.locationName}</span>
                  </span>

                  {isCompleted ? (
                    <span className="status-badge completed">
                      <CheckCircle2 size={12} />
                      Done
                    </span>
                  ) : isPending ? (
                    <span className="status-badge pending">
                      <Clock size={12} />
                      In Review
                    </span>
                  ) : (
                    <span className="status-badge available">Available</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mission Detail Modal */}
      {activeMission && (
        <MissionDetailModal
          mission={activeMission}
          onClose={() => setActiveMission(null)}
          onStartVerification={(m) => setVerifyingMission(m)}
        />
      )}

      {/* Mission Verification Flow Modal */}
      {verifyingMission && (
        <VerificationModal
          mission={verifyingMission}
          onClose={() => setVerifyingMission(null)}
        />
      )}
    </div>
  );
};
