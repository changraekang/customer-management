import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
  formControl: {
    minWidth: 200,
  },
});

function CustomerAdd(props) {
  const [info, setInfo] = useState([
    {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    },
  ]);
  const { file, userName, birthday, gender, job, fileName } = info;

  function addCustomer() {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", info.file);
    formData.append("name", info.userName);
    formData.append("birthday", info.birthday);
    formData.append("gender", info.gender);
    formData.append("job", info.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    addCustomer()
      .then((response) => {
        console.log(response.data);
        props.stateRefresh();
      })
      .catch((err) => console.log(err));
    setInfo({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });

    console.log("하이" + fileName);
  }

  function handleFileChange(e) {
    const { name, value } = e.target;
    let newInfo = [{ ...info }];
    newInfo = { ...info, file: e.target.files[0], fileName: e.target.value };
    setInfo(newInfo);
    console.log("name");
    console.log(name);
    console.log("value");

    console.log(value);
    console.log("new");
    console.log(newInfo);
    console.log("타겟");
    console.log(e.target.files[0]);
    console.log("info");
    console.log(info);
  }

  function handleValueChange(e) {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
    console.log(info);
  }

  const handleClickOpen = () => {
    setInfo({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: true,
    });
    console.log(info.open + "인포");
  };

  const handleClose = () => {
    setInfo({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  const { classes } = props;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={info.open} onClose={handleClose}>
        <DialogTitle>고객추가</DialogTitle>
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <br />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {info.fileName === "" ? "고객 프로필 추가" : info.fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleValueChange}
          />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-standard-label">성별</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="gender"
              value={gender}
              onChange={handleValueChange}
              label="gender"
              minWidth="300px"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      {/* <form onSubmit={handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지 :{" "}
        <input
          type="file"
          name="file"
          file={file}
          value={fileName}
          onChange={handleFileChange}
        />
        <br />
        이름 :{" "}
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleValueChange}
        />
        <br />
        생년월일 :{" "}
        <input
          type="text"
          name="birthday"
          value={birthday}
          onChange={handleValueChange}
        />
        <br />
        성별 :{" "}
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={handleValueChange}
        />
        <br />
        직업 :{" "}
        <input
          type="text"
          name="job"
          value={job}
          onChange={handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form> */}
    </div>
    /*
     */
  );
}

export default withStyles(styles)(CustomerAdd);
