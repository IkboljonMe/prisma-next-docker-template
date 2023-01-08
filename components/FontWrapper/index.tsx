import React from "react";
import { Alegreya } from "@next/font/google";

const alegreya = Alegreya({
  weight: "600",
  subsets: ["latin"],
});
interface AlegreyaIProps {
  children: React.ReactNode;
}

export const AlegreyaFont: React.FC<AlegreyaIProps> = ({ children }) => {
  return <div className={alegreya.className}>{children}</div>;
};
