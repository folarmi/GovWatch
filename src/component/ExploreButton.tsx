import { Link } from "react-router-dom";

const ExploreButton: React.FC = () => {
  return (
    <Link to="/explore" className="fixed bottom-0 right-0 mr-4 md:mr-16 mb-4">
      <button className="bg-primary text-xs md:text-base font-extrabold text-white p-3 md:p-5 rounded-lg md:rounded-[35px] shadow-lg flex items-center">
        Explore Nigeria
        <img src=" /arrow.svg" alt="a little map" className="ml-2" />
      </button>
    </Link>
  );
};

export default ExploreButton;
