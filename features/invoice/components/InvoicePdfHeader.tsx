import {
  Image,
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


export function InvoicePdfHeader({

  invoice,

}: Props) {


  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );


  return (

    <View style={styles.headerCard}>


      {/* =====================================
          Top Section
      ====================================== */}

      <View style={styles.headerTop}>


        {/* Company */}

        <View style={styles.companySection}>


          <Image

            src="/doorify_logo.jpeg"

            style={styles.logo}

          />


          <View>


            <Text style={styles.companyName}>

              Doorify

            </Text>


            <Text style={styles.subtitle}>

              Order Confirmation

            </Text>


            <View style={styles.companyInfo}>


              <Text style={styles.mutedText}>

                Door Manufacturing Solution

              </Text>


              <Text style={styles.mutedText}>

                Kanpur, Uttar Pradesh

              </Text>


            </View>


          </View>


        </View>



        {/* Invoice Details */}

        <View style={styles.invoiceBox}>


          <Text style={styles.invoiceLabel}>

            INVOICE

          </Text>


          <Text style={styles.invoiceNumber}>

            #{invoice.order.order_number}

          </Text>



          <View style={styles.invoiceMeta}>


            <View style={styles.metaRow}>


              <Text style={styles.mutedText}>

                Date

              </Text>


              <Text style={styles.mediumText}>

                {today}

              </Text>


            </View>



            <View style={styles.metaRow}>


              <Text style={styles.mutedText}>

                Status

              </Text>


              <Text style={styles.boldText}>

                {
                  invoice.order.status.replaceAll(
                    "_",
                    " "
                  )
                }

              </Text>


            </View>


          </View>


        </View>


      </View>



      {/* Divider */}

      <View style={styles.divider}/>



      {/* Title */}

      <View style={styles.titleSection}>


        <Text style={styles.title}>

          CUSTOMER INVOICE

        </Text>


        <Text style={styles.subtitleCenter}>

          Thank you for choosing us.
          Below are the details of your order.

        </Text>


      </View>


    </View>

  );

}



const styles = StyleSheet.create({


  headerCard: {

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 12,

    padding: 32,

    backgroundColor: "#ffffff",

  },


  headerTop: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",

  },


  companySection: {

    flexDirection: "row",

    alignItems: "center",

  },


  logo: {

    width: 80,

    height: 80,

    borderRadius: 8,

    marginRight: 20,

  },


  companyName: {

    fontSize: 24,

    fontWeight: 700,

  },


  subtitle: {

    fontSize: 10,

    color: "#6b7280",

    marginTop: 4,

  },


  companyInfo: {

    marginTop: 12,

  },


  mutedText: {

    fontSize: 10,

    color: "#6b7280",

  },


  mediumText: {

    fontSize: 10,

    fontWeight: 500,

  },


  boldText: {

    fontSize: 10,

    fontWeight: 700,

    textTransform: "capitalize",

  },


  invoiceBox: {

    width: 180,

    backgroundColor: "#f9fafb",

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 8,

    padding: 20,

  },


  invoiceLabel: {

    fontSize: 8,

    color: "#6b7280",

    letterSpacing: 2,

  },


  invoiceNumber: {

    fontSize: 22,

    fontWeight: 700,

    marginTop: 8,

  },


  invoiceMeta: {

    marginTop: 20,

  },


  metaRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 8,

  },


  divider: {

    borderBottomWidth: 1,

    borderBottomColor: "#e5e7eb",

    marginVertical: 24,

  },


  titleSection: {

    alignItems: "center",

  },


  title: {

    fontSize: 18,

    fontWeight: 700,

  },


  subtitleCenter: {

    fontSize: 10,

    color: "#6b7280",

    marginTop: 8,

    textAlign: "center",

  },


});