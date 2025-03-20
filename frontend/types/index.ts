export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
}
