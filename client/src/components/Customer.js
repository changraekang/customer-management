import React from "react";
import CustomerProfile from "./CustomerProfile";
import CustomerInfo from "./CustomerInfo";
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
const Customer = () => {
  return (
    <div>
      <CustomerProfile />
      <CustomerInfo />
    </div>
  );
};

export default Customer;
