// Contexts

interface IDndManagerContext {
	mouse: IMouse;
	draggable: IDndDraggableMember | null;
	prevDraggable: IDndDraggableMember | null;
	droppable: IDndDroppableMember | null;
	prevDroppable: IDndDroppableMember | null;
	addDraggableMemeber: (memeber: IDndDraggableMember) => void;
	removeDraggableMemeber: (memeber: IDndDraggableMember) => void;
	addDroppableMember: (memeber: IDndMember) => void;
	removeDroppableMember: (memeber: IDndMember) => void;
}

interface IDroppableContext {
	parent?: IDroppableContext;
	index: string;
	kind: Array<string>;
}

// Types

interface IMouse {
	x: number;
	y: number;
	dx: number;
	dy: number;
	left: boolean;
	pleft: boolean;
	event: MouseEvent;
}

interface IDndMember {
	index: string;
	kind: Array<string>;
	element: Element;
}

interface IDndDraggableMember extends IDndMember {
	source: string | null;
}

interface IDndDroppableMember extends IDndMember {
	targets: Array<string>;
}

// Draggable events

type dragStartHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember | null
) => void;

type dragHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember | null
) => void;

type dragEndHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember | null
) => void;

// Droppable events

type dragEnterHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember
) => void;

type dragLeaveHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember
) => void;

type dragOverHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember
) => void;

type dropHandler = (
	e: MouseEvent,
	draggable: IDndDraggableMember,
	droppable: IDndDroppableMember
) => void;
