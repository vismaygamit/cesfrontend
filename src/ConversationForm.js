import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/core/TextareaAutosize";

const ConversationForm = (props) => {
  const [author, setauthor] = useState("");
  const [text, settext] = useState("");
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    var originalText = props.conversation;
    var newText = e.target.conversationText.value;
    console.log(originalText, newText);
    // const url = '/mutations'
    const url = BASE_URL + "/mutations";
    const form = {
      // "index": 15,
      text: e.target.conversationText.value,
      author: author,
    };
    console.log(form);

    axios
      .post(url, form, config)
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const handleChangeInput = (e) => {
    setauthor(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeText = (e) => {
    settext(e.target.value);
    console.log(e.target.value);
  };

  const textareacontent = props.conversation.text;

  const options = ["Alice", "Bob"];
  return (
    <Grid
      item
      style={{ backgroundColor: 'gray'}}
      container
      sm={12}
      xl={12}
      md={12}
      lg={12}
    >
      <Grid item xl={4} md={4} lg={4} sm={3} xs={1}></Grid>
      <Grid
       item
        xl={4}
        md={4}
        sm={6}
        xs={10}
        justify="center"
        alignItems="center"
        lg={4}
      >
        <Card
          sm={12}
          xs={12}
          style={{ backgroundColor: "honeydew" }}
        />
        <CardContent
        sx={{ boxShadow: 3 }}
          className="centered"
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div>
            <div className="row">
              <h5 style={{textAlign:'center'}}>Mutation</h5>
              <form
                className="col s6"
                encType="multipart/form-data"
                onSubmit={handleOnSubmit}
              >
                <div className="row">
                  <div className="input-field col s6">
                    <br />
                    <TextareaAutosize
                      onChange={handleChangeText}
                      maxRows={4}
                      id="conversationText"
                      value={textareacontent}
                      aria-label="maximum height"
                      placeholder="Maximum 4 rows"
                      style={{ width: 200 }}
                    />
                  </div>
                  <div className="input-field col s6">
                    <select onChange={handleChangeInput} >
                      <option value="--Select--">--Select--</option>
                      {options?.map((val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    size="large"
                    type="submit"
                    style={{ color: "#007bff" }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Grid>
      <Grid item xl={4} md={4} lg={4} sm={3} xs={1}></Grid>
    </Grid>
  );
};

export default ConversationForm;
