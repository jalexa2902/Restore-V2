import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
  { title: "catálogo", path: "/catalog" },
  { title: "acerca", path: "/about" },
  { title: "contacto", path: "/contact" },
]

const rightLinks = [
  { title: "Inicia sesión", path: "/login" },
  { title: "registrate", path: "/register" }
]

const navStyles = {
  color: "inherit",
  typography: "0.9rem",
  "&:hover": { color: "yellow" },
  "&.active": { color: "text.secondary" },
  textDecoration: "none",
  whiteSpace: 'nowrap',
  display: 'inline-flex'
}


export default function NavBar() {
  const { isLoading, darkMode } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  const { data: basket } = useFetchBasketQuery();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0; //actualizar numero de items en carrito

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#05462569" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component={NavLink} to='/' variant="h6" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
            P R A V I A
          </Typography>
          <IconButton onClick={() => dispatch(setDarkMode())}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to='/basket' size='large'>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex", p: 0 }}>
            {rightLinks.map(({ title, path }) => (

              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

        </Box>

      </Toolbar>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="success" />
        </Box>
      )}
    </AppBar>
  );
}
