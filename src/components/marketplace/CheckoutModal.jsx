import React, { useState } from 'react';
import { X, Truck, MapPin, CheckCircle2, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const CheckoutModal = ({ product, onClose, onOrderSuccess }) => {
  const { points, shippingAddress, buyPhysicalProduct, setActiveTab } = useGame();
  const [isOrdered, setIsOrdered] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const pointsAfter = points - product.pointsCost;

  const handleConfirmPurchase = () => {
    const result = buyPhysicalProduct(product);
    if (result.success) {
      setCreatedOrder(result.order);
      setIsOrdered(true);
      if (onOrderSuccess) onOrderSuccess(result.order);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-handle-bar" />

        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            <Package size={16} color="#059669" />
            <span>{isOrdered ? 'Order Confirmed!' : 'Checkout & Delivery'}</span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-content-scroll">
          {!isOrdered ? (
            <div>
              {/* Product Mini Row */}
              <div style={{ display: 'flex', gap: '12px', background: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                    {product.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                    Fulfilled by {product.merchant}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>
                    {product.pointsCost} Points
                  </div>
                </div>
              </div>

              {/* Delivery Address Card */}
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>
                    <MapPin size={14} />
                    <span>Shipping Address</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: 600 }}>Default Address</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a' }}>
                  {shippingAddress.fullName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '2px' }}>
                  {shippingAddress.street}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                  {shippingAddress.postalCode} {shippingAddress.city}, {shippingAddress.country}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
                  Phone: {shippingAddress.phone}
                </div>
              </div>

              {/* Shipping Method */}
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Truck size={18} color="#059669" />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065f46' }}>
                        Tracked Postal Delivery
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#047857' }}>
                        Correos Express • {product.estimatedDays}
                      </div>
                    </div>
                  </div>
                  <span style={{ background: '#059669', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                    FREE
                  </span>
                </div>
              </div>

              {/* Points Summary */}
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                  <span>Wallet Balance</span>
                  <span>{points} pts</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#dc2626', marginBottom: '6px' }}>
                  <span>Product Price</span>
                  <span>-{product.pointsCost} pts</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                  <span>Remaining Points</span>
                  <span style={{ color: pointsAfter >= 0 ? '#059669' : '#dc2626' }}>{pointsAfter} pts</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary-action"
                disabled={pointsAfter < 0}
                onClick={handleConfirmPurchase}
              >
                <span>Place Order & Ship to Address</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* Order Success State */
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>
                Order Placed Successfully!
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '14px' }}>
                Your parcel is being prepared by the artisan in San Xoán and will be shipped to your home.
              </p>

              {/* Tracking Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '14px', textAlign: 'left', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Tracking Number:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', color: '#0f172a' }}>
                    {createdOrder?.trackingCode}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Carrier:</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f172a' }}>
                    {createdOrder?.carrier}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Estimated Delivery:</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>
                    {createdOrder?.estimatedArrival}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-primary-action"
                  style={{ flex: 1, marginTop: 0 }}
                  onClick={() => {
                    onClose();
                    setActiveTab('backpack');
                  }}
                >
                  <span>Track in Backpack</span>
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    borderRadius: '14px',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
