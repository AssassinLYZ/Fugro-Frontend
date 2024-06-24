import React, { FC, useState, useEffect } from "react";
import styles from "./index.module.scss";

interface ToastMsgProps {
  children?: React.ReactNode;
  duration?: number;
  type: string;
}

const ToastMessage: FC<ToastMsgProps> = (props) => {
  const { children, duration = 3000, type } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, duration);
  }, [duration]);

  return (
    visible && (
      <div
        className={`${type == "success" ? styles.success : styles.error} ${
          styles.container
        }`}
      >
        <p>{children}</p>
        <p className={styles.delete} onClick={() => setVisible(false)}>
          X
        </p>
      </div>
    )
  );
};

export default ToastMessage;
