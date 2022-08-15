import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@mui/material/colors";
import { IconButton, Grid, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from "react-router-dom";
import { Anchorme } from "react-anchorme";

import DeleteModal from "./DeleteModal";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: "relative",
        padding: "8px",
    },
    paper: {
        padding: "10px",
        "&:hover": {
            backgroundColor: "#F3F3FA",
        },
    },
    avatar: {
        display: "inline-block",
        verticalAlign: "top",
    },
    chat: {
        display: "inline-block",
        paddingLeft: "1rem",
        width: "calc(100% - 50px)",
        wordBreak: "break-all",
    },
    chatHeading: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        display: "inline-block",
        fontSize: "1rem",
        fontWeight: "600",
        color: "blue",
    },
    chatTimming: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        display: "inline-block",
        paddingLeft: "0.5em",
        color: "black",
    },
    chatText: {
        color: "#060606",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: "#F3F3FA",
    },
    emojiDiv: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    emojiDivInner: {
        position: "absolute",
        right: 0,
        padding: "0 35px 0 32px",
    },
    emojiBtn: {
        fontSize: "1.1rem",
        color: "rgb(255 195 54)",
    },
    allEmoji: {
        backgroundColor: "#2d2e31ba",
        borderRadius: "5px",
        paddingLeft: "2px",
        paddingRight: "2px",
        display: "flex",
    },
    countEmojiBtn: {
        padding: "3px",
        borderRadius: "4px",
        fontSize: "0.8em",
        backgroundColor: "#ffffff4a",
        color: "#cacaca",
        paddingLeft: "5px",
        paddingRight: "5px",
        "&:hover": {
            backgroundColor: "#ffffff4a",
            color: "#e7e7e7",
        },
    },
}));

function Messages({ values, msgId }) {
    const [style, setStyle] = useState({ display: "none" });
    const [deleteModal, setDeleteModal] = useState(false);
    const classes = useStyles();

    //const uid = JSON.parse(localStorage.getItem("userDetails")).uid;
    const uid = '1';
    // const messegerUid = values.uid;
    const messegerUid = '1';
    const date = values.timestamp;
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${day}/${month + 1}/${year}   ${hour}:${minute}`;

    const numLikes = values.likeCount;
    const numFire = values.fireCount;
    const numHeart = values.heartCount;

    const userLiked = values.likes[uid];
    const userFire = values.fire[uid];
    const userHeart = values.heart[uid];

    const postImg = values.postImg;

    // const channelId = useParams().id;

    const selectedLike = userLiked
        ? { color: "#8ff879", backgroundColor: "#545454" }
        : null;

    const selectedHeart = userHeart
        ? { color: "#ff527d", backgroundColor: "#545454" }
        : null;

    const selectedFire = userFire
        ? { color: "#ffc336", backgroundColor: "#545454" }
        : null;

    const showDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const heartClick = () => {
        
    };

    const fireClick = () => {
        
    };

    const likeClick = () => {
        
    };

    const deleteMsg = (id) => {
        
    };

    return (
        <Grid item xs={12} className={classes.root}>
            {deleteModal ? (
                <DeleteModal
                    msgId={msgId}
                    text={values.text}
                    postImg={postImg}
                    deleteMsg={deleteMsg}
                    handleModal={showDeleteModal}
                />
            ) : null}
            <div
                className={classes.paper}
                onMouseEnter={(e) => {
                    setStyle({ display: "block" });
                }}
                onMouseLeave={(e) => {
                    setStyle({ display: "none" });
                }}
            >
                <div className={classes.avatar}>
                    <Avatar
                        alt={values.userName}
                        src={values.userImg}
                        className={classes.purple}
                    />
                </div>

                <div className={classes.chat}>
                    <div>
                        <h6 className={classes.chatHeading}>{values.userName}</h6>
                        <p className={classes.chatTimming}>{time}</p>
                    </div>

                    <div className={classes.chatText}>
                        {values.text.split("\n").map((txt, idx) => (
                            <div key={idx}>
                                <Anchorme target="_blank" rel="noreferrer noopener">
                                {txt}
                                </Anchorme>
                            </div>
                        ))}
                    </div>

                    <Grid item xs={12} md={12} style={{ paddingTop: "5px" }}>
                        {postImg ? (
                        <img
                            src={postImg}
                            alt="user"
                            style={{ height: "30vh", width: "auto", borderRadius: "4px" }}
                        />
                        ) : null}
                    </Grid>

                    <div style={{ paddingTop: "5px", display: "flex" }}>
                        {numLikes > 0 ? (
                            <div style={{ padding: "3px" }}>
                                <IconButton
                                    component="span"
                                    onClick={likeClick}
                                    className={classes.countEmojiBtn}
                                    style={selectedLike}
                                >
                                    <ThumbUpIcon />
                                    <div style={{ paddingLeft: "2px" }}>{numLikes}</div>
                                </IconButton>
                            </div>
                        ) : null}

                        {numFire > 0 ? (
                            <div style={{ padding: "3px" }}>
                                <IconButton
                                    component="span"
                                    onClick={fireClick}
                                    className={classes.countEmojiBtn}
                                    style={selectedFire}
                                >
                                    <LocalFireDepartmentIcon />
                                    <div style={{ paddingLeft: "2px" }}>{numFire}</div>
                                </IconButton>
                            </div>
                        ) : null}

                        {numHeart > 0 ? (
                            <div style={{ padding: "3px" }}>
                                <IconButton
                                    component="span"
                                    onClick={heartClick}
                                    className={classes.countEmojiBtn}
                                    style={selectedHeart}
                                >
                                    <FavoriteIcon />
                                    <div style={{ paddingLeft: "2px" }}>{numHeart}</div>
                                </IconButton>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className={classes.emojiDiv} style={style}>
                    <div className={classes.emojiDivInner}>
                        <div className={classes.allEmoji}>
                            <IconButton
                                component="span"
                                style={{ padding: "4px" }}
                                onClick={likeClick}
                            >
                                <ThumbUpIcon className={classes.emojiBtn} />
                            </IconButton>
                            <IconButton
                                component="span"
                                style={{ padding: "4px" }}
                                onClick={fireClick}
                            >
                                <LocalFireDepartmentIcon className={classes.emojiBtn} />
                            </IconButton>
                            <IconButton
                                component="span"
                                style={{ padding: "4px" }}
                                onClick={heartClick}
                            >
                                <FavoriteIcon className={classes.emojiBtn} />
                            </IconButton>
                            {uid === messegerUid ? (
                                <IconButton
                                    component="span"
                                    style={{ padding: "4px" }}
                                    onClick={showDeleteModal}
                                >
                                    <DeleteIcon
                                        className={classes.emojiBtn}
                                        color="#c3c3c3f0"
                                    />
                                </IconButton>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
    );
}

export default Messages;