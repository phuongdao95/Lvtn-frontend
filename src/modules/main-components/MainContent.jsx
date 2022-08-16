import { Route, Routes } from "react-router";

import WorkFlows from "../approve-workflow/user/WorkFlows";
import MyRequests from "../approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../approve-workflow/nghi-thai-san/ConfigNghiThaiSan";


import UserNghiPhep from "../approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../approve-workflow/nghi-thai-san/UserNghiThaiSan";

import ProfileUser from "../shares/pages/ProfileUser/ProfileUser";
import ListUsers from "../shares/pages/ListUsers/ListUsers";

import Timekeeping from "../shares/pages/timekeeping/Timekeeping";
import TimekeepingRegister from "../shares/pages/timekeeping/TimekeepingRegister";

const MainContent = () => {

    return (
        <Routes>
            <Route path="/user-info" element={<ProfileUser />} />
            <Route path="/user-info/:id" element={<ProfileUser />} />

            <Route path="/approve-workflows" element={<WorkFlows />} />
            <Route path="/approve-workflows/my-requests" element={<MyRequests />} />

            <Route exact path="/approve-workflows/user-nghi-phep" element={<UserNghiPhep />} />
            <Route exact path="/approve-workflows/user-nghi-thai-san" element={<UserNghiThaiSan />} />


            <Route exact path="/approve-workflows/config-nghi-phep" element={<ConfigNghiPhep />} />
            <Route exact path="/approve-workflows/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />
            <Route path="/timekeeping" element={<Timekeeping />} />
            <Route path="/timekeeping/register" element={<TimekeepingRegister />} />

            <Route path="/list-users" element={<ListUsers />} />
        </Routes >
    );

}

export default MainContent;