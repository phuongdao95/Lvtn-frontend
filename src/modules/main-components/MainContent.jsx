import { Route, Routes } from "react-router";
import { Test1, Test2, Test3 } from "../approve-workflow/Test";
import WorkFlows from "../approve-workflow/user/WorkFlows";
import MyRequests from "../approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../approve-workflow/nghi-thai-san/ConfigNghiThaiSan";


import UserNghiPhep from "../approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../approve-workflow/nghi-thai-san/UserNghiThaiSan";

const MainContent = () => {

    return (
        <Routes>
            <Route path="/" element={<Test1 />} />
            <Route path="/user-info" element={<Test2 />} />
            <Route path="/about-us" element={<Test3 />} />
            <Route path="/approve-workflows" element={<WorkFlows />} />
            <Route path="/approve-workflows/my-requests" element={<MyRequests />} />

            <Route exact path="/approve-workflows/user-nghi-phep" element={<UserNghiPhep />} />
            <Route exact path="/approve-workflows/user-nghi-thai-san" element={<UserNghiThaiSan />} />


            <Route exact path="/approve-workflows/config-nghi-phep" element={<ConfigNghiPhep />} />
            <Route exact path="/approve-workflows/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />


        </Routes>
    );

}

export default MainContent;