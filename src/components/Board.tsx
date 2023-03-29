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

  console.log("valueLeft", valueLeft);
  console.log("valueRight", valueRight);

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
    if (
      valueLeft?.value &&
      valueRight?.value &&
      valueLeft?.value === valueRight?.value
    ) {
      alert("AAAA");
      setValueLeft(undefined);
      setValueRight(undefined);
    } else if (
      valueLeft?.value &&
      valueRight?.value &&
      valueLeft?.value !== valueRight?.value
    ) {
      setValueLeft(undefined);
      setValueRight(undefined);
    }
  }, [valueLeft, valueRight]);

  const handleClickLeft = useCallback(
    (item: Matcher) => {
      setValueLeft(item);
      const selcted = listLeft?.find((e: Matcher) => e?.id === item?.id);
      console.log("ListLeftNew", selcted);
    },
    [listLeft]
  );

  const handleClickRight = useCallback(
    (item: Matcher) => {
      setValueRight(item);
      const selcted = listLeft?.find((e: Matcher) => e?.id === item?.id);
      console.log("ListLeftNew", selcted);
    },
    [listRight]
  );

  return (
    <div className="board">
      <div>
        {listLeft?.map((item: Matcher) => {
          return (
            <button
              className="item-left"
              style={{
                backgroundColor:
                  item?.status === "open" ? `${item?.color}` : "black",
                borderRadius: "6px",
              }}
              type="button"
              onClick={() => handleClickLeft(item)}
            ></button>
          );
        })}
      </div>
      <div>
        {listRight?.map((item: Matcher) => {
          return (
            <button
              className="item-left"
              style={{
                backgroundColor:
                  item?.status === "open" ? `${item?.color}` : "black",
                borderRadius: "6px",
              }}
              type="button"
              onClick={() => handleClickRight(item)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
