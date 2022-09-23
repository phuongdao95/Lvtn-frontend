import React, { Fragment, useEffect } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import { useFetchListUser } from "../../../../client/userService";
import { useNavigate } from "react-router";

const getColumnConfig = () => [
    {
        field: "id",
        width: 150
    },
    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },

    {
        field: "age",
        headerName: "Tuổi",
        width: 250,
    },

    {
        field: "sex",
        headerName: "Giới tính",
        width: 150,
    },

    {
        field: "email",
        headerName: "Email",
        width: 250,
    },

    {
        field: "role",
        headerName: "Chức vụ",
        width: 250,
    },

    {
        field: "teamName",
        headerName: "Team",
        width: 250,
    },

    {
        field: "departmentName",
        headerName: "Department",
        width: 250
    }
];


export default function UserList() {
    const navigate = useNavigate();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchUserList
    } = useFetchListUser();

    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách nhân viên"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchUserList((nextPageIndex) * limit, limit)
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
                                    text: "Danh sách department", handler: () => {
                                        navigate("/department")
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
