// frontend/pages/products/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Product } from '@/types/product';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          params: { search },
        });
        setProducts(response.data);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const addToCart = async (productId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    try {
      await axios.post(`/api/cart/add`, { productId, quantity: 1 }, {
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
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <ul className="product-list">
        {products.map((product: any) => (
          <li key={product._id} className="product-card">
            <Link href={`/products/${product._id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { search = '', category = '', page = 1, limit = 10 } = context.query;
    
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await axiosInstance.get(`/api/products`, {
      params: { search, category, page, limit }
    });

    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default ProductsPage;