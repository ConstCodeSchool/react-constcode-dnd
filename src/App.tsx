import { FC, useState } from "react";

import "./style.css";

import Example01 from "./examples/Example01";
import Example02 from "./examples/Example02";
import Example03 from "./examples/Example03";
import Example04 from "./examples/Example04";

const examples = [Example01, Example02, Example03, Example04];

const App: FC = () => {
	const [index, setIndex] = useState(3);
	const Example = examples[index];

	return (
		<>
			<select
				value={index}
				onChange={(e) => setIndex(parseInt(e.target.value, 10))}
			>
				{examples.map((_, index) => (
					<option key={index} value={index}>
						Пример {index + 1}
					</option>
				))}
			</select>
			<Example />
		</>
	);
};

export default App;
