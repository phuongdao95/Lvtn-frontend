import React, { Fragment } from "react";
import { Box } from "@mui/material";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import CreateFormula from "./CreateFormula";
import EditFormula from "./EditFormula";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";
import CreateVariable from "./CreateVariable";
import { useFetchListFormula } from "../../../../client/formulaService";
import { useFetchListVariable } from "../../../../client/variableService";

const rows = [];

const getFormulaColumnConfig = ({ onEditBtnClick, onDeleteBtnClick }) => [
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
        field: "define",
        headerName: "Định nghĩa",
        width: 200,
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
        renderCell: () => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={onEditBtnClick}>
                    Edit
                </ActionButton>
                <ActionButton onClick={onDeleteBtnClick}>
                    Delete
                </ActionButton>
            </Box>
        }
    }
];

const getVariableColumnConfig = (onEditBtnClick, onDeleteBtnClick) => [
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

const getColumnConfig = (option, { onFormulaEdit, onFormulaDelete, onVariableEdit, onVariableDelete }) => {
    switch (option) {
        case "Công thức":
            return getFormulaColumnConfig(onFormulaEdit, onFormulaDelete);
        case "Biến":
            return getVariableColumnConfig(onVariableEdit, onVariableDelete);
        default:
            return getFormulaColumnConfig(onFormulaEdit, onFormulaDelete);
    }
}

export default function FormulaList() {
    const navigate = useNavigate();

    const [id, setId] = React.useState(null);

    const [rows, setRows] = React.useState([]);
    const [variableList, setVariableList] = React.useState([]);
    const [formulaList, setFormulaList] = React.useState([]);
    const [systemVariableList, setSystemVariableList] = React.useState([]);

    const [dataGridOption, setDataGridOption] = React.useState("Công thức");

    const [isCreateFormulaOpen, setIsCreateFormulaOpen] = React.useState(false);
    const [isEditFormulaOpen, setIsEditFormulaOpen] = React.useState(false);

    const [isCreateVariableOpen, setIsCreateVariableOpen] = React.useState(false);
    const [isEditVariableOpen, setIsEditVariableOpen] = React.useState(false);

    const {
        isSuccess: isFetchListFormulaSuccess,
        data: fetchedFormulaList,
    } = useFetchListFormula();
    const {
        isSuccess: isFetchListVariableSuccess,
        data: fetchedVariableList,
    } = useFetchListVariable();

    React.useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setFormulaList(fetchedFormulaList.data);
            setRows(fetchedFormulaList.data);
        }
    }, [isFetchListFormulaSuccess])

    React.useEffect(() => {
        if (isFetchListVariableSuccess) {
            setVariableList(fetchedVariableList.data);
        }
    }, [isFetchListVariableSuccess])

    return (
        <Fragment>
            {isCreateFormulaOpen && <CreateFormula closeDialogCb={() => setIsCreateFormulaOpen(false)} />}
            {isCreateVariableOpen && <CreateVariable closeDialogCb={() => setIsCreateVariableOpen(false)} />}
            {isEditFormulaOpen && <EditFormula closeDialogCb={() => {
                setId(null);
                setIsEditFormulaOpen(false);
            }} />}
            {isEditVariableOpen && <EditFormula closeDialogCb={() => {
                setId(null);
                setIsEditVariableOpen(false);
            }} />}

            <DataGridLayout
                title={"Công thức, biến và biến hệ thống"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig(dataGridOption, {
                            onFormulaDelete: () => { },
                            onFormulaEdit: () => { setIsEditFormulaOpen(true) },
                            onVariableDelete: () => { },
                            onVariableEdit: () => { setIsEditVariableOpen(true) }
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
                                { text: "Tạo mới công thức", handler: () => setIsCreateFormulaOpen(true) },
                                { text: "Tạo mới biến", handler: () => setIsCreateVariableOpen(true) },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={[{
                            text: "Danh sách Lương thưởng, Khấu trừ", handler: () => {

                            }
                        }]}
                        variant="outlined"
                        color="info"
                    />}
                searchSection={
                    <SearchField

                    />
                }
                dropdownFilterSection={<Select
                    options={[
                        {
                            label: "Công thức",
                            handler: () => {
                                setRows(formulaList);
                                setDataGridOption("Công thức");
                            }
                        },
                        {
                            label: "Biến",
                            handler: () => {
                                setRows(variableList);
                                setDataGridOption("Biến");
                            }
                        },
                        {
                            label: "Biến hệ thống",
                            handler: () => {
                                setDataGridOption("Biến hệ thống");
                            }
                        }
                    ]}
                    value={dataGridOption}
                />}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
