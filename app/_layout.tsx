import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/lib/ui/gluestack-ui-provider"
// eslint-disable-next-line import/no-unresolved
import "global.css";

export default function RootLayout() {

  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
}