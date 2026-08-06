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


export function InvoicePdfPriceBreakdown({

  invoice,

}: Props) {


  const {
    payment,
    doors,
    options,
  } = invoice;


  return (

    <View style={styles.container}>


      {/* =====================================
          Header
      ====================================== */}

      <View style={styles.header}>


        <Text style={styles.title}>

          Price Breakdown

        </Text>


      </View>



      <View style={styles.content}>


        {/* =====================================
            Door Calculation Table
        ====================================== */}


        <View>


          <View style={[
            styles.row,
            styles.tableHeader,
          ]}>


            <Text style={[
              styles.cell,
              styles.doorCell,
            ]}>

              Door

            </Text>


            <Text style={styles.cell}>

              Size

            </Text>


            <Text style={styles.cell}>

              Qty

            </Text>


            <Text style={styles.cell}>

              Area

            </Text>


            <Text style={styles.cell}>

              Rate

            </Text>


            <Text style={styles.cell}>

              Total

            </Text>


          </View>



          {
            doors.map(

              (door,index)=>(


                <View

                  key={index}

                  style={styles.row}

                >


                  <Text style={[
                    styles.cell,
                    styles.doorCell,
                  ]}>

                    {door.name}

                  </Text>



                  <Text style={styles.cell}>

                    {door.height}
                    {" × "}
                    {door.width}

                  </Text>



                  <Text style={styles.cell}>

                    {door.quantity}

                  </Text>



                  <Text style={styles.cell}>

                    {door.area.toFixed(2)}

                  </Text>



                  <Text style={styles.cell}>

                    ₹
                    {door.pricePerSqft}

                  </Text>



                  <Text style={styles.cell}>

                    ₹
                    {door.total.toFixed(2)}

                  </Text>


                </View>

              )

            )
          }


        </View>




        {/* =====================================
            Summary
        ====================================== */}


        <View style={styles.summary}>


          <View style={styles.summaryRow}>


            <Text>

              Subtotal

            </Text>


            <Text>

              ₹
              {payment.subtotal.toFixed(2)}

            </Text>


          </View>



          {
            options.showAddons &&
            payment.addons.length > 0 && (

              <>


                {
                  payment.addons.map(

                    (addon,index)=>(

                      <View

                        key={index}

                        style={styles.summaryRow}

                      >

                        <Text style={styles.smallText}>

                          {addon.name}

                        </Text>


                        <Text style={styles.smallText}>

                          + ₹
                          {Number(
                            addon.amount
                          ).toFixed(2)}

                        </Text>


                      </View>

                    )

                  )
                }



                <View style={styles.summaryRow}>


                  <Text style={styles.medium}>

                    Addons Total

                  </Text>


                  <Text style={styles.medium}>

                    ₹
                    {payment.addonsTotal.toFixed(2)}

                  </Text>


                </View>


              </>

            )
          }




          {
            options.showDiscount &&
            payment.discount > 0 && (


              <View style={styles.summaryRow}>


                <Text style={styles.discount}>

                  Discount

                </Text>


                <Text style={styles.discount}>

                  - ₹
                  {payment.discount.toFixed(2)}

                </Text>


              </View>


            )
          }




          <View style={styles.divider}/>



          <View style={styles.totalRow}>


            <Text style={styles.totalLabel}>

              Grand Total

            </Text>


            <Text style={styles.totalValue}>

              ₹
              {payment.total.toFixed(2)}

            </Text>


          </View>




          {
            options.showAdvance && (

              <>


                <View style={styles.summaryRow}>


                  <Text>

                    Advance Paid

                  </Text>


                  <Text style={styles.green}>

                    ₹
                    {payment.advance.toFixed(2)}

                  </Text>


                </View>



                <View style={styles.summaryRow}>


                  <Text style={styles.medium}>

                    Remaining

                  </Text>


                  <Text style={styles.medium}>

                    ₹
                    {payment.remaining.toFixed(2)}

                  </Text>


                </View>


              </>

            )
          }



        </View>


      </View>


    </View>

  );

}




const styles = StyleSheet.create({


  container: {

    marginTop: 24,

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 10,

    overflow: "hidden",

  },


  header: {

    paddingVertical: 12,

    paddingHorizontal: 16,

    backgroundColor: "#f9fafb",

    borderBottomWidth: 1,

    borderBottomColor: "#e5e7eb",

  },


  title: {

    fontSize: 14,

    fontWeight: 700,

  },


  content: {

    padding: 16,

  },


  row: {

    flexDirection: "row",

    borderBottomWidth: 1,

    borderBottomColor: "#e5e7eb",

    minHeight: 32,

    alignItems: "center",

  },


  tableHeader: {

    backgroundColor: "#f9fafb",

  },


  cell: {

    flex: 1,

    fontSize: 8,

    textAlign: "right",

  },


  doorCell: {

    flex: 1.8,

    textAlign: "left",

  },


  summary: {

    marginTop: 24,

    marginLeft: "auto",

    width: 250,

  },


  summaryRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 8,

    fontSize: 10,

  },


  smallText: {

    fontSize: 9,

  },


  medium: {

    fontWeight: 600,

  },


  discount: {

    color: "#dc2626",

    fontSize: 10,

  },


  divider: {

    borderBottomWidth: 1,

    borderBottomColor: "#d1d5db",

    marginVertical: 10,

  },


  totalRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 12,

  },


  totalLabel: {

    fontSize: 14,

    fontWeight: 700,

  },


  totalValue: {

    fontSize: 14,

    fontWeight: 700,

  },


  green: {

    color: "#15803d",

  },


});