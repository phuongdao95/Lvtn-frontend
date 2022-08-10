import { Route, Routes } from "react-router";
import { Test1, Test2, Test3 } from "../approve-workflow/Test";
import Timekeeping from "../shares/timekeeping/Timekeeping";
import TimekeepingRegister from "../shares/timekeeping/TimekeepingRegister";

const MainContent = () => {

    return (
        <Routes>
            <Route path="/" element={<Test1 />} />
            <Route path="/user-info" element={<Test2 />} />
            <Route path="/about-us" element={<Test3 />} />
            <Route path="/timekeeping" element={<Timekeeping />} />
            <Route path="/timekeeping/register" element={<TimekeepingRegister />} />
        </Routes>
    );

}

export default MainContent;