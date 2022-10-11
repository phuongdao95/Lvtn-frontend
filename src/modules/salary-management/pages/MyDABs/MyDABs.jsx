import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import SearchField from "../../../../components/SearchField";
import Select from "../../../../components/DataGrid/Select";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import { useFetchListDAB } from "../../../../client/dabService";
import { useNavigate } from "react-router";

const columns = [
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
    }

];

const rows = [];

export default function DABList() {
    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);
    const [dataGridOption, setDataGridOption] = React.useState("Khấu trừ");

    const [isCreateDABOpen, setIsCreateDABOpen] = React.useState(false);
    const [isEditDABOpen, setIsEditDABOpen] = React.useState(true);

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
            <DataGridLayout
                title={"Khấu trừ, phụ cấp và lương thưởng của tôi"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                searchSection={<SearchField />}
                dropdownFilterSection={
                    <Select
                        options={[
                            {
                                label: "Khấu trừ", handler: () => {
                                    setDataGridOption("Khấu trừ")
                                }
                            },
                            {
                                label: "Phụ cấp",
                                handler: () => {
                                    setDataGridOption("Phụ cấp");
                                }
                            },
                            {
                                label: "Lương thưởng", handler: () => {
                                    setDataGridOption("Lương thưởng");
                                }
                            },
                        ]}
                        value={dataGridOption}
                    />
                }
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
