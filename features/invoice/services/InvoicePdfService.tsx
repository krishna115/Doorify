import {
  pdf,
} from "@react-pdf/renderer";

import {
  InvoiceData,
} from "../types";

import {
  InvoicePdfDocument,
} from "../components/InvoicePdfDocument";

export class InvoicePdfService {

  /*
  ---------------------------------------
  Generate Blob
  ---------------------------------------
  */

  static async getBlob(
    invoice: InvoiceData
  ): Promise<Blob> {

    try {

      console.log("========== getBlob() ==========");

      console.log("1. Invoice:", invoice);

      console.log(
        "2. Order Number:",
        invoice.order.order_number
      );

      console.log(
        "3. Creating React PDF Document..."
      );

      const document = (

        <InvoicePdfDocument
          invoice={invoice}
        />

      );

      console.log(
        "4. React Document Created:",
        document
      );

      console.log(
        "5. Calling pdf(document)..."
      );

      const instance =
        pdf(document);

      console.log(
        "6. PDF Instance:",
        instance
      );

      console.log(
        "7. Instance Keys:",
        instance
          ? Object.keys(instance)
          : "INSTANCE IS NULL"
      );

      console.log(
        "8. instance.toBlob:",
        instance?.toBlob
      );

      console.log(
        "9. About to call instance.toBlob()..."
      );

      const blob =
        await instance.toBlob();

      console.log(
        "10. Blob Generated:",
        blob
      );

      console.log(
        "11. Blob Size:",
        blob.size
      );

      console.log(
        "12. Blob Type:",
        blob.type
      );

      console.log(
        "========== getBlob() END =========="
      );

      return blob;

    } catch (error) {

      console.error(
        "❌ ERROR INSIDE getBlob()"
      );

      console.error(error);

      throw error;

    }

  }

  /*
  ---------------------------------------
  Generate File
  ---------------------------------------
  */

  static async getFile(
    invoice: InvoiceData
  ): Promise<File> {

    try {

      console.log(
        "========== getFile() =========="
      );

      console.log(
        "1. Calling getBlob()..."
      );

      const blob =
        await this.getBlob(
          invoice
        );

      console.log(
        "2. Blob Received:",
        blob
      );

      const file =
        new File(

          [blob],

          `Invoice-${invoice.order.order_number}.pdf`,

          {

            type:
              "application/pdf",

          }

        );

      console.log(
        "3. File Created:",
        file
      );

      console.log(
        "========== getFile() END =========="
      );

      return file;

    } catch (error) {

      console.error(
        "❌ ERROR INSIDE getFile()"
      );

      console.error(error);

      throw error;

    }

  }

  /*
  ---------------------------------------
  Download
  ---------------------------------------
  */

  static async download(
    invoice: InvoiceData
  ) {

    try {

      console.log(
        "========== download() =========="
      );

      console.log(
        "1. Calling getBlob()..."
      );

      const blob =
        await this.getBlob(
          invoice
        );

      console.log(
        "2. Blob:",
        blob
      );

      const url =
        URL.createObjectURL(
          blob
        );

      console.log(
        "3. Object URL:",
        url
      );

      const link =
        document.createElement(
          "a"
        );

      link.href =
        url;

      link.download =
        `Invoice-${invoice.order.order_number}.pdf`;

      console.log(
        "4. Triggering Download..."
      );

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      URL.revokeObjectURL(
        url
      );

      console.log(
        "5. Download Finished"
      );

      console.log(
        "========== download() END =========="
      );

    } catch (error) {

      console.error(
        "❌ ERROR INSIDE download()"
      );

      console.error(error);

      throw error;

    }

  }

  /*
  ---------------------------------------
  Share
  ---------------------------------------
  */

  static async share(
    invoice: InvoiceData
  ) {

    try {

      console.log(
        "========== share() =========="
      );

      console.log(
        "1. Calling getFile()..."
      );

      const file =
        await this.getFile(
          invoice
        );

      console.log(
        "2. File:",
        file
      );

      console.log(
        "3. navigator.canShare:",
        navigator.canShare
      );

      const canShare =

        navigator.canShare &&

        navigator.canShare({

          files: [file],

        });

      console.log(
        "4. Can Share:",
        canShare
      );

      if (canShare) {

        console.log(
          "5. Opening Native Share..."
        );

        await navigator.share({

          title:
            `Invoice #${invoice.order.order_number}`,

          text:
            "Doorify Invoice",

          files: [
            file,
          ],

        });

        console.log(
          "6. Share Completed"
        );

      } else {

        console.log(
          "5. Share Not Supported"
        );

        console.log(
          "6. Falling Back To Download..."
        );

        await this.download(
          invoice
        );

      }

      console.log(
        "========== share() END =========="
      );

    } catch (error) {

      console.error(
        "❌ ERROR INSIDE share()"
      );

      console.error(error);

      throw error;

    }

  }

}