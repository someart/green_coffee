export interface Product {
	title: string;
	rating: number;
	reviews: number;
	sold: number;
	price: number;
	oldPrice: number;
	discount: number;
	sizes: string[];
	services: string[];
	image: string;
	description: string;
	details: string[];
	category: string;
  }
  
  export type Products = { [key: string]: Product };
  
  export interface OrderItem {
	title: string;
	price: number;
	size: string;
	service: string;
	image: string;
	quantity: number;
  }
  
  export interface Order {
	id: string;
	items: OrderItem[];
	total: number;
	status: 'Pending' | 'Accepted' | 'Delivered' | 'Received' | 'Rejected';
	timestamp: number;
  }