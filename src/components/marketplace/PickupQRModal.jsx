import React, { useState } from 'react';
import { X, Store, MapPin, CheckCircle2, Clock, QrCode } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MiniMapPreview } from '../common/MiniMapPreview';
import { StoreMapModal } from '../common/StoreMapModal';

export const PickupQRModal = ({ order, onClose }) => {
  const { markOrderPickedUp, orders } = useGame();
  const [showMapModal, setShowMapModal] = useState(false);

  if (!order) return null;

  const currentOrder = orders.find((o) => o.orderId === order.orderId) || order;
  const [isCollected, setIsCollected] = useState(currentOrder.status === 'Picked Up');

  const handleSimulateScan = () => {
    markOrderPickedUp(order.orderId);
    setIsCollected(true);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
          <div className="modal-handle-bar" />

          <div className="modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              <QrCode size={16} color="#059669" />
              <span>Store Pickup Pass</span>
            </div>
            <button type="button" className="modal-close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="modal-content-scroll" style={{ textAlign: 'center' }}>
            {/* Ticket Frame */}
            <div
              style={{
                background: '#ffffff',
                border: '2px dashed #cbd5e1',
                borderRadius: '16px',
                padding: '16px 14px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                position: 'relative',
                marginBottom: '14px'
              }}
            >
              {/* Store & Location Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginBottom: '4px' }}>
                <Store size={15} />
                <span>{order.merchant}</span>
              </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px', lineHeight: 1.25 }}>
              {order.title}
            </h3>

            {/* QR Code Container */}
            <div
              style={{
                width: '160px',
                height: '160px',
                margin: '12px auto',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                position: 'relative'
              }}
            >
              {/* Scalable Vector QR Code */}
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                {/* 3 corner finder patterns */}
                <rect x="8" y="8" width="28" height="28" rx="5" fill="#0f172a" />
                <rect x="13" y="13" width="18" height="18" rx="3" fill="#fff" />
                <rect x="17" y="17" width="10" height="10" rx="2" fill="#0f172a" />

                <rect x="64" y="8" width="28" height="28" rx="5" fill="#0f172a" />
                <rect x="69" y="13" width="18" height="18" rx="3" fill="#fff" />
                <rect x="73" y="17" width="10" height="10" rx="2" fill="#0f172a" />

                <rect x="8" y="64" width="28" height="28" rx="5" fill="#0f172a" />
                <rect x="13" y="69" width="18" height="18" rx="3" fill="#fff" />
                <rect x="17" y="73" width="10" height="10" rx="2" fill="#0f172a" />

                {/* Matrix modules */}
                <rect x="42" y="10" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="10" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="22" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="28" width="6" height="6" fill="#0f172a" />
                <rect x="14" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="24" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="34" y="44" width="6" height="6" fill="#059669" />
                <rect x="44" y="44" width="12" height="12" rx="3" fill="#059669" />
                <rect x="62" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="44" width="6" height="6" fill="#0f172a" />
                <rect x="42" y="64" width="6" height="6" fill="#0f172a" />
                <rect x="52" y="72" width="6" height="6" fill="#0f172a" />
                <rect x="64" y="64" width="6" height="6" fill="#0f172a" />
                <rect x="76" y="64" width="6" height="6" fill="#0f172a" />
                <rect x="64" y="76" width="6" height="6" fill="#0f172a" />
                <rect x="76" y="76" width="6" height="6" fill="#0f172a" />
              </svg>

              {isCollected && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.92)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }}>
                  <CheckCircle2 size={44} color="#059669" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
                    Collected!
                  </span>
                </div>
              )}
            </div>

            {/* Alphanumeric Code */}
            <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem', color: '#1e293b', letterSpacing: '0.08em', marginBottom: '8px' }}>
              {order.pickupCode}
            </div>

            {/* Pickup Address Box with Responsive Wrapping Mini Map Component */}
            <div className="pickup-address-box">
              <div className="pickup-address-text">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>
                  <MapPin size={14} color="#059669" />
                  <span>Pickup Location:</span>
                </div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1e293b', marginLeft: '20px' }}>
                  {order.pickupLocation}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', marginLeft: '20px' }}>
                  {order.pickupAddress && !order.pickupAddress.includes('Praza Maior')
                    ? order.pickupAddress
                    : 'Av. Fernando III, 10A, San Xoán de Río'}
                </div>
                {order.openingHours && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#b45309', marginLeft: '20px', marginTop: '4px' }}>
                    <Clock size={12} />
                    <span>Hours: {order.openingHours}</span>
                  </div>
                )}
              </div>

              {/* Small Map Component (Wraps to new row on small screens) */}
              <div className="pickup-map-wrapper">
                <MiniMapPreview onClick={() => setShowMapModal(true)} />
              </div>
            </div>

            {/* Instructions */}
            <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: 1.4, background: '#ecfdf5', padding: '8px 10px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              📲 <strong>Instructions:</strong> Provide this QR code to the seller at the counter to verify and collect your item.
            </div>

            {/* Status Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '10px' }}>
              <span>Ordered: {order.orderedAt}</span>
              <span style={{ fontWeight: 700, color: isCollected ? '#15803d' : '#059669' }}>
                {isCollected ? 'Picked Up ✓' : 'Ready for Pickup'}
              </span>
            </div>
          </div>

          {/* Action Button updated to vibrant Success Message upon click */}
          {!isCollected ? (
            <button
              type="button"
              className="btn-primary-action"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', marginTop: '0' }}
              onClick={handleSimulateScan}
            >
              <CheckCircle2 size={16} />
              <span>Simulate Seller Scan & Handover</span>
            </button>
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #dcfce7 100%)',
                border: '1.5px solid #86efac',
                borderRadius: '14px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
                animation: 'slide-up 0.25s ease-out'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)'
                }}
              >
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#065f46', marginBottom: '2px' }}>
                  Successfully Scanned & Handed Over!
                </div>
                <div style={{ fontSize: '0.7rem', color: '#047857', lineHeight: 1.35 }}>
                  The seller verified your QR code at the counter and marked your item as collected.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Bigger Map Modal */}
    {showMapModal && (
      <StoreMapModal
        locationName={order.pickupLocation}
        address={order.pickupAddress}
        hours={order.openingHours}
        onClose={() => setShowMapModal(false)}
      />
    )}
  </>
  );
};
