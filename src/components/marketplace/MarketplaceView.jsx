import React, { useState } from 'react';
import { Coins, Search, Star, QrCode, Tag, PlusCircle, Store } from 'lucide-react';
import { PRODUCTS_DATA, MARKET_CATEGORIES } from '../../data/products';
import { useGame } from '../../context/GameContext';
import { ProductDetailPage } from './ProductDetailPage';

export const MarketplaceView = () => {
  const { points, addBonusPoints } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // If a product is selected, render the dedicated Product Detail Page
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Marketplace Top Balance & Search */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '12px 14px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>
              Your Spending Balance
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Coins size={18} color="#f59e0b" />
              <span>{points} pts</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addBonusPoints(100)}
            style={{
              background: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#92400e',
              fontSize: '0.7rem',
              padding: '6px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <PlusCircle size={13} />
            <span>+100 Pts</span>
          </button>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search magnets, mugs, keychains, coupons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              background: '#f8fafc',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-filter-bar">
        {MARKET_CATEGORIES.map((cat) => (
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

      {/* TWO-COLUMN GRID MARKETPLACE */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '20px'
        }}
      >
        {filteredProducts.map((product) => {
          const isCoupon = product.type === 'COUPON';

          return (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
              }}
            >
              {/* Product Thumbnail */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#f1f5f9', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ position: 'absolute', top: '6px', left: '6px' }}>
                  <span
                    style={{
                      background: isCoupon ? 'rgba(239, 68, 68, 0.9)' : 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '999px'
                    }}
                  >
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Product Body */}
              <div style={{ padding: '10px 8px 10px 8px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#059669', fontWeight: 600, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.merchant}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.3,
                      marginBottom: '6px',
                      height: '2.6em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {product.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.65rem', color: '#f59e0b', marginBottom: '8px' }}>
                    <Star size={11} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontWeight: 700 }}>{product.rating}</span>
                    <span style={{ color: '#94a3b8' }}>({product.reviewsCount})</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: '#b45309' }}>
                      {product.pointsCost} <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#64748b' }}>pts</span>
                    </div>
                  </div>

                  {/* Pickup QR or Coupon Tag */}
                  <div style={{ fontSize: '0.6rem', color: isCoupon ? '#dc2626' : '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {isCoupon ? (
                      <>
                        <Tag size={10} />
                        <span>Digital Coupon</span>
                      </>
                    ) : (
                      <>
                        <QrCode size={10} />
                        <span>Store Pickup (QR)</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
