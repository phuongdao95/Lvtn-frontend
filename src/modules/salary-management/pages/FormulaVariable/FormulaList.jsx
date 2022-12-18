import React from "react";

import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import EditFormula from "./EditFormula"
import Select from "../../../../components/DataGrid/Select";
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";

import {
    useFetchListFormula,
    useDeleteFormula
} from "../../../../client/formulaService";

const getColumnConfig = (onEditBtnClick, onDeleteBtnClick) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 300,
    },

    {
        field: "displayName",
        headerName: "Tên hiển thị",
        width: 200,
    },

    {
        field: "define",
        headerName: "Định nghĩa",
        width: 400,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 250,
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
];

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

export default function FormulaList() {
    const [variableKind, setVariableKind] = React.useState("Nhóm lương")
    const [formulas, setFormulas] = React.useState([]);
    const [formulaId, setFormulaId] = React.useState(null);
    const [isEditFormulaOpen, setIsEditFormulaOpen] = React.useState(false);
    const [isDeleteFormulaOpen, setIsDeleteFormulaOpen] = React.useState(false);

    const {
        isSuccess: isFetchListFormulaSuccess,
        method: fetchFormula,
        data: fetchedFormulaList,
    } = useFetchListFormula();

    const {
        isSuccess: isDeleteSuccess,
        method: deleteFormula,
    } = useDeleteFormula();

    React.useEffect(() => {
        let type = getTypeFromText(variableKind);
        fetchFormula(0, 0, type, "area");
    }, [variableKind])

    React.useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setFormulas(fetchedFormulaList.data);
        }
    }, [isFetchListFormulaSuccess])

    React.useEffect(() => {
        if (isDeleteSuccess) {
            let type;
            if (variableKind == "Nhóm lương") {
                type = "salarygroup";
            }
            else if (variableKind == "Tăng giảm lương") {
                type = "salarydelta"
            }
            else if (variableKind == "Chấm công") {
                type = "timekeeping"
            }
            else if (variableKind == "KPI") {
                type = "kpi"
            }
            fetchFormula(0, 0, type, "area");
        }
    }, [isDeleteSuccess]);

    return <Box >
        {isDeleteFormulaOpen &&
            <ConfirmDialog
                title={"Confirm"}
                message="Bạn có muốn xóa chức vụ này"
                cancelAction={{
                    text: "Cancel",
                    handler: () => {
                        setFormulaId(null);
                        setIsDeleteFormulaOpen(false)
                    },
                }}
                confirmAction={{
                    text: "Confirm",
                    handler: () => {
                        setFormulaId(null);
                        setIsDeleteFormulaOpen(false);
                        deleteFormula(formulaId);
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

        {isEditFormulaOpen &&
            <EditFormula formulaId={formulaId}
                closeDialogCb={() => setIsEditFormulaOpen(false)} />}

        {isDeleteFormulaOpen &&
            <div></div>
        }

        <DataGrid
            rows={formulas}
            columns={getColumnConfig(
                (id) => {
                    setFormulaId(id);
                    setIsEditFormulaOpen(true);
                },
                (id) => {
                    setFormulaId(id);
                    setIsDeleteFormulaOpen(true);
                })
            }
            height={500} />
    </Box>;
}