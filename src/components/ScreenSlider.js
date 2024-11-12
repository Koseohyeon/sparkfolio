// ScreenSlider.js
import React from 'react';
import Slider from 'react-slick';
import Mainimage1 from './../images/mainimage1.png';
import Mainimage2 from './../images/mainimage2.png';
import Mainimage3 from './../images/mainimage3.png';

const images = [
  Mainimage1, Mainimage2, Mainimage3
];

const ScreenSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide-${index}`} style={{
            width: '100%',  // 이미지 너비를 90%로 줄이기
            height: 'auto',  // 높이는 자동으로 비율 맞추기
            objectFit: 'cover',  // 비율 맞춰 잘라서 보여주기
            borderRadius: '8px',
            }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScreenSlider;
