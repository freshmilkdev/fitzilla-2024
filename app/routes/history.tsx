import History from "~/components/history/history";
import type { Route } from "./+types/history";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "History" },
    { name: "description", content: "History" },
  ];
}

export default function HistoryPage() {
  return <History />;
}