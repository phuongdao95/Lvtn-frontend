import React from "react";
import { Button } from "@mui/material";
import TextField from "../../../components/DialogForm/TextField";
import { HubConnectionBuilder } from "@microsoft/signalr";


export default function HubNotify() {
    const [connection, setConnection] = React.useState(null);
    const [inputText, setInputText] = React.useState("");

    React.useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl("https://localhost:7115/notification", {
                headers: {
                    authorization: 'Bearer ' + window.localStorage.getItem('jwt_token')
                }
            })
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        return () => {
            if (connection) {
                connection.stop();
            }
        }
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveMessage", (message) => {
                        console.log({ message });
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const sendMessage = async () => {
        if (connection) {
            connection.invoke("SendMessage", inputText);
        }
    };

    return (
        <>
            <TextField
                value={inputText}
                onChange={(event) => {
                    setInputText(event.target.value);
                }}
            />
            <Button onClick={sendMessage} type="primary">
                Send
            </Button>
        </>
    );

}