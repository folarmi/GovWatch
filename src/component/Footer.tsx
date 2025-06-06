// import Image from "next/image";
import { Link } from "react-router-dom";
import { FooterList } from "../data";
import { Twitter } from "lucide-react";
// import { useTheme } from "next-themes";

const Footer = () => {
  // const { theme } = useTheme();

  return (
    <div className="px-8 md:px-24 border-t border-grey_100 pt-9">
      {/* <Image src={logo} alt="Company logo" className="w-8 md:w-20" /> */}
      {/* <Link to="/">
        {theme === "light" ? (
          <img src="/logo.svg" alt="Company logo" className="w-8 md:w-20" />
        ) : (
          <img
            src="/logoDarkMode.svg"
            alt="Company logo"
            className="w-8 md:w-20"
          />
        )}
      </Link> */}

      {/* <Link to="/">
        <img src="/logo.svg" alt="Company logo" className="w-8 md:w-20" />
      </Link> */}

      <div className="flex items-center justify-center gap-x-6 md:gap-x-12">
        {FooterList.map(({ name, id, url }) => {
          return (
            <div key={id}>
              <Link
                className={`text-xs md:text-base font-bold text-black_300 dark:text-white pb-2`}
                to={url}
              >
                {name}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-12">
        <a
          href="https://x.com/GovWatchLimited?t=Ud-lEO9Qiq14rEyRbAAKnA&s=08"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Twitter />
        </a>
      </div>

      <div className="flex items-center justify-center mt-4 md:mt-14 mb-9">
        <img src="/copyright.svg" alt="copyright" />
        <p className="font-medium text-lg text-black_200 dark:text-white">
          2025 GovWatch
        </p>
      </div>
    </div>
  );
};

export default Footer;
