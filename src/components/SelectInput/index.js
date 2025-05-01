import { Checkbox } from "antd";

function SelectInput({ options }) {
	return <Checkbox.Group style={{ display: "flex", flexDirection: "column", gap: "1rem" }} options={options.items} />;
}

export default SelectInput;