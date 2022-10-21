import React from "react";
import { Box } from "@mui/material";
import { useFetchTaskCommentsOfTask } from "../../../client/taskService";
import TaskComment from "../components/TaskComment"
import dayjs from "dayjs"
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";

export default function TaskDetailComments({ taskId }) {
    const [comments, setComments] = React.useState([]);

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

    return <Box sx={{ position: 'relative' }}>
        <LoadingOverlay isLoading={isPending} />
        {
            comments.map((comment) =>
                <TaskComment
                    keye={comment.id}
                    avatar={comment.avatar}
                    name={comment.userName}
                    content={JSON.parse(comment.message)}
                    datetime={comment.datetime ?? dayjs()}
                />)
        }
    </Box>
}