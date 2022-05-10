import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import DndManagerContext from "../contexts/DndManagerContext";
import useDraggableMemebers from "../hooks/useDraggableMemebrs";
import useDroppableMemebrs from "../hooks/useDroppableMembers";
import useElementsUnder from "../hooks/useElementsUnder";
import useMouse from "../hooks/useMouse";
import { isEqualArray, isIntersaction } from "../util";

interface DndManagerProps {
	children: ReactNode | ReactNode[];
}

const DndManager: FC<DndManagerProps> = ({ children }) => {
	const mouse = useMouse();
	const elements = useElementsUnder(mouse.x, mouse.y);

	const [draggableMembers, addDraggableMemeber, removeDraggableMemeber] =
		useDraggableMemebers();

	const [droppableMemebrs, addDroppableMember, removeDroppableMember] =
		useDroppableMemebrs();

	const [draggable, setDraggable] = useState<IDndDraggableMember | null>(
		null
	);

	const [prevDraggable, setPrevDraggable] =
		useState<IDndDraggableMember | null>(null);

	const [droppable, setDroppable] = useState<IDndDroppableMember | null>(
		null
	);

	const [prevDroppable, setPrevDroppable] =
		useState<IDndDroppableMember | null>(null);

	useEffect(() => {
		if (
			mouse.left &&
			!mouse.pleft &&
			elements.length &&
			draggableMembers.length
		) {
			for (const element of elements) {
				for (const member of draggableMembers) {
					if (member.element === element) {
						setDraggable(member);
					}
				}
			}
		}
	}, [draggableMembers, elements, mouse.left, mouse.pleft]);

	useEffect(() => {
		if (!mouse.left && mouse.pleft) {
			setDraggable(null);
			setDraggable(null);
		}
	}, [mouse.left, mouse.pleft]);

	useEffect(() => {
		if (draggable) {
			for (const element of elements) {
				for (const member of droppableMemebrs) {
					if (
						element === member.element &&
						isIntersaction(member.kind, draggable.kind)
					) {
						setDroppable({ ...member, targets: [] });
						return;
					}
				}
			}

			setDroppable(null);
		}
	}, [draggable, droppableMemebrs, elements]);

	const value = useMemo(
		() => ({
			mouse,
			draggable,
			prevDraggable,
			droppable,
			prevDroppable,
			addDraggableMemeber,
			removeDraggableMemeber,
			addDroppableMember,
			removeDroppableMember,
		}),
		[
			mouse,
			draggable,
			prevDraggable,
			droppable,
			prevDroppable,
			addDraggableMemeber,
			removeDraggableMemeber,
			addDroppableMember,
			removeDroppableMember,
		]
	);

	useEffect(() => setPrevDraggable(draggable), [draggable]);
	useEffect(() => setPrevDroppable(droppable), [droppable]);

	useEffect(() => {
		if (droppable) {
			const targets: string[] = [];

			for (const element of elements) {
				for (const member of draggableMembers) {
					if (
						member.element === element &&
						member.source === droppable.index
					) {
						targets.push(member.index);
					}
				}
			}

			if (!isEqualArray(targets, droppable.targets)) {
				setDroppable(
					(droppable) =>
						({ ...droppable, targets } as IDndDroppableMember)
				);
			}
		}
	}, [draggableMembers, droppable, elements]);

	return (
		<DndManagerContext.Provider value={value}>
			{children}
		</DndManagerContext.Provider>
	);
};

export default DndManager;
