import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { SiRocketdotchat } from "react-icons/si";

const ReplayAlert = ( {title, desc} : { title:string, desc: string } ) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Clean up the timer when the component unmounts or when the error message disappears
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-row justify-center items-center absolute z-10 top-24 transition-opacity ${visible ? 'duration-100 opacity-100' : ' duration-1000 opacity-0'}`}>
      <Alert variant="default" className="min-w-fit w-1/4 bg-stone-200">
      <SiRocketdotchat className="h-5 w-5" />
        <AlertTitle><h4>{title}</h4></AlertTitle>
        <AlertDescription>
          {desc}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ReplayAlert;
