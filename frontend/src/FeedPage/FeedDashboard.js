import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

const FeedDashboard = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Manage the selected item for the dialog
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility

  useEffect(() => {
    const getItems = () => {
      axios
        .get("http://localhost:5000/items")
        .then((response) => setItems(response.data))
        .catch((error) =>
          console.error("Error getting the items", error)
        );
    };
    getItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the clicked item as the selected item
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setSelectedItem(null); // Clear the selected item when dialog is closed
  };

  const handleMarkAsFound = () => {
    console.log(`Item ${selectedItem.name} marked as found.`);
    handleCloseDialog(); // Close the dialog after marking as found
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Missing Items</h1>

      {/* Display list of items */}
      {items.map((item) => (
        <Card key={item.id} sx={{ mb: 2, cursor: "pointer" }} onClick={() => handleItemClick(item)}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">{item.description}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Dialog for item details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedItem?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMarkAsFound} variant="contained" color="secondary">
            Mark as Found
          </Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedDashboard;
