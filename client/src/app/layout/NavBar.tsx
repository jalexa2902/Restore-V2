import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

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

type Props = {
  toggleDarkMode: () => void;
  darkMode: boolean;
};

export default function NavBar({ darkMode, toggleDarkMode }: Props) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#05462569" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component={NavLink} to='/' variant="h6" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
            Espiga&Sol
          </Typography>
          <IconButton onClick={toggleDarkMode}>
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
    </AppBar>
  );
}
