import React from "react";
import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import EditVariable from "./EditVariable";

import { useDeleteVariable, useFetchListVariable } from "../../../../client/variableService";

const getColumnConfig = (onEditBtnClick, onDeleteBtnClick) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },

    {
        field: "displayName",
        headerName: "Tên hiển thị",
        width: 200,
    },

    {
        field: "value",
        headerName: "Giá trị",
        width: 200,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 250,
    },

    {
        field: "dataType",
        headerName: "Kiểu",
        width: 100,
    },

    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: () => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={onEditBtnClick}>
                    Sửa
                </ActionButton>
                <ActionButton onClick={onDeleteBtnClick}>
                    Xóa
                </ActionButton>
            </Box>
        }
    }
]

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function VariableList() {
    const [variableId, setVariableId] = React.useState(null);
    const [variables, setVariables] = React.useState([]);
    const [isVariableEditOpen, setIsVariableEditOpen] = React.useState(false);
    const [isVariableDeleteOpen, setIsVariableDeleteOpen] = React.useState(false);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
    const [infoDialogMessage, setInfoDialogMessage] = React.useState({
        initialDialogState
    })

    const resetDialogState = () => setInfoDialogMessage(initialDialogState)

    const {
        isPending,
        isError,
        isSuccess,
        data: response,
        method: reloadList,
    } = useFetchListVariable();

    const {
        isPending: isDeletePending,
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
        method: deleteVariable
    } = useDeleteVariable();

    React.useEffect(() => {
        if (isDeleteSuccess) {
            reloadList();
        }
        if (isDeleteError) {
            setInfoDialogMessage({
                title: 'Error',
                message: 'Có lỗi xảy ra. Không thể xóa được item'
            });
            setIsInfoDialogOpen(true);
        }
    }, [isDeleteSuccess])

    return <Box>
        {isVariableEditOpen && <EditVariable
            id={variableId} closeDialogCb={() => setIsVariableEditOpen(false)} />}

        {isVariableDeleteOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa chức vụ này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setVariableId(null);
                        setIsVariableDeleteOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setVariableId(null);
                        setIsVariableDeleteOpen(false);
                        deleteVariable(variableId);
                    }
                }}
            />}
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: 2,
        }}>
            <SearchField />
            <SearchButton />
        </Box>

        <DataGrid rows={response?.data ?? []}
            columns={getColumnConfig(
                (id) => {
                    setVariableId(id);
                    setIsVariableEditOpen(true)
                },
                (id) => {
                    setVariableId(id);
                    setIsVariableDeleteOpen(true);
                })}
            height={500} />
    </Box>;
}