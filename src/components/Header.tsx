import { Link } from "@tanstack/react-router";
import { ShoppingCartIcon } from "./shoppingCartIcon";

export const Header = () => {
  return (
    <header className="flex justify-between mx-2 items-center p-3">
      <Link to="/">
        <h1 className="text-5xl">E-commerce</h1>
      </Link>
      <ShoppingCartIcon />
    </header>
  );
};
