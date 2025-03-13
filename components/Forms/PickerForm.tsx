import Link from "next/link";

const options = [
  {
    label: "Create",
    url: "2",
    desc: "Create release and add tracks into it",
  },
  { label: "Add", url: "3", desc: "Add tracks to releases" },
];

function PickerForm() {
  return (
    <div className="gap-6 w-full">
      {options.map((option) => {
        const { label, url, desc } = option;
        return (
          <Link href={`?s=${url}`} key={url}>
            <button className="w-full h-auto flex flex-col bg-stone-950 rounded-lg p-10 text-left mb-4">
              <span className="text-2xl font-semibold mb-2">{label}</span>
              <span className="text-sm text-muted-foreground">{desc}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
}

export default PickerForm;
