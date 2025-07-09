import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../cartSlice';
import { useNavigate } from 'react-router-dom';
import '../css/Search.css';

const Search = () => {
    const [mypro, setMypro] = useState("");
    const [prodata, setProData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/smartphones");
                setProData(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadData();
    }, []);

    const filteredProducts = prodata.filter((key) =>
        key.name.toLowerCase().includes(mypro.toLowerCase())
    );

    return (
        <div className="search-container">
            <h1 className="search-heading">Search Product</h1>

            <div className="search-bar">
                <label className="search-label">Enter Product Name:</label>
                <input
                    type="text"
                    value={mypro}
                    onChange={(e) => setMypro(e.target.value)}
                    className="search-input"
                    placeholder="e.g. iPhone 14"
                />
            </div>

            <hr className="divider" />

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((key) => (
                        <Card key={key.id} className="product-card">
                            <Card.Img
                                variant="top"
                                src={key.image}
                                className="product-img"
                                onClick={() => navigate(`/prodetail/${key.id}`)}
                            />
                            <Card.Body className="product-body">
                                <Card.Title className="product-title">{key.name}</Card.Title>
                                <Card.Text className="product-desc">{key.description}</Card.Text>
                                <h5 className="product-price">₹{key.price}</h5>
                                <Button
                                    className="add-to-cart-btn"
                                    onClick={() => dispatch(addtoCart({
                                        id: key.id,
                                        name: key.name,
                                        desc: key.description,
                                        price: key.price,
                                        image: key.image,
                                        qnty: 1
                                    }))}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p className="no-result">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
