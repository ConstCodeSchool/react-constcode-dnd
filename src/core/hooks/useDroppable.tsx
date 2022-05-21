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
import {
	dragEnterHandler,
	dragLeaveHandler,
	dragOverHandler,
	dropHandler,
	IDndMember,
} from "../types";

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
	RefObject<Element>,
	boolean
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

		onDragEnter: managerOnDragEnter,
		onDragLeave: managerOnDragLeave,
		onDragOver: managerOnDragOver,
		onDrop: managerOnDrop,
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

			if (managerOnDragEnter) {
				managerOnDragEnter(mouse.event, draggable, droppable);
			}
		}
	}, [
		draggable,
		droppable,
		mouse.dx,
		mouse.dy,
		mouse.event,
		onDragEnter,
		managerOnDragEnter,
		ref,
		zonned,
	]);

	useEffect(() => {
		if (draggable && droppable && zonned && mouse.dx | mouse.dy) {
			if (onDragOver) {
				onDragOver(mouse.event, draggable, droppable);
			}

			if (managerOnDragOver) {
				managerOnDragOver(mouse.event, draggable, droppable);
			}
		}
	}, [
		draggable,
		droppable,
		mouse.dx,
		mouse.dy,
		mouse.event,
		onDragOver,
		managerOnDragOver,
		zonned,
	]);

	useEffect(() => {
		if (
			zonned &&
			draggable &&
			prevDroppable &&
			prevDroppable.element === ref.current &&
			(!droppable || droppable.element !== ref.current)
		) {
			setZonned(false);

			if (onDragLeave) {
				onDragLeave(mouse.event, draggable, prevDroppable);
			}

			if (managerOnDragLeave) {
				managerOnDragLeave(mouse.event, draggable, prevDroppable);
			}
		}
	}, [
		draggable,
		droppable,
		mouse.event,
		onDragLeave,
		managerOnDragLeave,
		prevDroppable,
		ref,
		zonned,
	]);

	useEffect(() => {
		if (zonned && !draggable && prevDraggable) {
			setZonned(false);

			if (prevDroppable && prevDroppable.element === ref.current) {
				if (onDrop) {
					onDrop(mouse.event, prevDraggable, prevDroppable);
				}

				if (managerOnDrop) {
					managerOnDrop(mouse.event, prevDraggable, prevDroppable);
				}
			}
		}
	}, [
		draggable,
		managerOnDrop,
		mouse.event,
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

	return [Wrapper, ref, zonned];
};

export default useDroppable;
