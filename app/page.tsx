import SingleCheklistViewerForm from "./components/SingleCheklistViewerForm";
import CheklistViewer from "./components/CheklistViewer";
import { CheklistProvider } from "./context/CheklistContext";

export default function Home() {
  return (
    <div className="page-content-wrapper">

      <div>
        <h1 className="text-center">
          cheklist entry viewer
        </h1>
        <div className="text-center text-sm text-gray-400">
          sample app for the cheklist.io api. fork it <a href="https://github.com/Cheklist-Inc/cheklist-viewer" target="_blank" rel="noopener noreferrer">here</a>.
        </div>
      </div>

      <CheklistProvider>
        <div>
          <SingleCheklistViewerForm />
        </div>

        <div>
          <CheklistViewer />
        </div>
      </CheklistProvider>

    </div>
  );
}
