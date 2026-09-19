import React, { useState } from 'react';
import { Backpack, Package, Tag, Copy, Check, Truck, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { MISSIONS_DATA } from '../../data/missions';

export const BackpackView = () => {
  const { points, completedMissions, orders, coupons, setActiveTab } = useGame();
  const [activeTab, setActiveTabFilter] = useState('all'); // 'all' | 'orders' | 'coupons'
  const [copiedCode, setCopiedCode] = useState(null);

  const completedList = MISSIONS_DATA.filter((m) => completedMissions.includes(m.id));

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getLevel = () => {
    if (completedMissions.length >= 4) return { rank: 'Master of Río', level: 4 };
    if (completedMissions.length >= 2) return { rank: 'Souto Explorer', level: 3 };
    if (completedMissions.length >= 1) return { rank: 'Village Pathfinder', level: 2 };
    return { rank: 'Curious Tourist', level: 1 };
  };

  const levelInfo = getLevel();

  return (
    <div>
      {/* Profile Hero */}
      <div className="profile-hero">
        <div className="profile-avatar">🎒</div>
        <div className="profile-info">
          <div className="profile-name">Alex Miller</div>
          <div className="profile-rank">
            Level {levelInfo.level} • {levelInfo.rank}
          </div>
          <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.25)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.min(100, (completedMissions.length / 4) * 100)}%`,
                height: '100%',
                background: '#fde68a',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Counter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>POINTS</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#f59e0b' }}>
            {points}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>PARCELS</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>
            {orders.length}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>COUPONS</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#dc2626' }}>
            {coupons.length}
          </div>
        </div>
      </div>

      {/* Filter Tabs inside Backpack */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveTabFilter('all')}
          style={{
            flex: 1,
            padding: '6px 0',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'all' ? '#fff' : 'transparent',
            color: activeTab === 'all' ? '#0f172a' : '#64748b',
            boxShadow: activeTab === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          All Items
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('orders')}
          style={{
            flex: 1,
            padding: '6px 0',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'orders' ? '#fff' : 'transparent',
            color: activeTab === 'orders' ? '#0f172a' : '#64748b',
            boxShadow: activeTab === 'orders' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          Parcels ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTabFilter('coupons')}
          style={{
            flex: 1,
            padding: '6px 0',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'coupons' ? '#fff' : 'transparent',
            color: activeTab === 'coupons' ? '#0f172a' : '#64748b',
            boxShadow: activeTab === 'coupons' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          Coupons ({coupons.length})
        </button>
      </div>

      {/* 1. PHYSICAL PARCEL SHIPMENTS */}
      {(activeTab === 'all' || activeTab === 'orders') && (
        <div style={{ marginBottom: '18px' }}>
          <div className="vouchers-section-title">
            <Package size={16} color="#059669" />
            <span>Delivered Parcels & Souvenirs ({orders.length})</span>
          </div>

          {orders.length === 0 ? (
            <div style={{ background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '14px', padding: '16px', textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                No physical souvenirs ordered yet.
              </div>
              <button
                type="button"
                className="btn-primary-action"
                style={{ width: 'auto', padding: '6px 14px', fontSize: '0.7rem', margin: '0 auto' }}
                onClick={() => setActiveTab('market')}
              >
                Browse Souvenirs in Market
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  style={{
                    background: '#fff',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    padding: '12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <img
                      src={ord.image}
                      alt={ord.title}
                      style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                        {ord.title}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#059669', fontWeight: 600 }}>
                        {ord.merchant}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                        Ordered: {ord.orderedAt}
                      </div>
                    </div>
                    <span
                      style={{
                        background: '#ecfdf5',
                        color: '#047857',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '999px',
                        alignSelf: 'flex-start'
                      }}
                    >
                      {ord.status}
                    </span>
                  </div>

                  {/* Tracking info box */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 10px', fontSize: '0.7rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', marginBottom: '3px' }}>
                      <span>Tracking:</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>
                        {ord.trackingCode}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', marginBottom: '3px' }}>
                      <span>Carrier:</span>
                      <span style={{ fontWeight: 600 }}>{ord.carrier}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700 }}>
                      <span>Delivery To:</span>
                      <span>{ord.shippingAddress.city}, {ord.shippingAddress.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. SAVED DISCOUNTS & COUPONS */}
      {(activeTab === 'all' || activeTab === 'coupons') && (
        <div style={{ marginBottom: '18px' }}>
          <div className="vouchers-section-title">
            <Tag size={16} color="#dc2626" />
            <span>Saved Discounts & Coupons ({coupons.length})</span>
          </div>

          {coupons.length === 0 ? (
            <div style={{ background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '14px', padding: '16px', textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
                No active coupons saved yet.
              </div>
              <button
                type="button"
                className="btn-primary-action"
                style={{ width: 'auto', padding: '6px 14px', fontSize: '0.7rem', margin: '0 auto', background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
                onClick={() => setActiveTab('market')}
              >
                Browse Coupons in Market
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {coupons.map((coup) => (
                <div
                  key={coup.couponId}
                  style={{
                    background: '#fff',
                    borderRadius: '14px',
                    border: '2px dashed #f87171',
                    padding: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                        {coup.discountAmount}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                        {coup.title}
                      </h4>
                      <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                        {coup.merchant} • {coup.validity}
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '6px 10px', marginTop: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.6rem', color: '#7f1d1d', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
                        Promo Code
                      </span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', color: '#991b1b', letterSpacing: '0.05em' }}>
                        {coup.discountCode}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(coup.discountCode)}
                      style={{
                        background: '#dc2626',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedCode === coup.discountCode ? (
                        <>
                          <Check size={12} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '6px', lineHeight: 1.3 }}>
                    ℹ️ {coup.instructions}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. COMPLETED MISSIONS LOG */}
      <div>
        <div className="vouchers-section-title">
          <CheckCircle2 size={16} color="#059669" />
          <span>Completed Missions History ({completedList.length})</span>
        </div>

        {completedList.length === 0 ? (
          <div style={{ background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '14px', padding: '14px', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
            No missions completed yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {completedList.map((m) => (
              <div
                key={m.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                    {m.title}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                    {m.locationName}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', color: '#059669' }}>
                    +{m.points} pts
                  </span>
                  <div style={{ fontSize: '0.6rem', color: '#16a34a', fontWeight: 600 }}>
                    Verified ✓
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
