import OrdersPageSalesperson
  from "@/features/orders/components/OrdersPageSalesperson";

export default function Page() {

  return (

    <OrdersPageSalesperson
      basePath="/admin/orders/salesperson"
      permissions={{
        canCreate: true,
        canEdit: true,
        canDelete: true,
      }}
    />

  );

}