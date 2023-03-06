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
    <div className="flex flex-col items-start gap-4 border border-gray-400 p-4">
      {collection.name}
      <Link href={`/submission/${collection.id}`}>
        <BorderButton>応募</BorderButton>
      </Link>
    </div>
  );
}
