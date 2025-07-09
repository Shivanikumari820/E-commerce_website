import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import { qntyInc, qntyDec, proDelete } from "../cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Cart = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totAmount = 0;

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🛒 My Cart</h1>
        <hr />
        {Cart.length === 0 ? (
          <p style={styles.emptyMessage}>Your cart is empty.</p>
        ) : (
          <>
            <Table striped bordered hover style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Product Name</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {Cart.map((product) => {
                  const productTotal = product.price * product.qnty;
                  totAmount += productTotal;
                  return (
                    <tr key={product.id} style={styles.tr}>
                      <td style={styles.td}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={styles.image}
                        />
                      </td>
                      <td style={styles.td}>{product.name}</td>
                      <td style={styles.td}>{product.description}</td>
                      <td style={styles.td}>₹{Math.round(product.price)}</td>
                      <td style={styles.td}>
                        <FaMinusCircle
                          style={styles.icon}
                          onClick={() => dispatch(qntyDec({ id: product.id }))}
                        />
                        <span style={styles.quantity}>{product.qnty}</span>
                        <FaPlusCircle
                          style={styles.icon}
                          onClick={() => dispatch(qntyInc({ id: product.id }))}
                        />
                      </td>
                      <td style={styles.td}>₹{Math.round(productTotal)}</td>
                      <td style={styles.td}>
                        <MdDelete
                          style={styles.deleteIcon}
                          onClick={() => dispatch(proDelete(product.id))}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            {/* Payment Summary */}
            <div style={styles.footer}>
              <div style={styles.totalBox}>
                <h4 style={styles.totalLabel}>Total Amount:</h4>
                <h3 style={styles.totalAmount}>
                  <PiCurrencyInrBold style={{ marginRight: "4px" }} />
                  {Math.round(totAmount)}
                </h3>
              </div>
              <button
                style={styles.checkoutButton}
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #dfe9f3)",
    paddingTop: "70px",
    paddingBottom: "40px",
    animation: "fadeIn 0.6s ease-in",
  },
  container: {
    maxWidth: "92%",
    margin: "auto",
    padding: "25px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    animation: "slideUp 0.8s ease-out",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginBottom: "10px",
  },
  emptyMessage: {
    fontSize: "20px",
    color: "#888",
    textAlign: "center",
    padding: "30px 0",
  },
  table: {
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: "10px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "14px",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "14px",
    verticalAlign: "middle",
  },
  image: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
    margin: "0 6px",
    color: "#007bff",
    transition: "transform 0.2s ease",
  },
  quantity: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 8px",
  },
  deleteIcon: {
    fontSize: "24px",
    color: "#dc3545",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  footer: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    animation: "fadeIn 1s ease-in-out",
  },
  totalBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  totalLabel: {
    fontSize: "16px",
    color: "#555",
  },
  totalAmount: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2c3e50",
  },
  checkoutButton: {
    fontSize: "14px",
    fontWeight: "600",
    padding: "6px 10px",
    width: "110px",
    minWidth: "unset",
    maxWidth: "110px",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    border: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
};

export default Cart;
