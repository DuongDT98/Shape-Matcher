import React, { useState, useEffect, useCallback, useMemo, FC } from "react";
import Cell from "./Cell";
import "./Board.css";

interface Matcher {
  id: number;
  color?: string;
  status?: string;
  value?: number;
}

const Board: FC = () => {
  const [valueLeft, setValueLeft] = useState<Matcher>();
  const [valueRight, setValueRight] = useState<Matcher>();
  const [diff, setDiff] = useState<number>(4);
  const [time, setTime] = useState<number>(60);

  const [listLeft, setListLeft] = useState<Matcher[]>([
    { id: 1, color: "pink", status: "close", value: 1 },
    { id: 2, color: "blue", status: "close", value: 2 },
    { id: 3, color: "violet", status: "close", value: 4 },
    { id: 5, color: "yellow", status: "close", value: 3 },
  ]);

  const [listRight, setListRight] = useState<Matcher[]>([
    { id: 1, color: "pink", status: "close", value: 1 },
    { id: 2, color: "blue", status: "close", value: 2 },
    { id: 3, color: "violet", status: "close", value: 4 },
    { id: 5, color: "yellow", status: "close", value: 3 },
  ]);

  useEffect(() => {
    if (diff === 0) {
      alert("Win");
    }
  }, [diff]);

  useEffect(() => {
    if (time < 0) {
      alert("Game Over");
      return;
    } else
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
  }, [diff, time]);

  const renderColorTime = useMemo(() => {
    if (time < 10) {
      return "red";
    }
    if (time < 30) {
      return "yellow";
    }
    return "green";
  }, [time]);

  useEffect(() => {
    if (
      valueLeft?.value &&
      valueRight?.value &&
      valueLeft?.value === valueRight?.value
    ) {
      setValueLeft(undefined);
      setValueRight(undefined);
      setDiff(diff - 1);
    } else if (
      valueLeft?.value &&
      valueRight?.value &&
      valueLeft?.value !== valueRight?.value
    ) {
      setTimeout(() => {
        const selctedLeft = listLeft?.findIndex(
          (e: Matcher) => e?.id === valueLeft?.id
        );
        listLeft[selctedLeft].status = "close";
        const selctedRight = listRight?.findIndex(
          (e: Matcher) => e?.id === valueRight?.id
        );
        listRight[selctedRight].status = "close";
        setValueLeft(undefined);
        setValueRight(undefined);
      }, 1000);
    }
  }, [diff, listLeft, listRight, valueLeft, valueRight]);

  const handleClickLeft = useCallback(
    (item: Matcher) => {
      setValueLeft(item);
      const selcted = listLeft?.findIndex((e: Matcher) => e?.id === item?.id);
      listLeft[selcted].status = "open";
    },
    [listLeft]
  );

  const handleClickRight = useCallback(
    (item: Matcher) => {
      setValueRight(item);
      const selcted = listRight?.findIndex((e: Matcher) => e?.id === item?.id);
      listRight[selcted].status = "open";
    },
    [listRight]
  );

  const renderItem = useCallback(
    (item: Matcher, location?: string) => {
      switch (location) {
        case "left":
          switch (item?.status) {
            case "close":
              return (
                <button
                  className="item-left"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "6px",
                  }}
                  type="button"
                  onClick={() => handleClickLeft(item)}
                ></button>
              );

            default:
              return (
                <button
                  className="item-left"
                  style={{
                    backgroundColor: `${item?.color}`,
                    borderRadius: "6px",
                  }}
                  type="button"
                ></button>
              );
          }

        case "right":
          switch (item?.status) {
            case "close":
              return (
                <button
                  className="item-left"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "6px",
                  }}
                  type="button"
                  onClick={() => handleClickRight(item)}
                ></button>
              );

            default:
              return (
                <button
                  className="item-left"
                  style={{
                    backgroundColor: `${item?.color}`,
                    borderRadius: "6px",
                  }}
                  type="button"
                ></button>
              );
          }
      }
    },
    [handleClickLeft, handleClickRight]
  );

  return (
    <>
      <div>
        Time: <span style={{ color: `${renderColorTime}` }}>{time}</span> s
      </div>
      <div className="board">
        <div>
          {listLeft?.map((item: Matcher) => {
            return <>{renderItem(item, "left")}</>;
          })}
        </div>
        <div>
          {listRight?.map((item: Matcher) => {
            return <>{renderItem(item, "right")}</>;
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
