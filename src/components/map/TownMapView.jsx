import React, { useState } from 'react';
import { MapPin, Sparkles, Navigation, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { MAP_LOCATIONS } from '../../data/mapLocations';
import { MISSIONS_DATA } from '../../data/missions';
import { useGame } from '../../context/GameContext';
import { MissionDetailModal } from '../missions/MissionDetailModal';
import { VerificationModal } from '../missions/VerificationModal';

export const TownMapView = () => {
  const { completedMissions, pendingMissions } = useGame();
  const [selectedLoc, setSelectedLoc] = useState(MAP_LOCATIONS[0]);
  const [activeMission, setActiveMission] = useState(null);
  const [verifyingMission, setVerifyingMission] = useState(null);

  const getAssociatedMission = (loc) => {
    if (!loc.missionId) return null;
    return MISSIONS_DATA.find((m) => m.id === loc.missionId);
  };

  const handleOpenMission = (loc) => {
    const m = getAssociatedMission(loc);
    if (m) {
      setActiveMission(m);
    }
  };

  return (
    <div className="map-view-container" style={{ height: '100%', minHeight: '520px', position: 'relative' }}>
      {/* Map Canvas Card */}
      <div className="map-card-wrapper" style={{ height: '480px' }}>
        {/* Stylized Illustrated Vector Map of San Xoán de Río */}
        <svg
          viewBox="0 0 400 480"
          className="map-svg-canvas"
          style={{ width: '100%', height: '100%', background: '#0e1726' }}
        >
          {/* Topography Contours & Mountain Gradients */}
          <defs>
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.4" />
            </linearGradient>
            <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid lines */}
          <rect width="400" height="480" fill="url(#gridPattern)" />

          {/* Mountain curves */}
          <path
            d="M -20,120 Q 80,60 200,90 T 420,70 L 420,0 L -20,0 Z"
            fill="#132034"
            opacity="0.6"
          />
          <path
            d="M -20,180 Q 120,130 260,160 T 420,140 L 420,0 L -20,0 Z"
            fill="#182a44"
            opacity="0.4"
          />

          {/* Forest Patch (Souto de Castiñeiros) */}
          <path
            d="M 60,120 Q 150,110 170,180 Q 180,240 100,240 Q 40,230 40,170 Z"
            fill="url(#forestGrad)"
            stroke="#059669"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text x="75" y="180" fill="#34d399" fontSize="10" fontFamily="sans-serif" fontWeight="600" opacity="0.8">
            🌲 Soutos de Castaña
          </text>

          {/* Navea River Path */}
          <path
            d="M 400,160 C 330,190 270,170 230,230 C 190,290 260,340 310,360 C 360,380 340,460 380,480"
            fill="none"
            stroke="url(#riverGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <text x="250" y="275" fill="#bae6fd" fontSize="9" fontWeight="700" letterSpacing="2" opacity="0.7">
            RÍO NAVEA
          </text>

          {/* Village Path / Roman Road (Vía Nova) */}
          <path
            d="M 50,440 C 120,380 180,310 200,240 C 220,170 310,140 380,90"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.3"
          />

          {/* Village Center cluster (San Xoán) */}
          <circle cx="200" cy="245" r="28" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="172" y="249" fill="#f8fafc" fontSize="9" fontWeight="700">
            San Xoán
          </text>
        </svg>

        {/* Interactive Location Markers */}
        {MAP_LOCATIONS.map((loc) => {
          const isSelected = selectedLoc?.id === loc.id;
          const associatedMission = getAssociatedMission(loc);
          const isCompleted = associatedMission && completedMissions.includes(associatedMission.id);

          return (
            <div
              key={loc.id}
              className="map-marker"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onClick={() => setSelectedLoc(loc)}
            >
              {isSelected && <div className="marker-pulse" style={{ background: loc.color }} />}
              <div
                className={`marker-pin ${isCompleted ? 'completed' : ''}`}
                style={{
                  background: isCompleted ? '#10b981' : loc.color,
                  transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                }}
              >
                <MapPin size={16} />
              </div>
            </div>
          );
        })}

        {/* Selected Location Card Drawer */}
        {selectedLoc && (
          <div className="map-info-drawer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div>
                <span
                  style={{
                    background: selectedLoc.color,
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    display: 'inline-block',
                    marginBottom: '4px'
                  }}
                >
                  {selectedLoc.tag}
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                  {selectedLoc.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLoc(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '10px', lineHeight: 1.4 }}>
              {selectedLoc.desc}
            </p>

            {selectedLoc.missionId ? (
              <button
                type="button"
                className="btn-primary-action"
                style={{ marginTop: '0', padding: '8px 12px', fontSize: '0.8rem' }}
                onClick={() => handleOpenMission(selectedLoc)}
              >
                <span>
                  {completedMissions.includes(selectedLoc.missionId)
                    ? 'View Completed Quest'
                    : 'Start Quest at Location'}
                </span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
                🏪 Official RuRio Souvenir & Information Hub
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mission Detail Modal when clicked from map */}
      {activeMission && (
        <MissionDetailModal
          mission={activeMission}
          onClose={() => setActiveMission(null)}
          onStartVerification={(m) => setVerifyingMission(m)}
        />
      )}

      {/* Verification Modal */}
      {verifyingMission && (
        <VerificationModal
          mission={verifyingMission}
          onClose={() => setVerifyingMission(null)}
        />
      )}
    </div>
  );
};
