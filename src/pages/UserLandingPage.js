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
import styles from "./UserLandingPage.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ProjectFooter from "../components/footer/AdminFooter";
import { startCartItemsListing } from "../actions/cart-actions";

const UserLandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);

  const sortValues = ["a-z", "z-a", "lowest-highest", "highest-lowest"];

  const [sort, setSort] = useState("");

  const numberOfElements = 15;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetProducts());
    dispatch(startCartItemsListing());
  }, []);

  const data = useSelector(state => {
    return state?.products.products;
  });

  useEffect(() => {
    const initialSate = data.slice(0, numberOfElements);
    setPageData(initialSate);
  }, [data]);

  const selectedData = (event, value) => {
    const result = data.slice(
      (value - 1) * numberOfElements,
      value * numberOfElements
    );
    setPageData(result);
    setPage(value);
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

  const handleSort = e => {
    const sortOption = e.target.value;
    setSort(sortOption);
    dispatch(startGetProducts(sortOption));
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
              label="sort"
              fullWidth
              value={sort}
              onChange={handleSort}
            >
              {sortValues.map((el, index) => (
                <MenuItem key={index} value={el}>
                  {el}
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
              count={Math.ceil(data.length / numberOfElements)}
              page={page}
              defaultValue={1}
              onChange={selectedData}
            />
          </Container>
          <ProjectFooter />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default UserLandingPage;
