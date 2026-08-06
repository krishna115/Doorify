export type OrderStatus =
  | "pending"
  | "accepted"
  | "manufacturing"
  | "completed"
  | "ready_for_dispatch"
  | "cancelled";

export interface OrderDoor {
  inventory_id: string | null;

  quantity: number;
  name?: string;
  width: number;
  height: number;
}

export interface Order {
  id: string;

  order_number: number;

  customer_name: string;

  customer_phone: string;

  status: OrderStatus;

  estimated_days: number | null;

  doors: OrderDoor[];

  created_at: string;
  total_amount: number;

  price_per_sqft: number;

discount: number;

addons: {
  name: string;
  amount: number;
}[];
}
// export interface OrderCustomization {
//   id: string;

//   order_id: string;

//   instruction: string;

//   is_completed: boolean;

//   completed_by?: string;

//   completed_at?: string;
// }

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

  estimated_days?: number;

  doors: OrderDoor[];
  total_amount: number;
  amount_paid: number;
  price_per_sqft: number;

discount: number;

addons: {
  name: string;
  amount: number;
}[];

}

export interface UpdateOrderRequest {

  id: string;

  customer_name: string;

  customer_phone: string;

  estimated_days: number | null;

  status: OrderStatus;

  doors: OrderDoor[];

}


export interface CustomizationItem {

  instruction: string;

  image: File | null;

  preview: string;

}


export interface OrderDetails {

  order: Order;

  customizations: OrderCustomization[];

  logs: OrderLog[];

}

export interface OrderCustomization {
  id: string;

  order_id: string;

  instruction: string;

  image_url: string | null;

  image?: string;

  is_completed: boolean;

  completed_by: string | null;

  completed_at: string | null;

  created_at: string;
}

export interface Payment {

  id: string;

  order_id: string;

  amount: number;

  payment_method: string | null;

  note: string | null;

  received_by: string | null;

  received_at: string;

}

export interface CreatePaymentRequest {

  orderId: string;

  amount: number;

  paymentMethod?: string | null;

  note?: string;

}