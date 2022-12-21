import './style.css';

const BreadCrumb = ({ status = 1 }) => {
    // status = 1 | 2 | 3 | 4 -> Submited | Approved | Denied | Canceled
    return (<ul className="custom-breadcrumb">
        <li className={status === 0 ? "blue-crumb first-item" : "faded-crumb first-item"}>Đã đệ trình</li>
        <li className={status === 1 ? "blue-crumb" : "faded-crumb"}>Đã được chấp thuận</li>
        <li className={status === 2 ? "blue-crumb" : "faded-crumb"}>Đã bị từ chối</li>
        <li className={status === 3 ? "blue-crumb" : "faded-crumb"}>Bị hủy</li>
    </ul>);
}

export default BreadCrumb;