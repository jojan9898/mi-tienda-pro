import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Se registran las fuentes para asegurar compatibilidad y evitar errores
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/helvetiker@1.0.0/helvetiker_regular.typeface.json' },
    { src: 'https://cdn.jsdelivr.net/npm/helvetiker@1.0.0/helvetiker_bold.typeface.json', fontWeight: 'bold' },
  ]
});

// Estilos para el PDF, se escriben de forma similar a CSS-in-JS
const styles = StyleSheet.create({
  page: { 
    fontFamily: 'Helvetica', 
    fontSize: 11, 
    padding: 30, 
    flexDirection: 'column', 
    backgroundColor: 'white', 
    color: 'black' 
  },
  header: { 
    padding: 15, 
    textAlign: 'center', 
    color: '#121212', 
    borderBottomWidth: 2, 
    borderBottomColor: '#F59E0B' 
  },
  headerText: { 
    fontFamily: 'Helvetica', 
    fontWeight: 'bold', 
    fontSize: 20 
  },
  infoSection: { 
    marginVertical: 15, 
    paddingHorizontal: 10 
  },
  infoText: { 
    fontSize: 12, 
    marginBottom: 4 
  },
  table: { 
    display: "table", 
    width: "auto" 
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row", 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE' 
  },
  tableColHeader: { 
    width: "25%", 
    backgroundColor: '#1E1E1E', 
    color: 'white', 
    padding: 5, 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  tableCol: { 
    width: "25%", 
    padding: 5 
  },
  totalSection: { 
    marginTop: 20, 
    textAlign: 'right' 
  },
  totalText: { 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    left: 30, 
    right: 30, 
    textAlign: 'center', 
    color: 'grey', 
    fontSize: 10 
  }
});

const ReceiptDocument = ({ data }) => {
  // Se desestructuran los datos que llegan desde el formulario
  const { docType, customerId, items, total } = data;
  const date = new Date().toLocaleDateString('es-PE');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>COMPROBANTE DE VENTA</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Tipo: {docType.replace('_', ' ').toUpperCase()}</Text>
          <Text style={styles.infoText}>Fecha: {date}</Text>
          {customerId && <Text style={styles.infoText}>{docType === 'factura' ? 'RUC' : 'DNI'}: {customerId}</Text>}
        </View>

        {/* Encabezado de la tabla */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={{...styles.tableColHeader, width: '20%'}}>ID</Text>
            <Text style={{...styles.tableColHeader, width: '40%'}}>Nombre</Text>
            <Text style={{...styles.tableColHeader, width: '15%'}}>Cant.</Text>
            <Text style={{...styles.tableColHeader, width: '25%'}}>Subtotal</Text>
          </View>
          {/* Filas de la tabla con los productos */}
          {items.map(item => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={{...styles.tableCol, width: '20%'}}>{item.id}</Text>
              <Text style={{...styles.tableCol, width: '40%'}}>{item.name}</Text>
              <Text style={{...styles.tableCol, width: '15%', textAlign: 'center'}}>{item.quantity}</Text>
              <Text style={{...styles.tableCol, width: '25%', textAlign: 'right'}}>S/ {Number(item.subtotal).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total: S/ {total.toFixed(2)}</Text>
        </View>
        
        <Text style={styles.footer}>Gracias por su compra.</Text>
      </Page>
    </Document>
  );
};

export default ReceiptDocument;