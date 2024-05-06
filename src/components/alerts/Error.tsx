import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";

const Error = ( {desc} : { desc: string } ) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Clean up the timer when the component unmounts or when the error message disappears
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-row justify-center items-center absolute w-full z-10 top-24 transition-opacity ${visible ? 'duration-100 opacity-100' : ' duration-1000 opacity-0'}`}>
      <Alert variant="destructive" className="bg-red-100 w-1/2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {desc}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Error;
