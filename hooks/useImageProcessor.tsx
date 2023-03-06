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
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Unexpected context");
    }

    canvas.width = width;
    canvas.height = height;

    const image = await loadImage(file);
    const ns = Math.min(width / image.width, height / image.height);
    const nsw = image.width * ns;
    const nsh = image.height * ns;
    const nx = (canvas.width - nsw) * 0.5;
    const ny = (canvas.height - nsh) * 0.5;

    const ms = Math.max(width / image.width, height / image.height);
    const msw = image.width * ms;
    const msh = image.height * ms;
    const mx = (canvas.width - msw) * 0.5;
    const my = (canvas.height - msh) * 0.5;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.filter = `blur(${Math.max(width, height) / 10}px)`;
    context.drawImage(image, mx, my, msw, msh);
    context.filter = "blur(1px)";
    context.drawImage(image, nx, ny, nsw, nsh);
    URL.revokeObjectURL(image.src);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) {
      throw new Error("Unexpected blob");
    }
    const buffer = await blob.arrayBuffer();
    setResult(buffer);
  }, [file, height, width]);

  return useMemo(() => ({ setFile, result }), [result]);
}
