import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const ConversationList = (props) => {
  let history = useHistory();

  function handleClick(conversation) {
    let id = conversation._id;
    let url = `/conversation/${id}`;
    history.push(`/conversation/${id}`);
    axios
      .get(url)
      .then((response) => {
        console.log("Response: " + response);
        props.updateConversation(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function handleDelete(conversation) {
    let url = "/conversations";
    axios
      .delete(url, { data: { id: conversation._id } })
      .then((response) => {
        console.log("Response: " + response);
        props.updateState();
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }
  console.log("props");
  console.log(props);
  return (
    <div style={{ textAlign: "center", marginTop:'50px' }}>
      <h4>Conversations</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Text</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.conversations.conversations?.map((conversation, index) => (
              <TableRow
                key={conversation._id}
                onClick={handleClick(conversation)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {conversation.text}
                </TableCell>
                <TableCell component="th" scope="row">
                  {conversation.author}
                </TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ mr: 1 }}
                    style={{
                      backgroundColor: "ghostwhite",
                    }}
                    variant="contained"
                    onClick={handleDelete(props, conversation)}
                  >
                    <EditIcon color="primary" />
                  </Button>

                  <Button
                    sx={{ mr: 1 }}
                    style={{
                      backgroundColor: "ghostwhite",
                    }}
                    variant="contained"
                    onClick={handleDelete(props, conversation)}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConversationList;
