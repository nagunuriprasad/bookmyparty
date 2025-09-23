import React, { useState } from 'react';

const IdentityCard = () => {
  // State for flipping the card
  const [isFlipped, setIsFlipped] = useState(false);

  // Staff details
  const staff = {
    name: 'Dhiraj M',
    id: '3PG20CS015',
    role: 'Event Architect',
    phone: '+91-7019400565',
    picture: 'https://via.placeholder.com/150', // Replace with an actual image URL
    bloodGroup: 'A+',
  };

  // Company details
  const company = {
    name: 'BookMyPartys',
    website: 'bookmypartys.com/',
    address: 'Srinagar colony, Hyderabad-500073',
    contact: '+91 8555973013',
  };

  // Generate QR Code URL
  const qrCodeValue = `${staff.name} : ${staff.phone}`;
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    qrCodeValue
  )}&size=120x120&color=007bff`;

  // Toggle flip state
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        onClick={handleCardClick}
        style={{
          width: '350px',
          height: '500px',
          borderRadius: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          border: '2px solid #007bff',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
        }}
      >
        {/* Front Side */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              textAlign: 'center',
              padding: '15px',
            }}
          >
            <h2 style={{ margin: 0 }}>BookMyPartys</h2>
            <p style={{ margin: '5px 0 0', fontSize: '14px' }}>
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'underline' }}
              >
                {company.website}
              </a>
            </p>
          </div>

          {/* Staff Picture */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '15px',
            }}
          >
            <img
              src={staff.picture}
              alt={`${staff.name}'s picture`}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #007bff',
              }}
            />
          </div>

          {/* Staff Details */}
          <div
            style={{
              padding: '15px',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            <h3 style={{ margin: '5px 0', color: '#007bff' }}>{staff.name}</h3>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
              ID: <strong>{staff.id}</strong>
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>
              Role: <strong>{staff.role}</strong>
            </p>
          </div>

          {/* QR Code */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '15px 0',
            }}
          >
            <img
              src={qrCodeURL}
              alt="QR Code"
              style={{
                border: '2px solid #007bff',
                padding: '5px',
                borderRadius: '10px',
              }}
            />
          </div>
        </div>

        {/* Back Side */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#f7f7f7',
            transform: 'rotateY(180deg)',
            padding: '20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h4 style={{ color: '#007bff' }}>Staff Details</h4>
          <p style={{ margin: '5px 0' }}>
            <strong>Blood Group:</strong> {staff.bloodGroup}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Phone:</strong> {staff.phone}
          </p>
          <h4 style={{ color: '#007bff', marginTop: '20px' }}>Company Info</h4>
          <p style={{ margin: '5px 0' }}>
            <strong>Address:</strong> {company.address}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Contact:</strong> {company.contact}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Website:</strong>{' '}
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#007bff',
                textDecoration: 'underline',
              }}
            >
              {company.website}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
