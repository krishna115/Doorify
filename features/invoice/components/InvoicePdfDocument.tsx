import {
  Document,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";

import {
  InvoiceData,
} from "../types";


import {
  InvoicePdfHeader,
} from "./InvoicePdfHeader";


import {
  InvoicePdfCustomerSection,
} from "./InvoicePdfCustomerSection";


import {
  InvoicePdfDoors,
} from "./InvoicePdfDoors";


import {
  InvoicePdfCustomizations,
} from "./InvoicePdfCustomizations";


import {
  InvoicePdfPriceBreakdown,
} from "./InvoicePdfPriceBreakdown";


import {
  InvoicePdfFooter,
} from "./InvoicePdfFooter";



interface Props {

  invoice: InvoiceData;

}



export function InvoicePdfDocument({

  invoice,

}: Props) {


  return (

    <Document>


      <Page

        size="A4"

        style={styles.page}

      >



        {/* =====================================
            Header
        ====================================== */}

        <InvoicePdfHeader

          invoice={invoice}

        />



        {/* =====================================
            Customer + Order
        ====================================== */}

        {
          (
            invoice.options.showCustomer ||
            invoice.options.showPhone ||
            invoice.options.showSalesperson ||
            invoice.options.showOrderNumber ||
            invoice.options.showDate
          ) && (

            <InvoicePdfCustomerSection

              invoice={invoice}

            />

          )
        }




        {/* =====================================
            Doors
        ====================================== */}

        <InvoicePdfDoors

          invoice={invoice}

        />




        {/* =====================================
            Customizations
        ====================================== */}

        {
          invoice.options.showCustomizations && (

            <InvoicePdfCustomizations

              invoice={invoice}

            />

          )
        }




        {/* =====================================
            Price Breakdown
        ====================================== */}

        {
          invoice.options.showPriceBreakdown && (

            <InvoicePdfPriceBreakdown

              invoice={invoice}

            />

          )
        }




        {/* =====================================
            Footer
        ====================================== */}

        <InvoicePdfFooter

          invoice={invoice}

        />


      </Page>


    </Document>

  );

}



const styles = StyleSheet.create({

  page: {

    padding: 32,

    backgroundColor: "#ffffff",

    fontSize: 10,

  },


});