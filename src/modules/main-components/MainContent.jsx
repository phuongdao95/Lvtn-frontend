import { Route, Routes } from "react-router";
import { Test1, Test2, Test3 } from "../approve-workflow/Test";

const MainContent = () => {

    return (
        <Routes>
            <Route path="/" element={<Test1 />} />
            <Route path="/user-info" element={<Test2 />} />
            <Route path="/about-us" element={<Test3 />} />
        </Routes>
    );

}

export default MainContent;