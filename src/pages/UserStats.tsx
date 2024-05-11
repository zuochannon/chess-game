import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { analyzeData } from "@/utils/scripts/analyzeData";

export function UserStats({ data }) {
  console.log(data);

  const userData = analyzeData(data);
  console.log(userData);

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className="w-full flex flex-row justify-center items-center p-4">
        <Carousel className="w-full max-w-7xl">
          <CarouselContent className="-ml-1">
            {Object.entries(userData).map(([key, val]) => (
              <CarouselItem
                key={key}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 bg-blue-50 rounded-xl">
                      <h3>{val.name}</h3>
                      <span className="text-2xl font-semibold">{val.data}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </>
  );
}
