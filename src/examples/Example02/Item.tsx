import { CSSProperties, FC, RefObject, useMemo, useRef } from "react";
import useDraggable from "../../core/hooks/useDraggable";

interface ItemProps {
	index: string;
}

const Item: FC<ItemProps> = ({ index }) => {
	const handle1 = useRef<Element>(null);
	const handle2 = useRef<Element>(null);

	const [ref, dragStyle, dragged] = useDraggable({
		index,
		handles: [handle1, handle2],
	});

	const style = useMemo<CSSProperties>(() => {
		if (dragged) {
			return {
				borderColor: "green",
				borderStyle: "dashed",
			};
		}

		return {};
	}, [dragged]);

	const ghost = useMemo(() => {
		if (dragged && ref.current) {
			const style = getComputedStyle(ref.current);

			return (
				<div
					style={{
						marginLeft: style.marginLeft,
						borderLeft: style.borderLeft,
						paddingLeft: style.paddingLeft,
						width: style.width,
						paddingRight: style.paddingRight,
						borderRight: style.borderRight,
						marginRight: style.marginRight,

						marginTop: style.marginTop,
						borderTop: style.borderTop,
						paddingTop: style.paddingTop,
						height: style.height,
						paddingBottom: style.paddingBottom,
						borderBottom: style.borderBottom,
						marginBottom: style.marginBottom,

						borderColor: "rgba(0, 0, 0, 0)",
						color: "rgba(0, 0, 0, 0)",
						display: "inline-block",
					}}
				>
					1
				</div>
			);
		}

		return null;
	}, [dragged, ref]);

	return (
		<>
			{ghost}
			<div
				ref={ref as RefObject<HTMLDivElement>}
				style={{
					...style,
					...dragStyle,
				}}
				className="draggable"
				data-index={index}
			>
				<div
					style={{ width: 10, height: 10, backgroundColor: "green" }}
					ref={handle1 as RefObject<HTMLDivElement>}
				></div>
				{index}
				<div
					style={{ width: 10, height: 10, backgroundColor: "green" }}
					ref={handle2 as RefObject<HTMLDivElement>}
				></div>
			</div>
		</>
	);
};

export default Item;
