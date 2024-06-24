import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import ToastContainer from "@/components/toast";
import InforBoard from "./components/board";
import Map from "./components/map";
import WebSocketClient from "@/lib/apis/WebSocketClient";
import config from "@/config";
import useStore from "@/store/postions";
import {
  formatTime,
  pushToLocalStorage,
  removeLocalStorage,
} from "@/lib/utils";
import { POSITION_KEY } from "@/types/constant";

const Home: React.FC = () => {
  const {
    currentPositions,
    currentPosition,
    total,
    setPositionAverage,
    setTotal,
    setCurrentPosition,
    setCurrentPositions,
    isShowPrevious,
  } = useStore();
  const wsClientRef = useRef<WebSocketClient | null>(null);
  useEffect(() => {
    // connect to backend to receive data
    if (!wsClientRef.current) {
      wsClientRef.current = new WebSocketClient(config.websocketUrl!);
      wsClientRef.current.onMessage((message: string) => {
        try {
          const data = JSON.parse(message);
          const formatedPosition = { ...data, timeStamp: formatTime() };
          setCurrentPosition(formatedPosition);
          setTotal((prevTotal) => {
            return prevTotal + 1;
          });

          pushToLocalStorage(POSITION_KEY.LOCALKEY, formatedPosition);
        } catch (err) {
          console.error("Error parsing message", err);
        }
      });
    }
    return () => {
      if (wsClientRef.current) {
        //  clear localstorge & disconnect websocket
        removeLocalStorage(POSITION_KEY.LOCALKEY);
        wsClientRef.current?.close();
      }
    };
  }, []);

  useEffect(() => {
    // caculate the average point
    setPositionAverage((prev) => {
      if (total > 0) {
        return {
          lat: Number(
            ((prev.lat * (total - 1) + currentPosition.lat) / total).toFixed(4)
          ),
          lng: Number(
            ((prev.lng * (total - 1) + currentPosition.lng) / total).toFixed(4)
          ),
        };
      }
      return { lat: 0, lng: 0 };
    });

    if (isShowPrevious) {
      setCurrentPositions((prevPositions) => [
        currentPosition,
        ...prevPositions,
      ]);
    }
  }, [total, currentPosition]);

  return (
    <div className={styles.home}>
      <InforBoard
        Info={currentPosition}
        total={total}
        currentPositions={currentPositions}
      />
      <Map />
      <ToastContainer />
    </div>
  );
};

export default Home;
