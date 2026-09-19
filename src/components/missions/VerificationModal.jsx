import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, UserCheck, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const VerificationModal = ({ mission, onClose }) => {
  const { completeMission, submitForHumanReview } = useGame();
  const [step, setStep] = useState(1); // 1: evidence, 2: processing/scanning, 3: result
  const [scanProgress, setScanProgress] = useState(0);

  const isAI = mission.verificationType === 'AI_VISION' || mission.verificationType === 'AI_IMPACT';
  const isHuman = mission.verificationType === 'HUMAN_REVIEW';
  const isGPS = mission.verificationType === 'GPS_CHECKIN';

  // Handle step progression
  const handleStartAnalysis = () => {
    setStep(2);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep(3);
          if (isHuman) {
            submitForHumanReview(mission.id);
          } else {
            completeMission(mission.id);
          }
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle-bar" />

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {isAI && <Sparkles size={16} color="#10b981" />}
            {isHuman && <UserCheck size={16} color="#f59e0b" />}
            {isGPS && <Navigation size={16} color="#6366f1" />}
            <span>{mission.verificationLabel}</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-content-scroll">
          {/* STEP 1: PREPARE EVIDENCE */}
          {step === 1 && (
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Simulated sensor capture ready for mission evaluation:
              </p>

              {/* Image Preview */}
              {mission.sampleEvidence.type === 'image' && (
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '170px', position: 'relative', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
                  <img
                    src={mission.sampleEvidence.url}
                    alt="Captured proof"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px' }}>
                    📸 {mission.sampleEvidence.label}
                  </div>
                </div>
              )}

              {/* Audio Preview */}
              {mission.sampleEvidence.type === 'audio' && (
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    🎙️ Recorded Resident Audio Sample:
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '0.8rem', color: '#0f172a', background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    {mission.sampleEvidence.audioText}
                  </div>
                </div>
              )}

              {/* GPS Geofence Preview */}
              {mission.sampleEvidence.type === 'gps' && (
                <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '16px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Navigation size={18} color="#4f46e5" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#312e81' }}>
                      GPS Signal Acquired
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#4338ca', marginBottom: '4px' }}>
                    Target: {mission.sampleEvidence.targetCoords}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
                    ✓ {mission.sampleEvidence.accuracy}
                  </div>
                </div>
              )}

              <button
                type="button"
                className="btn-primary-action"
                onClick={handleStartAnalysis}
              >
                <span>
                  {isAI ? 'Run AI Vision Analysis' : isHuman ? 'Submit to Local Verifier' : 'Confirm GPS Geofence Check-In'}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: SCANNING / PROCESSING HUD */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              {isAI && (
                <div className="scanner-container">
                  <img
                    src={mission.sampleEvidence.url}
                    alt="Scanning"
                    className="scanner-img"
                  />
                  <div className="scanner-laser" />
                  <div className="scanner-hud-reticle">
                    <span className="hud-tag">NEURAL VISION SCAN</span>
                    <span className="hud-confidence">SCANNING... {scanProgress}%</span>
                  </div>
                </div>
              )}

              {isHuman && (
                <div style={{ padding: '30px 10px', background: '#fffbeb', borderRadius: '14px', border: '1px solid #fef3c7', marginBottom: '14px' }}>
                  <UserCheck size={40} color="#f59e0b" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#92400e' }}>
                    Routing to Local Verifier...
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#b45309', marginTop: '6px' }}>
                    Dispatching proof to {mission.sampleEvidence.verifierName || 'Local Community Verifier'}
                  </div>
                </div>
              )}

              {isGPS && (
                <div style={{ padding: '30px 10px', background: '#eef2ff', borderRadius: '14px', border: '1px solid #e0e7ff', marginBottom: '14px' }}>
                  <Navigation size={40} color="#6366f1" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: '#3730a3' }}>
                    Verifying Satellite Geofence...
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#4338ca', marginTop: '6px' }}>
                    Matching landmark radius... {scanProgress}%
                  </div>
                </div>
              )}

              <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', margin: '14px 0 6px 0' }}>
                <div
                  style={{
                    width: `${scanProgress}%`,
                    height: '100%',
                    background: isAI ? '#10b981' : isHuman ? '#f59e0b' : '#6366f1',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Processing verification packet...
              </span>
            </div>
          )}

          {/* STEP 3: RESULT & REWARD */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              {isHuman ? (
                <div>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <UserCheck size={32} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#92400e', marginBottom: '6px' }}>
                    Submitted to Local Verifier!
                  </h3>
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '12px', margin: '12px 0', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', marginBottom: '4px' }}>
                      Reviewer Assigned: {mission.sampleEvidence.verifierName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#78350f', fontStyle: 'italic' }}>
                      "{mission.sampleEvidence.reviewNotes}"
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    Your submission is queued in the town review desk. Points (+{mission.points} pts) will automatically be credited upon stamp approval!
                  </p>
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => {
                      completeMission(mission.id);
                      onClose();
                    }}
                  >
                    Simulate Instant Approval (+{mission.points} Pts)
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>
                    Verification Passed!
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                    {isAI ? `Confidence: ${mission.sampleEvidence.confidence}% Match` : 'Geofence Radius Matched'}
                  </span>

                  {/* AI Detection Breakdown */}
                  {mission.sampleEvidence.analysisDetails && (
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 14px', margin: '14px 0', textAlign: 'left' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Neural Vision Diagnostic:
                      </div>
                      {mission.sampleEvidence.analysisDetails.map((detail, idx) => (
                        <div key={idx} style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                          <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> {detail}
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', border: '1px solid #fbbf24', padding: '12px', borderRadius: '14px', margin: '14px 0' }}>
                    <span style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600 }}>Earned Reward:</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#b45309' }}>
                      +{mission.points} Points
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={onClose}
                  >
                    Claim Points & Continue Exploring
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
