import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../WishListSlice';
import { FaTrash } from "react-icons/fa";
import '../css/WishlistPage.css';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-heading">Your Wishlist ❤️</h1>
      {wishlistItems.length === 0 ? (
        <p className="wishlist-empty">No items in wishlist.</p>
      ) : (
        <table className="wishlist-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name || product.title || "Product"}
                    className="wishlist-image"
                    onClick={() => navigate('/product/:id', { state: product })}
                  />
                </td>
                <td
                  className="wishlist-name"
                  onClick={() => navigate('/product/:id', { state: product })}
                >
                  {product.name || product.title || "Untitled Product"}
                </td>
                <td>${product.price}</td>
                <td>
                  <button
                    className="wishlist-remove"
                    onClick={() => dispatch(removeFromWishlist({ id: product.id }))}
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WishlistPage;
