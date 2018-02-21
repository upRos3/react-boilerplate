import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.websocket = new WebSocket("ws://localhost:3001");

    this.state = {
      currentUser: "Someone",
      messages: []
    };
  }

  componentWillMount() {
    console.log("Messages will be mounted");
    // this.setState({
    //   messages: [
    //     {
    //       key: 0,
    //       username: "Bob",
    //       content: "Has anyone seen my marbles?"
    //     },
    //     {
    //       key: 1,
    //       username: "Anonymous",
    //       content:
    //         "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    //     }
    //   ]
    // });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.websocket.onopen = event => {
      console.log("WebSocket connected!");
      //   let msg = {
      //     type: "message",
      //     currentUser: this.state.currentUser,
      //     text: "testing",
      //     key: this.state.messages[0].content
      //   };
      //   this.websocket.send(JSON.stringify(msg));
    };
  }

  bringMessage = (content, username) => {
    const newMessage = {
      type: "message",
      username: username,
      content: content
    };
    let messages = this.state.messages;
    messages.push(newMessage);
    this.setState({ messages: messages });
    this.websocket.send(JSON.stringify(newMessage));
  };

  render() {
    console.log("Rendering <App/>");

    const currentUser = this.state.currentUser;
    const messages = this.state.messages;

    return (
      <div>
        <Message messages={messages} />
        <ChatBar bringMessage={this.bringMessage} currentUser={currentUser} />
      </div>
    );
  }
}
export default App;
