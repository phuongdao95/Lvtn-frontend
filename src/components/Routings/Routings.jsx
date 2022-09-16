import { Route, Routes } from "react-router";

import WorkFlows from "../../modules/approve-workflow/user/WorkFlows";
import MyRequests from "../../modules/approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../../modules/approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan";

import UserNghiPhep from "../../modules/approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan";

import ProfileUser from "../../modules/shares/pages/ProfileUser/ProfileUser";
import ListUsers from "../../modules/shares/pages/ListUsers/ListUsers";
import MyPayslipPage from "../../modules/salary-management/pages/MyPayslipPage/MyPayslipPage";

import Timekeeping from "../../modules/check-day/pages/Timekeeping";

import DABList from "../../modules/salary-management/pages/DABList/DABList";
import DABTemplateList from "../../modules/salary-management/pages/DABTemplateList/DABTemplateList";
import FormulaList from "../../modules/salary-management/pages/FormulaList/FormulaList";
import SalaryList from "../../modules/salary-management/pages/SalaryList";
import Payroll from "../../modules/salary-management/pages/PayRoll";

import GroupList from "../../modules/administration/pages/GroupList/GroupList";
import PermissionList from "../../modules/administration/pages/PermissionList/PermissionList";
import UserList from "../../modules/administration/pages/UserList";
import RoleList from "../../modules/administration/pages/RoleList/RoleList";
import DepartmentList from "../../modules/administration/pages/DepartmentList";
import TeamList from "../../modules/administration/pages/TeamList";
import Login from "../../modules/shares/pages/Login";
import AccountsAndRolesPage from "../../modules/shares/pages/AccountsAndRolesPage/AccountsAndRolesPage";

export default function Routings() {
    return <Routes>
        <Route path="login" element={<Login />} />


        <Route path="/approve-workflows" element={<WorkFlows />} />
        <Route path="/approve-workflows/my-requests" element={<MyRequests />} />

        <Route exact path="/approve-workflows/user-nghi-phep" element={<UserNghiPhep />} />
        <Route exact path="/approve-workflows/user-nghi-thai-san" element={<UserNghiThaiSan />} />

        <Route exact path="/approve-workflows/config-nghi-phep" element={<ConfigNghiPhep />} />
        <Route exact path="/approve-workflows/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />

        <Route path="/check-in" element={<Timekeeping />} />

        <Route path="/list-users" element={<ListUsers />} />

        {/* Administration module */}
        <Route path="/user" element={<UserList />} />
        <Route path="/role" element={<RoleList />} />
        <Route path="/group" element={<GroupList />} />
        <Route path="/permission" element={<PermissionList />} />
        <Route path="/department" element={<DepartmentList />} />
        <Route path="/team" element={<TeamList />} />

        {/* Salary Management Module */}
        <Route path="/salary" element={<SalaryList />} />
        <Route path="/payslip" element={<MyPayslipPage />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/dab" element={<DABList />} />
        <Route path="/dab-template" element={<DABTemplateList />} />
        <Route path="/formula" element={<FormulaList />} />

        {/* <Route path="play_ground" element={<BasicTable />} /> */}


        {/* Legacy components */}
        <Route path="/account-role" element={<AccountsAndRolesPage />} />
    </Routes>
}