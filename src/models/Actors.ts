import cumberbatchName from "cumberbatch-name";
import { random } from "lodash-es";
import { v4 as uuidv4 } from "uuid";

export default class Actors {
  private actors: TActors;

  constructor(teams: any) {
    const actors: TActors = {};

    teams.forEach((team: any) => {
      const { positions, isEnemy } = team;

      positions.forEach((position: any) => {
        const id = uuidv4();
        const [x, y] = position;
        const hp = random(10, 20);

        actors[id] = {
          attack: random(7, 15),
          currentPosition: { x, y },
          defense: random(2, 7),
          hp,
          id,
          isDead: false,
          isDisable: false,
          isEnemy,
          isGoingToAttack: false,
          isGoingToBeAttacked: false,
          name: cumberbatchName(),
          originalPosition: { x, y },
          resistance: random(2, 8),
          speed: random(2, 8),
          totalHp: hp,
        };
      });
    });

    this.actors = actors;
  }

  public get(): TActors {
    return this.actors;
  }
}
