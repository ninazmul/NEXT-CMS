import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <div className="">
      <Separator />
      <div className="w-full sm:flex sm:items-center sm:justify-between text-sm p-4 md:p-6 lg:p-10 gap-10">
        <p>
          &copy; {new Date().getFullYear()} - All right reserved by{" "}
          <Link href="/">GhaniGhor</Link>
        </p>{" "}
        <p className="flex items-center gap-2">
          Developed by -{" "}
          <Link
            href="https://artistycode-studio.web.app"
            target="_blank"
            className="underline"
          >
            {/* <img src={acs} alt="" className="w-12" /> */} ArtistyCode Studio
          </Link>
        </p>
      </div>
    </div>
  );
}
