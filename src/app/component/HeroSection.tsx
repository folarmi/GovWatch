import React from "react";
import Text from "./Text";
import coatOfArms from "../../../public/coatOfArms.svg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-between my-12">
      <div>
        <Text variant="heading" className="text-black_100 w-[908px] pb-3">
          Empowering Nigerians with information and fostering citizen
          participation in governance.
        </Text>
        <Text variant="body" className="w-[891px]">
          Lorem ipsum dolor sit amet consectetur. Neque eu velit diam vel
          venenatis cras. Tincidunt curabitur quis praesent aliquet lectus
          neque. Varius et scelerisque faucibus id convallis gravida. Sed
          egestas vitae elit arcu amet facilisi ridiculus{" "}
        </Text>
      </div>

      <Image src={coatOfArms} alt="Nigeria coat of arms" />
    </div>
  );
};

export default HeroSection;
