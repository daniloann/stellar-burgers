export const mockUser = {
  success: true,
  user: {
    email: 'test@test.com',
    name: 'Test User',
  },
};

export const mockOrderResponse = {
  success: true,
  order: {
    _id: '66a8e6d5f3b4c5d6e7f8g9h0',
    status: 'done',
    name: 'Флюоресцентный бургер',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: 12345,
    owner: {
      name: 'Test User',
      email: 'test@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    price: 1203,
    ingredients: [
      '60d3b41abdacab0026a733c6',
      '60d3b41abdacab0026a733c8',
      '60d3b41abdacab0026a733ca',
    ],
  },
  name: 'Флюоресцентный бургер',
};

export const mockTokens = {
  accessToken: 'Bearer mock-access-token',
  refreshToken: 'mock-refresh-token',
};