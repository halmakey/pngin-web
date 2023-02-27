import { FillButton } from "@/components/buttons";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { Collection } from "@/types/model";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
} from "react";

export function SubmissionEntryCard({
  collection,
}: {
  collection: Collection;
}) {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const creditRef = useRef<HTMLInputElement>(null);
  const { setFile: setCreditFile, result: creditImage } = useImageProcessor({
    width: 700,
    height: 400,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ e });
    if (!nameRef.current || !creditRef.current) {
      return;
    }
    if (creditRef.current.files?.length !== 1) {
      return;
    }
  };

  const handleChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length !== 1) {
        return;
      }
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      setCreditFile(file);
    },
    [setCreditFile]
  );

  const creditImageSrc = useMemo(
    () => creditImage && URL.createObjectURL(new Blob([creditImage])),
    [creditImage]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-2">
      <label htmlFor="name">投稿者名: </label>
      <input
        ref={nameRef}
        className="border border-gray-500 p-1 outline-none"
        type="text"
        id="name"
        name="name"
        defaultValue="テスト"
        required
      />
      <label htmlFor="credit">クレジット画像: </label>
      <input
        ref={creditRef}
        className="border border-gray-500 p-1"
        type="file"
        id="credit"
        name="credit"
        accept="image/png,image/jpeg,image/gif"
        onChange={handleChangeImage}
      />
      {creditImage && (
        <img width="350" height="200" src={creditImageSrc} alt="Credit" />
      )}
      <FillButton type="submit">作品応募</FillButton>
    </form>
  );
}
