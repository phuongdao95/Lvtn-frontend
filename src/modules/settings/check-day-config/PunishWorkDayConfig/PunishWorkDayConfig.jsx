import React, {useState, Fragment} from 'react';
import DataGridLayout from '../../../../layouts/DataGridLayout';
import DataGrid from '../../../../components/DataGrid/DataGrid';
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButtonContainer from "../../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";
import Create from './Create';
import Update from './Update';

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `Hình phạt tiền ${index}`,
    money: "20.000 VND",
    workDaySubtract: "Trừ 0,5h công",
    detail: "",
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
        width: 150,
    },

    {
        field: "money",
        headerName: "Phạt tiền",
        width: 200,
    },

    {
        field: "workDaySubtract",
        headerName: "Trừ công",
        width: 250,
    },

    {
        field: "detail",
        headerName: "Chi tiết",
        width: 200,
    },

    {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: () => {
            return <ActionButtonContainer>
                <ActionButton onClick={onEditBtnClick}>
                    Edit
                </ActionButton>
                <ActionButton onClick={onDeleteBtnClick}>
                    Delete
                </ActionButton>
            </ActionButtonContainer >
        }
    },

];
const PunishWorkDayConfig = () => {
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const navigate = useNavigate();
    return (
        <Fragment>
            <Create open={isCreateOpen} setOpen={setIsCreateOpen} />
            <Update open={isEditOpen} setOpen={setIsEditOpen} />
            <DataGridLayout
                title={"Danh sách hình phạt"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig({
                            onEditBtnClick: () => setIsEditOpen(true)
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
                                { text: "Danh sách luật chấm công", handler: () => { 
                                    navigate("/check-day-config/rules-work-day"); 
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
export default PunishWorkDayConfig;