import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Grid from "@mui/material/Grid";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  BrowserRouter,
} from "react-router-dom";import ConversationForm from './ConversationForm';
import { BASE_URL } from "./index";
import ConversationList from './ConversationList';

function App() {
const [conversations, setconversations] = useState([]);
const [conversation, setconversation] = useState({})

 const updateState = () => {
    axios.get(BASE_URL + '/conversations')
      .then((res) => {
        setconversations({conversations:res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateConversation = (conversation) => {
    setconversation({conversation: conversation})
  };

  const handleTextChange = (value) => {
    setconversation({conversation: {text: value}})
    // console.log(this.state.conversation.text);
  };
useEffect(() => {
  updateState()
}, []);
  return (
    <div>
    <BrowserRouter>
    <div className="container-fluid">
         <h1 style={{textAlign:'center',backgroundColor: 'gray'}}>Collaborative Editing System</h1>
         <Grid
      item
      container
      sm={12}
      xl={12}
      md={12}
      lg={12}
    >
      <Grid  sm={12}
      xl={12}
      md={12}
      lg={12}
       item>
              <ConversationForm conversation={conversation} onTextChange={handleTextChange}/>
              </Grid>
<Grid  sm={12}
      xl={12}
      md={12}
      lg={12} item style={{marginTop:'400px'}}>
         <ConversationList conversations={conversations} updateState={updateState} updateConversation={updateConversation}/></Grid>
</Grid>
       </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
