import type { Route } from "./+types/home";
import { Tasks } from "~/tasks/tasks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskBeetle" },
    { name: "description", content: "Welcome to TaskBeetle!" },
  ];
}

export default function Home() {
  return <Tasks />;
}