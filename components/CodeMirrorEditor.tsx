import React, {useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {createTheme} from '@uiw/codemirror-themes';
import {javascript} from '@codemirror/lang-javascript';
import {tags as t} from '@lezer/highlight';
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";

interface CodeMirrorEditorProps {
	fileName: string;
	onCodeChange: (code: string) => void;
	setVision: (vision: (p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void) => void;
}

const myTheme = createTheme({
	theme: 'dark',
	settings: {
		background: 'rgba(0, 0, 0, 0.5)',
		backgroundImage: '',
		foreground: '#ff00ff',
		caret: '#00ff00',
		selection: '#ff0000',
		selectionMatch: '#ff0000',
		lineHighlight: '#00ffff1a',
		gutterBackground: '#000000',
		gutterForeground: '#ff00ff66',
	},
	styles: [
		{tag: t.comment, color: '#ff00ff99'},
		{tag: t.variableName, color: '#00ff00'},
		{tag: [t.string, t.special(t.brace)], color: '#ff0000'},
		{tag: t.number, color: '#00ffff'},
		{tag: t.bool, color: '#ff00ff'},
		{tag: t.null, color: '#ff00ff'},
		{tag: t.keyword, color: '#00ff00'},
		{tag: t.operator, color: '#ff0000'},
		{tag: t.className, color: '#00ffff'},
		{tag: t.definition(t.typeName), color: '#ff00ff'},
		{tag: t.typeName, color: '#00ff00'},
		{tag: t.angleBracket, color: '#ff0000'},
		{tag: t.tagName, color: '#00ffff'},
		{tag: t.attributeName, color: '#ff00ff'},
	],
});

const extensions = [javascript({jsx: true})];

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({fileName, onCodeChange, setVision}) => {
	const [value, setValue] = React.useState('');
	const [visible, setVisible] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

	useEffect(() => {
		fetch(`/api/sendFile?fileName=${fileName}`)
			.then(response => response.text())
			.then(data => setValue(data))
			.catch(error => console.error('Error fetching the file:', error));
	}, [fileName]);

	const onChange = React.useCallback((val: any) => {
		//console.log('val:', val);
		setValue(val);
		//const func = new Function(val);
		//func();
	}, []);

	const handleClose = () => {
		setVisible(false);
	};

	const handleRunCode = () => {
		onCodeChange(value);
		try {
			const evaluatedVision = eval(value);
			setVision(() => evaluatedVision);
            setError(null);
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Syntax error in the code:', error);
                setError(`Syntax error: ${error.message}`);
				// Handle the syntax error appropriately here
			} else {
				console.error('Error evaluating code:', error);
                setError(`Error: ${error}`);
				// Handle other types of errors here
			}
		}
	};

	const handleToggleVisibility = () => {
		setVisible(!visible);
	};


	return (
		<div className="cm-theme">
			<button className="close-button" onClick={handleToggleVisibility}>-</button>
			{visible && (
				<>
					<CodeMirror
						value={value}
						theme={myTheme}
						extensions={extensions}
						onChange={onChange}
					/>
					<button className="run-button" onClick={handleRunCode}>⏵</button>
				</>
			)}
		</div>
	);
};
export default CodeMirrorEditor;