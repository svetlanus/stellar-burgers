import { useNavigate } from 'react-router-dom';
import { Modal, OrderInfo } from '@components';

export const OrderInfoModal = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1); // close
  };

  return (
    <Modal title="Детали заказа" onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};
