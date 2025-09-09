import { Redirect } from "expo-router";
import { PATHS } from "@/navigation/routes";

export default function Index() {
  return <Redirect href={PATHS.TABS} />;
}
