import React from "react";
import { Box } from "@mui/system";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import ActionButton from "../../../../components/DataGrid/ActionButton";

import { useFetchListVariable } from "../../../../client/variableService";

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
export default function VariableList() {
    const [variables, setVariables] = React.useState([]);

    const {
        isSuccess: isFetchListVariableSuccess,
        data: fetchedVariableList,
    } = useFetchListVariable();

    React.useEffect(() => {
        if (isFetchListVariableSuccess) {
            setVariables(fetchedVariableList.data);
        }
    }, [isFetchListVariableSuccess])

    return <Box>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mb: 2,
        }}>
            <SearchField />
            <SearchButton />
        </Box>

        <DataGrid rows={variables}
            columns={getColumnConfig(
                () => { },
                () => { })}
            height={500} />
    </Box>;
}