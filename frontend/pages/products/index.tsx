// frontend/pages/products/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(''); // Optional: If you want to filter by category
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          params: {
            search,
            category,
            page,
            limit,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [search, category, page, limit]); // Fetch products whenever search, category, page, or limit changes

  const addToCart = async (productId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, { productId, quantity: 1 }, {
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
        onChange={(e) => setSearch(e.target.value)} // Update search state on input change
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

export default ProductsPage;