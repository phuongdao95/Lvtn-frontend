import { Box, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";
import SearchButton from "../../../components/DataGrid/SearchButton";
import SearchField from "../../../components/DataGrid/SearchField";
import MenuButton from "../../../components/DataGrid/MenuButton";
import FilterButton from "../../../components/DataGrid/FilterButton";
import TaskBoard from "../components/TaskBoard";
import TaskDetail from "./TaskDetail";

import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router";

export default function BoardDetail() {
    const navigate = useNavigate();

    const [taskId, setTaskId] = React.useState(null);
    const [isTaskDetailOpen, setTaskDetailOpen] = React.useState(false);

    return <Fragment>
        {
            isTaskDetailOpen &&
            <TaskDetail />
        }
        <Box sx={{ padding: 2, background: 'white' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Typography fontSize={30}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    color={grey[800]}
                >
                    Bảng công việc

                </Typography >

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, padding: 0.5 }}>

                    <MenuButton
                        text={"Bảng công việc"}
                        menu={
                            [
                                {
                                    text: "Danh sách nhóm", handler: () => {
                                        navigate("/group");
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
                    />

                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                {
                                    text: "Thêm Công việc",
                                    handler: () => {
                                    }
                                },
                                {
                                    text: "Danh sách Nhãn",
                                    handler: () => { 

                                    }
                                }
                            ]
                        }
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <FilterButton />
                    <SearchField />
                    <SearchButton />
                </Box>
            </Box>
            <TaskBoard openTaskDetailCb={() => { }} />
        </Box>
    </Fragment>
}