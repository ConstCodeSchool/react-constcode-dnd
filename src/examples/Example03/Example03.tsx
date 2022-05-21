import { FC } from "react";
import { DndManager } from "../../core";
import FreeItem from "./FreeItem";
import DistanceItem from "./DistanceItem";
import PointerItem from "./PointerItem";

const Example03: FC = () => {
	return (
		<DndManager>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<FreeItem />
					<DistanceItem />
					<PointerItem />
				</div>
			</div>
		</DndManager>
	);
};

export default Example03;
