// frontend/pages/products/[id].tsx
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProductDetail = ({ product }: { product: any }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

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
    
    // Create axios instance with base URL
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await axiosInstance.get(`/api/products/${id}`);
    
    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetail;