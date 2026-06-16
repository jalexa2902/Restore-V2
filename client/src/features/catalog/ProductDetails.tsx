import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../app/models/product";
import Grid from "@mui/material/Grid";
import { Button, Divider, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";

export default function ProductDetails() {

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://localhost:5001/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) return <h3>Loading...</h3>

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity in Stock', value: product.quantityInStock },
    { label: 'Price', value: `$${(product.price / 100).toFixed(2)}` },
  ];

  return (
    <Grid container spacing={6} sx={{ mx: 'auto', mt: 2 }}>
      <Grid size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>

      <Grid size={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product?.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table sx={{
            '& td': { fontSize: '1rem' }
          }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table>
            <TableBody>
              Table goes here
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={6}>
            <TextField variant='outlined' type="number" label="Quantity in basket" fullWidth defaultValue={1} />
          </Grid>
          <Grid size={6}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ height: "55px" }}>
              Add to Cart
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )
}