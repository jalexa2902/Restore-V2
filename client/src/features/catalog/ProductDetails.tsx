import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button, Divider, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketApi";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {

  const { id } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (item) setQuantity(item.quantity);

  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? +id : 0)


  if (!product || isLoading) return <h3>Loading...</h3>

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity })
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity })
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 0) setQuantity(value)
  }

  const productDetails = [
    { label: 'Nombre', value: product.name },
    { label: 'Descripción', value: product.description },
    { label: 'Tipo', value: product.type },
    { label: 'Marca', value: product.brand },
    { label: 'Cantidad disponible', value: product.quantityInStock },
    { label: 'Precio', value: `$${(product.price / 100).toFixed(2)}` },
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
            <TextField
              variant='outlined'
              type="number"
              label="Cantidad en carrito"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <Button
              onClick={handleUpdateBasket}
              disabled={quantity === item?.quantity || !item && quantity === 0}
              variant="contained"
              size="large"
              fullWidth
              sx={{ height: "55px" }}>
                {item ? 'Actualizar cantidad' : 'Agregar al carrito'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}