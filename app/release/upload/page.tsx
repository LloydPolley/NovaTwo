"use client";

import UploadMultiTrackForm from "../../../components/Forms/UploadMultiTrackForm";

function Uploads() {
  const { artworkFileLocation, name, releaseId } = JSON.parse(
    localStorage.getItem("release")
  );

  return (
    <UploadMultiTrackForm
      name={name}
      releaseId={releaseId}
      artworkFileLocation={artworkFileLocation}
    />
  );
}

export default Uploads;
