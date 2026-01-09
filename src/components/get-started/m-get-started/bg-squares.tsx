import React, { useEffect, useState } from "react";

type Square = {
  top: number;
  left: number;
  size: number;
  opacity: number;
};

function generateArtSquares(
  width: number,
  height: number,
  {
    count = 28,
    minSize = 14,
    maxSize = 32,
    minOpacity = 0.08,
    maxOpacity = 0.18,
    minDistance = 40,
  } = {}
): Square[] {
  const squares: Square[] = [];
  const minDistSq = minDistance * minDistance;

  let attempts = 0;
  const MAX_ATTEMPTS = count * 50;

  while (squares.length < count && attempts < MAX_ATTEMPTS) {
    attempts++;

    const size = minSize + Math.random() * (maxSize - minSize);

    const square: Square = {
      top: Math.random() * (height - size),
      left: Math.random() * (width - size),
      size,
      opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
    };

    const isTooClose = squares.some((s) => {
      const dx = s.left - square.left;
      const dy = s.top - square.top;
      return dx * dx + dy * dy < minDistSq;
    });

    if (!isTooClose) squares.push(square);
  }

  return squares;
}

const BgSquares = () => {
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const generate = () => {
      setSquares(
        generateArtSquares(window.innerWidth, window.innerHeight, { count: 30 })
      );
    };

    generate();
    window.addEventListener("resize", generate);
    return () => window.removeEventListener("resize", generate);
  }, []);

  return (
    <>
      {squares.map((sq, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: sq.top,
            left: sq.left,
            width: sq.size,
            height: sq.size,
            background: "#fff",
            opacity: sq.opacity,
            borderRadius: "var(--radius-sm)",
          }}
        />
      ))}
    </>
  );
};

export default BgSquares;
