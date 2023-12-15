import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  startShopDelete,
  startShopsListing,
} from "../../actions/shops-actions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Spinner from "../spinner/Spinner";
import { useEffect } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import team from "../../assets/shop.svg";
import styles from "./ShopsTable.module.css";

export default function ShopsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(startShopsListing());
  }, []);
  const rows = useSelector(state => {
    return state.shops.shopsList;
  });
  const handleUpdate = id => {
    navigate(`/shop/${id}`);
  };
  const handleDelete = id => {
    const userResponse = confirm("Are you sure?");
    if (userResponse) {
      dispatch(startShopDelete(id));
      deletion();
    }
  };
  const deletion = () => {
    toast.success("Shop deleted Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      {rows.length > 0 ? (
        <TableContainer component={Paper} elevation={2}>
          <img src={team} alt="collection" className={styles.tablePic} />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Shop Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Alternate Contact</TableCell>
                <TableCell>Gst Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map(
                ({
                  _id,
                  shopName,
                  ownerFirstName,
                  ownerLastName,
                  contact,
                  gstNo,
                  alternateContact,
                }) => (
                  <TableRow
                    key={_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {_id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {shopName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {`${ownerFirstName} ${ownerLastName}`}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {contact}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {alternateContact}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {gstNo}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="Edit Shop">
                          <IconButton
                            aria-label="edit"
                            onClick={e => {
                              handleUpdate(_id);
                            }}
                          >
                            <EditOutlinedIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove Shop">
                          <IconButton
                            aria-label="delete"
                            onClick={e => handleDelete(_id)}
                          >
                            <DeleteForeverOutlinedIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Spinner />
      )}
    </>
  );
}
