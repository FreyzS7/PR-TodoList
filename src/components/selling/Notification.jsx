import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import useAuthStore from '../../stores/useAuthStore';

const Notification = () => {
  const { notification, clearNotification } = useAuthStore();

  if (!notification) return null;

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={3000}
      onClose={clearNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={clearNotification} 
        severity={notification.type}
        variant="filled"
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;