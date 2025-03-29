import "./App.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Added Link and Route from react-router-dom
import axios, {Axios} from 'axios';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const FormDashboard = ({ isOpen, onClose }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/items', {
        name: newItemName,
        description: newItemDescription,
      });
      console.log('Item added', response.data);
      setNewItemName('');
      setNewItemDescription('');
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create New Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          fullWidth
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Item Description"
          fullWidth
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddItem} variant="contained" color="primary">
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDashboard;