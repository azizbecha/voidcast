import Image from "next/image";
import logo from "../public/logo.png";

function LogoIcon() {
  const size =  41;
  return <Image alt="Logo" width={size} height={size} src={logo} />;
}

export default LogoIcon;
