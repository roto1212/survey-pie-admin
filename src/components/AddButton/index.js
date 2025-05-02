import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useState } from "react";
import styled from "styled-components";
function AddButton({ addQuestion }) {
	const [open, setOpen] = useState(false);
	const hide = () => setOpen(false);
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};
	return (
		<AddButtonWrapper>
			<Popover
				content={
					<div style={{ display: "flex", flexDirection: "column" }}>
						<Button onClick={hide}>Close</Button>
						<Button
							type="text"
							onClick={() => {
								hide();
								addQuestion("select");
							}}
						>
							객관식
						</Button>
						<Button
							type="text"
							onClick={() => {
								hide();
								addQuestion("text");
							}}
						>
							단답식
						</Button>
						<Button
							type="text"
							onClick={() => {
								hide();
								addQuestion("textarea");
							}}
						>
							서술식
						</Button>
					</div>
				}
				placement="right"
				trigger="click"
				open={open}
				onOpenChange={handleOpenChange}
			>
				<IconButton>
					<PlusCircleOutlined />
				</IconButton>
			</Popover>
		</AddButtonWrapper>
	);
}

const AddButtonWrapper = styled.div`
  text-align: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 2.5rem;
  cursor: pointer;
`;

export default AddButton;
