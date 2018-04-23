import Tilemap from "../models/Tilemap";

const tm = new Tilemap({
  height: 8,
  width: 6,
});

const initialState: TTilemap = tm.get();

function getLiveActorsTiles(actors: TActors, tilemap: TTilemap) {
  return Object.keys(actors)
    .filter((key) => !actors[key].isDead)
    .map((key) => {
      const actor = actors[key];
      const {
        originalPosition: { x, y },
      } = actor;

      return tilemap[y][x];
    });
}

function getActorTile(actor: TActor, tilemap: TTilemap) {
  const {
    originalPosition: { x, y },
  } = actor;

  return tilemap[y][x];
}

export function tilemap(state = initialState, action: any) {
  switch (action.type) {
    case "SHOW_ACTOR_AREA": {
      const { actor, actors } = action.data;
      const actorTiles = getLiveActorsTiles(actors, state);
      const actorTile = getActorTile(actor, state);

      tm.addMoveArea(actorTile, 3);
      tm.addAttackArea(actorTile, 4);
      tm.addActorArea(actorTiles);
      tm.addPathfindableArea();

      const tilemap = tm.get();

      return tilemap;
    }
    case "HIDE_ACTOR_AREA": {
      tm.removeAllAreas();

      return tm.get();
    }
    case "SHOW_SELECTED_AREA": {
      const { tile } = action.data;

      tm.removeAllSelectedAreas();
      tm.addSelectedArea(tile);

      return tm.get();
    }
    default: {
      return state;
    }
  }
}
