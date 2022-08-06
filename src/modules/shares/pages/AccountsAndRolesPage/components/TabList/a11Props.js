export default function a11yProps(index) {
  return {
    id: `department-tab-${index}`,
    "aria-controls": `department-tabpanel-${index}`,
  };
}
