import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = [
    { id: 101, title: "Wireless Headset", price: 150, qty: 1 },
    { id: 102, title: "Mechanical Keyboard", price: 90, qty: 2 },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10">
      <h1 className="text-3xl font-black mb-8">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm"
              >
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                </div>
                <p className="font-bold text-amber-600">
                  ${item.price * item.qty}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
