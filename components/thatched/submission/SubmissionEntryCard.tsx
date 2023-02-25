import { Collection } from "@/types/api/collection";

export function SubmissionEntryCard({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor="name">投稿者名: </label>
      <input type="text" defaultValue="テスト"></input>
    </div>
  );
}
