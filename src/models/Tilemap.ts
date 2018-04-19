import { range, remove, times } from "lodash";
import { v4 as uuidv4 } from "uuid";

export default class Tilemap {
  private tilemap: TTilemap;

  constructor(params: { width: number; height: number }) {
    const { width, height } = params;
    const tilemap: TTilemap = [];

    times(height, (y) => {
      const tiles: TTile[] = [];

      times(width, (x) => {
        const tile: TTile = {
          id: uuidv4(),
          isActorArea: false,
          isAttackArea: false,
          isMoveArea: false,
          isWalkableArea: false,
          x,
          y,
        };

        tiles.push(tile);
      });

      tilemap.push(tiles);
    });

    this.tilemap = tilemap;
  }

  public get(): TTilemap {
    return this.tilemap;
  }

  public addMoveArea(tile: TTile, radius: number) {
    this.setDiamondArea(tile, radius, { isMoveArea: true });
  }

  public addAttackArea(tile: TTile, radius: number) {
    this.setDiamondArea(tile, radius, { isAttackArea: true });
  }

  public addActorArea(tiles: TTile[]) {
    tiles.forEach((tile) => {
      const { x, y } = tile;

      this.tilemap[y][x].isActorArea = true;
    });
  }

  public removeAllAreas() {
    this.tilemap.forEach((tiles, y) => {
      tiles.forEach((tile, x) => {
        this.tilemap[y][x] = {
          ...this.tilemap[y][x],
          isActorArea: false,
          isAttackArea: false,
          isMoveArea: false,
        };
      });
    });
  }

  private setDiamondArea(tile: TTile, radius: number, params: any) {
    const diameter = radius * 2;

    times(diameter, (xx) => {
      times(diameter, (yy) => {
        const distance = Math.abs(xx - radius) + Math.abs(yy - radius) < radius;

        if (distance) {
          const x = xx + tile.x - radius;
          const y = yy + tile.y - radius;

          if (this.tilemap[y] && this.tilemap[y][x]) {
            this.tilemap[y][x] = { ...this.tilemap[y][x], ...params };
          }
        }
      });
    });
  }
}
