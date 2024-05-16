import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';

const styles = {
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 28,
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
  image: {
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 28,
  },
};

const PDFDocument = ({ pages }) => (
  <Document>
    {pages.map((page, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View style={styles.section}>
          {page.map((element, idx) => {
            if (element.type === 'text') {
              return (
                <Text key={idx} style={styles.text}>
                  {element.content}
                </Text>
              );
            } else if (element.type === 'image') {
              return <Image key={idx} style={styles.image} src={element.src} />;
            }
            return null;
          })}
        </View>
      </Page>
    ))}
  </Document>
);

export default PDFDocument;
