import { FC, ReactNode, RefObject, useCallback, useState } from "react";
import { DndManager, Draggable, Droppable } from "./core";
import useDraggable from "./core/hooks/useDraggable";
import useDroppable from "./core/hooks/useDroppable";

import "./style.css";

const data = {
	"1": ["a", "b"],
	"2": ["c", "d"],
	"3": ["e", "f"],
};

type keys = keyof typeof data;

const App: FC = () => {
	const [state, setState] = useState(data);

	const dragStartHandler = useCallback<dragStartHandler>((e, draggable) => {
		console.log("dragStartHandler", e, draggable);
	}, []);

	const dragHandler = useCallback<dragHandler>((e, draggable) => {
		console.log("dragHandler", e, draggable);
	}, []);

	const dragEndHandler = useCallback<dragEndHandler>((e, draggable) => {
		console.log("dragEndHandler", e, draggable);
	}, []);

	const dragEnterHandler = useCallback<dragEnterHandler>(
		(e, draggable, droppable) => {
			console.log("dragenter", draggable, droppable);
		},
		[]
	);

	const dragOverHandler = useCallback<dragOverHandler>(
		(e, draggable, droppable) => {
			console.log(draggable, droppable);
		},
		[]
	);

	const dragLeaveHandler = useCallback<dragOverHandler>(
		(e, draggable, droppable) => {
			console.log("dragleave", draggable, droppable);
		},
		[]
	);

	const dropHandler = useCallback<dropHandler>((e, draggable, droppable) => {
		console.log("drop", draggable, droppable);
	}, []);

	return (
		<>
			{(Object.keys(state) as keys[]).map((droppableKey) => (
				<Zone key={droppableKey} index={droppableKey}>
					{state[droppableKey].map((draggableKey) => (
						<Item key={draggableKey} index={draggableKey} />
					))}
				</Zone>
			))}
		</>
	);
};

export default App;

interface ItemProps {
	index: string;
}

const Item: FC<ItemProps> = ({ index }) => {
	const [ref, style] = useDraggable({ index });

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="draggable"
			data-draggable={index}
			style={style}
		>
			{index}
		</div>
	);
};

interface ZoneProps {
	index: string;
	children: ReactNode | ReactNode[];
}

const Zone: FC<ZoneProps> = ({ index, children }) => {
	const [Wrapper, ref] = useDroppable({ index });
	return (
		<Wrapper>
			<div
				ref={ref as RefObject<HTMLDivElement>}
				className="droppable"
				data-droppable={index}
			>
				{index}: {children}
			</div>
		</Wrapper>
	);
};
