import Link from "next/link";

const links = [
  { href: "/", label: "HOME" },
  { href: "/all", label: "ALL" },
  { href: "/women", label: "WOMEN" },
  { href: "/men", label: "MEN" },
  { href: "/cart", label: "CART" },
];

export default function Header() {
  return (
    <div>
      <div className="pt-16 pb-12">
        <h1 className="text-3xl font-mono text-center text-black">
          Skyline Ivy
        </h1>
      </div>
      <nav className="mx-24">
        <hr className="text-gray-500" />
        <ul className="flex justify-center items-center p-1 text-sm">
          {links.map(({ href, label }) => (
            <li
              key={`${label}`}
              className="my-1 mx-1 px-3 border-solid border-gray-500 border-l border-r"
            >
              <Link href={href}>
                <a className="hover:text-orange-500 text-black font-light no-underline">
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
      </nav>
    </div>
  );
}
