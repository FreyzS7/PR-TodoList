import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import useAuthStore from '../../stores/useAuthStore';

const LoginForm = () => {
  const [name, setName] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <Box className="text-center mb-6">
          <Person className="text-6xl text-blue-500 mb-4" />
          <Typography variant="h4" component="h1" className="font-bold text-gray-800">
            Selling Platform
          </Typography>
          <Typography variant="body1" className="text-gray-600 mt-2">
            Enter your name to access the platform
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Jiro or Ajiz"
            required
            className="mb-4"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3"
          >
            Access Platform
          </Button>
        </form>

        <Box className="mt-6 p-4 bg-gray-100 rounded">
          <Typography variant="caption" className="text-gray-600 block mb-2">
            <strong>Valid Users:</strong>
          </Typography>
          <Typography variant="caption" className="text-gray-600 block">
            • Jiro (Buyer) - Can create item listings
          </Typography>
          <Typography variant="caption" className="text-gray-600 block">
            • Ajiz (Seller) - Can manage item status
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;