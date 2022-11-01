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
    name: `Lễ hàng năm ${index}`,
    date: '01/01'
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
        width: 350,
    },

    {
        field: "date",
        headerName: "Ngày lễ",
        width: 200,
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
const HolidayConfig = () => {
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
                title={"Danh sách ngày lễ"}
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
                                    navigate("/check-day-config/type-work-shift-day"); 
                                } },
                                // { text: "Danh sách luật chấm công", handler: () => { 
                                //     navigate("/check-day-config/rules-work-day"); 
                                // } },
                                // { text: "Danh sách hình phạt", handler: () => { 
                                //     navigate("/check-day-config/punish-work-day"); 
                                // } },
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
export default HolidayConfig;