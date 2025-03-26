// frontend/pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import axios from 'axios';

const ProductDetail = ({ product }: { product: any }) => {
  const addToCart = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    console.log(product);
    
    try {
      await axios.post(`/api/cart/add`, { productId: product._id, quantity: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product added to cart!");

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const response = await axios.get(`/api/products/${id}`);
  return {
    props: {
      product: response.data,
    },
  };
};

export default ProductDetail;