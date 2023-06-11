import React from "react";
import api from "../../../../client/api";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import Dialog from "../../../../components/Dialog";
import TextField from "../../../../components/DialogForm/TextField";
import { AddComment } from "@mui/icons-material";
import { getCurrentUserId, getCurrentUserRole } from "../../../../client/autheticationService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import { grey } from "@mui/material/colors";

const useFetchIssueDetail = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [data, setData] = React.useState({});

    const method = async (issueId) => {
        try {
            setIsPending(true);
            const response = await api.get(`/api/issue/${issueId}`);

            if (!response) {
                throw response.err;
            }

            setData(response.data);
            setIsSuccess(true);
            setIsError(false);

        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }

    return {
        isSuccess, isError, isPending, method, data
    }
}

const useFetchIssueComments = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [data, setData] = React.useState({});

    const method = async (issueId) => {
        try {
            setIsPending(true);
            const response = await api.get(`/api/issue/${issueId}/comment`);

            if (!response) {
                throw response.err;
            }

            setData(response.data);
            setIsSuccess(true);
            setIsError(false);

        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }

    return {
        isSuccess, isError, isPending, method, data
    }
}

const useResolveIssue = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [data, setData] = React.useState({});

    const method = async (issueId) => {
        try {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);
            const response = await api.put(`/api/issue/${issueId}/resolution`,
                {
                    userId: getCurrentUserId()
                });

            if (!response) {
                throw response.err;
            }

            setData(response.data);
            setIsSuccess(true);
            setIsError(false);

        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }

    return {
        isSuccess, isError, isPending, method, data
    }
}

const useCreateComment = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const [data, setData] = React.useState({});

    const method = async (issueId, createData) => {
        setIsPending(false);
        setIsSuccess(false);
        setIsError(false);

        try {
            setIsPending(true);
            const response = await api.post(
                `/api/issue/${issueId}/comment`,
                createData
            );

            if (!response) {
                throw response.err;
            }

            setData(response.data);
            setIsSuccess(true);
            setIsError(false);

        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }

    return {
        isSuccess, isError, isPending, method, data
    }
}

const CreateComment = ({ value, setValue }) => {
    return <Box sx={{ width: '100%' }}>
        <TextField
            fullWidth
            id="comment"
            name="comment"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            multiline={true}
            rows={2}
        />
    </Box>
}

const Comment = ({ comment }) => {
    return <Box sx={{
        padding: '12px',
        borderBottom: `1px solid ${grey[400]}`
    }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Avatar
                src={`https://localhost:7115/api/user/${getCurrentUserId()}/avatar`}
                sx={{
                    width: '32px', height: '32px',
                    marginRight: '10px',
                    marginTop: '2px',
                }}>
            </Avatar>

            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Typography sx={{ fontSize: 15 }}>
                        {comment.userName}
                    </Typography>

                    <Typography sx={{ fontSize: 12, padding: '2px' }}>
                        {comment.createdAt ?
                            dayjs(comment.createdAt).format('HH:mm DD/MM/YYYY') : ''
                        }
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: 13, minHeight: '80px' }} >
                    {comment.content}
                </Typography>
            </Box>
        </Box>
    </Box >
}

const ResolveConfirm = ({ resolveCb, closeDialogCb }) => {
    return <Dialog
        title="Đóng phản hồi"
        primaryAction={{
            text: 'Xác nhận',
            handler: resolveCb
        }}
        secondaryAction={{
            text: 'Hủy',
            handler: closeDialogCb
        }}
    >
        Bạn có muốn đóng phản hồi này,
        phản hồi đã đóng sẽ không thể được chỉnh sửa
    </Dialog>
}

const ResolveSuccess = ({ closeDialogCb }) => {
    return <Dialog
        title={"Thành công!"}
        secondaryAction={{
            text: 'Hủy',
            handler: closeDialogCb
        }}
    >
        Phản hồi đã được đóng thành công.
    </Dialog>
}

const ResolveError = ({ closeDialogCb }) => {
    return <Dialog
        secondaryAction={{
            text: 'Hủy',
            handler: closeDialogCb
        }}
    >
        Đã có lỗi xảy ra. Đóng phản hồi thất bại
    </Dialog>
}


