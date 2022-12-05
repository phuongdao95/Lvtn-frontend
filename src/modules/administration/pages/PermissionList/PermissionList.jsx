import React, { Fragment, useState } from "react";
import DataGridLayout from "../../../../layouts/DataGridLayout";
import DataGrid from "../../../../components/DataGrid";
import MenuButton from "../../../../components/DataGrid/MenuButton";
import SearchField from "../../../../components/SearchField";
import SearchButton from "../../../../components/DataGrid/SearchButton";
import ActionButton from "../../../../components/DataGrid/ActionButton";

import { useFetchListPermission } from "../../../../client/permisisonService";
import { useNavigate } from "react-router";
import PermissionDetail from "./PermissionDetail";

const getColumnConfig = (openPermissionDetailCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },

    {
        field: "name",
        headerName: "Tên",
        width: 250,
    },

    {
        field: "description",
        headerName: "Mô tả",
        width: 400,
    },

    {
        field: "action",
        headerName: "Thao tác",
        renderCell: ({ id }) => {
            return <ActionButton onClick={() => openPermissionDetailCb(id)}>
                Detail
            </ActionButton>
        }
    }
];


export default function RoleList() {
    const navigate = useNavigate();

    const [isPermissionDetailOpen, setIsPermissionDetailOpen]
        = useState(false);

    const [permissionId, setPermissionId] = useState(null);

    const {
        isPending,
        isSuccess,
        isError,
        data: response,
    } = useFetchListPermission();

    return (
        <Fragment>
            {isPermissionDetailOpen &&
                <PermissionDetail
                    permissionId={permissionId}
                    closeDialogCb={() => {
                        setIsPermissionDetailOpen(false);
                        setPermissionId(null)
                    }} />
            }

            <DataGridLayout
                title={"Danh sách quyền"}
                datagridSection={
                    <DataGrid
                        rows={response?.data ?? []}
                        columns={getColumnConfig((id) => {
                            setPermissionId(id);
                            setIsPermissionDetailOpen(true);
                        })}
                        isError={isError}
                        isLoading={isPending}
                        isSuccess={isSuccess}
                    />
                }
                searchSection={<SearchField />}
                dropdownFilterSection={<Fragment></Fragment>}
                searchButtonSection={<SearchButton />}
            />
        </Fragment>
    );
}
