import React, { Fragment, useEffect } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import { useFetchListTeam } from "../../../../client/teamService";
import { useNavigate } from "react-router";

const rows = new Array(30).fill(0).map((value, index, array) => ({
    id: index,
    name: `Team ${index}`,
    description: `Test description ${index}`,
}));

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


export default function TeamList() {
    const navigate = useNavigate();

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
        method: fetchTeamList
    } = useFetchListTeam();

    return (
        <Fragment>
            <DataGridLayout
                title={"Danh sách team"}
                datagridSection={
                    <DataGrid
                        onPageChange={(nextPageIndex) => {
                            const limit = 8;
                            fetchTeamList((nextPageIndex) * limit, limit)
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
                                {
                                    text: "Danh sách nhóm", handler: () => {
                                        navigate("/group")
                                    }
                                },
                                {
                                    text: "Danh sách quyền", handler: () => {
                                        navigate("/permission")
                                    }
                                },
                                {
                                    text: "Danh sách người dùng", handler: () => {
                                        navigate("/user");
                                    }
                                },
                                {
                                    text: "Danh sách các cục", handler: () => {
                                        navigate("/department");
                                    }
                                },
                                {
                                    text: "Danh sách chức vụ", handler: () => {
                                        navigate("/role");
                                    }
                                },
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
