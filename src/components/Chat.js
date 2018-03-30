import React from "react";
import io from "socket.io-client";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'carl',
            message: '',
            messages: []
        }

        this.socket = io('localhost:8080')

        this.socket.on('NEW_CHAT_MESSAGE', (msg) => {
            this.onMessage(msg);
        });
    }
    
    onMessage = (msg) => {
        console.log(msg);
    }

    sendMessage = (event) => {
        event.preventDefault();
        this.socket.emit('NEW_CHAT_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        });
    }

    render() {
        return (
            <div className="container border">
                <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
            </div>
        );
    }
}