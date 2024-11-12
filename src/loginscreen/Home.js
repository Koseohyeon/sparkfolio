// Home.js
import React from 'react';
import ScreenSlider from '../components/ScreenSlider';
import Mainimage1 from './../images/mainimage1.png';

const Home = () => {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
      }}>
    <div style={{
          width: '82%',
          maxWidth: '1600px',
          minHeight: '550px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}>
        {/* 왼쪽 텍스트 섹션 */}
        <div style={{
          flex: 1,
          padding: '20px',
          textAlign: 'left',
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
          }}>
            이력서 관리 Sparkfolio 에서 시작하세요!
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#555',
          }}>
            Sparkfolio는 여러분의 커리어 여정에 활기를 불어넣는 플랫폼입니다.
            이력서를 손쉽게 작성하고 관리할 수 있으며, 직관적이고 사용자 친화적인 인터페이스로 이력서를 체계적으로 관리할 수 있습니다.
          </p>
        </div>

        {/* 오른쪽 컴퓨터 화면 섹션 */}
        <div style={{
          position: 'relative',
          width: '50%',
          maxWidth: '600px',
        }}>
          <img
            src={Mainimage1}
            alt="컴퓨터 배경 이미지"
            style={{
              width: '95%',
            }}
          />
          {/* ScreenSlider 컴포넌트가 직접 이미지 위에서 작동하도록 위치 지정 */}
          <div style={{
            position:'absolute',
             top: '6%',  // top 값을 조정해 슬라이더 위치를 상단으로 이동
             left: '15%',
             width: '70%',
             height: '60%',
          }}>
            <ScreenSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
