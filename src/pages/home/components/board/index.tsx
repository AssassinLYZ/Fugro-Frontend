import React, { useState } from "react";
import styles from "./index.module.scss";
import type { Coordinate } from "@/types";
import { POSITION_KEY } from "@/types/constant";
import useStore from "@/store/postions";

import { toast } from "@/components/toast";
import { getFromLocalStorage } from "@/lib/utils";
interface InforBoardProps {
  Info: Coordinate;
  total: number;
  currentPositions: Coordinate[];
}

const InforBoard: React.FC<InforBoardProps> = ({
  Info,
  total,
  currentPositions,
}) => {
  const {
    isShowPrevious,
    setIsShowPrevious,
    positionAverage,
    setCurrentPositions,
  } = useStore();
  const [isShowPanel, setIsShowPanel] = useState(true);

  const hidePanel = () => {
    setIsShowPrevious(false);
    // clear currentPositions to release memory
    setCurrentPositions([]);
    toast.current?.info("Hide data Succcess!", {
      duration: 3000,
      type: "success",
    });
  };

  const showPanel = () => {
    const positions = getFromLocalStorage(POSITION_KEY.LOCALKEY);
    if (positions && (positions as Coordinate[]).length > 0) {
      setCurrentPositions(positions as Coordinate[]);
      setIsShowPrevious(true);
    } else {
      toast.current?.info("No previous Data", {
        duration: 3000,
        type: "error",
      });
    }
  };

  return (
    <>
      {/* mobile view */}
      <div className={styles["mobile-operator"]}>
        {!isShowPanel && (
          <div
            className={`${styles["btn"]} ${styles["plus"]}`}
            onClick={() => setIsShowPanel(true)}
          >
            +
          </div>
        )}
        {isShowPanel && (
          <div
            className={`${styles["btn"]} ${styles["minus"]}`}
            onClick={() => setIsShowPanel(false)}
          >
            -
          </div>
        )}
      </div>

      {isShowPanel && (
        <div className={styles["board-info"]}>
          <div className={styles["board-items"]}>
            <div className={styles["title"]}>
              <p className={`${styles["icon-current"]} ${styles["icon"]}`}></p>
              <p className={styles["text"]}>Current Position:</p>
            </div>
            <div className={styles["content"]}>
              <p className={styles["content-item"]}>lng: {Info?.lng}</p>
              <p className={styles["content-item"]}>lat: {Info?.lat}</p>
            </div>
          </div>

          <div className={styles["board-items"]}>
            <div className={styles["title"]}>
              <p className={`${styles["icon-average"]} ${styles["icon"]}`}></p>
              <p className={styles["text"]}>Average Position:</p>
            </div>
            <div className={styles["content"]}>
              <p className={styles["content-item"]}>
                lng: {total ? positionAverage.lng : 0}
              </p>
              <p className={styles["content-item"]}>
                lat: {total ? positionAverage.lat : 0}
              </p>
            </div>
          </div>

          <div className={styles["board-items"]}>
            <div className={styles["title"]}>
              <p className={styles["text"]}>
                The Number of Positions in total:
              </p>
            </div>
            <div className={styles["content"]}>{total}</div>
          </div>

          <p className={styles["divider"]}></p>

          <div className={styles["board-items"]}>
            <p className={styles["show-btn"]} onClick={showPanel}>
              {!isShowPrevious ? "Show" : ""} Previous Positions
            </p>
          </div>

          {/* position table */}
          {isShowPrevious && (
            <div className={styles["previous-box"]}>
              <p className={styles["clear-btn"]} onClick={hidePanel}>
                Hide
              </p>
              <table className={styles["previous-positions-table"]}>
                <thead>
                  <tr>
                    <th className={styles["table-header"]}>Longitude</th>
                    <th className={styles["table-header"]}>Latitude</th>
                    <th className={styles["table-header"]}>TimeStamp</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPositions.map((item, index) => (
                    <tr key={index}>
                      <td>{item.lng}</td>
                      <td>{item.lat}</td>
                      <td>{item.timeStamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InforBoard;
