import { Route, Routes } from "react-router";
import { Test1, Test3 } from "../approve-workflow/Test";
import ProfileUser from "../shares/pages/ProfileUser/ProfileUser";
import ListUsers from "../shares/pages/ListUsers/ListUsers";
import VirtualSpace from "../shares/pages/VirtualSpace/VirtualSpace";
const MainContent = () => {

    return (
        <Routes>
            <Route path="/" element={<Test1 />} />
            <Route path="/user-info" element={<ProfileUser />} />
            <Route path="/user-info/:id" element={<ProfileUser />} />
            <Route path="/about-us" element={<Test3 />} />
            <Route path="/list-users" element={<ListUsers />} />
            <Route path="/virtual-space" element={<VirtualSpace />} />
        </Routes>
    );

}

export default MainContent;