import Link from "next/link";

const links = [
  { label: "About" },
  { label: "Company" },
  { label: "Location" },
  { label: "Contact" },
  { label: "Hours" },
];

const socialLinks = [
  { label: "Twitter" },
  { label: "Facebook" },
  { label: "Instagram" },
  { label: "LinkedIn" },
];

export default function Footer() {
  return (
    <div>
      <div
        className="bg-no-repeat bg-center bg-contain h-64 flex flex-col justify-center items-center"
        style={{
          background: `url('/callout.jpg')`,
        }}
      >
        <h4 className="text-2xl text-white">
          "The surprising styles of Skyline Ivy are advanced for all seasons."
        </h4>
        <span className="text-white">Hansel Andersen</span>
      </div>
      <div className="flex p-12">
        <ul className="flex flex-col flex-1 items-start mx-5 text-sm">
          {links.map(({ href, label }) => (
            <li className="my-1 mx-1 px-3">
              <a className="text-black font-light no-underline">{label}</a>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col flex-auto items-start text-sm">
          {socialLinks.map(({ href, label }) => (
            <li className="my-1 mx-1 px-3">
              <a className="text-black font-light no-underline">{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
