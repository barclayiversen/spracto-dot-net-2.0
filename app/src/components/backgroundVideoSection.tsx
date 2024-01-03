// BackgroundVideoSection.tsx
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { useLoadStatus } from "@/context/loadStatusContext";

const BackgroundVideoSection: React.FC = () => {
  const offsetValue = -100; // Adjust this value as needed
  const { updateLoadStatus } = useLoadStatus();

  return (
    <div className="relative w-full h-screen animate-fade-in-.5">
      <video
        src="/newbgvideo.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-screen object-cover brightness-75"
        onLoad={() => updateLoadStatus("BackgroundVideo", true)}
      />

      <div className="absolute top-0 left-0 z-1 w-full h-screen flex justify-center items-center">
        <div className="relative md:w-1/2 w-3/4 h-1/2 md:border-gray-400">
          <Image
            src="/logo-black.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            className="animate-fade-in-2"
          />
        </div>
      </div>

      <Link
        to="content"
        spy={true}
        smooth={true}
        duration={500}
        offset={offsetValue}
        className="cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-white absolute left-1/2 bottom-20 animate-bounce"
        />
      </Link>
    </div>
  );
};

export default BackgroundVideoSection;
