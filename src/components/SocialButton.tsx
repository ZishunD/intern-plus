/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

export default function SocialButton({ href, text, svg }: any) {
  return (
    <Link
      href={href}
      className='flex items-center space-x-2 justify-center border border-black border-solid py-2 rounded-sm text-center hover:bg-[#474BC2] hover:text-white transition'>
      {svg}
      <span>{text}</span>
    </Link>
  );
}
