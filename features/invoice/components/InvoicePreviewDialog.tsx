"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  InvoiceData,
} from "../types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Checkbox,
} from "@/components/ui/checkbox";

import {
  Label,
} from "@/components/ui/label";

import {
  Separator,
} from "@/components/ui/separator";


interface Props {

  open: boolean;

  invoice: InvoiceData;

  onOpenChange: (
    open: boolean
  ) => void;

  onPrint: () => void;

  onDownload: () => void;

  onWhatsapp: () => void;

  onDone: () => void;

}



export function InvoicePreviewDialog({

  open,

  invoice,

  onOpenChange,

  onPrint,

  onDownload,

  onWhatsapp,

  onDone,

}: Props) {


  const [

    options,

    setOptions,

  ] = useState(
    invoice.options
  );



  useEffect(()=>{

    setOptions(
      invoice.options
    );

  },[invoice]);



  function updateOption(

    key: keyof InvoiceData["options"],

    value:boolean

  ){

    setOptions({

      ...options,

      [key]:value,

    });

  }



  return (

    <Dialog

      open={open}

      onOpenChange={onOpenChange}

    >


      <DialogContent

        className="
          max-w-2xl
          max-h-[90vh]
          overflow-hidden
        "

      >



        <DialogHeader>

          <DialogTitle>

            Customize Invoice

          </DialogTitle>


        </DialogHeader>




        <div className="overflow-y-auto max-h-[65vh] pr-2">


          <div className="space-y-8 py-4">



            {/* Customer */}

            <Section title="Customer">


              <Option

                title="Customer Name"

                checked={
                  options.showCustomer
                }

                onChange={(v)=>

                  updateOption(
                    "showCustomer",
                    v
                  )

                }

              />



              <Option

                title="Phone Number"

                checked={
                  options.showPhone
                }

                onChange={(v)=>

                  updateOption(
                    "showPhone",
                    v
                  )

                }

              />



              <Option

                title="Salesperson"

                checked={
                  options.showSalesperson
                }

                onChange={(v)=>

                  updateOption(
                    "showSalesperson",
                    v
                  )

                }

              />


            </Section>




            {/* Invoice */}

            <Section title="Invoice">


              <Option

                title="Order Number"

                checked={
                  options.showOrderNumber
                }

                onChange={(v)=>

                  updateOption(
                    "showOrderNumber",
                    v
                  )

                }

              />



              <Option

                title="Date"

                checked={
                  options.showDate
                }

                onChange={(v)=>

                  updateOption(
                    "showDate",
                    v
                  )

                }

              />


            </Section>





            {/* Manufacturing */}

            <Section title="Manufacturing">


              <Option

                title="Customizations"

                checked={
                  options.showCustomizations
                }

                onChange={(v)=>

                  updateOption(
                    "showCustomizations",
                    v
                  )

                }

              />



              <Option

                title="Customization Images"

                checked={
                  options.showCustomizationImages
                }

                onChange={(v)=>

                  updateOption(
                    "showCustomizationImages",
                    v
                  )

                }

              />


            </Section>





            {/* Payment */}

            <Section title="Payment">


              <Option

                title="Price Breakdown"

                checked={
                  options.showPriceBreakdown
                }

                onChange={(v)=>

                  updateOption(
                    "showPriceBreakdown",
                    v
                  )

                }

              />



              <Option

                title="Addons"

                checked={
                  options.showAddons
                }

                onChange={(v)=>

                  updateOption(
                    "showAddons",
                    v
                  )

                }

              />



              <Option

                title="Discount"

                checked={
                  options.showDiscount
                }

                onChange={(v)=>

                  updateOption(
                    "showDiscount",
                    v
                  )

                }

              />



              <Option

                title="Advance Payment"

                checked={
                  options.showAdvance
                }

                onChange={(v)=>

                  updateOption(
                    "showAdvance",
                    v
                  )

                }

              />


            </Section>



          </div>


        </div>




        {/* Footer */}

        <div className="
          border-t
          pt-4
          flex
          justify-between
          gap-2
          flex-wrap
        ">


          <div className="flex gap-2">


            <Button

              variant="outline"

              onClick={()=>onOpenChange(false)}

            >

              Close

            </Button>



            <Button

              variant="outline"

              onClick={onPrint}

            >

              Print

            </Button>



            <Button

              variant="outline"

              onClick={onDownload}

            >

              Download PDF

            </Button>



            <Button

              onClick={onWhatsapp}

            >

              WhatsApp

            </Button>


          </div>



          <Button

            onClick={onDone}

          >

            Done

          </Button>


        </div>


      </DialogContent>


    </Dialog>

  );

}





function Section({

  title,

  children,

}:{

  title:string;

  children:React.ReactNode;

}){


  return (

    <div className="space-y-4">


      <h3 className="font-semibold">

        {title}

      </h3>


      <Separator/>


      <div className="space-y-3">

        {children}

      </div>


    </div>

  );

}




function Option({

  title,

  checked,

  onChange,

}:{

  title:string;

  checked:boolean;

  onChange:(value:boolean)=>void;

}){


  return (

    <div className="
      flex
      items-center
      gap-3
      rounded-lg
      border
      px-4
      py-3
    ">


      <Checkbox

        checked={checked}

        onCheckedChange={(v)=>

          onChange(
            Boolean(v)
          )

        }

      />


      <Label className="cursor-pointer flex-1">

        {title}

      </Label>


    </div>

  );

}