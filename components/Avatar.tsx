import { ImgHTMLAttributes } from "react";

export default function Avatar(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img width="48px" height="48px" {...props} className="rounded-full" />;
}
