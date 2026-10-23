
import { useNavigate } from 'react-router-dom';
import { Modal } from '@components';
import { IngredientDetails } from './ingredient-details';

export const IngredientDetailsModal = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      title="Детали ингредиента"
      onClose={handleClose}
    >
      <IngredientDetails />
    </Modal>
  );
};
