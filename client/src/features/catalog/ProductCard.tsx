import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/basketApi";
import type { Product } from "../../app/models/product";
import { currencyFormat } from "../../lib/util";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {

  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        whiteSpace: 'nowrap',
      }}
    >
      <CardMedia
        sx={{ height: 250, backgroundSize: "cover" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          sx={{ textTransform: "uppercase", whiteSpace: 'nowrap', }}
          variant="subtitle2"
        >
          {product.name}
        </Typography>

        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          {currencyFormat(product.price)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", flexDirection: "column", gap: 1 }}>
        <Button
          fullWidth
          disabled={isLoading}
          onClick={() => {
            addBasketItem({ product, quantity: 1 });
          }}
        >
          Agregar al carrito
        </Button>
        <Button fullWidth component={Link} to={`/catalog/${product.id}`}>Ver detalles</Button>
      </CardActions>
    </Card>
  );
}
