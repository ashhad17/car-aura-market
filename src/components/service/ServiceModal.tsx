import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  service?: any; // Pass service data for editing
  serviceProviderId: string;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSave, service, serviceProviderId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "maintenance",
    duration: "",
  });

  // Reset formData when the modal is opened
  useEffect(() => {
    if (service) {
      // Populate formData with service data for editing
      setFormData({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        category: service.category || "maintenance",
        duration: service.duration || "",

      });
    } else {
      // Reset formData for adding a new service
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "maintenance",
        duration: "",
      });
    }
  }, [service, isOpen]); // Trigger when `service` or `isOpen` changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}"); // Parse the JSON string
    const userId = currentUser._id; // Retrieve the user ID

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
    if (service) {
      // Edit service
      await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/services/${service._id}`,
        { ...formData, serviceProvider: serviceProviderId, user: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      // Add new service
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/services`,
        { ...formData, serviceProvider: serviceProviderId, user: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    onSave(); // Refresh the services list
    onClose(); // Close the modal
  } catch (error) {
    console.error("Error saving service:", error);
  }
};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={service ? "Edit Service" : "Add Service"}>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Service Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter service name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Price</label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter service price"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Duration</label>
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter service duration (e.g., 1-2 hours)"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="inspection">Inspection</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>{service ? "Save Changes" : "Add Service"}</Button>
      </div>
    </Modal>
  );
};

export default ServiceModal;