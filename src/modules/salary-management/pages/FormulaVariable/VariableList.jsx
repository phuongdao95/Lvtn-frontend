import React from "react";
import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";
import Select from "../../../../components/DataGrid/Select";
import EditVariable from "./EditVariable";

import { useDeleteVariable, useFetchListVariable, useFetchVariableList } from "../../../../client/variableService";

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
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => onEditBtnClick(id)}>
                    Sửa
                </ActionButton>
                <ActionButton onClick={() => onDeleteBtnClick(id)}>
                    Xóa
                </ActionButton>
            </Box>
        }
    }
]

const getTypeFromText = (text) => {
    switch (text) {
        case "Nhóm lương":
            return "salarygroup";
        case "Tăng giảm lương":
            return "salarydelta";
        case "Chấm công":
            return "timekeeping";
        case "KPI":
            return "kpi";
    }
}

const initialDialogState = {
    title: "",
    message: "",
    confirmAction: () => { }
}

export default function VariableList() {
    const [variableKind, setVariableKind] = React.useState("Nhóm lương")
    const [variableId, setVariableId] = React.useState(null);
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
    } = useFetchVariableList();

    const {
        isPending: isDeletePending,
        isError: isDeleteError,
        isSuccess: isDeleteSuccess,
        method: deleteVariable
    } = useDeleteVariable();

    React.useEffect(() => {
        const type = getTypeFromText(variableKind);
        reloadList(type)
    }, [variableKind])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            const type = getTypeFromText(variableKind);
            reloadList(type);
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
            <Select
                value={variableKind}
                options={
                    [
                        {
                            label: "Nhóm lương",
                            handler: () => setVariableKind("Nhóm lương")
                        },
                        {
                            label: "Tăng giảm lương",
                            handler: () => setVariableKind("Tăng giảm lương")
                        },
                        {
                            label: "Chấm công",
                            handler: () => setVariableKind("Chấm công")
                        },
                        {
                            label: "KPI",
                            handler: () => setVariableKind("KPI")
                        }
                    ]
                }
            />
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