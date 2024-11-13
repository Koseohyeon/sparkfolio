// ScreenSlider.js
import React from 'react';
import Slider from 'react-slick';
import Mainimage1 from './../images/mainimage1.png';
import Mainimage2 from './../images/mainimage2.png';
import Mainimage3 from './../images/mainimage3.png';

const images = [Mainimage1, Mainimage2, Mainimage3];

// 왼쪽 화살표 컴포넌트
const PrevArrow = ({ onClick }) => (
  <div
    style={{
      ...arrowStyles,
      left: '10px', // 이미지 좌측에 위치
      bottom: '160px', // 도트와 같은 줄에 위치하도록 설정
    }}
    onClick={onClick}
  >
    ‹
  </div>
);

// 오른쪽 화살표 컴포넌트
const NextArrow = ({ onClick }) => (
  <div
    style={{
      ...arrowStyles,
      right: '10px', // 이미지 우측에 위치
      bottom: '160px', // 도트와 같은 줄에 위치하도록 설정
    }}
    onClick={onClick}
  >
    ›
  </div>
);

// 화살표의 공통 스타일
const arrowStyles = {
  fontSize: '30px',
  color: '#808080', // 회색 화살표
  cursor: 'pointer',
  zIndex: 1,
  position: 'absolute',
  transform: 'translateY(50%)', // 중앙 정렬
};

const ScreenSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    prevArrow: <PrevArrow />, // 커스텀 화살표 추가
    nextArrow: <NextArrow />,
  };

  return (
    <div style={{ position: 'relative' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{
                width: '95%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                margin: '0 auto', // 이미지 중앙 정렬
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScreenSlider;
