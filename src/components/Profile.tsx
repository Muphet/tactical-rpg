import * as React from "react";

interface IProfileProps {
  player: TPlayer;
  actors: TActors;
  grid: TTilemap;
}

export const Profile = (props: IProfileProps) => {
  const { player, actors, grid } = props;
  const { viewActorId, selectedActorId } = player;
  let showMyProfile: boolean = false;

  if (viewActorId) {
    const { x, y } = actors[viewActorId].originalPosition;
    const isNotSameActor = viewActorId !== selectedActorId;
    const { isAttackArea } = grid[y][x];
    showMyProfile = isAttackArea && isNotSameActor;
  }

  return (
    <div>
      <h1>Viewed profile: {viewActorId}</h1>
      {showMyProfile && <h1>My profile: {selectedActorId}</h1>}
    </div>
  );
};
