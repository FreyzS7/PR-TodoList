import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import useAuthStore from '../../stores/useAuthStore';
import useSellingStore from '../../stores/useSellingStore';

const ItemForm = ({ onClose }) => {
  const { user } = useAuthStore();
  const { addItem, updateItem, editingItem, setEditingItem } = useSellingStore();
  
  const [formData, setFormData] = useState({
    playerUsername: '',
    playerUserId: '',
    itemName: '',
    category: '',
    customForm: false,
    customNote: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const categories = ['GamePass', 'Title', 'Tool', 'Currency'];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'customForm' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      updateItem(editingItem.id, formData);
      setEditingItem(null);
    } else {
      addItem(formData, user.name);
    }
    
    setFormData({
      playerUsername: '',
      playerUserId: '',
      itemName: '',
      category: '',
      customForm: false,
      customNote: ''
    });
    
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      playerUsername: '',
      playerUserId: '',
      itemName: '',
      category: '',
      customForm: false,
      customNote: ''
    });
    setEditingItem(null);
    onClose();
  };

  return (
    <Box>
      <Typography variant="h6" className="font-semibold mb-6">
        {editingItem ? 'Edit Item Listing' : 'Create New Item Listing'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Player Username"
              name="playerUsername"
              value={formData.playerUsername}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Player User ID (Optional)"
              name="playerUserId"
              value={formData.playerUserId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.customForm}
                  onChange={handleChange}
                  name="customForm"
                />
              }
              label="Custom Item (Use custom note instead of category)"
            />
          </Grid>

          {formData.customForm ? (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Custom Note"
                name="customNote"
                value={formData.customNote}
                onChange={handleChange}
                multiline
                rows={3}
                required
                helperText="Describe your custom item"
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} className="flex gap-4 justify-end">
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              className="text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {editingItem ? 'Update' : 'Create'} Listing
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ItemForm;