import React from "react";

import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import EditFormula from "./EditFormula"

import {
    useFetchListFormula,
    useEditFormula
} from "../../../../client/formulaService";
import { set } from "date-fns/esm";

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
                    Edit
                </ActionButton>
                <ActionButton onClick={() => onDeleteBtnClick(id)}>
                    Delete
                </ActionButton>
            </Box>
        }
    }
];

export default function FormulaList() {
    const [formulas, setFormulas] = React.useState([]);
    const [formulaId, setFormulaId] = React.useState(null);
    const [variableId, setVariableId] = React.useState(null);
    const [isEditFormulaOpen, setIsEditFormulaOpen] = React.useState(false);
    const [isDeleteFormulaOpen, setIsDeleteFormulaOpen] = React.useState(false);

    const {
        isSuccess: isFetchListFormulaSuccess,
        data: fetchedFormulaList,
    } = useFetchListFormula();

    React.useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setFormulas(fetchedFormulaList.data);
        }
    }, [isFetchListFormulaSuccess])

    return <Box >
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: 2,
        }}>
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