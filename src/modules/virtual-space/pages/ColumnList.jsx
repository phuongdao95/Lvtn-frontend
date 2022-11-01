import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DataGrid from "../../../components/DataGrid";
import DataGridLayout from "../../../layouts/DataGridLayout"
import MenuButton from "../../../components/DataGrid/MenuButton";
import SearchField from "../../../components/DataGrid/SearchField";
import SearchButton from "../../../components/DataGrid/SearchButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import ColumnEdit from "./ColumnEdit";
import ColumnCreate from "./ColumnCreate";

import { useNavigate, useParams } from "react-router";
import { useFetchTaskColumnsOfTaskBoard, useFetchTaskLabelsOfBoard } from "../../../client/taskboardService";
import { useDeleteTaskColumn } from "../../../client/taskColumnService";

const getColumnConfig = (openEditCb, openDeleteCb) => (
    [
        {
            field: "id",
            headerName: "Id",
            width: 100,
        },
        {
            field: "name",
            headerName: "Tên",
            width: 250,
        },
        {
            field: "order",
            headerName: "Thứ tự",
            width: 150,
        },
        {
            field: "description",
            headerName: "Mô tả",
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
                    <ActionButton onClick={() => openDeleteCb(id)}>
                        Delete
                    </ActionButton>
                </Box>
            }
        }
    ])

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function ColumnList() {
    const navigate = useNavigate();
    const { id: boardId } = useParams();

    const [columnId, setColumnId] = React.useState(null);

    const [isCreateColumnOpen, setIsCreateColumnOpen] = React.useState(false);
    const [isEditColumnOpen, setIsEditColumnOpen] = React.useState(false);
    const [isDeleteColumnOpen, setIsDeleteColumnOpen] = React.useState(false);

    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isPending: isDeleteTaskPending,
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteTaskColumn
    } = useDeleteTaskColumn();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchColumnList
    } = useFetchTaskColumnsOfTaskBoard();

    React.useEffect(() => {
        fetchColumnList(boardId);
    }, [boardId])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchColumnList(boardId);
        }
    }, [isDeleteSuccess])

    return <Fragment>
        {isCreateColumnOpen && <ColumnCreate
            reload={() => { fetchColumnList(boardId) }}
            closeDialogCb={() => { setIsCreateColumnOpen(false); }}
        />}
        {isEditColumnOpen && <ColumnEdit
            reload={() => { fetchColumnList(boardId) }}
            columnId={columnId}
            closeDialogCb={() => { setIsEditColumnOpen(false); }}
        />}

        {isDeleteColumnOpen && <ConfirmDialog
            title={"Confirm"}
            message="Bạn có muốn xóa chức vụ này"
            cancelAction={{
                text: "Cancel",
                handler: () => {
                    setColumnId(null);
                    setIsDeleteColumnOpen(false)
                },
            }}
            confirmAction={{
                text: "Confirm",
                handler: () => {
                    setColumnId(null);
                    setIsDeleteColumnOpen(false);
                    deleteTaskColumn(columnId);
                }
            }}
        />}

        <DataGridLayout
            title="Danh sách Cột"
            datagridSection={<DataGrid
                rows={response?.data ?? []}
                rowCount={response?.total ?? 0}
                columns={getColumnConfig(
                    (id) => {
                        setColumnId(id);
                        setIsEditColumnOpen(true);
                    },
                    (id) => {
                        setColumnId(id);
                        setIsDeleteColumnOpen(true);
                    }
                )}
            />}
            primaryButtonSection={
                <MenuButton
                    text={"Thao tác"}
                    menu={
                        [
                            {
                                text: "Tạo mới Cột",
                                handler: () => {
                                    setIsCreateColumnOpen(true);
                                }
                            },
                        ]
                    }
                />
            }
            secondaryButtonSection={
                <ActionButton onClick={() => { navigate(-1) }}>
                    Quay lại
                </ActionButton>
            }

            searchButtonSection={<SearchButton />}
            searchSection={<SearchField />}
        />;
    </Fragment>

}