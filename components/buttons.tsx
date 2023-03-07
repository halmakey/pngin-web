import {
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        border
        border-gray-800
        bg-gray-800 px-4
        py-2
        text-white
        transition
        hover:border-gray-600
        hover:bg-gray-600
        active:border-gray-400
        active:bg-gray-400
        disabled:border-gray-400
        disabled:bg-gray-400
        `}
    />
  );
}

export function BorderButton(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`
        border
        border-gray-800
        px-4 py-2
        text-gray-800
        transition
        hover:bg-gray-800
        hover:text-white
        active:border-gray-600
        active:bg-gray-600`}
    />
  );
}

export function InvertBorderButton(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className={`
        border
        border-white
        px-4
        py-2
        text-white
        transition
        hover:bg-white
        hover:text-gray-800
        active:border-gray-400
        active:bg-gray-400
        disabled:bg-gray-400`}
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
