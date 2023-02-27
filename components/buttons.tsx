import { DOMAttributes, HTMLProps, ReactNode } from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function FillButton(props: Props) {
  return <button {...props} className="transition border border-gray-800 px-4 py-2" />;
}

export function BorderButton(props: Props) {
  return (
    <button
      {...props}
      className="transition border border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white active:bg-gray-600 active:border-gray-600"
    />
  );
}

export function InvertBorderButton(props: Props) {
  return (
    <button
      {...props}
      className="transition border border-white px-4 py-2 hover:bg-white hover:text-gray-800 active:bg-gray-400 active:border-gray-400"
    />
  );
}
