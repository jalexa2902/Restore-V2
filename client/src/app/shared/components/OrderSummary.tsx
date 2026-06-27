import { Box, Typography, Divider, Button, TextField, Paper } from "@mui/material";
import { currencyFormat } from "../../../lib/util";
import { useFetchBasketQuery } from "../../../features/basket/basketApi";
import type { Item } from "../../models/basket";
import { Link } from "react-router-dom";

export default function OrderSummary() {
    const { data: basket } = useFetchBasketQuery();
    const subtotal = basket?.items.reduce((sum: number, item: Item) => sum + item.quantity * item.price, 0) ?? 0;
    const deliveryFee = subtotal > 30000 ? 0 : 9900;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "lg", mx: "auto" }}>
            <Paper sx={{ mb: 2, p: 3, width: '100%', borderRadius: 3 }}>

                <Typography variant="h6" component="p" sx={{ fontWeight: "bold" }}>
                    Resumen del pedido
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    ¡Los pedidos superiores a $300 pesos tienen envío gratis!
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="textSecondary">Subtotal</Typography>
                        <Typography>
                            {currencyFormat(subtotal)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="textSecondary">Descuento</Typography>
                        <Typography color="success">
                            {/* TODO */}
                            -$0.00
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="textSecondary">Gastos de envío</Typography>
                        <Typography>
                            {currencyFormat(deliveryFee)}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography color="textSecondary">Total</Typography>
                        <Typography>
                            {currencyFormat(subtotal + deliveryFee)}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button
                        component={Link}
                        to='/checkout'
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Pagar
                    </Button>
                    <Button
                        component={Link}
                        to='/catalog'
                        fullWidth
                    >
                        Continuar comprando
                    </Button>
                </Box>
            </Paper>

            {/* Coupon Code Section */}
            <Paper sx={{ width: '100%', borderRadius: 3, p: 3 }}>

                <form>
                    <Typography variant="subtitle1" component="label">
                        ¿Tienes algún código promocional?
                    </Typography>

                    <TextField
                        label="Código promocional"
                        variant="outlined"
                        fullWidth
                        sx={{ my: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Aplicar el código
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}