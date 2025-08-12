import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  MoreVert, 
  Edit, 
  Delete, 
  Person, 
  Badge,
  Category,
  Note
} from '@mui/icons-material';
import useAuthStore from '../../stores/useAuthStore';
import useSellingStore from '../../stores/useSellingStore';

const ItemCard = ({ item, showActions = false }) => {
  const { role } = useAuthStore();
  const { deleteItem, setEditingItem } = useSellingStore();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditingItem(item);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(item.id);
    }
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'default';
      case 'in_progress': return 'warning';
      case 'done': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
      <CardContent>
        <Box className="flex justify-between items-start mb-3">
          <Typography variant="h6" className="font-semibold text-gray-800 flex-1">
            {item.itemName}
          </Typography>
          {showActions && role === 'Buyer' && (
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
          )}
        </Box>

        <Box className="space-y-2 mb-4">
          <Box className="flex items-center gap-2">
            <Person className="text-gray-500" fontSize="small" />
            <Typography variant="body2" className="text-gray-700">
              {item.playerUsername}
            </Typography>
          </Box>

          {item.playerUserId && (
            <Box className="flex items-center gap-2">
              <Badge className="text-gray-500" fontSize="small" />
              <Typography variant="body2" className="text-gray-700">
                ID: {item.playerUserId}
              </Typography>
            </Box>
          )}

          {item.customForm ? (
            <Box className="flex items-start gap-2">
              <Note className="text-gray-500 mt-1" fontSize="small" />
              <Typography variant="body2" className="text-gray-700">
                {item.customNote}
              </Typography>
            </Box>
          ) : (
            <Box className="flex items-center gap-2">
              <Category className="text-gray-500" fontSize="small" />
              <Chip 
                label={item.category} 
                size="small" 
                variant="outlined"
                className="bg-blue-50 text-blue-700 border-blue-200"
              />
            </Box>
          )}
        </Box>

        <Box className="flex justify-between items-center">
          <Chip 
            label={getStatusLabel(item.status)}
            color={getStatusColor(item.status)}
            size="small"
          />
          <Typography variant="caption" className="text-gray-500">
            {formatDate(item.dateCreated)}
          </Typography>
        </Box>

        <Typography variant="caption" className="text-gray-400 block mt-2">
          Created by: {item.createdBy}
        </Typography>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit className="mr-2" fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} className="text-red-600">
          <Delete className="mr-2" fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ItemCard;