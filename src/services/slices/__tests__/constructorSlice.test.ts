import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 50,
  image: 'test.jpg',
  image_large: 'test-large.jpg',
  image_mobile: 'test-mobile.jpg'
};

const mockBun: TIngredient = {
  ...mockIngredient,
  _id: '2',
  name: 'Test Bun',
  type: 'bun'
};

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  test('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('should add ingredient', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Test Ingredient');
    expect(state.ingredients[0].id).toBeDefined();
  });

  test('should add bun', () => {
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);
    expect(state.bun).not.toBeNull();
    expect(state.bun?.name).toBe('Test Bun');
    expect(state.bun?.id).toBeDefined();
  });

  test('should remove ingredient', () => {
    const addAction = addIngredient(mockIngredient);
    let state = constructorReducer(initialState, addAction);
    const ingredientId = state.ingredients[0].id;

    const removeAction = removeIngredient(ingredientId);
    state = constructorReducer(state, removeAction);
    expect(state.ingredients).toHaveLength(0);
  });

  test('should move ingredient up', () => {
    const addAction1 = addIngredient(mockIngredient);
    let state = constructorReducer(initialState, addAction1);

    const ingredient2 = { ...mockIngredient, _id: '3', name: 'Ingredient 2' };
    const addAction2 = addIngredient(ingredient2);
    state = constructorReducer(state, addAction2);

    expect(state.ingredients[0].name).toBe('Test Ingredient');
    expect(state.ingredients[1].name).toBe('Ingredient 2');

    state = constructorReducer(state, moveIngredientUp(1));
    expect(state.ingredients[0].name).toBe('Ingredient 2');
    expect(state.ingredients[1].name).toBe('Test Ingredient');
  });

  test('should move ingredient down', () => {
    const addAction1 = addIngredient(mockIngredient);
    let state = constructorReducer(initialState, addAction1);

    const ingredient2 = { ...mockIngredient, _id: '3', name: 'Ingredient 2' };
    const addAction2 = addIngredient(ingredient2);
    state = constructorReducer(state, addAction2);

    expect(state.ingredients[0].name).toBe('Test Ingredient');
    expect(state.ingredients[1].name).toBe('Ingredient 2');

    state = constructorReducer(state, moveIngredientDown(0));
    expect(state.ingredients[0].name).toBe('Ingredient 2');
    expect(state.ingredients[1].name).toBe('Test Ingredient');
  });

  test('should clear constructor', () => {
    const addAction1 = addIngredient(mockIngredient);
    let state = constructorReducer(initialState, addAction1);
    const addAction2 = addIngredient(mockBun);
    state = constructorReducer(state, addAction2);

    expect(state.ingredients).toHaveLength(1);
    expect(state.bun).not.toBeNull();

    state = constructorReducer(state, clearConstructor());
    expect(state.ingredients).toHaveLength(0);
    expect(state.bun).toBeNull();
  });
});
