import { Preloader, IngredientDetailsUI } from '@ui';
import type { RootState } from '@/services/store';
import { useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails = (): React.JSX.Element => {
  // переменная из стора

  const { id } = useParams();

  const ingredientData =  useSelector((state: RootState) =>
    state.ingredients.ingredients.find((item) => item._id === id)
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
