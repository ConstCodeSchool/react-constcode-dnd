import { createContext } from "react";

const DroppableContext = createContext<IDroppableContext>({
	index: "",
	kind: [""],
});

export default DroppableContext;
