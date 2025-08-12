import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Logout, CheckCircle, Schedule, Archive } from '@mui/icons-material';
import useAuthStore from '../../stores/useAuthStore';
import useSellingStore from '../../stores/useSellingStore';
import ItemCard from './ItemCard';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { user, logout } = useAuthStore();
  const { items, archivedItems, setItemStatus, getItemsByStatus } = useSellingStore();

  const pendingItems = getItemsByStatus('pending');
  const inProgressItems = getItemsByStatus('in_progress');
  const doneItems = getItemsByStatus('done');

  const handleStatusChange = (itemId, newStatus) => {
    setItemStatus(itemId, newStatus);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  const renderItemsGrid = (itemsList, showStatusControl = false) => {
    if (itemsList.length === 0) {
      return (
        <Card className="p-8 text-center">
          <Typography variant="h6" className="text-gray-500 mb-2">
            No items in this category
          </Typography>
          <Typography variant="body2" className="text-gray-400">
            Items will appear here as they are created or moved to this status
          </Typography>
        </Card>
      );
    }

    return (
      <Grid container spacing={3}>
        {itemsList.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <ItemCard item={item} showActions={false} />
              {showStatusControl && (
                <CardContent className="pt-0">
                  <FormControl fullWidth size="small">
                    <InputLabel>Update Status</InputLabel>
                    <Select
                      value={item.status}
                      label="Update Status"
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in_progress">In Progress</MenuItem>
                      <MenuItem value="done">Done</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-8">
        <Box>
          <Typography variant="h4" component="h1" className="font-bold text-gray-800">
            Seller Dashboard
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

      <Box className="mb-6 bg-white rounded-lg shadow-sm">
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          className="border-b"
        >
          <Tab 
            icon={<Schedule />} 
            iconPosition="start"
            label={`Pending (${pendingItems.length})`}
          />
          <Tab 
            icon={<Schedule />} 
            iconPosition="start" 
            label={`In Progress (${inProgressItems.length})`}
          />
          <Tab 
            icon={<CheckCircle />} 
            iconPosition="start"
            label={`Done (${doneItems.length})`}
          />
          <Tab 
            icon={<Archive />} 
            iconPosition="start"
            label={`Archived (${archivedItems.length})`}
          />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
            Pending Items
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-6">
            These items are waiting to be processed. Click to move them to "In Progress".
          </Typography>
          {renderItemsGrid(pendingItems, true)}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
            In Progress Items
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-6">
            These items are currently being processed. Mark as "Done" when completed.
          </Typography>
          {renderItemsGrid(inProgressItems, true)}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
            Completed Items
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-6">
            These items are completed. They will be automatically archived after 24 hours.
          </Typography>
          {renderItemsGrid(doneItems, false)}
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
            Archived Items
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-6">
            These items were completed and automatically archived after 24 hours.
          </Typography>
          {renderItemsGrid(archivedItems, false)}
        </TabPanel>
      </Box>
    </Container>
  );
};

export default SellerDashboard;