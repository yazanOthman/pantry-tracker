import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import {
  ModalBackground,
  ModalContainer,
  ModalHeader,
  Form,
  SaveButton,
  Title,
  CloseButton,
} from "./shared";
import dayjs from "dayjs";
import axios from "axios";

const Modal = ({ onClose, categories, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    location: "",
    notes: "",
  });
  const [expiryDate, setExpiryDate] = useState(dayjs(new Date()));

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      expiryDate,
      quantity: Number(formData.quantity),
    };

    try {
      const product = await axios.post(
        `${axios.defaults.baseURL}/products`,
        payload
      );
      if (product) {
        onSubmit();
      }
    } catch (error) {}
    onClose();
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>
          <Title>Add Product</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="name"
              label="Name"
              type="text"
              value={formData.name}
              fullWidth
              name="name"
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <TextField
              id="standard-number"
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              name="quantity"
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <InputLabel id="categories">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={formData.category}
              label="Categories"
              name="category"
              onChange={(e) => handleFormChange(e)}
              fullWidth
            >
              {categories.length > 0 &&
                categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    className="capitalize-text"
                  >
                    {category}
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div>
            <TextField
              label="Location"
              type="text"
              value={formData.location}
              fullWidth
              name="location"
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <TextField
              label="Notes"
              type="text"
              value={formData.notes}
              fullWidth
              multiline
              maxRows={2}
              name="notes"
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e)}
                label="Expiry Date"
              />
            </LocalizationProvider>
          </div>
          <SaveButton type="submit">Save Changes</SaveButton>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
