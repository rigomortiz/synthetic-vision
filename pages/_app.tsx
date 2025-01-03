import "../styles/globals.css";
import {AppProps} from "next/app";
import MainLayout from "./mainLayout";

function MyApp({Component, pageProps}: AppProps) {

	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	);
}

export default MyApp;