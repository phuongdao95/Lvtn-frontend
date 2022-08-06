import { Route, Routes } from "react-router";
import { Test1, Test2, Test3 } from "../approve-workflow/Test";
import WorkFlows from "../approve-workflow/user/WorkFlows";
import MyRequests from "../approve-workflow/view-requests/MyRequests";

const MainContent = () => {

    return (
        <Routes>
            <Route path="/" element={<Test1 />} />
            <Route path="/user-info" element={<Test2 />} />
            <Route path="/about-us" element={<Test3 />} />
            <Route path="/approve-workflows" element={<WorkFlows />} />
            <Route path="/approve-workflows/my-requests" element={<MyRequests />} />
        </Routes>
    );

}

export default MainContent;