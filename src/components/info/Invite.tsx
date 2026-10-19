import { rise } from "@/lib/css";

export function Invite() {
  return (
    <section className="invite rise" style={rise(".55s")}>
      <p className="invite__text">
        Приглашаем вас на&nbsp;торжественные мероприятия, посвящённые годовщине со&nbsp;дня образования академии.
      </p>
    </section>
  );
}
