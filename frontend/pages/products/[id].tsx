// frontend/pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import axios from 'axios'; // Use axios directly like in login/signup

const ProductDetail = ({ product }: { product: any }) => {
  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/cart/add', 
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Failed to add product to cart");
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
  try {
    const { id } = context.params as { id: string };
    // Use direct URL in getServerSideProps
    const response = await axios.get(`http://13.201.137.93:5000/api/products/${id}`);
    
    if (!response.data) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
      props: {} // Add empty props to satisfy TypeScript
    };
  }
};

export default ProductDetail;