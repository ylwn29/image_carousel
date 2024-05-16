import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { domToPng } from 'modern-screenshot';
import jsPDF from 'jspdf';

const Carousel = ({ pages, onCurrentPageChange }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: onCurrentPageChange,
  };

  const handleScreenshot = () => {
    const carouselContainer = document.querySelector('.carousel-container');
    domToPng(carouselContainer, {
      quality: 1,
    })
      .then((img) => {
        const link = document.createElement('a');
        link.href = img;
        link.download = 'carousel-page.png';
        link.click();
      })
      .catch((error) => {
        console.error('Screenshot capture failed:', error);
      });
  };

  const handleCaptureAllScreenshots = () => {
    const pages = document.querySelectorAll('.carousel-page');
    const pdf = new jsPDF();

    const capturePage = (page, index) => {
      return new Promise((resolve, reject) => {
        domToPng(page, {
          quality: 1,
        })
          .then((img) => {
            if (index > 0) {
              pdf.addPage();
            }
            pdf.addImage(img, 'PNG', 10, 10, 180, 240);
            resolve();
          })
          .catch((error) => {
            console.error(`Screenshot capture for page ${index + 1} failed:`, error);
            reject(error);
          });
      });
    };

    const captureAllPages = async () => {
      for (let i = 0; i < pages.length; i++) {
        await capturePage(pages[i], i);
      }
      pdf.save('carousel-pages.pdf');
    };

    captureAllPages();
  };

  return (
    <div className="carousel-container w-full max-w-screen-lg mx-auto">
      <div className="text-center mt-10 mb-2">
        <button onClick={handleScreenshot} className="bg-purple-400 text-white font-bold py-2 px-4 rounded-3xl  hover:bg-purple-500 mr-4">
          Download
        </button>
        <button onClick={handleCaptureAllScreenshots} className="bg-purple-400 text-white font-bold py-2 px-4 rounded-3xl  hover:bg-purple-500 mr-4">
          Download All
        </button>
      </div>
      <Slider {...settings}>
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="carousel-page p-28 shadow-md min-h-full">
            {page.map((element, elementIndex) => {
              if (element.type === 'text') {
                return (
                  <p key={elementIndex} className={element.className}>
                    {element.content}
                  </p>
                );
              } else if (element.type === 'image') {
                return (
                  <img key={elementIndex} src={element.src} alt={`image-${pageIndex}-${elementIndex}`} className={element.className} />
                );
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
