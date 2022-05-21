import { FC, RefObject } from "react";
import useDraggable from "../../core/hooks/useDraggable";

const FreeItem: FC = () => {
	const [ref, style] = useDraggable({ index: "freeItem" });

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="draggable"
			style={style}
		>
			Free item
		</div>
	);
};

export default FreeItem;
