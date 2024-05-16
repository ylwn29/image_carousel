import React, { useState } from 'react';
import Carousel from './components/Carousel';
import Pages from './pages/Pages';
// import { downloadPagesAsPDF, downloadPageAsPDF } from './utils/downloadPages';

const App = () => {
  const pages = Pages();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const handleCurrentPageChange = (index) => {
    setCurrentPageIndex(index);
  };


  return (
    <div className="App container mx-auto p-4 mb-10">
      <h1 className="text-4xl font-bold text-center my-8">Image Carousel</h1>
      <Carousel pages={pages} onCurrentPageChange={handleCurrentPageChange}/>
      {/* <div className="text-center mt-16">
        <button
          onClick={() => downloadPageAsPDF(pages[currentPageIndex])}
          className="bg-purple-400 text-white font-bold py-2 px-4 rounded-3xl  hover:bg-purple-500 mr-4"
        >
          Download This Page
        </button>
        <button
          onClick={() => downloadPagesAsPDF(pages)}
          className="bg-purple-400 text-white font-bold py-2 px-4 rounded-3xl hover:bg-purple-500 mr-4"
        >
          Download All Pages
        </button>
      </div> */}
    </div>
  );
};

export default App;
