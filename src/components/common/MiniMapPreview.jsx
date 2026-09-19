import React from 'react';
import { Maximize2 } from 'lucide-react';

const GOOGLE_MAPS_EMBED_MINI_URL =
  'https://maps.google.com/maps?q=42.3712063,-7.299939&hl=en&z=16&output=embed';

export const MiniMapPreview = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="mini-map-preview-card"
      title="Click to expand real Google Maps & get directions"
    >
      {/* Real Google Maps embed preview */}
      <iframe
        title="Google Maps Location Preview"
        src={GOOGLE_MAPS_EMBED_MINI_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          pointerEvents: 'none',
          display: 'block'
        }}
        loading="lazy"
      />

      {/* Expand Pill Badge */}
      <div className="mini-map-expand-badge">
        <Maximize2 size={9} />
        <span>Tap to View Real Google Map</span>
      </div>
    </div>
  );
};
