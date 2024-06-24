import React, { useState, useImperativeHandle, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ToastMessage from "./toastMessage";
import styles from "./index.module.scss";
interface IToastRef {
  info: (msg: string, options?: { duration?: number; type?: string }) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const toast: { current: IToastRef | null } = { current: null };

const ToastContainer: React.FC = () => {
  const toastRef = useRef<IToastRef>(null);
  const [toastList, setToastList] = useState<
    { id: string; msg: string; duration?: number; type: string }[]
  >([]);

  useImperativeHandle(toastRef, () => {
    return {
      info: (msg: string, option) => {
        const item = {
          msg,
          duration: option?.duration,
          id: `${+new Date()}`,
          type: option?.type ?? "",
        };

        setToastList((list) => [...list, item]);
      },
    };
  });

  useEffect(() => {
    toast.current = toastRef.current;
  }, []);

  const renderDom = (
    <div className={styles.toast}>
      {toastList.map((item) => {
        return (
          <ToastMessage key={item.id} {...item}>
            {item.msg}
          </ToastMessage>
        );
      })}
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(renderDom, document.body)
    : renderDom;
};

export default ToastContainer;
