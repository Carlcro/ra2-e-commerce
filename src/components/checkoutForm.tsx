import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export const CheckoutForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    const errors: FormErrors = {};

    if (!formData.name) {
      errors.name = "Name is required";
      formIsValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.address) {
      errors.address = "Address is required";
      formIsValid = false;
    }

    if (!formData.cardNumber) {
      errors.cardNumber = "Card number is required";
      formIsValid = false;
    }

    if (!formData.expiry) {
      errors.expiry = "Expiry date is required";
      formIsValid = false;
    }

    if (!formData.cvc) {
      errors.cvc = "CVC is required";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Order submitted!");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="border-2 border-grey p-3"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border-2 border-grey p-3"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="address">Address</label>
          <input
            className="border-2 border-grey p-3"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="card-number">Card Number</label>
            <input
              className="border-2 border-grey p-3"
              id="hej"
              placeholder="4111 1111 1111 1111"
              type="text"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && (
              <p className="text-red-500">{errors.cardNumber}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="expiry">Expiry</label>
            <input
              className="border-2 border-grey p-3"
              id="expiry"
              placeholder="MM/YY"
              type="text"
              value={formData.expiry}
              onChange={handleChange}
            />
            {errors.expiry && <p className="text-red-500">{errors.expiry}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="cvc">CVC</label>
            <input
              className="border-2 border-grey p-3"
              id="cvc"
              placeholder="123"
              type="text"
              value={formData.cvc}
              onChange={handleChange}
            />
            {errors.cvc && <p className="text-red-500">{errors.cvc}</p>}
          </div>
        </div>
        <button
          className="w-full bg-black text-white py-2 flex items-center justify-center hover:bg-gray-700 active:bg-black"
          type="submit"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};
