import CustomCharts from "./CustomBarChart";

export default function Dashboard() {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: 500,
        height: 500
    }}>
        <CustomCharts />
        <CustomCharts />
        <CustomCharts />
    </div>
}