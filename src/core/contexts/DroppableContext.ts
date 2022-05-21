import { createContext } from "react";
import { IDroppableContext } from "../types";

const DroppableContext = createContext<IDroppableContext>({
	index: "",
	kind: [""],
});

export default DroppableContext;
