"use client";

import SingleCheklistViewerForm from "./SingleCheklistViewerForm";
import CheklistViewer from "./CheklistViewer";
import { CheklistProvider } from "../context/CheklistContext";

export default function HomeClient() {
  return (
    <CheklistProvider>
      <div>
        <SingleCheklistViewerForm />
      </div>

      <div>
        <CheklistViewer />
      </div>
    </CheklistProvider>
  );
}
