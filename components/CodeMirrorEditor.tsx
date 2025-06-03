import styles from "./../styles/CodeMirrorEditor.module.css";
import React, {useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Extension } from '@codemirror/state';
import { EditorView } from "@codemirror/view";
import {createTheme} from '@uiw/codemirror-themes';
import {javascript} from '@codemirror/lang-javascript';
import {tags as t} from '@lezer/highlight';

import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import ScreenRecorder from "../src/utils/ScreenRecorder";

interface CodeMirrorEditorProps {
	fileName: string;
	onCodeChange: (code: string) => void;
	setVision: (vision: (p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void) => void;
}

const myTheme: Extension = createTheme({
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

const extensions = [javascript({jsx: true}), EditorView.lineWrapping];

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({fileName, onCodeChange, setVision}) => {
	const [value, setValue] = React.useState('');
	const [visible, setVisible] = React.useState(true);
	const [recVisible, setRecVisible] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const mediaRecorderRef: React.MutableRefObject<MediaRecorder | null> = React.useRef<MediaRecorder | null>(null);
	const [ready, setReady] = React.useState(false);
	const [video, setVideo] = React.useState();
	const [gif, setGif] = React.useState();
	const screenRecorder = new ScreenRecorder();

	const load: () => Promise<void> = async (): Promise<void> => {
	    await screenRecorder.loadFFmpeg();
	    setReady(true);
	}

    useEffect((): void => {
        load();
    }, [])

	useEffect((): void => {
		fetch(`/api/sendFile?fileName=${fileName}`)
			.then(response => response.text())
			.then(data => setValue(data))
			.catch(error => console.error('Error fetching the file:', error));
	}, [fileName]);

	const onChange: (val: any) => void = React.useCallback((val: any): void => {
		//console.log('val:', val);
		setValue(val);
		//const func = new Function(val);
		//func();
	}, []);

	const handleRunCode: () => void = (): void =>{
		onCodeChange(value);
		try {
			const evaluatedVision: any = eval(value);
			setVision((): any => evaluatedVision);
            setError(null);
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.error('Syntax error in the code:', error);
                setError(`Syntax error: ${error.message}`);
			} else {
				console.error('Error evaluating code:', error);
                setError(`Error: ${error}`);
			}
		}
	};

	const handleToggleVisibility: () => void = (): void => {
		setVisible(!visible);
	};

	const handleGif: () => Promise<void> = async (): Promise<void> => {
		screenRecorder.loadFFmpeg().then(async (): Promise<void> => {
			console.log("Recording started");
			let stream: MediaStream = await screenRecorder.recordScreen();
		    mediaRecorderRef.current = screenRecorder.createRecorder(stream, true, "gif");
			handleToggleVisibility();
		});
	}

	const handleRecScreen: () => Promise<void> = async (): Promise<void> => {
		screenRecorder.loadFFmpeg().then(async (): Promise<void> => {
			console.log("Recording started");
			let stream: MediaStream = await screenRecorder.recordScreenWithAudio();
			mediaRecorderRef.current = screenRecorder.createRecorder(stream, false, "video");
			setRecVisible(false);
			handleToggleVisibility();
		});

	}

	const handleStopRec: () => void = (): void => {
		if (mediaRecorderRef.current) {
	      console.log(mediaRecorderRef.current);
	      mediaRecorderRef.current.stop();
	      console.log("Recording stopped");
	      setRecVisible(true);
	    } else {
	      console.error("mediaRecorder is not initialized");
	    }
	}

	let toggleRecScreenButton: any = recVisible ?
		<button className={styles.rec_button} onClick={handleRecScreen}>REC</button> : <button className={styles.stop_button} onClick={handleStopRec}>STOP</button> ;

	return ready ? (
		<div className={styles.cm_theme}>
			<button className={styles.close_button} onClick={handleToggleVisibility}>-</button>
			{visible && (
				<>
					<CodeMirror
						className={styles.cm_editor}
						value={value}
						theme={myTheme}
						extensions={extensions}
						onChange={onChange}/>
					<button className={styles.gif_button} onClick={handleGif}>GIF</button>
					{toggleRecScreenButton}
					<button className={styles.run_button} onClick={handleRunCode}>RUN</button>
				</>
			)}
		</div>
	) : (
    <div className={styles.cm_theme}>
      <p>Loading...</p>
    </div>
  );
};
export default CodeMirrorEditor;