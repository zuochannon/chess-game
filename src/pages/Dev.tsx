import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Dev = () => {
  return (
    <>
    <style>
        {`
          .accordion {
            list-style: none;
          }
          .accordion li::before {
            content: "►";
            margin-right: 0.5rem;
          }
        `}
      </style>
      <div className="h-screen w-fit p-4">
        <span className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
          Changelog
        </span>
        <Separator className="my-2 bg-black" />

        <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="1">
        <AccordionTrigger>Database</AccordionTrigger>
        <AccordionContent>
          <ul className="accordion">
            <li>Test</li>
          </ul>
        </AccordionContent>
      </AccordionItem>


      <AccordionItem value="2">
        <AccordionTrigger>Authentication</AccordionTrigger>
        <AccordionContent>
          <ul className="accordion">
            <li>Test</li>
          </ul>
        </AccordionContent>
      </AccordionItem>



      <AccordionItem value="3">
        <AccordionTrigger>UI</AccordionTrigger>
        <AccordionContent>
          
          <ul className="accordion">
            <li>Test</li>
          </ul>


        </AccordionContent>



      </AccordionItem>
      <AccordionItem value="4">
        <AccordionTrigger>Chess</AccordionTrigger>
        <AccordionContent>

          <ul className="accordion">
            <li>Test</li>
          </ul>

        </AccordionContent>
      </AccordionItem>



      <AccordionItem value="5">
        <AccordionTrigger>Sockets</AccordionTrigger>
        <AccordionContent>

          <ul className="accordion">
            <li>Test</li>
          </ul>

        </AccordionContent>
      </AccordionItem>

    </Accordion>
      </div>
      <div className="h-screen w-fit p-4">
      <span className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 p-4">
         Todo 
        </span> 
        <Separator className="my-2 bg-black" />
      </div>
    </>
  );
};

export default Dev;
