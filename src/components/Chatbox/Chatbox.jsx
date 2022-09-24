import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import { Box, Card, CardHeader, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// data channels
const channels = [
    {
        "name": "Dev",
        "id" : "1"
    },
    {
        "name": "Tester",
        "id" : "2"
    },
    {
        "name": "QA",
        "id" : "3"
    },
    {
        "name": "QC",
        "id" : "4"
    }
];
// data messages
const messages = [
    {
        "text": "hello dhie dakdi dakldm,c oadija dandfljaweif adsnfkadnofiasd fadads mfaosiefj dfnkasdnfoaidf",
        "id" : "1"
    },
    {
        "text": "hi ddd ssss ffff aaa ddd ss dd ss ddd sdsa a dad",
        "id" : "2"
    },
    {
        "text": "bye dda dasds ddasd d adsdasd dfsdfas dasdafsd dasdfsdf",
        "id" : "3"
    },
    {
        "text": "bb dasdfa dsfasd dasdfasdf asdfasdf asdfasdf asdf asdf asdf asdfasdf asdafasdf asdfasdf asdfa s fasdf asdf sd",
        "id" : "4"
    },
];
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

const Chatbox = (props) => {
    const [activeChannel, setActiveChannel] = useState({});
    const [open, setOpen] = useState(false);
    const [isChannels, setIsChannels] = useState(true);
    const [state, setState] = useState({
        failed: false,
        helpText: props.helpText,
        // List of Online users
        onlineUsers: [],
        channels: channels,
        messages: messages,
        // keep track of user threads for messaging in singleUserMode
        userThreadTss: [],
        postMyMessage: '',
        postMyFile: '',
        chatbox: {
            active: false,
            channelActiveView: false,
            chatActiveView: false,
        },
        fileUploadLoader: false,
    });
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setOpen);

    const goToChannelView = () => {
        console.log('back to channel');
        setIsChannels(true);
    }

    const goToChatView = (e, channel) => {
        console.log('go to chat');
        setIsChannels(false);
        setActiveChannel(channel);
    }

    const displayFormattedMessage = (message) => {
        var mentioned = false;
        const messageText = message.text;
        var myMessage = false;
        return (
            <div
                className={myMessage ? "chat__msgRow mine" : "chat__msgRow notMine"}
                key={message.id}
            >
                {myMessage ? (
                    // show customer image
                    <img
                        src={props.userImage}
                        className="user__contact__photo"
                        alt="userIcon"
                    />
                ) : null}
                <div
                    className={mentioned ? "chat__message mentioned" : "chat__message"}
                >
                    {messageText}
                </div>
            </div>
        )
    }

    const handleChange = (e) => {
        setState({
            ...state,
            postMyMessage: e.target.value,
        });
        return;
    }

    const postMyMessage = () => {
        console.log('post message');
    }

    const boxChannels = () => {
        return (
            <Card>
                <CardHeader 
                    className="headerText"
                    title="ChatBox"
                >
                </CardHeader>
                <CardContent className="card__content">
                    {state.channels.map((channel) => (
                        <div
                            className="contact"
                            key={channel.id}
                            onClick={(e) => goToChatView(e, channel)}
                        >
                            <TagIcon />
                            <span className="contact__name">{channel.name}</span>
                            <span
                                className="contact__status online"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    const boxMessages = () => {
        return (
            <Card>
                <CardHeader 
                    className="headerText transition"
                    title={<Typography variant='h5'>
                        {activeChannel.name}
                        <span
                            className="contact__status online"
                        />
                    </Typography>}
                    avatar={
                        <IconButton aria-label="Back" 
                            onClick={() => goToChannelView()}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    }
                >
                </CardHeader>
                <CardContent className="card__content">
                    <div className="chat__messages">
                        {state.messages.map((message) =>
                            displayFormattedMessage(message)
                        )}
                    </div>
                    <div className={open ? "input__message" : "hidden__input"}>
                        {state.fileUploadLoader ? (
                            <div className="chat__file__uploading">
                            <span className="loading">Uploading</span>
                            </div>
                        ) : null}
                        {!state.fileUploadLoader ? (
                            <div >
                                <div>
                                    <AttachFileIcon className="attachmentIcon">
                                    <input
                                        type="file"
                                        id="chat__upload"
                                        className="chat__upload"
                                        value={state.postMyFile}
                                        onChange={(e) => this.handleFileChange(e)}
                                    />
                                    </AttachFileIcon>
                                </div>
                                <input
                                    type="text"
                                    id="chat__input__text"
                                    className={"chat__input"}
                                    value={state.postMyMessage}
                                    placeholder="Enter your message..."
                                    onKeyPress={(e) =>
                                        e.key === 'Enter' ? postMyMessage() : null
                                    }
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        ) : null}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Box className={open ? "chatActive transition" : "chat transition"}
                onClick={() => setOpen(true)}
                ref={wrapperRef}
            >
                {isChannels ? boxChannels() : boxMessages()}
            </Box>
        </>
    );
}

export default Chatbox;