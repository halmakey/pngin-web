import React, {
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface PopupProps {
  children?: ReactNode;
  show?: boolean;
  onDismiss?: (show: boolean) => void;
}

const Popup: FC<PopupProps> = ({ children, show, onDismiss }) => {
  const [currentShow, setCurrentShow] = useState(show);

  useEffect(() => {
    setCurrentShow(show);
  }, [show]);

  const handleClose = useCallback(() => {
    setCurrentShow(false);
    onDismiss?.(false);
  }, [onDismiss]);

  const stopPropagation = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      className="absolute w-screen h-screen left-0 top-0 z-10 transition"
      style={{
        opacity: currentShow ? 1 : 0,
        pointerEvents: currentShow ? "auto" : "none",
      }}
      onClick={handleClose}
    >
      <div
        className="absolute w-auto h-auto rounded top-16 right-4 bg-gray-700"
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
