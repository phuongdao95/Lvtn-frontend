import React, {useState, Fragment} from 'react';
import DataGridLayout from '../../../../layouts/DataGridLayout';
import DataGrid from '../../../../components/DataGrid/DataGrid';
import MenuButton from "../../../../components/DataGrid/MenuButton";
import ActionButtonContainer from "../../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";
import Create from './Create';
import Update from './Update';

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `Đi trễ 30p ${index}`,
    lateSoon: "30p",
    punish: "Hình phạt tiền 0",
}));
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
        field: "lateSoon",
        headerName: "Đến trễ/Về sớm (phút)",
        width: 250,
    },

    {
        field: "punish",
        headerName: "Hình phạt",
        width: 150,
    },

    {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: (e) => {
            return <ActionButtonContainer>
                <ActionButton onClick={() => onEditBtnClick(e.id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={onDeleteBtnClick}>
                    Delete
                </ActionButton>
            </ActionButtonContainer >
        }
    },

];
const RulesWorkDayConfig = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const navigate = useNavigate();
    const handleColumn = (id) => {
        setIsEditOpen(true); 
        setActiveId(id);
    }
    return (
        <Fragment>
            {isCreateOpen && <Create setOpen={setIsCreateOpen} />}
            {isEditOpen && <Update setOpen={setIsEditOpen} id={activeId}/>}
            <DataGridLayout
                title={"Danh sách luật chấm công"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig({
                            onEditBtnClick: (id) => handleColumn(id)
                        })}
                        isError={false}
                        isLoading={false}
                        isSuccess={false}
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
                                { text: "Danh sách ca làm việc", handler: () => { 
                                    navigate("/check-day-config/type-work-day"); 
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
export default RulesWorkDayConfig;