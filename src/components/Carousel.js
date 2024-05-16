import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ pages, onCurrentPageChange }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: onCurrentPageChange
  };

  return (
    <div className="carousel-container w-full max-w-screen-lg mx-auto">
      <Slider {...settings}>
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="carousel-page p-28 shadow-md min-h-full">
            {page.map((element, elementIndex) => {
              if (element.type === 'text') {
                return <p key={elementIndex} className={element.className}>{element.content}</p>;
              } else if (element.type === 'image') {
                return <img key={elementIndex} src={element.src} alt={`image-${pageIndex}-${elementIndex}`} className={element.className} />;
              }
              return null;
            })}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
