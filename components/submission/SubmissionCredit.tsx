import { useImageProcessor } from "@/hooks/useImageProcessor";
import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { FillButton, ResetIconButton } from "../buttons";

const fileTypes = ["image/png", "image/jpeg", "image/gif"];
const acceptTypes = fileTypes.join(",");

export function SubmissionCredit({
  onChange,
}: {
  onChange?: (buffer: ArrayBuffer | undefined) => void;
}) {
  const creditRef = useRef<HTMLInputElement>(null);
  const { setFile: setCreditFile, result: creditImage } = useImageProcessor({
    width: 700,
    height: 400,
  });

  useEffect(() => {
    if (!onChange) {
      return;
    }
    onChange(creditImage);
  }, [creditImage, onChange]);

  const openFileSelection = useCallback(() => {
    creditRef.current?.click();
  }, []);

  const resetCreditImage = useCallback(() => {
    if (!creditRef.current) {
      return;
    }
    creditRef.current.value = "";
    setCreditFile(undefined);
  }, [setCreditFile]);

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(e);

      const { files } = e.dataTransfer;
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (fileTypes.indexOf(file.type) === -1) {
          continue;
        }
        if (creditRef.current) {
          setCreditFile(file);
          return;
        }
      }
    },
    [setCreditFile]
  );

  const creditImageSrc = useMemo(
    () => creditImage && URL.createObjectURL(new Blob([creditImage])),
    [creditImage]
  );

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

  return (
    <div className="relative h-[200px] w-[350px]">
      <div
        className="box-border h-full w-full border-2 border-dashed border-gray-500 p-4 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        画像のサイズ: 700×400(pixel)
        <br />
        ここにドラッグ・アンド・ドロップ
        <br />
        または
        <div className="my-4 flex flex-col items-center">
          <FillButton onClick={openFileSelection}>ファイルを選択</FillButton>
        </div>
      </div>
      {creditImage && (
        <>
          <img
            className="pointer-events-none absolute left-0 top-0 h-full w-full"
            width="350"
            height="200"
            src={creditImageSrc}
            alt="Credit"
          />
          <div
            className="absolute top-0 left-0 h-full w-full opacity-0 transition hover:opacity-100 active:opacity-70"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <ResetIconButton
              onClick={resetCreditImage}
              className="absolute top-2 right-2"
            />
          </div>
        </>
      )}
      <input
        ref={creditRef}
        className="right-0 hidden border border-gray-500 p-1"
        type="file"
        id="credit"
        name="credit"
        accept={acceptTypes}
        onChange={handleChangeImage}
      />
    </div>
  );
}
