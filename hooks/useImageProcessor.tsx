import { useMemo, useState } from "react";
import { useAsyncEffect } from "./useAsyncEffect";

interface Size {
  width: number;
  height: number;
}

async function loadImage(file: File) {
  const data = await new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
  const srcBlob = new Blob([data]);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = URL.createObjectURL(srcBlob);
  });
  return img;
}

export function useImageProcessor({ width, height }: Size) {
  const [file, setFile] = useState<File>();
  const [result, setResult] = useState<ArrayBuffer>();

  useAsyncEffect(async () => {
    if (!file) {
      setResult(undefined);
      return;
    }
    const globalCanvas = document.createElement("canvas");
    const globalContext = globalCanvas.getContext("2d");
    const localCanvas = document.createElement("canvas");
    const localContext = localCanvas.getContext("2d");
    if (!globalContext || !localContext) {
      throw new Error("Unexpected context");
    }

    globalCanvas.width = width + 40;
    globalCanvas.height = height + 40;
    localCanvas.width = width;
    localCanvas.height = height;

    const image = await loadImage(file);
    const ns = Math.min(width / image.width, height / image.height);
    const nsw = image.width * ns;
    const nsh = image.height * ns;
    const nx = (width - nsw) * 0.5;
    const ny = (height - nsh) * 0.5;

    const ms = Math.max(
      globalCanvas.width / image.width,
      globalCanvas.height / image.height
    );
    const msw = image.width * ms;
    const msh = image.height * ms;
    const mx = (globalCanvas.width - msw) * 0.5;
    const my = (globalCanvas.height - msh) * 0.5;

    globalContext.filter = "blur(15px)";
    globalContext.drawImage(image, mx, my, msw, msh);
    localContext.fillStyle = "white";
    localContext.fillRect(0, 0, localCanvas.width, localCanvas.height)
    localContext.drawImage(
      globalCanvas,
      (globalCanvas.width - localCanvas.width) * -0.5,
      (globalCanvas.height - localCanvas.height) * -0.5
    );
    localContext.drawImage(image, nx, ny, nsw, nsh);
    URL.revokeObjectURL(image.src);
    const blob = await new Promise<Blob | null>((resolve) =>
      localCanvas.toBlob(resolve, "image/png")
    );
    if (!blob) {
      throw new Error("Unexpected blob");
    }
    const buffer = await blob.arrayBuffer();
    setResult(buffer);
  }, [file, height, width]);

  return useMemo(() => ({ setFile, result }), [result]);
}
