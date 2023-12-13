"use client";
import React, { useId, useState } from "react";
import clsx from "clsx";

import { range } from "@/utils";
import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";

import Equation from "./Equation";
import styles from "./DivisionGroupsDemo.module.css";
import { LayoutGroup, motion } from "framer-motion";

function DivisionGroupsDemo({ numOfItems = 12, initialNumOfGroups = 1, includeRemainderArea }) {
  const [numOfGroups, setNumOfGroups] = useState(initialNumOfGroups);
  const id = useId();

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  const spring = {
    type: "spring",
    stiffness: 400,
    damping: 60,
  };

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  return (
    <LayoutGroup>
      <Card as='section' className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label='Number of Groups'
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            value={numOfGroups}
            onChange={(e) => setNumOfGroups(Number(e.target.value))}
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={clsx(styles.demoArea)} style={gridStructure}>
            {range(numOfGroups).map((groupIndex) => {
              return (
                <div key={groupIndex} className={styles.group}>
                  {range(numOfItemsPerGroup).map((index) => {
                    const layoutId = `${id}-${groupIndex}-${index}`;
                    console.log("Id in main group: ", layoutId);

                    return (
                      <motion.div
                        layoutId={layoutId}
                        idcustom={layoutId}
                        key={layoutId}
                        className={styles.item}
                        transition={spring}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {range(remainder).map((index) => {
              const layoutId = `${id}-${remainder + 1}-${index}`;
              console.log("Id in remainder group: ", layoutId);
              return (
                <motion.div
                  layoutId={layoutId}
                  idcustom={layoutId}
                  key={layoutId}
                  className={styles.item}
                  transition={spring}
                />
              );
            })}
          </div>
        )}

        <Equation dividend={numOfItems} divisor={numOfGroups} remainder={remainder} />
      </Card>
    </LayoutGroup>
  );
}

export default DivisionGroupsDemo;
