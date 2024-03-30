import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
  beforeEach(async () => {
    const product: Product = {
      id: 1,
      name: 'The lord of the ring',
      price: 14,
      category: 'fiction'
    };
    await store.create(product);
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.show).toBeDefined();
  });
  it('show method should return the correct Product', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'The lord of the ring',
      price: 14,
      category: 'fiction'
    });
  });
});
