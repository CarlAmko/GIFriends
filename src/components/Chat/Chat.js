import React from "react";
import socket from "../../socket";
const uuid = require('uuid/v1');

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'carl',
            message: '',
            messages: []
        };

        socket.on('NEW_CHAT_MESSAGE', (msg) => {
            this.onMessage(msg);
        });
    }
    
    onMessage = (msg) => {
        console.log(msg);
        this.setState({messages: [...this.state.messages, msg]});
        console.log(this.state.messages);
    }

    sendMessage = (event) => {
        event.preventDefault();
        socket.emit('NEW_CHAT_MESSAGE', {
            id: uuid(),
            author: this.state.username,
            message: this.state.message
        });

        this.setState({message: ''});
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="messages">
                            {this.state.messages.map(message => {
                                return (
                                    <div key={message.id}>{message.author}: {message.message}</div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="card-footer">
                        <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                        <br/>
                        <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                        <br/>
                        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                    </div>
                </div>
            </div>
        );
    }
}