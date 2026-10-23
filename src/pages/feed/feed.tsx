import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import {
  getFeeds,
  selectFeedOrders,
  selectFeedLoading,
} from '@services/slices/feed-slice';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);

  const handleGetFeeds = (): void => {
    void dispatch(getFeeds());
  };

  useEffect(() => {
    void dispatch(getFeeds());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
