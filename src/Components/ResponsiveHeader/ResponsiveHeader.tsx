import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getZeroLedMonthYear } from "../../Helpers/Functions/dateFunctions";

function getTodaysDate(): string {
  const today = format(new Date(), "LL/dd/yyyy");
  return today;
}

function checkLoggedInStatus(): string | null {
  return sessionStorage.getItem("token");
}

function logOut(): void {
  sessionStorage.removeItem("token");
  window.location.reload();
}

const pages = [
  { name: "Today", to: `/day/${getTodaysDate()}` },
  { name: "This Month", to: `/month/${getZeroLedMonthYear(new Date())}` },
  { name: "Competitors", to: "/names" },
  { name: "Search", to: "/search" },
];

const ResponsiveHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          sx={{
            textDecoration: "none",
          }}
        >
          <Toolbar disableGutters>
            <Link to={`/`} style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                🐜 TriAntVia
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.name} to={page.to}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
                {!checkLoggedInStatus() ? (
                  <Link to="login">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        color: "rgb(0, 0, 238)",
                      }}
                      textAlign="center"
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/today"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              🐜 TriAntVia
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: { xs: "none", md: "flex-end" },
              }}
            >
              {pages.map((page) => (
                <Button
                  component={Link}
                  to={page.to}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
              {!checkLoggedInStatus() ? (
                <Button
                  component={Link}
                  to="login"
                  color="inherit"
                  sx={{ my: 2, color: "white", alignContent: "end" }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={logOut}
                  color="inherit"
                  sx={{ my: 2, color: "white", alignContent: "end" }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveHeader;
