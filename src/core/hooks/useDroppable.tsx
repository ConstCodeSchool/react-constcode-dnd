import {
	createRef,
	FC,
	ReactNode,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import DroppableContext from "../contexts/DroppableContext";
import useDndManager from "../hooks/useDndManager";
import useDroppableContext from "../hooks/useDroppableContext";
import useKind from "../hooks/useKind";

interface useDroppableProps {
	innerRef?: RefObject<Element>;
	index: string;
	kind?: string[];

	onDragEnter?: dragEnterHandler;
	onDragLeave?: dragLeaveHandler;
	onDragOver?: dragOverHandler;
	onDrop?: dropHandler;
}

const kindDefault = [""];

const useDroppable = ({
	innerRef,
	index,
	kind = kindDefault,

	onDragEnter,
	onDragLeave,
	onDragOver,
	onDrop,
}: useDroppableProps): [
	FC<{ children: ReactNode | ReactNode[] }>,
	RefObject<Element>
] => {
	const [zonned, setZonned] = useState(false);

	const {
		mouse,
		draggable,
		prevDraggable,
		droppable,
		prevDroppable,
		addDroppableMember,
		removeDroppableMember,
	} = useDndManager();
	const parent = useDroppableContext();

	const myKind = useKind(kind);
	const ref = useMemo(
		() => (innerRef ? innerRef : createRef<Element>()),
		[innerRef]
	);

	const value = useMemo(
		() => ({ index, parent, kind: myKind }),
		[index, parent, myKind]
	);

	useEffect(() => {
		if (ref.current) {
			const { current } = ref;

			const member: IDndMember = {
				index,
				kind: myKind,
				element: current,
			};

			addDroppableMember(member);

			return () => removeDroppableMember(member);
		}
	}, [addDroppableMember, index, myKind, ref, removeDroppableMember]);

	useEffect(() => {
		if (
			droppable &&
			draggable &&
			droppable.element === ref.current &&
			!zonned &&
			mouse.dx | mouse.dy
		) {
			setZonned(true);

			if (onDragEnter) {
				onDragEnter(mouse.event, draggable, droppable);
			}
		}
	}, [
		draggable,
		droppable,
		mouse.dx,
		mouse.dy,
		mouse.event,
		onDragEnter,
		ref,
		zonned,
	]);

	useEffect(() => {
		if (
			draggable &&
			droppable &&
			zonned &&
			onDragOver &&
			mouse.dx | mouse.dy
		) {
			onDragOver(mouse.event, draggable, droppable);
		}
	}, [
		draggable,
		droppable,
		mouse.dx,
		mouse.dy,
		mouse.event,
		onDragOver,
		zonned,
	]);

	useEffect(() => {
		if (
			zonned &&
			!droppable &&
			draggable &&
			prevDroppable &&
			prevDroppable.element === ref.current
		) {
			setZonned(false);

			if (onDragLeave) {
				onDragLeave(mouse.event, draggable, prevDroppable);
			}
		}
	}, [
		draggable,
		droppable,
		mouse.event,
		onDragLeave,
		prevDroppable,
		ref,
		zonned,
	]);

	useEffect(() => {
		if (
			zonned &&
			!draggable &&
			prevDraggable &&
			!mouse.left &&
			mouse.pleft
		) {
			setZonned(false);

			if (
				prevDroppable &&
				prevDroppable.element === ref.current &&
				onDrop
			) {
				onDrop(mouse.event, prevDraggable, prevDroppable);
			}
		}
	}, [
		draggable,
		mouse.event,
		mouse.left,
		mouse.pleft,
		onDrop,
		prevDraggable,
		prevDroppable,
		ref,
		zonned,
	]);

	const Wrapper = useCallback<FC<{ children: ReactNode | ReactNode[] }>>(
		({ children }) => (
			<DroppableContext.Provider value={value}>
				{children}
			</DroppableContext.Provider>
		),
		[value]
	);

	return [Wrapper, ref];
};

export default useDroppable;
