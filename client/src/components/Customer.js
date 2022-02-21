import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
const Customer = (props) => {
  return (
    <TableRow key={props.id}>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        <img src={props.image} />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.birthday}</TableCell>
      <TableCell>{props.gender}</TableCell>
      <TableCell>{props.job}</TableCell>
    </TableRow>
  );
};
export default Customer;
