import React, { useEffect, useState } from "react";
import { IconButton, TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import TagIcon from '@mui/icons-material/Tag';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import Picker from 'emoji-picker-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import Messages from "./Messages";
import FileUpload from "./FileUpload";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    chat: {
        position: "relative",
        height: "calc(100vh - 200px)",
        paddingLeft: "10px",
        paddingBottom: "5px",
        paddingTop: "5px",
    },
    footer: {
        paddingRight: "15px",
        paddingLeft: "15px",
        paddingTop: "10px",
    },
    message: {
        width: "100%",
        color: "white",
    },
    roomName: {
        border: "1px solid #0000004a",
        borderLeft: 0,
        borderRight: 0,
        padding: "15px",
        display: "flex",
        color: "#000000",
    },
    roomNameText: {
        marginBlockEnd: 0,
        marginBlockStart: 0,
        paddingLeft: "5px",
    },
    iconDesign: {
        fontSize: "1.5em",
        color: "#040405",
    },
    footerContent: {
        display: "flex",
        backgroundColor: "#FAF8F7",
        borderRadius: "5px",
        alignItems: "center",
    },
    inputFile: {
        display: "none",
    },
    styleEmoji: {
        position: "absolute",
        bottom: "54px",
        left: "0px",
        right: "0px",
    }
}));

function Chat() {
    const classes = useStyles();
    const params = useParams();
    const [allMessages, setAllMessages] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [userNewMsg, setUserNewMsg] = useState("");
    const [emojiBtn, setEmojiBtn] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [file, setFileName] = useState(null);

    useEffect(() => {
        setChannelName('hello');
    }, [params]);

    const sendMsg = (e) => {
        e.preventDefault();
        const displayName = 'phuong';
        const imgUrl = '';
        const uid = '';
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const postImg = null;
        const obj = {
            text: userNewMsg,
            timestamp: new Date(),
            userImg: imgUrl,
            userName: displayName,
            uid: uid,
            likeCount: likeCount,
            likes: likes,
            fireCount: fireCount,
            fire: fire,
            heartCount: heartCount,
            heart: heart,
            postImg: postImg,
        };
        setAllMessages([{data: obj, id: 1}]);
        setUserNewMsg("");
        setEmojiBtn(false);
    };

    const addEmoji = (e) => {
        setUserNewMsg(userNewMsg + e.native);
    };

    const openModal = () => {
        setModalState(!modalState);
    };

    const handelFileUpload = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setFileName(e.target.files[0]);
            openModal();
        }
        e.target.value = null;
    };

    return (
        <div className={classes.root}>
            <Grid item xs={12} className={classes.roomName}>
                <TagIcon className={classes.iconDesign} />
                    <h3 className={classes.roomNameText}>{channelName}</h3>
            </Grid>
            <Grid item xs={12} className={classes.chat}>
                <ScrollableFeed>
                    {allMessages.map((message) => (
                        <Messages
                            key={message.id}
                            values={message.data}
                            msgId={message.id}
                        />
                    ))}
                </ScrollableFeed>
            </Grid>
            <div className={classes.footer}>
                <Grid item xs={12} className={classes.footerContent}>
                    <input
                        accept="image/*"
                        className={classes.inputFile}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => handelFileUpload(e)}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            style={{ color: "#1FDD1F", 
                                    border: "1px black solid", }}
                        >
                            <AddPhotoAlternateIcon />
                        </IconButton>
                    </label>
                    <Box sx={{ position: 'relative' }}>
                        {emojiBtn ? 
                            <div className={classes.styleEmoji}>
                                <Picker data={data} onEmojiSelect={addEmoji} /> 
                            </div>
                        : null}

                        <IconButton
                            color="primary"
                            component="button"
                            onClick={() => setEmojiBtn(!emojiBtn)}
                            style={{ color: "#EFEF19", 
                                    border: "1px black solid" }}
                        >
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        {/* {emojiBtn ? <Picker onEmojiClick={addEmoji} /> : null} */}
                        
                    </Box>
                    <form
                        autoComplete="off"
                        style={{ width: "100%", display: "flex" }}
                        onSubmit={(e) => sendMsg(e)}
                    >
                        <TextField
                            className={classes.message}
                            required
                            id="outlined-basic"
                            label="Enter Message"
                            variant="outlined"
                            multiline
                            rows={1}
                            rowsMax={5}
                            value={userNewMsg}
                            onChange={(e) => {
                                setUserNewMsg(e.target.value);
                            }}
                        />
                        <IconButton type="submit" component="button"
                            style={{ color: "#0B21FA" }}>
                            <SendIcon />
                        </IconButton>
                    </form>
                </Grid>
            </div>
        </div>
    );
}

export default Chat;