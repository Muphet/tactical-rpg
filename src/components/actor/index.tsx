import * as React from "react";

const styles = require("./index.css");
import tileArea from "../../library/tileArea";

interface IActorProps {
  actor: TActor;
  isSelectedArea: boolean;
  updateActor: (actor: TActor) => void;
}

function getPosition(actor: TActor, tileArea: any) {
  return {
    left: actor.currentPosition.x * tileArea.width,
    top: actor.currentPosition.y * tileArea.height,
  };
}

function getHealthBarWidth(actor: TActor) {
  return {
    width: actor.healthPoints * 100 / actor.totalHealthPoints + "%",
  };
}

export const Actor = (props: IActorProps) => {
  const { actor, isSelectedArea, updateActor } = props;
  const position = getPosition(actor, tileArea);
  const healthBarWidth = getHealthBarWidth(actor);
  const onClick = () => updateActor(actor);

  return (
    <React.Fragment>
      <div
        data-id={actor.id}
        className={styles.main}
        style={{ ...position, ...tileArea }}
        onClick={onClick}
      >
        <div className={styles.healthBar} style={healthBarWidth} />
      </div>
      {isSelectedArea && (
        <div
          className={styles.selectedArea}
          style={{ ...tileArea, ...position }}
        />
      )}
    </React.Fragment>
  );
};
