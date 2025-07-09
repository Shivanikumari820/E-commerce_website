// ✅ Enhanced DetailPage.jsx with cleaner layout, soft gradient, animations, and full visibility

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addtoCart } from "../cartSlice";
import { toggleWishlist } from "../WishListSlice";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoCart } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import "../css/ProductDetail.css";

const DetailPage = () => {
  const { state: product } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product?.id);

  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [review, setReview] = useState({ email: "", stars: 0, points: "", detail: "" });

  useEffect(() => {
    if (product?.id) fetchReviews();
  }, [product?.id]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3000/userreview?productId=${product.id}`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handlePurchase = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please log in first."), navigate("/login");

    const orderData = {
      id: Math.random().toString(36).slice(2, 11),
      productId: product.id,
      userEmail: user.email,
      name: product.name,
      price: product.price,
      image: product.image,
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:3000/Orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Order creation failed");
      alert("Order placed successfully!");
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  const handleStarClick = (rating) => setReview({ ...review, stars: rating });

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/userreview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, productId: product.id }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      alert("Review submitted successfully");
      setShow(false);
      setReview({ email: "", stars: 0, points: "", detail: "" });
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!product) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Product not found</h2>;

  return (
    <div className="detail-container">
      <Card className="detail-card fade-in">
        <div className="detail-content">
          <div className="detail-image-container">
            <Card.Img variant="top" src={product.image} className="detail-image" alt={product.name} />
          </div>
          <Card.Body className="detail-info">
            <Card.Title className="detail-title">{product.name}</Card.Title>
            <Card.Text className="detail-description">{product.description}</Card.Text>
            <Card.Text className="detail-price">Price: ${product.price}</Card.Text>
            <p className="detail-extra-info">Free shipping & 7-day return policy included. High quality guaranteed.</p>
            <div className="detail-buttons">
              <button className="detail-btn btn-cart hover-scale" onClick={() => dispatch(addtoCart({ ...product, qnty: 1 }))}>
                <IoCart /> Add Cart
              </button>
              <button className="detail-btn btn-buy hover-scale" onClick={handlePurchase}>
                Buy Now
              </button>
              <button
                className={`detail-btn btn-wishlist hover-scale ${isWishlisted ? "active" : ""}`}
                onClick={() => dispatch(toggleWishlist(product))}
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />} Wishlist
              </button>
              <button onClick={() => setShow(true)} className="detail-btn btn-review hover-scale">Add Review</button>
            </div>
          </Card.Body>
        </div>
      </Card>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={review.email} onChange={(e) => setReview({ ...review, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stars</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} style={{ cursor: "pointer", color: star <= review.stars ? "gold" : "gray", fontSize: "20px", marginRight: "4px" }} onClick={() => handleStarClick(star)} />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review Title</Form.Label>
              <Form.Control type="text" value={review.points} onChange={(e) => setReview({ ...review, points: e.target.value })} placeholder="e.g. Great quality, loved it!" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review Details</Form.Label>
              <Form.Control as="textarea" rows={3} value={review.detail} onChange={(e) => setReview({ ...review, detail: e.target.value })} placeholder="Describe your experience..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Submit Review</Button>
        </Modal.Footer>
      </Modal>

      <div className="review-section fade-in">
        <h3 style={{ marginBottom: 16 }}>Customer Reviews</h3>
        {reviews.length === 0 && <p style={{ color: "#888" }}>No reviews yet. Be the first to review this product.</p>}
        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <p style={{ marginBottom: 2, fontWeight: 600 }}>{rev.email}</p>
            <div style={{ marginBottom: 2 }}>{[...Array(rev.stars)].map((_, i) => <FaStar key={i} style={{ color: "gold", fontSize: "16px", marginRight: "2px" }} />)}</div>
            <p style={{ fontWeight: 500, fontSize: "15px", margin: "4px 0" }}>{rev.points}</p>
            <p style={{ color: "#555", fontSize: "14px" }}>{rev.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;