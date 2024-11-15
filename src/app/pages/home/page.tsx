import { CarouselData } from "@/resource/home/carosuelData";
import Carousel1 from "@/app/components/carousel/carousel-1";
import { Input_1 } from "@/app/components/input/input-1";

export default function Home() {
  return (
    <div>
      <Carousel1 images={CarouselData} />
      <div className="flex justify-center items-center w-full ">
        <div className="">
          <Input_1 floating="test" type="text" title="test_title" />
        </div>
      </div>
      {/* <Input_1 floating="test" type="text" title="test_title" /> */}
    </div>
  );
}
