import { FC } from "react";
import { ICard } from "../../../../types";
import cn from "classnames";

import styles from "./styles.module.css";

interface IProps {
  data: ICard;
  className?: string;
}

export const CardFace: FC<IProps> = ({ data, className }) => {
  return (
    <div className={cn(styles.root, className)}>{JSON.stringify(data)}</div>
  );
};
