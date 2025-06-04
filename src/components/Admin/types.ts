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
  
  export interface CartItem {
	title: string;
	price: number;
	size: string;
	service: string;
	image: string;
	quantity: number;
  }
  
  export interface User {
	id: string;
	username: string;
	password: string; // In a real app, use hashed passwords
	userType: 'admin' | 'user';
	orders: string[]; // Array of order IDs
  }
  
  export interface Order {
	id: string;
	userId: string; // Link to the user who placed the order
	items: CartItem[];
	total: number;
	status: 'Pending' | 'Accepted' | 'Delivered' | 'Received' | 'Rejected' | 'Archived';
	timestamp: number;
	statusTimestamps: {
	  pending?: number;
	  accepted?: number;
	  delivered?: number;
	  received?: number;
	  rejected?: number;
	  archived?: number;
	};
	phone?: string;
	address?: string;
	paymentMethod?: string;
  }