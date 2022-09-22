import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";

import { useFetchListRole } from "../../../../client/roleService";
import { useNavigate } from "react-router";

const getColumnConfig = () => [
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
        width: 600,
    },
];


export default function RoleList() {
    const navigate = useNavigate();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchDepartmentList
    } = useFetchListRole();

    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách chức vụ"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchDepartmentList((nextPageIndex) * limit, limit)
                        }}
                        rowCount={response?.total ?? 0}
                        paginationMode="server"
                        rows={response?.data ?? []}
                        columns={getColumnConfig()}
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
                                { text: "Tạo mới", handler: () => { } }
                            ]
                        }
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={
                            [
                                { text: "Danh sách người dùng", handler: () => { } },
                                { text: "Danh sách nhóm", handler: () => { } },
                                { text: "Danh sách quyền", handler: () => { } },
                                { text: "Danh sách team", handler: () => { } },
                                { text: "Danh sách người dùng", handler: () => { } },
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
