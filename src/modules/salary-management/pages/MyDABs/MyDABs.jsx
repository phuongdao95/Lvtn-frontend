import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useFetchListDAB } from "../../../../client/dabService";
import DABDetail from "./DABDetail";

const getColumnConfig = (handleOpenDetail) => [
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
        field: "formulaName",
        headerName: "Công thức",
        width: 250,
    },
    {
        field: "type",
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
        headerName: "Thao tác",
        renderCell: ({ id }) => {
            return <ActionButton onClick={() => handleOpenDetail(id)} >
                chi tiết
            </ActionButton>
        }
    }
];

const rows = [];

export default function DABList() {
    const [dabId, setDabId] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [dataGridOption, setDataGridOption] = React.useState("Khấu trừ");
    const [isDetailOpen, setIsDetailOpen] = React.useState(false);

    const {
        data: fetchedDAB,
        isSuccess: isfetchSuccess,
    } = useFetchListDAB();

    React.useEffect(() => {
        if (isfetchSuccess) {
            setRows(fetchedDAB.data)
        }
    }, [isfetchSuccess]);

    return (
        <Fragment>
            {isDetailOpen && <DABDetail dabId={dabId} closeDialogCb={() => setIsDetailOpen(false)} />}

            <DataGridLayout
                title={"Khấu trừ, phụ cấp và lương thưởng của tôi"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig((id) => {
                            setIsDetailOpen(true);
                            setDabId(id);
                        })}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                searchSection={<SearchField />}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
