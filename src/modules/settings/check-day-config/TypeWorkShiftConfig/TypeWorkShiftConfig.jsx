import React, {useState, Fragment, useEffect} from 'react';
import DataGridLayout from '../../../../layouts/DataGridLayout';
import DataGrid from '../../../../components/DataGrid/DataGrid';
import MenuButton from "../../../../components/DataGrid/MenuButton";
import ActionButtonContainer from "../../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";
import Create from './Create';
import Update from './Update';
import ConfirmDialog from "../../../../components/Dialog/ConfirmDialog";

import { useFetchList, useDelete } from "../../../../client/workingShiftEvent";
import {useFetchListFormula} from "../../../../client/formulaService.js";
import dayjs from 'dayjs';
const lookUp = (id, lst) => {
    let re = lst.filter(item => parseInt(id, 10) === item.id);
    return re && re[0] ? re[0] : null;
}
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
const getColumnConfig = ({ onEditBtnClick, onDeleteBtnClick }) => [
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
        field: "formula",
        headerName: "Công thức",
        width: 150,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 250,
    },

    {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: ({id}) => {
            return <ActionButtonContainer>
                <ActionButton onClick={() => onEditBtnClick(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => onDeleteBtnClick(id)}>
                    Delete
                </ActionButton>
            </ActionButtonContainer >
        }
    },

];
const TypeWorkShiftConfig = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [data, setData] = useState([]);
    const [lstFormula, setLstFormula] = useState([]);
    // let activeId = '';
    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchList
    } = useFetchList();
    const {
        isSuccess: isDeleteSuccess,
        isPending: isDeletePending,
        method: deleteId
    } = useDelete();
    const {
        isSuccess: isFetchListFormulaSuccess,
        data: fetchedFormulaList,
    } = useFetchListFormula();
    // useEffect(() => {
    //     if (isFetchListFormulaSuccess) {
    //         setLstFormula(fetchedFormulaList.data);
    //         console.log(fetchedFormulaList.data);
    //     }
    // }, [isFetchListFormulaSuccess])

    useEffect(() => {
        if (isDeleteSuccess) {
            fetchList();
        }
    }, [isDeleteSuccess])
    useEffect(() => {
        if (isSuccess && isFetchListFormulaSuccess) {
            let lst = [];
            let lstFormula = fetchedFormulaList.data;
            response.data.map((item, index) => {
                let data = {
                    id: item.id,
                    name: item.name,
                    startTime: dayjs(item.startTime).format('h:mm a'),
                    endTime: dayjs(item.endTime).format('h:mm a'),
                    description: item.description,
                    dateOfWeek: listDateOfWeek[dayjs(item.startTime).get('day') - 1 >= 0 ? dayjs(item.startTime).get('day') - 1 : 6].name,
                    formula: lookUp(item.formula, lstFormula) != null ? lookUp(item.formula, lstFormula).displayName : null,
                };
                lst.push(data);
            });
            setData(lst);
        }
    }, [isSuccess])

    const done = () => {
        fetchList();
    }

    const navigate = useNavigate();
    return (
        <Fragment>
            {isCreateOpen && <Create setOpen={setIsCreateOpen} done={done} />}
            {isEditOpen && <Update setOpen={setIsEditOpen} id={activeId} done={done} />}
            {isDeleteOpen &&
                <ConfirmDialog
                    title={"Xác nhận"}
                    message="Bạn có muốn xóa mục này?"
                    cancelAction={{
                        text: "Hủy",
                        handler: () => {
                            setActiveId(null);
                            setIsDeleteOpen(false)
                        },
                    }}
                    confirmAction={{
                        text: "Đồng ý",
                        handler: () => {
                            setIsDeleteOpen(false);
                            setActiveId(null);
                            deleteId(activeId);
                        }
                    }}
                />}
            <DataGridLayout
                title={"Danh sách ca làm việc"}
                datagridSection={
                    <DataGrid
                        rows={data}
                        columns={getColumnConfig({
                            onEditBtnClick: (id) => {
                                setActiveId(id);
                                setIsEditOpen(true);
                            },
                            onDeleteBtnClick: (id) => {
                                setActiveId(id);
                                setIsDeleteOpen(true);
                            }
                        })}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
                    />
                }
                primaryButtonSection={
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                { text: "Tạo mới", handler: () => {
                                    setIsCreateOpen(true)
                                } },
                            ]
                        }
                        variant="contained"
                        color="info"
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={
                            [
                                // { text: "Danh sách luật chấm công", handler: () => { 
                                //     navigate("/check-day-config/rules-work-day"); 
                                // } },
                                // { text: "Danh sách hình phạt", handler: () => { 
                                //     navigate("/check-day-config/punish-work-day"); 
                                // } },
                                { text: "Danh sách ngày lễ", handler: () => { 
                                    navigate("/check-day-config/holiday"); 
                                } },
                            ]
                        }
                        variant="outlined"
                        color="info"
                    />}
                dropdownFilterSection={<Fragment></Fragment>}
            />
        </Fragment>
    );
}
export default TypeWorkShiftConfig;