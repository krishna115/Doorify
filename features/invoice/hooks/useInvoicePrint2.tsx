import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoicePdfService } from "../services/InvoicePdfService";

export function useInvoicePrint2() {

    const invoiceRef =
        useRef<HTMLDivElement>(null);

    const print =
        useReactToPrint({

            contentRef: invoiceRef,

            documentTitle: "Doorify Invoice",

        });

    return {

        invoiceRef,

        print,

        downloadPdf: InvoicePdfService.download,

        sharePdf: InvoicePdfService.share,

    };

}