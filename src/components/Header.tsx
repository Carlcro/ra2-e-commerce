import { ShoppingCart } from "./cartIcon";

export const Header = () => {
  return (
    <header className="flex justify-between py-3 items-center">
      <h1 className="text-5xl">E-commerce</h1>
      <ShoppingCart />
    </header>
  );
};
