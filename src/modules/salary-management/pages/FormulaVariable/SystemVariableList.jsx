import React from "react";

import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import Select from "../../../../components/DataGrid/Select";

import { useFetchSystemVariableList } from "../../../../client/variableService";
import EditSystemVariable from "./EditSystemVariable";

const getColumnConfig = (onEditBtnClick, onDeleteBtnClick) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },
    {
        field: "displayName",
        headerName: "Tên hiển thị",
        width: 200,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
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
        renderCell: (data) => {

            console.log(data);

            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => onEditBtnClick(data.row)}>
                    Chi tiết
                </ActionButton>
            </Box>
        }
    }
]

export default function SystemVariableList() {
    const [variableKind, setVariableKind] = React.useState("Nhóm lương")
    const [variables, setVariables] = React.useState([]);
    const [detail, setDetail] = React.useState({});
    const [isDetailVariableOpen, setIsDetailVariableOpen] = React.useState(false);

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchVariables,
        data: fetchedVariables,
    } = useFetchSystemVariableList();

    React.useEffect(() => {
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

        fetchVariables(type);
    }, [variableKind]);

    React.useEffect(() => {
        if (isSuccess) {

            setVariables(fetchedVariables.data)
        }
    }, [isSuccess])

    return <Box>
        {isDetailVariableOpen &&
            <EditSystemVariable variableDetail={detail} closeDialogCb={() => setIsDetailVariableOpen(false)} />
        }
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

        <DataGrid
            rows={variables}
            columns={getColumnConfig(
                (detail) => {
                    setIsDetailVariableOpen(true);
                    setDetail(detail)
                })}
            height={500}
        />
    </Box>;
}