
import React from 'react';
import Modal from "@/components/ui/modal";
import ReviewForm from './ReviewForm';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceProviderId: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  serviceProviderId
}) => {
  const handleSuccess = () => {
    onClose();
    // You might want to refresh the reviews list here
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Write a Review"
      size="md"
    >
      <div className="p-4">
        <p className="text-gray-600 mb-4">
          Share your experience with this service provider to help others make informed decisions.
        </p>
        <ReviewForm
          serviceProviderId={serviceProviderId}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </div>
    </Modal>
  );
};

export default ReviewModal;
