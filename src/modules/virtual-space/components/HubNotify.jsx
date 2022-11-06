import React from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";


export default function HubNotify() {
    const [connection, setConnection] = React.useState(null);

    React.useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl("https://localhost:7115/notification", {
                accessTokenFactory: () =>
                    window.localStorage.getItem('jwt_token')
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
                    connection.on("receiveMessage", (message) => {
                        console.log({ message })
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    return (
        <>
        </>
    );

}