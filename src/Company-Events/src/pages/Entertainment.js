import React from 'react';
import ImageContainer from '../components/ImageContainer';
import DocumentSection from '../components/DocumentUpload';
import '../App.css';

// Import images directly from the src-imgs folder
import img1 from './src-imgs/url1.jpg';
import img2 from './src-imgs/url2.jpg';
import img3 from './src-imgs/url3.jpg';
import img4 from './src-imgs/url4.jpg';
import img5 from './src-imgs/url5.jpg';
import img6 from './src-imgs/url6.jpg';
import img7 from './src-imgs/url7.jpg';
import img8 from './src-imgs/url8.jpg';
import img9 from './src-imgs/url9.jpg';
import img10 from './src-imgs/url10.jpg';
import img11 from './src-imgs/url11.jpg';
import img12 from './src-imgs/url12.jpg';

function App() {
  const images = [
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9, img10,
    img11, img12
  ];
  
  const titles = [
    'Super chef', 'Water Cans', 'Fresh Veggies', 'pest control', 'Cleanliness',
    'Best Quality', 'fssai', 'GST', "5's", 'Groceries',
    'Extinguisher', 'pvt ltd'
  ];

  return (
    <div className="App">
      <h1>Entertainments</h1>
      <ImageContainer images={images} titles={titles} />
      <DocumentSection />
    </div>
  );
}

export default App;
