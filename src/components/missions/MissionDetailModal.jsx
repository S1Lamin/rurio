import React from 'react';
import { X, MapPin, Clock, Award, ShieldCheck, Sparkles, UserCheck, Navigation, CheckCircle2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const MissionDetailModal = ({ mission, onClose, onStartVerification }) => {
  const { completedMissions, pendingMissions, simulateHumanApproval } = useGame();

  if (!mission) return null;

  const isCompleted = completedMissions.includes(mission.id);
  const isPending = pendingMissions.includes(mission.id);

  const getVerificationIcon = () => {
    switch (mission.verificationType) {
      case 'AI_VISION':
      case 'AI_IMPACT':
        return <Sparkles size={16} color="#10b981" />;
      case 'HUMAN_REVIEW':
        return <UserCheck size={16} color="#f59e0b" />;
      case 'GPS_CHECKIN':
        return <Navigation size={16} color="#6366f1" />;
      default:
        return <ShieldCheck size={16} color="#10b981" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle-bar" />

        <div className="modal-header">
          <span className="type-tag" style={{ background: '#f1f5f9', color: '#334155' }}>
            {mission.category} Quest
          </span>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-content-scroll">
          <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '140px', marginBottom: '14px' }}>
            <img
              src={mission.sampleEvidence.url || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80'}
              alt={mission.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
              <span className="points-tag" style={{ fontSize: '0.9rem', padding: '4px 12px' }}>
                +{mission.points} Points
              </span>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {mission.title}
          </h2>

          <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="#059669" />
              {mission.locationName}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} color="#64748b" />
              {mission.estimatedTime}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Award size={14} color="#f59e0b" />
              {mission.difficulty}
            </span>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
            {mission.fullDesc}
          </p>

          {/* Verification Protocol Box */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {getVerificationIcon()}
              <strong style={{ fontSize: '0.8rem', color: '#0f172a' }}>Verification Method:</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginLeft: '24px' }}>
              {mission.verificationLabel}
            </div>
          </div>

          {/* Fun Fact Box */}
          {mission.funFact && (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '10px 12px', marginBottom: '16px', fontSize: '0.75rem', color: '#065f46' }}>
              💡 <strong>Local Lore:</strong> {mission.funFact}
            </div>
          )}

          {/* Actions */}
          {isCompleted ? (
            <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '12px', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} />
              Mission Completed! (+{mission.points} Pts Earned)
            </div>
          ) : isPending ? (
            <div>
              <div style={{ background: '#fef3c7', color: '#92400e', padding: '10px', borderRadius: '12px', textAlign: 'center', fontWeight: 600, fontSize: '0.8rem', marginBottom: '8px' }}>
                ⏳ Verification Pending: Submitted to local guide review queue.
              </div>
              <button
                type="button"
                className="btn-primary-action"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                onClick={() => {
                  simulateHumanApproval(mission.id);
                  onClose();
                }}
              >
                Simulate Local Verifier Approval Now
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary-action"
              onClick={() => {
                onClose();
                onStartVerification(mission);
              }}
            >
              Verify & Complete Mission
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
