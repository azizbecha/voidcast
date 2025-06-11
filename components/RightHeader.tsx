import { FaBell } from "react-icons/fa6";
import { FaPen } from 'react-icons/fa';

const RightHeader = () => {
  return (
    <div className="flex space-x-4 items-center justify-end focus:outline-no-chrome w-full">
      <button>
        <FaPen className="text-primary-200 w-4.5 h-4" />
      </button>
      <button>
        <FaBell className="text-primary-200 w-4.5 h-4.5" />
      </button>
    </div>
  );
};

export default RightHeader;
