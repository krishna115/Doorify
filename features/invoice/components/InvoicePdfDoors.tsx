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


export function InvoicePdfDoors({

  invoice,

}: Props) {


  return (

    <View style={styles.container}>


      {/* =====================================
          Header
      ====================================== */}

      <View style={styles.titleBar}>


        <Text style={styles.title}>

          Door Details

        </Text>


      </View>



      {/* =====================================
          Table Header
      ====================================== */}

      <View style={[styles.row, styles.tableHeader]}>


        <Text style={[styles.cell, styles.doorCell]}>

          Door

        </Text>


        <Text style={styles.cell}>

          Size

        </Text>


        <Text style={styles.cell}>

          Qty

        </Text>


        <Text style={styles.cell}>

          Area / Door

        </Text>


        <Text style={styles.cell}>

          Total Area

        </Text>


        <Text style={styles.priceCell}>

          Price / Sq.Ft.

        </Text>


        <Text style={styles.priceCell}>

          Total

        </Text>


      </View>



      {/* =====================================
          Rows
      ====================================== */}

      {
        invoice.doors.map(

          (door,index)=>{


            const areaPerDoor =
              (
                door.width *
                door.height
              ) / 144;


            const totalArea =
              areaPerDoor *
              door.quantity;


            const total =
              totalArea *
              invoice.payment.pricePerSqft;



            return (

              <View

                key={index}

                style={styles.row}

              >


                <Text

                  style={[
                    styles.cell,
                    styles.doorCell,
                  ]}

                >

                  {
                    door.name ??
                    `Door ${index + 1}`
                  }

                </Text>



                <Text style={styles.cell}>

                  {door.height}"
                  {" × "}
                  {door.width}"

                </Text>



                <Text style={styles.cell}>

                  {door.quantity}

                </Text>



                <Text style={styles.cell}>

                  {
                    areaPerDoor.toFixed(2)
                  }

                  {" sq.ft."}

                </Text>



                <Text style={styles.cell}>

                  {
                    totalArea.toFixed(2)
                  }

                  {" sq.ft."}

                </Text>



                <Text style={styles.priceCell}>

                  ₹
                  {
                    invoice.payment.pricePerSqft
                    .toLocaleString()
                  }

                </Text>



                <Text style={styles.priceCell}>

                  ₹
                  {
                    Math.round(total)
                    .toLocaleString()
                  }

                </Text>


              </View>

            );


          }

        )
      }


    </View>

  );

}



const styles = StyleSheet.create({


  container: {

    marginTop: 24,

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 12,

    overflow: "hidden",

    backgroundColor: "#ffffff",

  },


  titleBar: {

    paddingVertical: 14,

    paddingHorizontal: 24,

    borderBottomWidth: 1,

    borderBottomColor: "#e5e7eb",

  },


  title: {

    fontSize: 14,

    fontWeight: 700,

  },


  row: {

    flexDirection: "row",

    borderBottomWidth: 1,

    borderBottomColor: "#e5e7eb",

    alignItems: "center",

    minHeight: 42,

  },


  tableHeader: {

    backgroundColor: "#f9fafb",

  },


  cell: {

    flex: 1,

    fontSize: 9,

    textAlign: "center",

    paddingHorizontal: 6,

  },


  doorCell: {

    flex: 1.8,

    textAlign: "left",

  },


  priceCell: {

    flex: 1.2,

    fontSize: 9,

    textAlign: "right",

    paddingHorizontal: 6,

  },


});