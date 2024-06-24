import { Flex } from "@mantine/core";
import { CARDS } from "../../appConstants";
import { Card } from "../Card/Card";

import styles from "./styles.module.css";

export const CardsList = () => {
  return (
    <Flex className={styles.root} align="center" justify="center">
      <Flex
        className={styles.cardsList}
        columnGap={16}
        rowGap={16}
        wrap="wrap"
        justify="center"
      >
        {CARDS.map((card, index) => (
          <Card key={index} data={card} index={index} />
        ))}
      </Flex>
    </Flex>
  );
};
