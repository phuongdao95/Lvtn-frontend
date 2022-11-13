import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { useFetchTaskCommentsOfTask } from "../../../client/taskService";
import TaskComment from "../components/TaskComment"
import dayjs from "dayjs"
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import CommentDialog from "../components/CommentDialog";
import TaskDetailHeader from "../components/TaskDetailHeader";
import { Button } from "@mui/material";

export default function TaskDetailComments({ taskId }) {
    const [comments, setComments] = React.useState(null);
    const [isCommentDialogOpen, setIsCommentDialogOpen] = React.useState(false);

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchComments,
        data: response
    } = useFetchTaskCommentsOfTask();

    React.useEffect(() => {
        fetchComments(taskId);
    }, [taskId])

    React.useEffect(() => {
        if (isSuccess) {
            setComments(response.data)
        }
    }, [isSuccess]);

    return <Fragment>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <TaskDetailHeader>
                Bình luận
            </TaskDetailHeader>

            <Button onClick={() => setIsCommentDialogOpen(true)}>
                Thêm bình luận
            </Button>
        </Box>

        <Box sx={{ position: 'relative' }}>
            {isCommentDialogOpen &&
                <CommentDialog taskId={taskId} reload={() => fetchComments(taskId)} closeDialogCb={
                    () => setIsCommentDialogOpen(false)} />}

            <LoadingOverlay isLoading={isPending} />
            {comments && comments.length > 0 ?
                comments.map((comment) =>
                    <TaskComment
                        key={comment.id}
                        avatar={comment.avatar}
                        name={comment.userName}
                        content={JSON.parse(comment.message)}
                        datetime={comment.datetime ?? dayjs()}
                    />) :
                <Typography fontStyle={"italic"}>
                    Chưa có bình luận nào.
                </Typography>
            }
        </Box >
    </Fragment>
}