import React from "react";

import { useNavigate } from "react-router";
import { Typography, Box } from "@mui/material";
import ActionButton from "../../../components/DataGrid/ActionButton";
import DataGrid from "../../../components/DataGrid";
import TaskDetailFileCreate from "./TaskDetailFileCreate";
import TaskDetailFileEdit from "./TaskDetailFileEdit";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";

import { downloadFile, useCreateTaskFile, useDeleteTaskFile } from "../../../client/taskFileService";
import { useFetchTaskFilesOfTask } from "../../../client/taskService";

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

const getColumnConfig = (openEditRoleCb, openDeleteRoleCb, downloadCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },
    {
        field: "displayName",
        headerName: "Tên file",
        width: 250,
    },
    {
        field: "path",
        headerName: "Link",
        width: 350,
    },
    {
        field: "action",
        headerName: "Thao tác",
        width: 270,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => downloadCb(id)}>
                    Download
                </ActionButton>
                <ActionButton onClick={() => openEditRoleCb(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => openDeleteRoleCb(id)}>
                    Delete
                </ActionButton>
            </Box >
        }

    }
]

export default function TaskDetailFile({ taskId, taskFiles }) {
    const navigate = useNavigate();

    const [fileId, setFileId] = React.useState(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        isPending: isDeletePending,
        method: deleteTaskFile,
    } = useDeleteTaskFile();

    const {
        isPending: isCreatePending,
        isSuccess: isCreateSuccess,
        isError: isCreateError,
        method: createTaskFile
    } = useCreateTaskFile();

    const {
        isPending: isFetchListPending,
        isSuccess: isFetchListSuccess,
        isError: isFetchListError,
        method: fetchList,
        data: fetchedList,
    } = useFetchTaskFilesOfTask();

    React.useEffect(() => {
        fetchList(taskId);
    }, [])

    React.useEffect(() => {
        if (isFetchListError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra từ server, xin vui lòng load lại trang hoặc đăng nhập với quyền cao hơn'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isFetchListError]);

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchList(taskId);
        }
        if (isDeleteError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra. Không thể xóa được item'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isDeleteSuccess, isDeleteError])


    return <Box>
        {isCreateOpen && <TaskDetailFileCreate reload={fetchList} taskId={taskId} closeDialogCb={
            () => setIsCreateOpen(false)} />}

        {isEditOpen && <TaskDetailFileEdit reload={fetchList} taskId={taskId} fileId={fileId} closeDialogCb={
            () => setIsEditOpen(false)} />}


        {isDeleteOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa file này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setFileId(null);
                        setIsDeleteOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setFileId(null);
                        setIsDeleteOpen(false);
                        deleteTaskFile(fileId);
                    }
                }}
            />}

        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Typography sx={{fontWeight: 'bold'}}>{"Danh sách file"}</Typography>
            <ActionButton onClick={() => setIsCreateOpen(true)}>
                Thêm file
            </ActionButton>
        </Box>

        <Box sx={{ padding: 2 }}>
            <DataGrid
                rows={fetchedList?.data ?? []}
                rowCount={fetchList?.total ?? 0}
                columns={getColumnConfig(
                    (id) => {
                        setFileId(id)
                        setIsEditOpen(true);
                    },
                    (id) => {
                        setFileId(id);
                        setIsDeleteOpen(true);
                    },
                    (id) => {
                        downloadFile(id);
                    }
                )}
                isLoading={isFetchListPending}
                isError={isFetchListError}
                isSuccess={isFetchListSuccess}
            />
        </Box>
    </Box>;
}

