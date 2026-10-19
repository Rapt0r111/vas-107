import { DateTile } from "./DateTile";
import { Invite } from "./Invite";
import { PlaceTile } from "./PlaceTile";

export function Info() {
  return (
    <div className="info">
      <Invite />
      <DateTile />
      <PlaceTile />
    </div>
  );
}
