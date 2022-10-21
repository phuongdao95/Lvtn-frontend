import React from "react";

import { Typography, Box } from "@mui/material";
import ActionButton from "../../../components/DataGrid/ActionButton";
import DataGrid from "../../../components/DataGrid";
import { Fragment } from "react";
import TaskDetailFileCreate from "./TaskDetailFileCreate";


const getColumnConfig = (openEditRoleCb, openDeleteRoleCb) => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },
    {
        field: "description",
        headerName: "Mô tả",
        width: 350,
    },
    {
        field: "action",
        headerName: "Hoạt động",
        width: 100,
    },
    {
        field: "time",
        headerName: "Thời gian",
        width: 150,
    },
    {
        field: "ac",
        headerName: "Thao tác",
        width: 200,
        renderCell: ({ id }) => {
            return <Box sx={{ display: "flex", gap: 1 }}>
                <ActionButton onClick={() => openEditRoleCb(id)}>
                    Edit
                </ActionButton>
                <ActionButton onClick={() => openDeleteRoleCb(id)}>
                    Delete
                </ActionButton>
            </Box >
        }

    }
]

export default function TaskDetailHistory({ taskFiles }) {


    return <Fragment>
        {isEditOpen && <TaskDetailFileEdit />}
        {isCreateOpen && <TaskDetailFileCreate />}

        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography>{"Danh sách file"}</Typography>
            </Box>
            <Box sx={{ padding: 2 }}>
                <DataGrid
                    rows={[]}
                    columns={getColumnConfig(
                        () => { },
                        () => { }
                    )}
                />
            </Box>
        </Box>;
    </Fragment>
}

