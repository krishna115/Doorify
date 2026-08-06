"use client";

import { useRef } from "react";

import { useReactToPrint } from "react-to-print";

export function useInvoicePrint() {

  const invoiceRef =
    useRef<HTMLDivElement>(null);

  /*
  ---------------------------------------
  Print
  ---------------------------------------
  */

  const print =
    useReactToPrint({

      contentRef:
        invoiceRef,

      documentTitle:
        "Doorify Invoice",

    });

  /*
  ---------------------------------------
  Download PDF
  ---------------------------------------
  */

 async function downloadPdf() {

  if (!invoiceRef.current) {

    console.log("Invoice ref is null", invoiceRef);

    return;

  }

  // Dynamically import html2pdf to avoid SSR issues
  const html2pdf =
    (await import("html2pdf.js")).default;

  const element =
    invoiceRef.current;

  const options = {

    margin: 0.3,

    filename:
      "Doorify-Invoice.pdf",

    image: {

      type: "jpeg" as const,

      quality: 0.98,

    },

    html2canvas: {

      scale: 2,

      useCORS: true,

      backgroundColor: "#ffffff",

      logging: false,

    },

    jsPDF: {

      unit: "in" as const,

      format: "a4" as const,

      orientation: "portrait" as const,

    },

    pagebreak: {

      mode: [
        "css",
        "legacy",
      ],

    },

  };

  await html2pdf()

    .set(options)

    .from(element)

    .save();

}

   

  /*
  ---------------------------------------
  WhatsApp Share
  ---------------------------------------
  */

  function shareWhatsapp(phone?: string) {

    const message =
      encodeURIComponent(
        "Hello! Your Doorify invoice is ready."
      );

    const url =
    //   phone && phone.trim().length > 0
    //     ? `https://wa.me/91${phone}?text=${message}`: 
        `https://wa.me/?text=${message}`;

    window.open(
      url,
      "_blank"
    );

  }

  return {

    invoiceRef,

    print,

    downloadPdf,

    shareWhatsapp,

  };

}