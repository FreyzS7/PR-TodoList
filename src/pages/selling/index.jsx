import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useSellingStore from '../../stores/useSellingStore';
import LoginForm from '../../components/selling/LoginForm';
import BuyerDashboard from '../../components/selling/BuyerDashboard';
import SellerDashboard from '../../components/selling/SellerDashboard';
import Notification from '../../components/selling/Notification';

const SellingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role, loadAuth, notification, clearNotification } = useAuthStore();
  const { loadItems, checkAndArchiveItems } = useSellingStore();

  useEffect(() => {
    loadAuth();
    loadItems();
    
    // Check for items to archive on load
    checkAndArchiveItems();
    
    // Set up interval to check for archiving every hour
    const interval = setInterval(checkAndArchiveItems, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notification && notification.type === 'error') {
      const timer = setTimeout(() => {
        clearNotification();
        navigate('/');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, navigate, clearNotification]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {notification && <Notification />}
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && <Notification />}
      
      {role === 'Buyer' && <BuyerDashboard />}
      {role === 'Seller' && <SellerDashboard />}
    </div>
  );
};

export default SellingPage;