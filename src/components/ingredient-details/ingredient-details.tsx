import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';
import { selectIngredientById } from '@services/slices/ingredient-slice';

export const IngredientDetails = (): React.JSX.Element => {


  const { id } = useParams();

  const ingredientData =  useSelector((state) => selectIngredientById(state, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
