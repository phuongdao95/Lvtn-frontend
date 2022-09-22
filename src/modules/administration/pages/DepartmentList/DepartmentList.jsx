import React, { Fragment } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import { useNavigate } from "react-router";
import { useFetchListDepartment } from "../../../../client/departmentService";

const getColumnConfig = () => [
    {
        field: "id",
        headerName: "Id",
        width: 150
    },

    {
        field: "name",
        headerName: "Name",
        width: 150,
    },

    {
        field: "parentDepartmentName",
        headerName: "Parent Department",
        width: 250
    },

    {
        field: "manager",
        headerName: "Manager",
        width: 200
    },

    {
        field: "description",
        headerName: "Description",
        width: 300,
    }
];


export default function UserList() {
    const navigate = useNavigate();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchDepartmentList
    } = useFetchListDepartment();

    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách department"}
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
                                {
                                    text: "Tạo mới", handler: () => { }
                                },
                                {
                                    text: "Xuất Excel", handler: () => { }
                                }
                            ]
                        }
                    />
                }
                secondaryButtonSection={
                    <MenuButton
                        text={"Liên kết liên quan"}
                        menu={
                            [
                                {
                                    text: "Danh sách nhóm", handler: () => {
                                        navigate("/group");
                                    }
                                },
                                {
                                    text: "Danh sách quyền", handler: () => {
                                        navigate("/permission");
                                    }
                                },
                                {
                                    text: "Danh sách team", handler: () => {
                                        navigate("/team");
                                    }
                                },
                                {
                                    text: "Danh sách người dùng", handler: () => {
                                        navigate("/user")
                                    }
                                },
                                {
                                    text: "Danh sách chức vụ", handler: () => {
                                        navigate("/role")
                                    }
                                }
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