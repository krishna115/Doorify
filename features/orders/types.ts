export type OrderStatus =
  | "pending"
  | "accepted"
  | "manufacturing"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;

  order_number: number;

  customer_name: string;

  customer_phone: string;

  door_image?: string;

  height: number;

  width: number;

  quantity: number;

  estimated_days?: number;

  status: OrderStatus;

  inventory_id?: string;

  created_by?: string;

  assigned_to?: string;

  created_at: string;

  updated_at: string;
}

export interface OrderCustomization {
  id: string;

  order_id: string;

  instruction: string;

  is_completed: boolean;

  completed_by?: string;

  completed_at?: string;
}

export interface OrderLog {
  id: string;

  order_id: string;

  action: string;

  description?: string;

  user_id?: string;

  created_at: string;
}

export interface CreateOrderRequest {
  customer_name: string;

  customer_phone: string;

  door_image?: string;

  height: number;

  width: number;

  quantity: number;

  estimated_days?: number;

  inventory_id?: string;

  customizations: string[];
}

export interface UpdateOrderRequest {
  id: string;

  customer_name: string;

  customer_phone: string;

  height: number;

  width: number;

  quantity: number;

  estimated_days?: number;

  status: OrderStatus;
}

export interface OrderCustomization {

  id: string;

  order_id: string;

  title: string;

}



export interface OrderDetails {

  order: Order;

  customizations: OrderCustomization[];

  logs: OrderLog[];

}