import React, { useEffect, useState } from "react";
import ProductCards from "../components/productsCard/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  TextField,
} from "@mui/material";
import Spinner from "../components/spinner/Spinner";
import UserNav from "../components/user-nav/UserNav";
import { startGetProducts } from "../actions/products-action";
import { startCartItemsListing } from "../actions/cart-actions";
import styles from "./UserLandingPage.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const UserLandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageData, setPageData] = useState([]);
  const [filter, setFilter] = useState("");
  const numberOfElements = 16;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetProducts());
    dispatch(startCartItemsListing());
  }, []);
  const data = useSelector(state => {
    return state.products.products;
  });
  useEffect(() => {
    const initialSate = data.slice(0, numberOfElements);
    setPageData(initialSate);
  }, [data]);
  const selectedData = (event, value) => {
    const result = data.slice(
      (value - 1) * numberOfElements,
      value * numberOfElements - 1
    );
    setPageData(result);
  };
  const handleSearch = e => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term);
    const result = data.filter(el => {
      return el.title.toLowerCase().includes(term.toLowerCase());
    });
    setPageData(result);
  };
  const handleFilter = e => {
    const filter = e.target.value;
  };
  return (
    <>
      <UserNav />
      <Container>
        <Grid
          container
          sx={{
            marginBottom: "1rem",
            justifyContent: { md: "space-between" },
          }}
        >
          <Grid item md={3}>
            <TextField
              id="outlined-select-currency"
              select
              label="Filter"
              defaultValue="Select"
              fullWidth
              value={filter}
              onChange={e => handleFilter()}
            >
              {data.map(el => (
                <MenuItem key={el._id} value={el._id}>
                  {el.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4}>
            <TextField
              className={styles.searchBox}
              fullWidth
              value={searchTerm}
              onChange={e => handleSearch(e)}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Container>
      {pageData.length > 0 ? (
        <>
          <Container sx={{ display: "flex" }}>
            <Grid
              container
              spacing={2.5}
              sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            >
              {pageData?.map(el => {
                return <ProductCards {...el} key={el._id} />;
              })}
            </Grid>
          </Container>
          <Container className={styles.paginationContainer}>
            <Pagination
              color="primary"
              count={Math.ceil(pageData.length / numberOfElements)}
              page={1}
              defaultValue={1}
              onChange={selectedData}
            />
          </Container>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UserLandingPage;
