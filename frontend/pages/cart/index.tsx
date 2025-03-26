// frontend/pages/cart/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('authToken');
      let headers;

      if (token) {
        headers = {
          'Authorization': `Bearer ${token}`,
        };
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_PROD}/api/cart`, { headers });
        setCart(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL_PROD}/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(cart.filter(item => item.productId._id !== productId)); // Update local state
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (productId: string, quantity: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL_PROD}/api/cart/add`, { productId, quantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update local state
      setCart(cart.map(item => item.productId._id === productId ? { ...item, quantity } : item));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
  };

  // Handle checkout
  const handleCheckout = async () => {
    const confirmed = window.confirm("Are you sure you want to buy these items?");
    if (!confirmed) return;

    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL_PROD}/api/orders/checkout`, { items: cart }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Thank you for your purchase!");
      setCart([]); // Clear the cart after successful checkout
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {cart.map((item: any) => (
          <li key={item._id} className="cart-item">
            <img src={item.productId.imageUrl} alt={item.productId.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.productId.name}</h2>
              <p>{item.productId.description}</p>
              <p>Price: ${item.productId.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(item.productId._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total Bill: ${calculateTotal()}</h2> {/* Display total bill */}
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button> {/* Checkout button */}
    </div>
  );
};

export default CartPage;