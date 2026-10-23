import { AppHeaderUI } from '@ui';
import { selectUserName } from '@/services/slices/user-slice';
import { useSelector } from '@/services/store';

export const AppHeader = (): React.JSX.Element => {
  /* имя пользователя из хранилища */
  const userName = useSelector(selectUserName);

  return <AppHeaderUI userName={userName} />;
};
