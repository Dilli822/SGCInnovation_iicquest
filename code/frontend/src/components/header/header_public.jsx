// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { Close as CloseIcon } from "@material-ui/icons";

import Header from "./header";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   IconButton,
//   Drawer,
//   List,
//   Grid,
//   ListItem,
//   ListItemText,
//   TextField,
//   Menu,
//   MenuItem,
//   useMediaQuery,
//   ThemeProvider,
//   createTheme,
// } from "@mui/material";

// import { ShoppingCart, Search } from "@material-ui/icons";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { makeStyles } from "@material-ui/core/styles";

// const theme = createTheme(); // Create a theme object

// const useStyles = makeStyles((theme) => ({
//   // Your existing styles
// }));

// const HeaderPublic = () => {
//   const classes = useStyles();
//   const location = useLocation();

//   const isAuthPage =
//     location.pathname === "/login" ||
//     location.pathname === "/signup" ||
//     location.pathname === "/forgot-password";

//   const navigate = useNavigate();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Using useMediaQuery with theme.breakpoints

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setDrawerOpen(false);
//   };

//   const handleSearchChange = async (event) => {
//     const { value } = event.target;
//     setSearchText(value);

//     if (value.trim() === "") {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/e-com/api/products/public/list/?search=${value}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch search results");
//       }
//       const data = await response.json();

//       const filteredResults = Object.keys(data).reduce((acc, category) => {
//         const filteredCategory = data[category].filter((product) =>
//           product.product_name.toLowerCase().includes(value.toLowerCase())
//         );
//         if (filteredCategory.length > 0) {
//           acc[category] = filteredCategory;
//         }
//         return acc;
//       }, {});

//       setSearchResults(filteredResults);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   const closeSearch = () => {
//     setSearchText("");
//     setSearchResults([]);
//   };

//   const isSeller = localStorage.getItem("IsSeller") === "true";
//   const isBuyer = localStorage.getItem("IsBuyer") === "true";
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const profileLink = isSeller ? "/profile/seller" : "/profile/buyer";

//   const handleCardClick = (product) => {
//     setSelectedProduct(product);
//     navigate(
//       `/product/${product.product_name}/${product.id}/${product.category_name}`,
//       { state: { product } }
//     );
//   };

//   const menuItems = (
//     <List>
//       <ListItem button onClick={handleClose}>
//         <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
//           <ListItemText primary="Login" />
//         </Link>
//       </ListItem>
//       <ListItem button onClick={handleClose}>
//         <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
//           <ListItemText primary="Signup" />
//         </Link>
//       </ListItem>
//     </List>
//   );

//   return (
//     <ThemeProvider theme={theme}> {/* Wrap your component with ThemeProvider */}
//       <>
//         <AppBar position="sticky" sx={{ bgcolor: "#FFFFFF", color: "#000" }}>
//           <Container>
//             <Grid
//               container
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 padding: "5px 0",
//               }}
//             >
//               <Grid item xs={3} md={3}>
//                 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                   <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//                     Logo
//                   </Link>
//                 </Typography>
//               </Grid>

//               <Grid item xs={6} md={4}>
//                 {!isAuthPage && (
//                   <div className={classes.searchContainer}>
//                     <TextField
//                       className={classes.searchInput}
//                       placeholder="Search..."
//                       variant="outlined"
//                       value={searchText}
//                       onChange={handleSearchChange}
//                       id="masterSearchInput"
//                     />
//                     &nbsp;
//                     {searchText && (
//                       <IconButton
//                         className={classes.closeIcon}
//                         onClick={closeSearch}
//                       >
//                         <CloseIcon color="secondary" />
//                       </IconButton>
//                     )}
//                   </div>
//                 )}
//               </Grid>

//               <Grid item xs={3} md={5}>
//                 <div
//                   style={{
//                     float: "right",
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   {/* <Link to="/cart/details" className={classes.cartLink}>
//                     <ShoppingCart className={classes.cartIcon} />
//                     <span className={classes.cartText}></span> */}
//                   {/* </Link> */}
//                   &nbsp;
//                   {!isMobile && (
//                     <>
//                       <ListItem
//                         button
//                         component={Link}
//                         to="/login"
//                         onClick={handleClose}
//                       >
//                         <ListItemText primary="Login" />
//                       </ListItem>

//                       <ListItem
//                         button
//                         component={Link}
//                         to="/signup"
//                         onClick={handleClose}
//                       >
//                         <ListItemText primary="Signup" />
//                       </ListItem>
//                     </>
//                   )}
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     keepMounted
//                     sx={{ width: "250px" }}
//                     MenuListProps={{
//                       sx: {
//                         width: "250px",
//                       },
//                     }}
//                   >
//                     <Link
//                       to={profileLink}
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       <MenuItem onClick={handleClose}>Profile</MenuItem>
//                     </Link>
//                   </Menu>
//                   {isMobile && (
//                     <IconButton
//                       color="inherit"
//                       aria-label="open drawer"
//                       edge="start"
//                       onClick={toggleDrawer}
//                     >
//                       <MenuIcon />
//                     </IconButton>
//                   )}
//                 </div>
//               </Grid>
//             </Grid>
//           </Container>
//         </AppBar>
//         <Container>
//           <Grid container>
//             <Grid
//               item
//               xs={10}
//               style={{ zIndex: 999, width: "100%", position: "fixed" }}
//             >
              
          
//             </Grid>
//           </Grid>
//         </Container>

//         {isMobile && (
//           <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
//             <div
//               role="presentation"
//               onClick={toggleDrawer}
//               onKeyDown={toggleDrawer}
//             >
//               {menuItems}
//             </div>
//           </Drawer>
//         )}
//       </>
//     </ThemeProvider>
//   );
// };

// export default HeaderPublic;

function HeaderPublic(){
  return(
    <>
    <Header/>
    </>
  )
}

export default HeaderPublic;
