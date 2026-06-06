import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Button, Container, Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "Product " + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        description: "Description for product ",
        pictureUrl: "https://via.placeholder.com/150",
        quantityInStock: 10,
        type: "Type ",
        brand: "Brand ",
      },
    ]);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          my: 4,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">Espiga & Sol</Typography>
        <Button variant="outlined" onClick={addProduct}>
          Add Product
        </Button>
      </Box>
      <Catalog products={products} />
    </Container>
  );
}

export default App;
