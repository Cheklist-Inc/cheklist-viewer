import SingleCheklistViewerForm from "./components/SingleCheklistViewerForm";
import CheklistViewer from "./components/CheklistViewer";
import { CheklistProvider } from "./context/CheklistContext";

export default function Home() {
  return (
    <div className="page-content-wrapper">

      <div>
        <h1 className="text-center">
          cheklist viewer
        </h1>
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
