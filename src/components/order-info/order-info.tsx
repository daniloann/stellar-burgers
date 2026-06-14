import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '../../utils/burger-api';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { data: ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    const loadOrder = async () => {
      if (number) {
        setLoading(true);
        try {
          const response = await getOrderByNumberApi(Number(number));
          if (response.success && response.orders.length) {
            setOrderData(response.orders[0]);
          }
        } catch (error) {
          console.error('Failed to load order:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadOrder();
  }, [number]);

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
