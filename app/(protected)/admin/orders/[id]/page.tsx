import {
} from "@/features/orders";
import { OrderDetailsPage } from "@/features/orders/components/OrderDetails/OrderDetailsPage";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: Props) {

  const { id } = await params;

  return (
    <OrderDetailsPage
      orderId={id}
    />
  );

}