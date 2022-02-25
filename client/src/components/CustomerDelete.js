import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function CustomerDelete(props) {
  const [info, setInfo] = useState([
    {
      open: false,
    },
  ]);
  const handleClickOpen = () => {
    setInfo({
      open: true,
    });
    console.log(info.open + "인포");
  };

  const handleClose = () => {
    setInfo({
      open: false,
    });
  };

  const deleteCustomer = (id) => {
    const url = "./api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then(props.stateRefresh())
      .catch((err) => console.log(err));
    console.log(id);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={(e) => {
          handleClickOpen();
        }}
      >
        삭제
      </Button>
      <Dialog open={info.open} onClose={handleClose}>
        {" "}
        <DialogTitle onClose={handleClose}>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => deleteCustomer(props.id)}
          >
            삭제
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerDelete;
