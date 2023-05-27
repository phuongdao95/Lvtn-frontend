import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import api from "../../../client/api";
import { Add, PlusOneOutlined } from "@mui/icons-material";
import AddLeader from "./AddLeader";

export default function MyTeam() {

    const [leader, setLeader] = React.useState(null);
    const [members, setMembers] = React.useState([]);

    useEffect(() => {
        const userId = window.localStorage.getItem('user_id');
        if (userId) {
            api.get(`/api/myteam/${userId}`).then((value) => {
                setMembers(value.data.members);
                setLeader(value.data.leader);
            })
        }
    }, []);

    const [isAddLeaderOpen, setIsAddLeaderOpen] = React.useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = React.useState(false);

    return <Box sx={{ background: 'white', height: '80vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5, padding: 2 }}>
            <Typography variant='h4'>Team của tôi </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            <Typography variant='h6'>Danh sách thành viên</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Typography variant="h6">Leader</Typography>
                    <Button variant="outlined" size="small" onClick={() => setIsAddLeaderOpen(true)} >
                        <Add />
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <Typography variant="h6" >Thành viên team</Typography>
                    <Button variant="outlined" size="small" onClick={() => setIsAddMemberOpen(true)} >
                        <Add />
                    </Button>
                </Box>

                {isAddLeaderOpen && <AddLeader closeCb={() => setIsAddLeaderOpen(false)} />}

                {
                    members.map((member) => <Box>
                        <Typography>
                            {member.urlImage}
                        </Typography>
                        <Box sx={{ padding: 1 }}>
                            <Typography>
                                {member.name}
                            </Typography>
                            <Typography>
                                {member.username}
                            </Typography>
                        </Box>

                    </Box>)
                }
            </Box>
        </Box>
    </Box>;
}