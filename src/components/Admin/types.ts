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
  
  export interface Order {
	id: string;
	items: CartItem[];
	total: number;
	status: 'Pending' | 'Accepted' | 'Delivered' | 'Received' | 'Rejected';
	timestamp: number; // Original creation timestamp
	statusTimestamps: {
	  pending?: number;
	  accepted?: number;
	  delivered?: number;
	  received?: number;
	  rejected?: number;
	}; // Timestamps for status changes
	phone?: string;
	address?: string;
	paymentMethod?: string;
  }