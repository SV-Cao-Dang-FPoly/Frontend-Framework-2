import { IProduct } from '../interfaces/product';
import instance from './instance';
const user = JSON.parse(localStorage.getItem('user')!);
// export interface IProduct {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

export const getAll = () => {
  return instance.get('/rooms');
};
export const create = (product: IProduct) => {
  return instance.post('/rooms', product);
};
export const get = (id: number) => {
  return instance.get('/rooms/' + id);
};
export const remove = (id: number | string) => {
  return instance.delete(`/rooms/${id}`, {});
};
export const update = (product: IProduct) => {
  return instance.put('/rooms/' + product._id, product);
};
