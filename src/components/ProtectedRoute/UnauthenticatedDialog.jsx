import { useNavigate } from "react-router";
import InfoDialog from "../Dialog/InfoDialog";

export default function UnauthenticatedDialog(cb) {
    const navigate = useNavigate();

    return <InfoDialog title={"Unauthenticated Error"}
        message={"Bạn chưa đăng nhập, vui lòng đăng nhập"}
        closeDialogCb={() => { navigate("/") }}
    />
}