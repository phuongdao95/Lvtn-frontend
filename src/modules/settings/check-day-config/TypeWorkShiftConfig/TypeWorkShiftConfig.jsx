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
        field: "coefficient",
        headerName: "Hệ số lương",
        width: 150,
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

    useEffect(() => {
        if (isDeleteSuccess) {
            fetchList();
        }
    }, [isDeleteSuccess])

    const navigate = useNavigate();
    return (
        <Fragment>
            {isCreateOpen && <Create setOpen={setIsCreateOpen} />}
            {isEditOpen && <Update setOpen={setIsEditOpen} id={activeId}/>}
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
                        rows={response?.data ?? []}
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
                                { text: "Tạo mới", handler: () => setIsCreateOpen(true) },
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
                                { text: "Danh sách luật chấm công", handler: () => { 
                                    navigate("/check-day-config/rules-work-day"); 
                                } },
                                { text: "Danh sách hình phạt", handler: () => { 
                                    navigate("/check-day-config/punish-work-day"); 
                                } },
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