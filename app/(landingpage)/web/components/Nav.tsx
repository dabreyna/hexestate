import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { path: "/", name: "Home" },
  { path: "/web/about", name: "About" },
  { path: "/web/gallery", name: "gallery" },
  { path: "/web/projects", name: "Projects" },
  { path: "/web/contact", name: "contact" },
];

interface NavProps {
  containerStyles: string;
  linkStyles: string;
  underlineStyles: string;
}

const Nav = ({ containerStyles, linkStyles, underlineStyles }: NavProps) => {
  const path = usePathname();

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`uppercase ${linkStyles}`}
          >
            {link.path === path && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`${underlineStyles}`}
              />
            )}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
