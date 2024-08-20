"use client";

import UploadMultiTrackForm from "../../components/forms/UploadMultiTrackForm/UploadMultiTrackForm";
import CreateReleaseForm from "../../components/forms/CreateRelease/CreateRelease";
import { useState } from "react";

function Uploads() {
  const [release, setRelease] = useState({
    created: false,
    releaseId: "",
    artwork: "",
  });

  return (
    <div>
      {!release?.created ? (
        <CreateReleaseForm setRelease={setRelease} />
      ) : (
        <UploadMultiTrackForm
          releaseId={release?.releaseId}
          artworkUrl={release?.artwork}
        />
      )}
    </div>
  );
}

export default Uploads;
