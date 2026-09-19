import React, { useState } from 'react';
import { ArrowLeft, Star, Truck, Tag, ShieldCheck, CheckCircle2, Store, Heart, Share2, ArrowRight, Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { CheckoutModal } from './CheckoutModal';

export const ProductDetailPage = ({ product, onBack }) => {
  const { points, buyCoupon, setActiveTab } = useGame();
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponPurchased, setCouponPurchased] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const isCoupon = product.type === 'COUPON';
  const canAfford = points >= product.pointsCost;

  const handleBuyCoupon = () => {
    const result = buyCoupon(product);
    if (result.success) {
      setCouponPurchased(true);
    }
  };

  return (
    <div className="product-page-container">
      {/* Top Header Navigation for Dedicated Page */}
      <div className="product-page-header">
        <button
          type="button"
          className="product-page-back-btn"
          onClick={onBack}
          title="Back to Market"
        >
          <ArrowLeft size={18} />
          <span>Back to Market</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="product-icon-btn"
            onClick={() => setIsLiked(!isLiked)}
            title="Add to Wishlist"
          >
            <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : '#64748b'} />
          </button>
          <button
            type="button"
            className="product-icon-btn"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            title="Share Product"
          >
            <Share2 size={16} color="#64748b" />
          </button>
        </div>
      </div>

      {/* Main Page Scrollable Content */}
      <div className="product-page-content">
        {/* Large Hero Image */}
        <div className="product-hero-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-hero-image"
          />
          <div className="product-hero-badge">
            <span
              style={{
                background: isCoupon ? '#ef4444' : '#059669',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '999px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
              }}
            >
              {product.badge}
            </span>
          </div>
        </div>

        {/* Merchant & Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
            <Store size={15} />
            <span>{product.merchant}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#b45309', fontWeight: 700 }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating}</span>
            <span style={{ color: '#94a3b8', fontWeight: 400 }}>({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Product Title */}
        <h1 className="product-page-title">
          {product.title}
        </h1>

        {/* Price & Balance Indicator */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
          <span className="product-page-price">
            {product.pointsCost}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Points</span>
          {!canAfford && (
            <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600, marginLeft: 'auto' }}>
              Need +{product.pointsCost - points} pts
            </span>
          )}
        </div>

        {/* Delivery or Coupon Highlight Banner */}
        {!isCoupon ? (
          <div className="delivery-banner-box">
            <Truck size={22} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534' }}>
                Free Direct Home Delivery
              </div>
              <div style={{ fontSize: '0.72rem', color: '#15803d', marginTop: '2px' }}>
                Dispatched by Correos Express. Ships to your registered postal address in <strong>{product.estimatedDays}</strong>.
              </div>
            </div>
          </div>
        ) : (
          <div className="coupon-banner-box">
            <Tag size={22} color="#dc2626" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991b1b' }}>
                Instant Digital Discount Coupon
              </div>
              <div style={{ fontSize: '0.72rem', color: '#b91c1c', marginTop: '2px' }}>
                Saves directly into your <strong>Backpack</strong> with a copyable promo code for online and in-store checkout.
              </div>
            </div>
          </div>
        )}

        {/* Item Description */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
            Description
          </h3>
          <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55 }}>
            {product.description}
          </p>
        </div>

        {/* Specifications Table (For Physical Items) */}
        {!isCoupon && product.specs && (
          <div className="product-specs-box">
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Product Specifications
            </h4>
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="product-spec-row">
                <span style={{ color: '#64748b' }}>{key}</span>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Authentic Customer Reviews Section */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Verified Traveler Reviews
          </h4>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e293b' }}>Elena R.</span>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>• Verified Buyer</span>
            </div>
            <p style={{ fontSize: '0.73rem', color: '#475569', lineHeight: 1.4, margin: 0 }}>
              "Arrived safely at my home in Madrid within 4 days. Beautiful craftsmanship from San Xoán and the relief details are stunning!"
            </p>
          </div>
        </div>

        {/* Coupon Success State */}
        {couponPurchased ? (
          <div style={{ textAlign: 'center', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
            <CheckCircle2 size={36} color="#059669" style={{ margin: '0 auto 8px auto' }} />
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#065f46', marginBottom: '4px' }}>
              Coupon Saved to Your Backpack!
            </div>
            <p style={{ fontSize: '0.73rem', color: '#047857', marginBottom: '10px' }}>
              You can view and copy your promo code anytime in the Backpack tab.
            </p>
            <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', background: '#fff', padding: '8px 14px', borderRadius: '8px', display: 'inline-block', marginBottom: '14px', border: '1px dashed #059669' }}>
              Code: {product.discountCode}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn-primary-action"
                style={{ flex: 1, marginTop: 0 }}
                onClick={() => setActiveTab('backpack')}
              >
                Go to Backpack
              </button>
              <button
                type="button"
                style={{ flex: 1, background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '14px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                onClick={onBack}
              >
                Keep Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Bottom CTA Action Bar */
          <div className="product-page-cta-bar">
            {!isCoupon ? (
              <button
                type="button"
                className="btn-primary-action"
                disabled={!canAfford}
                onClick={() => setShowCheckout(true)}
              >
                <span>
                  {canAfford ? `Buy with ${product.pointsCost} Points (Ship to Address)` : `Need ${product.pointsCost - points} more points`}
                </span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary-action"
                style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
                disabled={!canAfford}
                onClick={handleBuyCoupon}
              >
                <span>
                  {canAfford ? `Claim Coupon for ${product.pointsCost} Points` : `Need ${product.pointsCost - points} more points`}
                </span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Checkout Modal for Address Confirmation */}
      {showCheckout && (
        <CheckoutModal
          product={product}
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={() => {
            setShowCheckout(false);
          }}
        />
      )}
    </div>
  );
};
