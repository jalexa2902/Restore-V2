import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
]

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" }
]

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": { color: "yellow" },
  "&.active": { color: "text.secondary" },
  textDecoration: "none",
}


export default function NavBar() {
  const { isLoading, darkMode } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#05462569" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component={NavLink} to='/' variant="h6" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
            P R A T U M
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
          <IconButton size='large'>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
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
