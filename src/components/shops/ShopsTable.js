import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ShopsTable() {
  const navigate = useNavigate();
  const rows = useSelector(state => {
    return state.shops.shopsList;
  });
  const handleClick = id => {
    navigate(`/shop/${id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Shop Name</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Alternate Contact</TableCell>
            <TableCell>Gst Number</TableCell>
            <TableCell>Show Details</TableCell>
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
                  <Button
                    onClick={() => {
                      handleClick(_id);
                    }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
