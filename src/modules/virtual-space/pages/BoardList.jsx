
import React, { Fragment } from "react";
import { Box } from "@mui/material"
import { useNavigate } from "react-router";
import SearchField from "../../../components/DataGrid/SearchField";
import DataGrid from "../../../components/DataGrid/DataGrid";
import DataGridLayout from "../../../layouts/DataGridLayout";
import MenuButton from "../../../components/DataGrid/MenuButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import InfoDialog from "../../../components/Dialog/InfoDialog";
import BoardCreate from "./BoardCreate";
import BoardEdit from "./BoardEdit";

import { useFetchTaskBoardListOfUser, useDeleteTaskBoard } from "../../../client/taskboardService";
import { getCurrentUserId } from "../../../client/autheticationService";

const getColumnConfig = (openEditCb, openDeleteCb, openDetailCb) => [
    {
        field: "id",
        width: 150
    },
    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 250,
    },

    {
        field: "teamName",
        headerName: "Team",
        width: 250,
    },

    {
        field: "action",
        headerName: "Thao tác",
        width: 250,
        renderCell: ({ id }) => {
            return <Box sx={{ display: 'flex', gap: 1 }}>
                <ActionButton onClick={() => openEditCb(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => openDetailCb(id)}>
                    Detail
                </ActionButton>
                <ActionButton onClick={() => openDeleteCb(id)}>
                    Delete
                </ActionButton>
            </Box>
        }
    }
];


const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function BoardList() {
    const navigate = useNavigate();
    const [boardId, setBoardId] = React.useState(null);

    const [isCreateBoardOpen, setIsCreateBoardOpen] = React.useState(false);
    const [isEditBoardOpen, setIsEditBoardOpen] = React.useState(false);
    const [isDeleteBoardOpen, setIsDeleteBoardOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteTaskBoard,
    } = useDeleteTaskBoard();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchTaskBoardListOfUser,
    } = useFetchTaskBoardListOfUser();

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchTaskBoardListOfUser(getCurrentUserId());
        }
        if (isDeleteError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra. Không thể xóa được item'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isDeleteSuccess, isDeleteError])

    React.useEffect(() => {
        fetchTaskBoardListOfUser(getCurrentUserId());
    }, [])

    React.useEffect(() => {
        if (isError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra từ server, xin vui lòng load lại trang hoặc đăng nhập với quyền cao hơn'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isError]);

    return <Fragment>
        {isCreateBoardOpen && <BoardCreate
            closeDialogCb={
                () => setIsCreateBoardOpen(false)}
            createSuccessCb={() => {
                setIsCreateBoardOpen(false);
                fetchTaskBoardListOfUser(getCurrentUserId())
            }} />}
        {isEditBoardOpen &&
            <BoardEdit closeDialogCb={
                () => setIsEditBoardOpen(false)}
                boardId={boardId} />}

        {isDeleteBoardOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa chức vụ này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setBoardId(null);
                        setIsDeleteBoardOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setIsDeleteBoardOpen(false);
                        setBoardId(null);
                        deleteTaskBoard(boardId);
                    }
                }}
            />}


        {isInfoDialogOpen && <InfoDialog
            title={infoDialogMessage.title}
            message={infoDialogMessage.message}
            closeDialogCb={() => {
                setIsInfoDialogOpen(false);
                resetDialogState();
            }}
        />}

        <DataGridLayout
            title={"Bảng công việc của tôi"}
            datagridSection={
                <DataGrid
                    rows={response?.data ?? []}
                    rowCount={response?.total ?? 0}
                    columns={getColumnConfig(
                        (id) => {
                            setBoardId(id);
                            setIsEditBoardOpen(true);
                        },
                        (id) => {
                            setBoardId(id);
                            setIsDeleteBoardOpen(true);
                        },
                        
                        (id) => {
                            navigate(`${id}`);
                        }
                    )
                    }
                    isError={isError}
                    isLoading={isPending}
                    isSuccess={isSuccess}
                />
            }
            primaryButtonSection={
                <MenuButton
                    text={"Thao tác"}
                    menu={
                        [
                            {
                                text: "Tạo mới Board",
                                handler: () => {
                                    setIsCreateBoardOpen(true);
                                }
                            },
                        ]
                    }
                />
            }
            searchButtonSection={<MenuButton
                text={"Liên kết liên quan"}
                menu={
                    [
                        {
                            text: "Danh sách nhóm", handler: () => {
                                navigate("/group");
                            }
                        },
                    ]
                }
                color="info"
                variant="outlined"
            />}
            searchSection={<SearchField />}
        />
    </Fragment>
}