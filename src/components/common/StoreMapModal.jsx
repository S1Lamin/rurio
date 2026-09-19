import React from 'react';
import { X, MapPin, ExternalLink, Navigation, Clock, Store } from 'lucide-react';

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/S9YbumhpyP5M9roB7';
const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=42.3712063,-7.299939&hl=en&z=17&output=embed';

export const StoreMapModal = ({ locationName, address, hours, onClose }) => {
  const displayAddress = address && !address.includes('Praza Maior')
    ? address
    : 'Av. Fernando III, 10A, 32770 San Xoán de Río, Ourense';

  return (
    <div
      className="modal-overlay"
      style={{ zIndex: 250 }}
      onClick={onClose}
    >
      <div
        className="modal-sheet"
        style={{ zIndex: 260, maxHeight: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-handle-bar" />

        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                {locationName || 'Casa Rural O Fonte (Hub)'}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                Av. Fernando III, 10A • San Xoán de Río, Ourense
              </div>
            </div>
          </div>

          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content-scroll" style={{ padding: '14px' }}>
          {/* Bigger Map Canvas (Real Google Maps Embed) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '270px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#0f172a',
              border: '1.5px solid #cbd5e1',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              marginBottom: '14px'
            }}
          >
            {/* Real Google Maps Iframe */}
            <iframe
              title="Real Google Maps - San Xoán de Río"
              src={GOOGLE_MAPS_EMBED_URL}
              style={{
                width: '100%',
                height: '100%',
                border: 0,
                display: 'block'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Coordinates Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(4px)',
                color: '#f8fafc',
                fontSize: '0.62rem',
                fontWeight: 600,
                padding: '3px 7px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                pointerEvents: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                border: '0.5px solid rgba(255,255,255,0.2)'
              }}
            >
              42.3712° N, 7.2999° W
            </div>

            {/* Live Distance Indicator */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(5, 150, 105, 0.92)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
              }}
            >
              <Navigation size={11} />
              <span>120m away • 2 min walk</span>
            </div>
          </div>

          {/* Address & Store Details Card */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
              <Store size={16} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                  {locationName || 'Casa Rural O Fonte (Hub)'}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '1px' }}>
                  {displayAddress}
                </div>
              </div>
            </div>

            {hours && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#b45309', borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '6px' }}>
                <Clock size={13} />
                <span>Store Hours: {hours}</span>
              </div>
            )}
          </div>

          {/* Button to Open Directly in Google Maps */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-action"
            style={{
              background: '#1a73e8',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '12px',
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(26, 115, 232, 0.35)',
              marginTop: '0'
            }}
          >
            <ExternalLink size={16} />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
