import React, {useState, Fragment, useEffect} from 'react';
import DataGridLayout from '../../../layouts/DataGridLayout';
import DataGrid from '../../../components/DataGrid/DataGrid';
import MenuButton from "../../../components/DataGrid/MenuButton";
import ActionButtonContainer from "../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';

import {useGetByUser, useUpdateSelected} from '../../../client/workingShiftEvent';
import Snackbar from '../../../components/Snackbar/Snackbar';
import dayjs from 'dayjs';
const listDateOfWeek = [
    {
        id: 1,
        name: "Thứ hai",
    },
    {
        id: 2,
        name: "Thứ ba",
    },
    {
        id: 3,
        name: "Thứ tư",
    },
    {
        id: 4,
        name: "Thứ năm",
    },
    {
        id: 5,
        name: "Thứ sáu",
    },
    {
        id: 6,
        name: "Thứ bảy",
    },
    {
        id: 0,
        name: "Chủ nhật",
    },
]
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
        field: "description",
        headerName: "Mô tả",
        width: 250,
    },
];
const SelectTypeWorkShift = () => {
    const [activeId, setActiveId] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const submit = () => {
        console.log(activeId);
        updateSelected(window.localStorage.getItem('user_id'), activeId);
    }
    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchList
    } = useGetByUser();

    const {
        isPending: isUpdatePending,
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        method: updateSelected,
    } = useUpdateSelected();
    useEffect(() => {
        if (window.localStorage.getItem('user_id')) {
            fetchList(window.localStorage.getItem('user_id'));
        }
    }, [])
    useEffect(() => {
        if (isSuccess) {
            let lst = [];
            let lstCheck = [];
            response.data.map((item, index) => {
                let data = {
                    id: item.id,
                    name: item.name,
                    startTime: dayjs(item.startTime).format('h:mm a'),
                    endTime: dayjs(item.endTime).format('h:mm a'),
                    description: item.description,
                    dateOfWeek: listDateOfWeek[dayjs(item.startTime).get('day') - 1 >= 0 ? dayjs(item.startTime).get('day') - 1 : 6].name,
                };
                lst.push(data);
                if (item.isCheck) {
                    lstCheck.push(item.id);
                }
            });
            setData(lst);
            setActiveId(lstCheck);
            console.log(lst, lstCheck);
        }
    }, [isSuccess])
    useEffect(() => {
        if(isUpdateSuccess) {
            setState({
                open: true,
                type: 'success',
                message: 'Lưu thành công',
            });
        } else if (isUpdateError) {
            setState({
                open: true,
                type: 'error',
                message: 'Lưu thất bại',
            });
        }
    }, [isUpdateSuccess])
    const [state, setState] = useState({
        open: false,
        type: 'info',
        message: '',
    });
    return (
        <Fragment>
            <Snackbar state={state} close={() => setState({...state, open: false})} />
            <DataGridLayout
                title={"Danh sách ca làm việc"}
                datagridSection={
                    <DataGrid
                        rows={data}
                        columns={getColumnConfig()}
                        checkboxSelection={true}
                        onSelectionModelChange={(ids) => {
                            setActiveId(ids);
                        }}
                        selectionModel={activeId}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
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