import {
	CSSProperties,
	FC,
	RefObject,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import useDraggable from "../../core/hooks/useDraggable";
import { dragHandler, dragStartHandler } from "../../core/types";

const distance = 50;

const PointerItem: FC = () => {
	const innerRef = useRef<Element>(null);

	const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const onDragStart = useCallback<dragStartHandler>((e) => {
		if (innerRef.current) {
			const rect = innerRef.current.getBoundingClientRect();
			const style = getComputedStyle(innerRef.current);

			setOffset({
				x: e.clientX - rect.left + parseInt(style.marginLeft, 10),
				y: e.clientY - rect.top + parseInt(style.marginTop, 10),
			});
		}
	}, []);

	const onDrag = useCallback<dragHandler>(
		(e) => setCurrentPosition({ x: e.clientX, y: e.clientY }),
		[]
	);

	const [ref, dragStyle, dragged] = useDraggable({
		innerRef,
		index: "distanceItem",
		onDragStart,
		onDrag,
	});

	const style = useMemo<CSSProperties>(() => {
		if (dragged) {
			const x = currentPosition.x - offset.x;
			const y = currentPosition.y - offset.y;

			return {
				...dragStyle,
				left: distance * Math.ceil(x / distance),
				top: distance * Math.ceil(y / distance),
			};
		}

		return {};
	}, [
		currentPosition.x,
		currentPosition.y,
		dragStyle,
		dragged,
		offset.x,
		offset.y,
	]);

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="draggable"
			style={style}
		>
			Pointer item
		</div>
	);
};

export default PointerItem;
