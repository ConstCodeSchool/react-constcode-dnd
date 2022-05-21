import { createContext } from "react";
import {
	IDndManagerContext,
	IMouse,
	IDndDraggableMember,
	IDndMember,
} from "../types";

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
