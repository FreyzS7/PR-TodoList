import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Box,
  Fab,
  Grid
} from '@mui/material';
import { Add, Logout } from '@mui/icons-material';
import useAuthStore from '../../stores/useAuthStore';
import useSellingStore from '../../stores/useSellingStore';
import ItemForm from './ItemForm';
import ItemCard from './ItemCard';

const BuyerDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { user, logout } = useAuthStore();
  const { items, getItemsByUser } = useSellingStore();

  const userItems = getItemsByUser(user.name);

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-8">
        <Box>
          <Typography variant="h4" component="h1" className="font-bold text-gray-800">
            Buyer Dashboard
          </Typography>
          <Typography variant="h6" className="text-gray-600">
            Welcome, {user.name}!
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={logout}
          className="text-red-500 border-red-500 hover:bg-red-50"
        >
          Logout
        </Button>
      </Box>

      {showForm && (
        <Card className="mb-8 shadow-lg">
          <CardContent>
            <ItemForm onClose={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-gray-800 mb-4">
          Your Listings ({userItems.length})
        </Typography>
        
        {userItems.length === 0 ? (
          <Card className="p-8 text-center">
            <Typography variant="h6" className="text-gray-500 mb-4">
              No items listed yet
            </Typography>
            <Typography variant="body1" className="text-gray-400 mb-6">
              Create your first item listing to start selling
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Create First Listing
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {userItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ItemCard item={item} showActions={true} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {userItems.length > 0 && (
        <Fab
          color="primary"
          aria-label="add"
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600"
          onClick={() => setShowForm(true)}
        >
          <Add />
        </Fab>
      )}
    </Container>
  );
};

export default BuyerDashboard;