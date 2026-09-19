import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MISSIONS_DATA } from '../data/missions';
import { PRODUCTS_DATA } from '../data/products';

const GameContext = createContext();

const INITIAL_POINTS = 250;

const DEFAULT_SHIPPING_ADDRESS = {
  fullName: 'Alex Miller',
  street: 'Calle Mayor 14, 2º B',
  city: 'Madrid',
  postalCode: '28013',
  country: 'Spain',
  phone: '+34 612 345 678'
};

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('rurio_points');
    return saved !== null ? Number(saved) : INITIAL_POINTS;
  });

  const [completedMissions, setCompletedMissions] = useState(() => {
    const saved = localStorage.getItem('rurio_completed_missions');
    return saved ? JSON.parse(saved) : [];
  });

  const [pendingMissions, setPendingMissions] = useState(() => {
    const saved = localStorage.getItem('rurio_pending_missions');
    return saved ? JSON.parse(saved) : [];
  });

  // Physical orders delivered to address
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('rurio_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Saved coupons and discounts in backpack
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('rurio_coupons');
    return saved ? JSON.parse(saved) : [];
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    const saved = localStorage.getItem('rurio_shipping_address');
    return saved ? JSON.parse(saved) : DEFAULT_SHIPPING_ADDRESS;
  });

  const [activeTab, setActiveTab] = useState('missions'); // 'missions' | 'map' | 'market' | 'backpack'

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rurio_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('rurio_completed_missions', JSON.stringify(completedMissions));
  }, [completedMissions]);

  useEffect(() => {
    localStorage.setItem('rurio_pending_missions', JSON.stringify(pendingMissions));
  }, [pendingMissions]);

  useEffect(() => {
    localStorage.setItem('rurio_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rurio_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('rurio_shipping_address', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  const fireCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Complete mission directly (AI Vision or GPS check-in)
  const completeMission = (missionId) => {
    const mission = MISSIONS_DATA.find((m) => m.id === missionId);
    if (!mission) return;

    setPendingMissions((prev) => prev.filter((id) => id !== missionId));

    if (!completedMissions.includes(missionId)) {
      setCompletedMissions((prev) => [...prev, missionId]);
      setPoints((prev) => prev + mission.points);
      fireCelebration();
    }
  };

  // Submit mission for Human verification review
  const submitForHumanReview = (missionId) => {
    if (!pendingMissions.includes(missionId) && !completedMissions.includes(missionId)) {
      setPendingMissions((prev) => [...prev, missionId]);
    }
  };

  const simulateHumanApproval = (missionId) => {
    completeMission(missionId);
  };

  // Purchase physical product with home delivery
  const buyPhysicalProduct = (product, customAddress = null) => {
    if (points < product.pointsCost) {
      return { success: false, message: 'Not enough points' };
    }

    const address = customAddress || shippingAddress;
    const trackingCode = `CORREOS-ES-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      orderId: 'ord_' + Date.now(),
      productId: product.id,
      title: product.title,
      category: product.category,
      merchant: product.merchant,
      image: product.image,
      pointsPaid: product.pointsCost,
      trackingCode,
      carrier: 'Correos Express Postal',
      estimatedArrival: 'Estimated 3-5 business days',
      orderedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      shippingAddress: address,
      status: 'Processing Shipment'
    };

    setPoints((prev) => prev - product.pointsCost);
    setOrders((prev) => [newOrder, ...prev]);
    fireCelebration();

    return { success: true, order: newOrder };
  };

  // Purchase coupon or discount to save in backpack
  const buyCoupon = (couponProduct) => {
    if (points < couponProduct.pointsCost) {
      return { success: false, message: 'Not enough points' };
    }

    const newCoupon = {
      couponId: 'coup_' + Date.now(),
      productId: couponProduct.id,
      title: couponProduct.title,
      merchant: couponProduct.merchant,
      discountAmount: couponProduct.discountAmount,
      discountCode: couponProduct.discountCode,
      validity: couponProduct.validity,
      image: couponProduct.image,
      pointsPaid: couponProduct.pointsCost,
      claimedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      instructions: couponProduct.instructions,
      isUsed: false
    };

    setPoints((prev) => prev - couponProduct.pointsCost);
    setCoupons((prev) => [newCoupon, ...prev]);
    fireCelebration();

    return { success: true, coupon: newCoupon };
  };

  const updateShippingAddress = (newAddr) => {
    setShippingAddress(newAddr);
  };

  const resetDemo = () => {
    setPoints(INITIAL_POINTS);
    setCompletedMissions([]);
    setPendingMissions([]);
    setOrders([]);
    setCoupons([]);
    localStorage.clear();
  };

  const addBonusPoints = (amount = 100) => {
    setPoints((prev) => prev + amount);
    fireCelebration();
  };

  return (
    <GameContext.Provider
      value={{
        points,
        completedMissions,
        pendingMissions,
        orders,
        coupons,
        shippingAddress,
        updateShippingAddress,
        activeTab,
        setActiveTab,
        completeMission,
        submitForHumanReview,
        simulateHumanApproval,
        buyPhysicalProduct,
        buyCoupon,
        resetDemo,
        addBonusPoints
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
