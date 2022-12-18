import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DataGrid from "../../../components/DataGrid";
import DataGridLayout from "../../../layouts/DataGridLayout"
import MenuButton from "../../../components/DataGrid/MenuButton";
import SearchField from "../../../components/DataGrid/SearchField";
import SearchButton from "../../../components/DataGrid/SearchButton";
import ActionButton from "../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../components/Dialog/ConfirmDialog";
import LabelCreate from "./LabelCreate";

import { useNavigate, useParams } from "react-router";
import { useFetchTaskLabelsOfBoard } from "../../../client/taskboardService";
import { useDeleteTaskLabel } from "../../../client/taskLabelService";
import LabelEdit from "./LabelEdit";


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
                        Sửa
                    </ActionButton>
                    <ActionButton onClick={() => openDeleteCb(id)}>
                        Xóa
                    </ActionButton>
                </Box>
            }
        }
    ])

export default function LabelList() {
    const navigate = useNavigate();
    const { id: boardId } = useParams();

    const [labelId, setLabelId] = React.useState(null);

    const [isCreateLabelOpen, setIsCreateLabelOpen] = React.useState(false);
    const [isEditLabelOpen, setIsEditLabelOpen] = React.useState(false);
    const [isDeleteLabelOpen, setIsDeleteLabelOpen] = React.useState(false);

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchLabelList
    } = useFetchTaskLabelsOfBoard();

    const {
        isError: isDeleteError,
        isPending: isDeletePending,
        isSuccess: isDeleteSuccess,
        method: deleteTaskLabel
    } = useDeleteTaskLabel();

    React.useEffect(() => {
        fetchLabelList(boardId);
    }, [boardId])

    React.useEffect(() => {
        console.log(isCreateLabelOpen)
    }, [isCreateLabelOpen])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            fetchLabelList(boardId);
        }
    }, [isDeleteSuccess])

    return <Fragment>
        {isCreateLabelOpen && <LabelCreate
            reload={() => fetchLabelList(boardId)} closeDialogCb={() => setIsCreateLabelOpen(false)} />}
        {isEditLabelOpen && <LabelEdit labelId={labelId} closeDialogCb={() => setIsEditLabelOpen(false)} reload={() => fetchLabelList(boardId)} />}
        {isDeleteLabelOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa chức vụ này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setLabelId(null);
                        setIsDeleteLabelOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setIsDeleteLabelOpen(false);
                        setLabelId(null);
                        deleteTaskLabel(labelId);
                    }
                }}
            />}        <DataGridLayout
            title="Danh sách nhãn"
            datagridSection={<DataGrid
                rows={response?.data ?? []}
                rowCount={response?.total ?? 0}
                columns={getColumnConfig(
                    (id) => {
                        setLabelId(id);
                        setIsEditLabelOpen(true);
                    },
                    (id) => {
                        setLabelId(id);
                        setIsDeleteLabelOpen(true);
                    }
                )}
            />}
            primaryButtonSection={
                <MenuButton
                    text={"Thao tác"}
                    menu={
                        [
                            {
                                text: "Tạo mới nhãn",
                                handler: () => {
                                    setIsCreateLabelOpen(true);
                                }
                            },
                        ]
                    }
                />
            }
            secondaryButtonSection={
                <ActionButton onClick={() => {
                    navigate(-1);
                }}>
                    Quay lại
                </ActionButton>
            }

            searchButtonSection={<SearchButton />}
            searchSection={<SearchField />}
        />;
    </Fragment>

}