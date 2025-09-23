import React, { useState, useRef, useEffect } from 'react';
import './ReviewCarousel.css';
import './RevApp.css';

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'John Doe', content: 'Great product and amazing service!', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', content: 'Love the quality!', email: 'jane@example.com' },
    { id: 3, name: 'Alex Johnson', content: 'Fast delivery and well-packaged.', email: 'alex@example.com' },
    { id: 4, name: 'Emily White', content: 'Amazing experience shopping here.', email: 'emily@example.com' },
    { id: 5, name: 'Chris Martin', content: 'Highly recommend this!', email: 'chris@example.com' },
  ]);

  const carouselRef = useRef(null);

  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
      }
    };
    const interval = setInterval(scrollCarousel, 20);
    return () => clearInterval(interval);
  }, []);

  const addReview = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    content: '',
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById('profilePic').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.content) {
      addReview({ ...formData, id: Date.now() });
      setFormData({ name: '', email: '', phone: '', content: '', profilePic: null });
    }
  };

  return (
    <div className="app" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Customer Reviews</h1>
      <div
        className="carousel-container"
        ref={carouselRef}
        style={{
          display: 'flex',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          margin: '20px auto',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      >
        {reviews.slice(0, 5).map((review) => (
          <div
            className="carousel-item"
            key={review.id}
            style={{
              display: 'inline-block',
              minWidth: '200px',
              margin: '0 10px',
              padding: '10px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
            }}
          >
            <p><strong>{review.name}</strong></p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
      <h2>My Review</h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px'
          }}
        >
          <div
            className="profile-pic-container"
            onClick={handleClick}
            style={{
              cursor: 'pointer',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0'
            }}
          >
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{ color: '#888', textAlign: 'center', fontSize: '12px' }}>Upload Your Picture</div>
            )}
            <input
              type="file"
              id="profilePic"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Write a Review</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewCarousel;
