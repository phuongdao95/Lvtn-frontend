import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButtonContainer from "../../../../components/DataGrid/ActionButtonContainer";
import ActionButton from "../../../../components/DataGrid/ActionButton";

import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `Group ${index}`,
    description: `Test description ${index}`,
    created: "01/01/2022",
    creator: "Minh Nhat",
    modified: "08/08/2022",
    modifier: "Minh Nhat",
}));

const getColumnConfig = ({ onEditBtnClick, onDeleteBtnClick }) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },

    {
        field: "name",
        headerName: "Name",
        width: 250,
    },


    {
        field: "description",
        headerName: "Description",
        width: 150,
    },

    {
        field: "created",
        headerName: "Created",
        width: 150,
    },

    {
        field: "creator",
        headerName: "Creator",
        width: 150,
    },

    {
        field: "modified",
        headerName: "Modified",
        width: 150,
    },

    {
        field: "modifier",
        headerName: "Modifier",
        width: 150
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


export default function GroupList() {
    const [isCreateGroupOpen, setIsCreateGroupOpen] = React.useState(false);
    const [isEditGroupOpen, setIsEditGroupOpen] = React.useState(false);

    return (
        <Fragment>
            {isCreateGroupOpen && <CreateGroup closeDialogCb={() => setIsCreateGroupOpen(false)} />}
            {isEditGroupOpen && <EditGroup closeDialogCb={() => setIsEditGroupOpen(false)} />}

            <DataGridLayout
                title={"Danh sách nhóm"}
                datagridSection={
                    <DataGrid
                        rows={rows}
                        columns={getColumnConfig({
                            onEditBtnClick: () => setIsEditGroupOpen(true)
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
                                { text: "Tạo mới", handler: () => setIsCreateGroupOpen(true) },
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
                                { text: "Danh sách chức vụ", handler: () => { } },
                                { text: "Danh sách team", handler: () => { } },
                                { text: "Danh sách user", handler: () => { } },
                                { text: "Danh sách quyền", handler: () => { } }
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
