import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class TextToPdfConverter extends React.Component {
  convertTextToPdf = () => {
    const { inputText } = this.props;
    const docDefinition = {
      content: [
        { text: inputText, fontSize: 12, margin: [0, 0, 0, 12] } // Customize text properties as needed
      ]
    };

    pdfMake.createPdf(docDefinition).download('output.pdf');
  };

  render() {
    return (
      <div>
        <button onClick={this.convertTextToPdf}>Convert to PDF</button>
      </div>
    );
  }
}

export default TextToPdfConverter;
