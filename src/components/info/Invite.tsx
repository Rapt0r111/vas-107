import { rise } from "@/lib/css";
import { InviteText } from "./InviteText";

export function Invite() {
  return (
    <section className="invite rise" style={rise(".55s")}>
      <InviteText />
    </section>
  );
}
