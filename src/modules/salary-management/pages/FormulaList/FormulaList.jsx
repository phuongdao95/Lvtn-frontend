import React, { Fragment } from "react";
import { Box, Chip, Button } from "@mui/material";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import CreateFormula from "./CreateFormula";
import EditFormula from "./EditFormula";
import ActionButton from "../../../../components/DataGrid/ActionButton";

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `formula_${index}`,
    displayName: `Formula ${index}`,
    inputVariables: [],
    type: "Formula",
    dataType: "Number",
    define: "variable_1 + variable_2 * variable_1 - variable_2",
    description: "A formula",
}));

const getColumnConfig = ({ onEditBtnClick, onDeleteBtnClick }) => [
    {
        field: "name",
        headerName: "Name",
        width: 150,
    },


    {
        field: "displayName",
        headerName: "Display Name",
        width: 250,
    },


    {
        field: "type",
        headerName: "Type",
        width: 150,
    },

    {
        field: "define",
        headerName: "Define",
        width: 150,
    },

    {
        field: "description",
        headerName: "Description",
        width: 150,
    },

    {
        field: "action",
        headerName: "Action",
        renderCell: () => {
            return <ActionButton onClick={onEditBtnClick}>
                Edit
            </ActionButton>
        }
    }
];


export default function FormulaList() {
    const [isCreateFormulaOpen, setIsCreateFormulaOpen] = React.useState(false);
    const [isEditFormulaOpen, setIsEditFormulaOpen] = React.useState(false);

    return (
        <Fragment>
            {isCreateFormulaOpen && <CreateFormula closeDialogCb={() => setIsCreateFormulaOpen(false)} />}
            {isEditFormulaOpen && <EditFormula closeDialogCb={() => setIsEditFormulaOpen(false)} />}

            <DataGridLayout
                title={"Công thức, input và constant"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig({
                            onEditBtnClick: () => setIsEditFormulaOpen(true)
                        })}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                { text: "Tạo mới", handler: () => setIsCreateFormulaOpen(true) },
                                { text: "Xuất bảng excel", handler: () => { } },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={[{ text: "Danh sách template", handler: () => { } }]}
                        variant="outlined"
                        color="info"
                    />}
                searchSection={<SearchField />}
                dropdownFilterSection={<Select />}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
