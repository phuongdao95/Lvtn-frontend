import React, {useState, Fragment} from 'react';
import DataGridLayout from '../../../../layouts/DataGridLayout';
import DataGrid from '../../../../components/DataGrid/DataGrid';
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButtonContainer from "../../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../../components/DataGrid/ActionButton";
import { useNavigate } from "react-router";
import CreatedTable from './CreatedTable';
import UpdateTable from './UpdatedTable';

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `Bảng ${index}`,
    columns: "column 1, column 2",
    description: `Mô tả ${index}`,
    updatedAt: "01/01/2022",
    updatedBy: "Đào Thanh Phương",
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
        field: "columns",
        headerName: "Các cột",
        width: 250,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 250,
    },

    {
        field: "updatedAt",
        headerName: "Ngày chỉnh sửa",
        width: 150,
    },

    {
        field: "updatedBy",
        headerName: "Người chỉnh sửa",
        width: 150,
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
const TableConfig = () => {
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const navigate = useNavigate();
    return (
        <Fragment>
            <CreatedTable open={isCreateOpen} setOpen={setIsCreateOpen} />
            <UpdateTable open={isEditOpen} setOpen={setIsEditOpen} />
            <DataGridLayout
                title={"Danh sách bảng"}
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
                                { text: "Danh sách nhãn dán", handler: () => { 
                                    navigate("/virtual-space-config/label"); 
                                } },
                            ]
                        }
                        variant="outlined"
                        color="info"
                    />}
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
export default TableConfig;