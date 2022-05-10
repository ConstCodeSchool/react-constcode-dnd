import { createContext } from "react";

const DndManagerContext = createContext<IDndManagerContext>({
	mouse: {} as IMouse,
	draggable: null,
	prevDraggable: null,
	droppable: null,
	prevDroppable: null,
	addDraggableMemeber: (memeber: IDndDraggableMember) => {},
	removeDraggableMemeber: (memeber: IDndDraggableMember) => {},
	addDroppableMember: (member: IDndMember) => {},
	removeDroppableMember: (member: IDndMember) => {},
});

export default DndManagerContext;
