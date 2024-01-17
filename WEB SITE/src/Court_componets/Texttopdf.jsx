import React from 'react';
import TextToPdfConverter from './TextToPdfConverter';

function Texttopdf() {
  const inputText = "This is a sample text that will be converted to PDF.";

  return (
    <div>
      <h1>Text to PDF Converter</h1>
      <TextToPdfConverter inputText={inputText} />
    </div>
  );
}

export default Texttopdf
