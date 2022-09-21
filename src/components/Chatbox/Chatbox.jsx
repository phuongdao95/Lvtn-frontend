import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import { Box, Card, CardHeader, CardContent, Typography } from "@mui/material";

function useOutsideAlerter(ref, setOpen) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const Chatbox = () => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setOpen);

    return (
    <>
        <Box className={open ? "chatActive" : "chat"}
            onClick={() => setOpen(true)}
            ref={wrapperRef}
        >
            <Card>
                <CardHeader 
                    className="headerText"
                    title="ChatBox"
                >
                </CardHeader>
                <CardContent>
                    message
                </CardContent>
            </Card>
        </Box>
    </>
    );
}

export default Chatbox;