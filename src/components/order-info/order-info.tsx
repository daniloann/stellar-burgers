// src/components/order-info/order-info.tsx
import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  clearCurrentOrder
} from '../../services/slices/feedSlice';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  // Получаем данные из стора через селекторы
  const {
    currentOrder: orderData,
    currentOrderLoading: loading
  } = useSelector((state) => state.feed);
  
  const ingredients = useSelector((state) => state.ingredients.data);

  useEffect(() => {
    if (number) {
      // Диспатчим thunk вместо прямого API-запроса
      dispatch(fetchOrderByNumber(Number(number)));
    }

    // Очищаем данные при размонтировании
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [number, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo: TIngredientsWithCount = {};

    // Проходим по ингредиентам заказа и собираем информацию
    orderData.ingredients.forEach((item: string) => {
      if (!ingredientsInfo[item]) {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          ingredientsInfo[item] = {
            ...ingredient,
            count: 1
          };
        }
      } else {
        ingredientsInfo[item].count++;
      }
    });

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};