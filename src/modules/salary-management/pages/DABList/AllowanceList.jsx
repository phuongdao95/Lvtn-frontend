import React from "react";

import { Box } from "@mui/system";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import DataGrid from "../../../../components/DataGrid";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import SearchField from "../../../../components/DataGrid/SearchField";
import { useFetchListDAB } from "../../../../client/dabService";
import { useNavigate } from "react-router";

const getColumnConfig = ({ onEditBtnClick, onDeleteBtnClick }) => [
    {
        field: "id",
        headerName: "id",
        width: 150,
    },
    {
        field: "name",
        headerName: "Tên",
        width: 150,
    },
    {
        field: "formula",
        headerName: "Công thức",
        width: 250,
    },
    {
        field: "salaryDeltaType",
        headerName: "Loại",
        width: 150,
    },
    {
        field: "description",
        headerName: "Mô tả",
        width: 150,
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


export default function AllowanceList({shouldReload}) {
    const navigate = useNavigate();
    const [deductionList, setDeductionList] = React.useState([]);
    const [isEditDeductionOpen, setIsEditDeductionOpen] = React.useState(true);

    const {
        data: fetchedDeductions,
        isSuccess: isfetchSuccess,
    } = useFetchListDAB();

    React.useEffect(() => {
        if (isfetchSuccess) {
            setDeductionList(fetchedDeductions.data);
        }
    }, [isfetchSuccess]);

    React.useEffect(() => {
        if (shouldReload) {
            /**TODO: reload list here */
        }
    }, [shouldReload])

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

        <DataGrid
            rows={deductionList}
            columns={getColumnConfig(
                (id) => { console.log(id) },
                (id) => { console.log(id) })
            }
            height={500} />
    </Box>;
}