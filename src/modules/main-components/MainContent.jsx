import { Route, Routes } from "react-router";

import WorkFlows from "../approve-workflow/user/WorkFlows";
import MyRequests from "../approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../approve-workflow/nghi-thai-san/ConfigNghiThaiSan";


import UserNghiPhep from "../approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../approve-workflow/nghi-thai-san/UserNghiThaiSan";

import ProfileUser from "../shares/pages/ProfileUser/ProfileUser";
import ListUsers from "../shares/pages/ListUsers/ListUsers";
import ManageFormulaPage from "../salary-management/pages/ManageFormulaPage/ManageFormulaPage";
import ManageSalaryPage from "../salary-management/pages/ManageSalaryPage/ManageSalaryPage";
import ManageDeductionAllowanceBonusPage from "../salary-management/pages/ManageDeductionAllowanceBonusPage/ManageDeductionAllowanceBonusPage";
import ManageDeductionAllowanceBonusTemplatePage from "../salary-management/pages/ManageDeductionAllowanceBonusTemplatePage/ManageDeductionAllowanceBonusTemplatePage";
import ManagePayrollRecordPage from "../salary-management/pages/ManagePayrollRecordPage/ManagePayrollRecordPage";
import MyPayslipPage from "../salary-management/pages/MyPayslipPage/MyPayslipPage";


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

            <Route path="/list-users" element={<ListUsers />} />

            <Route path="/list-users" element={<ListUsers />} />

            <Route path="/formula" element={<ManageFormulaPage />} />
            <Route path="/salary" element={<ManageSalaryPage />} />
            <Route path="/payslip" element={<MyPayslipPage />} />
            <Route path="/payroll" element={<ManagePayrollRecordPage />} />
            <Route path="/deduction-allowance-bonus" element={<ManageDeductionAllowanceBonusPage />} />
            <Route path="/deduction-allowance-bonus-template" element={<ManageDeductionAllowanceBonusTemplatePage />} />
        </Routes >
    );

}

export default MainContent;