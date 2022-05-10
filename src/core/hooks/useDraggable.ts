import {
	createRef,
	CSSProperties,
	RefObject,
	useEffect,
	useMemo,
	useState,
} from "react";
import useDndManager from "../hooks/useDndManager";
import useDroppableContext from "../hooks/useDroppableContext";
import useKind from "../hooks/useKind";
import { isIntersaction } from "../util";

interface useDraggableProps {
	innerRef?: RefObject<Element>;
	index: string;
	kind?: string[];

	onDragStart?: dragStartHandler;
	onDrag?: dragHandler;
	onDragEnd?: dragEndHandler;
}

const kindDefault = [""];

const startselectHandler = (e: Event) => {
	e.preventDefault();
	e.stopPropagation();
};

const useDraggable = ({
	innerRef,
	index,
	kind = kindDefault,

	onDragStart,
	onDrag,
	onDragEnd,
}: useDraggableProps): [RefObject<Element>, CSSProperties] => {
	const [dragged, setDragged] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const {
		mouse,
		droppable,
		draggable,
		prevDraggable,
		addDraggableMemeber,
		removeDraggableMemeber,
	} = useDndManager();

	const myKind = useKind(kind);
	const ref = useMemo(
		() => (innerRef ? innerRef : createRef<Element>()),
		[innerRef]
	);

	const droppableParent = useDroppableContext();

	const source = useMemo(() => {
		let parent: IDroppableContext | undefined = droppableParent;

		while (parent) {
			if (isIntersaction(parent.kind, myKind)) {
				return parent.index;
			}

			parent = parent.parent;
		}

		return null;
	}, [droppableParent, myKind]);

	const style = useMemo<CSSProperties>(() => {
		if (dragged) {
			return {
				position: "fixed",
				top: mouse.y - offset.y,
				left: mouse.x - offset.x,
			};
		}

		return {};
	}, [dragged, mouse.x, mouse.y, offset.x, offset.y]);

	useEffect(() => {
		if (ref.current) {
			const { current } = ref;

			const memeber: IDndDraggableMember = {
				index,
				kind: myKind,
				element: current,
				source,
			};

			addDraggableMemeber(memeber);
			current.addEventListener("selectstart", startselectHandler);

			return () => {
				removeDraggableMemeber(memeber);
				current.removeEventListener("selectstart", startselectHandler);
			};
		}
	}, [
		addDraggableMemeber,
		index,
		myKind,
		ref,
		removeDraggableMemeber,
		source,
	]);

	useEffect(() => {
		if (
			draggable &&
			draggable.element === ref.current &&
			!dragged &&
			mouse.dx | mouse.dy
		) {
			setDragged(true);

			const rect = ref.current.getBoundingClientRect();
			const style = getComputedStyle(ref.current);

			setOffset({
				x: mouse.x - rect.left + (parseInt(style.marginLeft) || 0),
				y: mouse.y - rect.top + (parseInt(style.marginTop) || 0),
			});

			window.addEventListener("selectstart", startselectHandler);

			if (onDragStart) {
				onDragStart(mouse.event, draggable, droppable);
			}
		}
	}, [
		draggable,
		droppable,
		dragged,
		mouse.dx,
		mouse.dy,
		mouse.event,
		mouse.x,
		mouse.y,
		onDragStart,
		ref,
	]);

	useEffect(() => {
		if (draggable && dragged && mouse.dx | mouse.dy && onDrag) {
			onDrag(mouse.event, draggable, droppable);
		}
	}, [
		draggable,
		dragged,
		mouse.dx,
		mouse.dy,
		mouse.event,
		onDrag,
		droppable,
	]);

	useEffect(() => {
		if (dragged && !draggable && prevDraggable) {
			setDragged(false);

			window.removeEventListener("selectstart", startselectHandler);

			if (onDragEnd) {
				onDragEnd(mouse.event, prevDraggable, droppable);
			}
		}
	}, [draggable, dragged, mouse.event, onDragEnd, prevDraggable, droppable]);

	return [ref, style];
};

export default useDraggable;
