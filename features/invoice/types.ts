import {
  Order,
  OrderDoor,
} from "@/features/orders";


export interface InvoiceAddon {

  name: string;

  amount: number;

}

export interface InvoiceCustomization {
 id:string;

 name:string;

 image?:string;

 selected:boolean;

}

export interface InvoiceDoor {

  name: string | undefined;

  width: number;

  height: number;

  quantity: number;

  area: number;

  pricePerSqft: number;

  total: number;

}

export interface InvoiceCustomer {

  name: string;

  phone: string;

}

export interface InvoiceSalesperson {

  id: string;

  name: string;

}

export interface InvoicePayment {

  pricePerSqft: number;

  subtotal: number;

  addons: InvoiceAddon[];

  addonsTotal: number;

  discount: number;

  total: number;

  advance: number;

  remaining: number;

}

export interface InvoiceOptions {

  showCustomer: boolean;

  showPhone: boolean;

  showSalesperson: boolean;

  showOrderNumber: boolean;

  showDate: boolean;

  showPriceBreakdown: boolean;

  showCustomizations: boolean;

  showCustomizationImages: boolean;

  showAddons: boolean;

  showDiscount: boolean;

  showAdvance: boolean;

}

export interface InvoiceData {

  order: Order;

  customer: InvoiceCustomer;

  salesperson: InvoiceSalesperson;

  doors: InvoiceDoor[];

  customizations: InvoiceCustomization[];

  payment: InvoicePayment;

  options: InvoiceOptions;

}