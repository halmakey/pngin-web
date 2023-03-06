import {
  faClose,
  faRefresh,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DOMAttributes, HTMLProps, ReactNode } from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function FillButton(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`
        transition
        border
        border-gray-800
        px-4 py-2
        bg-gray-800
        text-white
        hover:bg-gray-600
        hover:border-gray-600
        active:bg-gray-400
        active:border-gray-400
        disabled:bg-gray-400
        disabled:border-gray-400
        `}
    />
  );
}

export function BorderButton(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className="transition border border-gray-800 px-4 py-2 hover:bg-gray-800 hover:text-white active:bg-gray-600 active:border-gray-600"
    />
  );
}

export function InvertBorderButton(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className="transition border border-white px-4 py-2 hover:bg-white hover:text-gray-800 active:bg-gray-400 active:border-gray-400 disabled:bg-gray-400"
    />
  );
}

export function ResetIconButton(props: Props) {
  return (
    <button type="button" className="m-0 p-0" {...props}>
      <FontAwesomeIcon width="32px" height="32px" icon={faRotateBack} />
    </button>
  );
}
