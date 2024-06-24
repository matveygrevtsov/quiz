import { FC, useRef, useState } from "react";
import { ICard } from "../../types";
import { CardFace } from "./components/CardFace/CardFace";
import { useClickAway } from "react-use";
import { Flex, Text } from "@mantine/core";

import styles from "./styles.module.css";

interface IState {
  isViewed: boolean;
  isOpened: boolean;
  isAnimationRunning: boolean;
}

interface IProps {
  data: ICard;
  index: number;
}

export const Card: FC<IProps> = ({ data, index }) => {
  const [state, setState] = useState<IState>({
    isViewed: false,
    isOpened: false,
    isAnimationRunning: false,
  });

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    if (!state.isOpened) return;
    const animator = ref.current!;
    animator.style.transition = "all 0s ease 0s";
    animator.style.opacity = "0";
    animator.style.transform = "none";
    animator.style.zIndex = "0";

    setState((prevState) => ({
      ...prevState,
      isOpened: false,
    }));
  });

  const handleClick = () => {
    if (state.isAnimationRunning || state.isOpened) return;
    const animator = ref.current!;

    const { left, top } = animator.parentElement!.getBoundingClientRect();

    animator.style.left = `${left}px`;
    animator.style.top = `${top}px`;
    animator.style.zIndex = "99";
    animator.style.opacity = "1";

    window.setTimeout(() => {
      animator.style.transition =
        "left 1s linear, top 1s linear, transform 1s linear";
      animator.style.left = "50%";
      animator.style.top = "50%";
      animator.style.transform = `translate(-50%, -50%) scale(2)`;
    }, 0);

    setState((prevState) => ({
      ...prevState,
      isAnimationRunning: true,
    }));

    window.setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isAnimationRunning: false,
        isViewed: true,
        isOpened: true,
      }));
    }, 1000);
  };

  return (
    <div>
      <div
        style={{
          opacity: state.isAnimationRunning || state.isOpened ? 0 : 1,
          pointerEvents:
            state.isAnimationRunning || state.isOpened ? "none" : "auto",
        }}
        className={styles.cardWrap}
        onClick={handleClick}
      >
        <div
          style={{
            filter: state.isViewed ? "none" : "blur(8px)",
          }}
        >
          <CardFace data={data} />
        </div>

        {!state.isViewed && (
          <Flex className={styles.blur} align="center" justify="center">
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 360 }}
            >
              {index}
            </Text>
          </Flex>
        )}
      </div>

      <div ref={ref} className={styles.animator}>
        <CardFace data={data} />
      </div>
    </div>
  );
};
