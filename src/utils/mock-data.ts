import { TIngredient, TOrder } from './types';

export const mockIngredients: TIngredient[] = [
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 20,
    carbohydrates: 100,
    calories: 420,
    price: 125,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733c8',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733c9',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733ca',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733cb',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733cc',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 50,
    fat: 99,
    carbohydrates: 156,
    calories: 345,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733cd',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733ce',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733cf',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png'
  },
  {
    _id: '60d3b41abdacab0026a733d0',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
  }
];

// Моковые данные для заказов
export const mockOrder: TOrder = {
  _id: '66a8e6d5f3b4c5d6e7f8g9h0',
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2024-01-25T10:00:00.000Z',
  updatedAt: '2024-01-25T10:05:00.000Z',
  number: 12345,
  ingredients: [
    '60d3b41abdacab0026a733c6', // булка
    '60d3b41abdacab0026a733c8', // начинка
    '60d3b41abdacab0026a733ca'  // соус
  ]
};

export const mockOrders: TOrder[] = [
  mockOrder,
  {
    _id: '66a8e6d5f3b4c5d6e7f8g9h1',
    status: 'pending',
    name: 'Бессмертный бургер',
    createdAt: '2024-01-25T09:00:00.000Z',
    updatedAt: '2024-01-25T09:02:00.000Z',
    number: 12344,
    ingredients: [
      '60d3b41abdacab0026a733d0', // другая булка
      '60d3b41abdacab0026a733c9', // другая начинка
      '60d3b41abdacab0026a733cc'  // другой соус
    ]
  }
];

// Моковый ответ для создания заказа
export const mockOrderResponse = {
  success: true,
  order: {
    _id: '66a8e6d5f3b4c5d6e7f8g9h0',
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: '2024-01-25T10:00:00.000Z',
    updatedAt: '2024-01-25T10:05:00.000Z',
    number: 12345,
    ingredients: [
      '60d3b41abdacab0026a733c6',
      '60d3b41abdacab0026a733c8',
      '60d3b41abdacab0026a733ca'
    ],
    owner: {
      name: 'Test User',
      email: 'test@test.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    price: 1203
  },
  name: 'Флюоресцентный бургер'
};