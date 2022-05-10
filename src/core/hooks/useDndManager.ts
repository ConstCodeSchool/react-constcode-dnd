import { useContext } from "react";
import DndManagerContext from "../contexts/DndManagerContext";

const useDndManager = () => useContext(DndManagerContext);

export default useDndManager;
