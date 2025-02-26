import { v4 as uuid } from "uuid";

const NavbarDefault = [
  {
    id: uuid(),
    menuitem: "Home",
    link: "/",
  },
  {
    id: uuid(),
    menuitem: "About Us",
    link: "/aboutus",
  },
  {
    id: uuid(),
    menuitem: "Pricing",
    link: "/pricing",
  },
  {
    id: uuid(),
    menuitem: "Contact-Us",
    link: "/contactUs",
  },
];

export default NavbarDefault;
