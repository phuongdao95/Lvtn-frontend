import { Route, Routes } from "react-router";
import { Test1, Test3 } from "../approve-workflow/Test";
import ProfileUser from "../shares/pages/ProfileUser/ProfileUser";
import ListUsers from "../shares/pages/ListUsers/ListUsers";import Timekeeping from "../shares/timekeeping/Timekeeping";
import TimekeepingRegister from "../shares/timekeeping/TimekeepingRegister";

const MainContent = () => {

    return (
        <Routes>
            <Route path="/" element={<Test1 />} />
            <Route path="/user-info" element={<ProfileUser />} />
            <Route path="/user-info/:id" element={<ProfileUser />} />
            <Route path="/about-us" element={<Test3 />} />
            <Route path="/timekeeping" element={<Timekeeping />} />
            <Route path="/timekeeping/register" element={<TimekeepingRegister />} />
            <Route path="/list-users" element={<ListUsers />} />
        </Routes>
    );

}

export default MainContent;