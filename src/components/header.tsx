import { Link } from "@tanstack/react-router";
import { ShoppingCartIcon } from "./shoppingCartIcon";

export const Header = () => {
  return (
    <header className="flex justify-between md:mx-2 items-center py-3 px-5 md:px-9">
      <Link to="/">
        <h1 className="text-2xl md:text-5xl">E-commerce</h1>
      </Link>
      <ShoppingCartIcon />
    </header>
  );
};
