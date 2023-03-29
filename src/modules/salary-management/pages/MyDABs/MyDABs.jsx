import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useFetchListDAB } from "../../../../client/dabService";
import DABDetail from "./DABDetail";
import dayjs from "dayjs";

const getColumnConfig = (handleOpenDetail) => [
    {
        field: "id",
        headerName: "id",
        width: 50,
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
        field: "fromMonth",
        headerName: "Từ tháng",
        width: 150,
    },
    {
        field: "toMonth",
        headerName: "Đến tháng",
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
                        rows={rows?.map((data) =>
                        ({
                            ...data,
                            fromMonth: dayjs(data.fromMonth).format("MM/YYYY"),
                            toMonth: dayjs(data.toMonth).format("MM/YYYY")
                        }))}
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
