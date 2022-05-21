import {
	CSSProperties,
	FC,
	RefObject,
	useCallback,
	useMemo,
	useState,
} from "react";
import useDraggable from "../../core/hooks/useDraggable";
import { dragStartHandler } from "../../core/types";

const distance = 200;

const DistanceItem: FC = () => {
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

	const onDragStart = useCallback<dragStartHandler>(
		(e) => setStartPosition({ x: e.clientX, y: e.clientY }),
		[]
	);

	const [ref, dragStyle, dragged] = useDraggable({
		index: "distanceItem",
		onDragStart,
	});

	const style = useMemo<CSSProperties>(() => {
		if (dragged) {
			return {
				...dragStyle,
				left: Math.max(
					startPosition.x - distance / 2,
					Math.min(
						startPosition.x + distance / 2,
						dragStyle.left as number
					)
				),

				top: Math.max(
					startPosition.y - distance / 2,
					Math.min(
						startPosition.y + distance / 2,
						dragStyle.top as number
					)
				),
			};
		}

		return {};
	}, [dragStyle, dragged, startPosition.x, startPosition.y]);

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="draggable"
			style={style}
		>
			Distance item
		</div>
	);
};

export default DistanceItem;
