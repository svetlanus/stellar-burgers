import { useEffect } from 'react';
import { type Location } from 'react-router-dom';
import { Preloader } from '@ui';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute,
} from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
} from '@pages';
import {
  fetchIngredients,
  selectIngredients,
  selectIsLoading,
  selectError,
} from '@/services/slices/ingredient-slice';
import { getUser } from '@/services/slices/user-slice';
import { useDispatch, useSelector } from '@/services/store';
import type { AppContentProps } from './type';

import '../../index.css';
import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(selectIsLoading);
  const ingredientsError = useSelector(selectError);

  useEffect(() => {
    void dispatch(getUser());
    void dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent
        ingredients={ingredients}
        isLoading={isIngredientsLoading}
        error={ingredientsError}
      />
    </div>
  );
};

export default App;

/* Маршруты показываются только когда ингредиенты загружены: без них не
   отрисовать ни конструктор, ни состав заказа. */
const AppContent = ({
  ingredients,
  isLoading,
  error,
}: AppContentProps): React.JSX.Element => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты: {error}
      </p>
    );
  }

  if (!ingredients.length) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>Нет ингредиентов</p>
    );
  }

  return <RouteComponent />;
};

const OrderModal = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleModalClose = (): void => {
    void navigate(-1);
  };

  const orderNumber = id ? String(Number(id)).padStart(6, '0') : '';

  return (
    <Modal title={`# ${orderNumber}`} onClose={handleModalClose}>
      <OrderInfo />
    </Modal>
  );
};

const RouteComponent = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { background?: Location };
  const background = locationState?.background;

  const handleModalClose = (): void => {
    void navigate(-1);
  };

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
        <Route
          path="/feed/:id"
          element={
            <section className={styles.detailPageWrap}>
              <h2 className={`text text_type_main-large ${styles.detailHeader}`}>
                # {String(Number(useParams().id)).padStart(6, '0')}
              </h2>
              <OrderInfo />
            </section>
          }
        />
        <Route
          path="/ingredients/:id"
          element={
            <section className={styles.detailPageWrap}>
              <h2 className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </h2>
              <IngredientDetails />
            </section>
          }
        />
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route path="/feed/:id" element={<OrderModal />} />
          <Route
            path="/ingredients/:id"
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRoute>{<OrderModal />}</ProtectedRoute>}
          />
        </Routes>
      )}
    </>
  );
};
