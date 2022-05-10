import { useContext } from "react";
import DroppableContext from "../contexts/DroppableContext";

const useDroppableContext = () => useContext(DroppableContext);

export default useDroppableContext;
