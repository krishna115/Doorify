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


export function InvoicePdfCustomizations({

  invoice,

}: Props) {


  const customizations =
    invoice.customizations.filter(
      (item) => item.selected
    );


  if (
    customizations.length === 0
  ) {

    return null;

  }


  return (

    <View style={styles.container}>


      {/* =====================================
          Header
      ====================================== */}

      <View style={styles.header}>


        <Text style={styles.title}>

          Customizations

        </Text>


        <Text style={styles.description}>

          Requested door customizations.

        </Text>


      </View>



      {/* =====================================
          Customization Cards
      ====================================== */}

      <View style={styles.grid}>


        {
          customizations.map(

            (item)=>(

              <View

                key={item.id}

                style={styles.card}

              >


                {
                  item.image && (

                    <Image

                      src={item.image}

                      style={styles.image}

                    />

                  )
                }



                <View style={styles.cardContent}>


                  <Text style={styles.itemName}>

                    {item.name}

                  </Text>


                </View>


              </View>

            )

          )
        }


      </View>


    </View>

  );

}



const styles = StyleSheet.create({


  container: {

    marginTop: 24,

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 12,

    backgroundColor: "#ffffff",

    overflow: "hidden",

  },


  header: {

    paddingVertical: 16,

    paddingHorizontal: 24,

    borderBottomWidth: 1,

    borderBottomColor: "#e5e7eb",

  },


  title: {

    fontSize: 14,

    fontWeight: 700,

  },


  description: {

    fontSize: 10,

    color: "#6b7280",

    marginTop: 4,

  },


  grid: {

    flexDirection: "row",

    flexWrap: "wrap",

    padding: 24,

    gap: 16,

  },


  card: {

    width: "46%",

    borderWidth: 1,

    borderColor: "#e5e7eb",

    borderRadius: 8,

    overflow: "hidden",

  },


  image: {

    width: "100%",

    height: 140,

    objectFit: "contain",

    backgroundColor: "#f9fafb",

  },


  cardContent: {

    padding: 12,

  },


  itemName: {

    fontSize: 11,

    fontWeight: 600,

  },


});