import Customer from "./components/Customer";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minwidth: 1000,
  },
});

function App() {
  const [customers, setCustomers] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(async () => {
    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 20);
    const result = await axios.get("./api/customers");
    setCustomers(result.data);
  }, []);

  const stateRefresh = async () => {
    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 20);
    const result = await axios.get("./api/customers");
    setCustomers(result.data);
  };

  return (
    <Paper className={styles.root}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers != 0 ? (
            customers.map((c) => {
              return (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.NAME}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                  stateRefresh={stateRefresh}
                />
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress
                  className={progress}
                  variant="determinate"
                  value={progress}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
