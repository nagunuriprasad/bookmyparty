import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BulkOrder from "./BulkOrder"; // Ensure this is properly imported
import "./assets/css/ShopOrder.css";

// Import image assets
import appleImage from "./assets/css/apple.jpg";
import carrotImage from "./assets/css/carrot.jpg";
import milkImage from "./assets/css/milk.jpg";
import chipsImage from "./assets/css/chips.jpg";
import juiceImage from "./assets/css/juice.jpg";
import shopBanner from "./assets/css/shop-banner.jpg";
import dealImage1 from "./assets/css/dael1.jpg";
import dealImage2 from "./assets/css/deal2.jpg";

// Define the tabs for the shop
const tabs = [
  "All", "Wholesale Package", "Wholesale Shop", "Retail Shops", "Grocery Shops",
  "Fruit Shops", "Chicken Shops", "Mutton Shops", "Fish Shops", "Dairy Shops",
  "Paneer Shops", "Gift Shops", "Fashion Shops", "Footwear Shops", "Balloon Shops",
  "Bakery Shops", "Flower Shops", "Decoration Shops", "Pooja Stores", "Cracker Shops",
  "Jewelry Shops", "Fancy Stores", "Beauty & Cosmetics",
];

const ShopOrder: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBulkOrderOpen, setIsBulkOrderOpen] = useState(false); // State to manage bulk order popup
  const navigate = useNavigate();

  // Sample items data
  const items = [
    { id: 1, name: "Apples", category: "Fruits", price: 120, image: appleImage },
    { id: 2, name: "Carrots", category: "Vegetables", price: 80, image: carrotImage },
    { id: 3, name: "Milk", category: "Dairy", price: 50, image: milkImage },
    { id: 4, name: "Chips", category: "Snacks", price: 30, image: chipsImage },
    { id: 5, name: "Juice", category: "Drinks", price: 60, image: juiceImage },
  ];

  // Load the cart from local storage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save the cart to local storage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Filter items based on search input
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add item to the cart
  const addToCart = (item: any) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  // Increment the quantity of a cart item
  const incrementQuantity = (id: number) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrement the quantity of a cart item
  const decrementQuantity = (id: number) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  // Get a cart item by ID
  const getCartItem = (id: number) => cart.find((item) => item.id === id);

  // Toggle the cart popup visibility
  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle bulk order button click
  const handleBulkOrderClick = () => {
    setIsBulkOrderOpen(true); // Show the BulkOrder popup
  };

  // Close Bulk Order popup
  const closeBulkOrderPopup = () => {
    setIsBulkOrderOpen(false); // Hide the BulkOrder popup
  };

  // Calculate Subtotal, GST, Platform Fee (5%), and Total
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const gst = subtotal * 0.18; // 18% GST
  const platformFee = subtotal * 0.05; // 5% Platform Fee
  const totalPrice = subtotal + gst + platformFee;

  return (
    <div className="shop-order">
      {/* Tabs Container */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? "active-tab" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Banner Section */}
      <div className="banner">
        <img src={shopBanner} alt="Shop Deals" className="banner-image" />
        <header className="shop-header">
          <h1>Shop Name</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for products, brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Conditional Button Rendering */}
            {selectedTab === "Wholesale Shop" && (
              <button className="special-buttons" onClick={handleBulkOrderClick}>
                Bulk Order
              </button>
            )}
            {selectedTab === "Wholesale Package" && (
              <button className="special-buttons" onClick={() => navigate("/shoporder")}>
                Package
              </button>
            )}
          </div>
        </header>
      </div>

      {/* Items Section */}
      <div className="items-container">
        {filteredItems.map((item) => {
          const cartItem = getCartItem(item.id);
          return (
            <div className="item-card" key={item.id}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h2 className="item-name">{item.name}</h2>
                <p className="item-price">₹{item.price}</p>
                <div className="button-container">
                  {!cartItem ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="small-add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(item.id)}>-</button>
                      <span>{cartItem.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                  )}
                  <button
                    className="small-view-cart-button"
                    onClick={toggleCartPopup}
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredItems.length === 0 && selectedTab !== "Wholesale Shop" && (
          <p className="no-results">No items found.</p>
        )}
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <div className="cart-popup">
          <div className="cart-popup-content">
            <h1>My Cart</h1>
            {cart.length > 0 ? (
              <ul className="cart-list">
                {cart.map((item: any) => (
                  <li key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <p>{item.name}</p>
                      <p>₹{item.price} x {item.quantity}</p>
                      <div className="quantity-controls">
                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
            <div className="cart-summary">
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>GST (18%): ₹{gst.toFixed(2)}</p>
              <p>Platform Fee (5%): ₹{platformFee.toFixed(2)}</p>
              <div className="cart-total">
                <h2>Total Amount: ₹{totalPrice.toFixed(2)}</h2>
              </div>
              {/* Proceed to Checkout Button */}
              <div className="proceed-button-container">
                <button className="proceed-checkout-button">Proceed to Checkout</button>
              </div>
            </div>
            <button className="close-popup-button" onClick={toggleCartPopup}>Close</button>
          </div>
        </div>
      )}

      {/* Bulk Order Popup */}
      {isBulkOrderOpen && (
        <div className="bulk-order-popup">
          <div className="bulk-order-content">
            <BulkOrder /> {/* Your BulkOrder component */}
            <button className="close-popup-button" onClick={closeBulkOrderPopup}>Close</button>
          </div>
        </div>
      )}

      {/* Deals Section */}
      <div className="deals-section">
        <h2>Exclusive Deals</h2>
        <div className="deals-container">
          <div className="deal-card">
            <img src={dealImage1} alt="Deal 1" className="deal-image" />
            <p className="deal-text">50% off on snacks!</p>
          </div>
          <div className="deal-card">
            <img src={dealImage2} alt="Deal 2" className="deal-image" />
            <p className="deal-text">Buy 1 Get 1 Free on Drinks!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOrder;
