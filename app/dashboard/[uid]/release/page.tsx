import CreateReleaseForm from "@/components/Forms/CreateRelease";
import Form from "@/components/Forms/Form/Form";
import PickerForm from "@/components/Forms/PickerForm";
import SelectRelease from "@/components/Forms/SelectRelease";
import UploadMultiTrackForm from "@/components/Forms/UploadMultiTrackForm";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { releases } from "@/db/schema";

const TITLES = [
  "Create or Add",
  "Create release",
  "Select Release",
  "Upload tracks",
];

export default async function ReleasePage({ params, searchParams }) {
  const releasesList = await db
    .select()
    .from(releases)
    .where(eq(releases.uid, params?.uid));

  const { s, t, i } = searchParams;

  console.log("releaseList", releasesList);

  return (
    <div className="flex flex-1 flex-col">
      <Form title={t || TITLES[s - 1]}>
        {s === "1" && <PickerForm />}
        {s === "2" && <CreateReleaseForm />}
        {s === "3" && <SelectRelease releases={releasesList} />}
        {s === "4" && <UploadMultiTrackForm release={releasesList[i]} />}
      </Form>
    </div>
  );
}
