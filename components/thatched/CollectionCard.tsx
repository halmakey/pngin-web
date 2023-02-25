import Link from "next/link";
import { BorderButton } from "../buttons";

export default function CollectionCard({
  collection,
}: {
  collection: {
    id: string;
    name: string;
    endCallAt?: string | null;
  };
}) {
  return (
    <div className="border border-gray-400 p-4 gap-4 flex flex-col items-start">
      {collection.name}
      <Link href={`/submission/${collection.id}`}>
        <BorderButton>応募</BorderButton>
      </Link>
    </div>
  );
}
