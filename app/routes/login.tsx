import type { Route } from "./+types/home";
import { Login } from "~/login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskBeetle" },
    { name: "description", content: "Welcome to TaskBeetle, a simple task manager!" },
  ];
}

export default function Home() {
  return <Login />;
}
