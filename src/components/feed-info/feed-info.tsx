import { FeedInfoUI } from '@ui';
import { useSelector } from '@/services/store';
import { selectFeedOrders, selectFeedTotal,selectFeedTotalToday, selectFeedLoading, selectFeedError } from '@services/slices/feed-slice';


import type { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): React.JSX.Element => {
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);
  const orders = useSelector(selectFeedOrders);

  const feed = {
    orders,
    total,
    totalToday,
    isLoading,
    error,
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />
  );
};