export default function IssueDetail({ issueId, closeDialogCb, reloadCb }) {
    const [detail, setDetail] = React.useState(null);

    const [content, setContent] = React.useState(null);
    const [comments, setComments] = React.useState([]);
    const [commentValue, setCommentValue] = React.useState('');

    const [resolveConfirmOpen, setResolveConfirmOpen] = React.useState(false);
    const [resolveSuccessOpen, setResolveSuccessOpen] = React.useState(false);
    const [resolveErrorOpen, setResolveErrorOpen] = React.useState(false);

    const [createCommentOpen, setCreateCommentOpen] = React.useState(false);

    const fetchCommentsHook = useFetchIssueComments();
    const fetchDetailHook = useFetchIssueDetail();
    const resolveIssueHook = useResolveIssue();
    const createCommentHook = useCreateComment();

    React.useEffect(
        () => {
            if (resolveIssueHook.isSuccess) {
                setResolveSuccessOpen(true);
                reloadCb();
            }
        },
        [resolveIssueHook.isSuccess]
    )

    React.useEffect(
        () => {
            if (issueId) {
                fetchDetailHook.method(issueId);
                fetchCommentsHook.method(issueId);
                reloadCb();
            }
        },
        [
            issueId,
            createCommentHook.isSuccess,
            resolveIssueHook.isSuccess
        ]
    )

    React.useEffect(
        () => {
            if (fetchCommentsHook.isSuccess) {
                setComments(fetchCommentsHook?.data.comments ?? []);
            }
        },
        [
            fetchCommentsHook.data,
            fetchCommentsHook.isSuccess
        ]
    )

    React.useEffect(
        () => {
            if (fetchDetailHook.isSuccess) {
                setDetail(fetchDetailHook.data)
                setContent(fetchDetailHook.data.content)
            }
        },
        [
            fetchDetailHook.data,
            fetchDetailHook.isSuccess,
        ]
    )

    return <Dialog
        maxWidth="800px"
        secondaryAction={{
            text: "Hủy",
            handler: closeDialogCb
        }}
        title={`Phản hồi ${detail?.name ?? ''}`}
    >
        {
            resolveConfirmOpen && <ResolveConfirm
                closeDialogCb={() => { setResolveConfirmOpen(false) }}
                resolveCb={() => {
                    if (issueId) {
                        resolveIssueHook.method(issueId)
                        setResolveConfirmOpen(false);
                    }
                }}
            />
        }

        {
            resolveSuccessOpen && <ResolveSuccess
                closeDialogCb={() => { setResolveSuccessOpen(false) }}
            />
        }

        {
            resolveErrorOpen && <ResolveError
                closeDialogCb={() => { setResolveErrorOpen(false) }}
            />
        }

        <Box sx={{
            padding: 1,
            minHeight: '150px',
            maxHeight: '300px',
            gap: '4px',
            overflowY: 'auto'
        }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">
                    Nội dung
                </Typography>


                {
                    detail?.resolved === false ?
                        (getCurrentUserRole().toLowerCase() === 'admin'
                            || getCurrentUserRole().toLowerCase() === 'manager' ?
                            <Button size="small"
                                variant="outlined"
                                disabled={detail?.resolved ?? false}
                                onClick={() => { setResolveConfirmOpen(true) }}
                            >
                                Đóng phản hồi
                            </Button> : <></>
                        ) :
                        <Typography sx={{ fontSize: 12, fontStyle: 'italic' }}>
                            Phản hồi đã đóng bởi {detail?.resolvedBy}
                        </Typography>
                }


            </Box>

            <Typography>
                {content ?? "Nội dung đang tải..."}
            </Typography>
        </Box>



        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            justifyContent: 'right',
        }}>

        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            gap: '8px',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6">
                    Comment
                </Typography>

                <IconButton onClick={() => setCreateCommentOpen(!createCommentOpen)}>
                    <AddComment size="sm" />
                </IconButton>

            </Box>
            {
                createCommentOpen &&
                <Box sx={{
                    display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start'
                }}>
                    <CreateComment value={commentValue} setValue={(value) => setCommentValue(value)} />
                    <Button size="small"
                        sx={{ position: 'relative' }}
                        variant="outlined"
                        onClick={() => {
                            if (issueId) {
                                createCommentHook.method(
                                    issueId,
                                    {
                                        userId: getCurrentUserId(),
                                        content: commentValue ?? ''
                                    },
                                    getCurrentUserId()
                                );
                            }
                        }}
                    >
                        <LoadingOverlay isLoading={createCommentHook.isPending} />
                        comment
                    </Button>
                </Box>
            }
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '300px',
                overflowY: 'auto',
                gap: '10px'
            }}>
                {
                    (!comments || comments.length === 0) &&
                    <Typography>Chưa có comment nào</Typography>
                }

                {
                    comments?.map((comment) =>
                        <Comment key={comment.id} comment={comment} />)
                }
            </Box>


        </Box>
    </Dialog>
}