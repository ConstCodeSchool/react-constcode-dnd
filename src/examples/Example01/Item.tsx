import { CSSProperties, FC, RefObject, useMemo } from "react";
import useDraggable from "../../core/hooks/useDraggable";

interface ItemProps {
	index: string;
}

const Item: FC<ItemProps> = ({ index }) => {
	const [ref, dragStyle, dragged] = useDraggable({ index });

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
				{index}
			</div>
		</>
	);
};

export default Item;
