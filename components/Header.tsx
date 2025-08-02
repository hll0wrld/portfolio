import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-0 flex z-50 py-5 px-8">
      <Link href={"/"}>
        <Image 
        src={"/assets/logo.png"} 
        width={50} 
        height={50} 
        alt="logo"  
        priority 
        unoptimized
        style={{mixBlendMode: "difference"}}
        /> 
      </Link>
    </header>
  )
}
