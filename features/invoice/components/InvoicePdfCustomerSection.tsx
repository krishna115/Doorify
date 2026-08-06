import {
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import {
  InvoiceData,
} from "../types";


interface Props {

  invoice: InvoiceData;

}


export function InvoicePdfCustomerSection({

  invoice,

}: Props) {


  const orderDate =
    new Date(
      invoice.order.created_at
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  return (

    <View style={styles.container}>


      {/* =====================================
          Customer Details
      ====================================== */}

      <View style={styles.card}>


        <Text style={styles.heading}>

          Customer Details

        </Text>



        <View style={styles.content}>


          {invoice.options.showCustomer && (

            <View style={styles.field}>


              <Text style={styles.label}>

                Customer Name

              </Text>


              <Text style={styles.value}>

                {invoice.customer.name}

              </Text>


            </View>

          )}



          {invoice.options.showPhone && (

            <View style={styles.field}>


              <Text style={styles.label}>

                Phone Number

              </Text>


              <Text style={styles.value}>

                {invoice.customer.phone || "-"}

              </Text>


            </View>

          )}


        </View>


      </View>



      {/* =====================================
          Order Details
      ====================================== */}

      <View style={styles.card}>


        <Text style={styles.heading}>

          Order Details

        </Text>



        <View style={styles.content}>


          {invoice.options.showOrderNumber && (

            <View style={styles.row}>


              <Text style={styles.labelText}>

                Order Number

              </Text>


              <Text style={styles.boldValue}>

                #{invoice.order.order_number}

              </Text>


            </View>

          )}



          {invoice.options.showDate && (

            <View style={styles.row}>


              <Text style={styles.labelText}>

                Order Date

              </Text>


              <Text style={styles.value}>

                {orderDate}

              </Text>


            </View>

          )}



          {invoice.options.showSalesperson && (

            <View style={styles.row}>


              <Text style={styles.labelText}>

                Salesperson

              </Text>


              <Text style={styles.value}>

                {invoice.salesperson.name || "-"}

              </Text>


            </View>

          )}



          <View style={styles.row}>


            <Text style={styles.labelText}>

              Status

            </Text>


            <Text style={styles.mediumValue}>

              {
                invoice.order.status.replaceAll(
                  "_",
                  " "
                )
              }

            </Text>


          </View>



          {invoice.order.estimated_days && (

            <View style={styles.row}>


              <Text style={styles.labelText}>

                Estimated Delivery

              </Text>


              <Text style={styles.value}>

                {invoice.order.estimated_days} Days

              </Text>


            </View>

          )}


        </View>


      </View>


    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    gap: 20,

    marginTop: 24,

  },


  card: {

    flex: 1,

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 12,

    padding: 24,

    backgroundColor: "#ffffff",

  },


  heading: {

    fontSize: 14,

    fontWeight: 700,

    marginBottom: 20,

  },


  content: {

    gap: 16,

  },


  field: {

    marginBottom: 4,

  },


  label: {

    fontSize: 8,

    color: "#6b7280",

    textTransform: "uppercase",

    letterSpacing: 1,

  },


  labelText: {

    fontSize: 10,

    color: "#6b7280",

  },


  value: {

    fontSize: 11,

    marginTop: 4,

  },


  boldValue: {

    fontSize: 11,

    fontWeight: 700,

  },


  mediumValue: {

    fontSize: 11,

    fontWeight: 600,

    textTransform: "capitalize",

  },


  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },


});