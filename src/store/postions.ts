import { create } from 'zustand';
import type { Coordinate } from "@/types"

type StoreState = {
  currentPositions: Coordinate[];
  currentPosition: Coordinate;
  total: number;
  isShowPrevious: boolean;
  positionAverage: { lng: number, lat: number }
  setTotal: (update: (prevTotal: number) => number) => void;
  setCurrentPosition: (position: Coordinate) => void;
  setPositionAverage: (update: (prevPosition: { lng: number, lat: number }) => { lng: number, lat: number }) => void;
  setCurrentPositions: ((update: (prevPositions: Coordinate[]) => Coordinate[]) => void) & ((positions: Coordinate[]) => void);
  setIsShowPrevious: (isShow: boolean) => void;
};

const useStore = create<StoreState>((set) => ({
  currentPositions: [],
  isShowPrevious: false,
  positionAverage: { lat: 0, lng: 0, timeStamp: "" },
  currentPosition: { lat: 0, lng: 0, timeStamp: "" },
  total: 0,
  setTotal: (update) => {
    set((state) => ({
      total: update(state.total)
    }));
  },
  setCurrentPosition: (position) => {
    set(() => ({
      currentPosition: position
    }));
  },
  setIsShowPrevious: (isShow) => {
    set(() => ({
      isShowPrevious: isShow
    }));
  },
  setCurrentPositions: (update) => {
    set((state) => {
      if (typeof update === 'function') {
        return { currentPositions: update(state.currentPositions) };
      }
      return { currentPositions: update };
    });
  },
  setPositionAverage: (update) => {
    set((state) => ({
      positionAverage: update(state.positionAverage)
    }));
  },
}));

export default useStore;
