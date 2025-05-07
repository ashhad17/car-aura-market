import React from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any; // Pass the booking data to display
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ isOpen, onClose, booking }) => {
  if (!booking) return null; // If no booking is passed, return null
console.log(booking)
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div className="space-y-4">
        {/* Booking Information */}
        <div>
          <h3 className="text-lg font-semibold">Booking ID</h3>
          <p>{booking._id || "N/A"}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Service Provider</h3>
          <p>{booking.serviceProvider?.name || "N/A"}</p> {/* Access the `name` field */}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Customer</h3>
          <p>{booking.user?.name || "N/A"}</p> {/* Access the `name` field */}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Date & Time</h3>
          <p>
            {new Date(booking.date).toLocaleDateString()} at {booking.time || "N/A"}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Status</h3>
          <p>{booking.status || "N/A"}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Total Price</h3>
          <p>${booking.totalPrice || "N/A"}</p>
        </div>

        {/* Services List */}
        <div>
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="list-disc pl-5">
            {booking.services?.map((service: any) => (
              <li key={service._id}>
                <p>
                  <strong>{service.name}</strong> - ${service.price} ({service.duration} mins)
                </p>
              </li>
            )) || <p>No services available</p>}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;