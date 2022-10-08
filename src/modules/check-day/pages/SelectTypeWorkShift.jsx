import React, {useState, Fragment, useEffect} from 'react';
import DataGridLayout from '../../../layouts/DataGridLayout';
import DataGrid from '../../../components/DataGrid/DataGrid';
import MenuButton from "../../../components/DataGrid/MenuButton";
import ActionButtonContainer from "../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `Ca ${index}`,
    dateOfWeek: 'Thứ 2',
    startTime: "8:00",
    endTime: "17:00",
    coefficient: 1,
    isChecked: 'true',
}));
const getColumnConfig = () => [
    {
        field: "id",
        headerName: "Id",
        width: 90,
    },

    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },

    {
        field: "dateOfWeek",
        headerName: "Ngày trong tuần",
        width: 250,
    },

    {
        field: "startTime",
        headerName: "Giờ vào",
        width: 150,
    },

    {
        field: "endTime",
        headerName: "Giờ nghỉ",
        width: 150,
    },

    {
        field: "coefficient",
        headerName: "Hệ số lương",
        width: 150,
    },
];
const SelectTypeWorkShift = () => {
    const [activeId, setActiveId] = useState([]);
    const navigate = useNavigate();
    const submit = () => {
        console.log(activeId);
    }
    useEffect(() => {
        let arr = [
            0,1,2,6
        ];
        setActiveId(arr);
    }, []);
    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách ca làm việc"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig()}
                        checkboxSelection={true}
                        onSelectionModelChange={(ids) => {
                            setActiveId(ids);
                        }}
                        selectionModel={activeId}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
                    />
                }
                primaryButtonSection={
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            submit();
                        }}
                    >
                        Lưu
                    </Button>
                }
            />
        </Fragment>
    );
}
export default SelectTypeWorkShift;