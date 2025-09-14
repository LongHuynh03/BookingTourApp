import { GluestackUIProvider } from "@libs/ui/gluestack-ui-provider";
// eslint-disable-next-line import/no-unresolved
import "global.css";
import MainNavigation from "@navigations/MainNavigation";

export default function RootLayout() {

  return (
    <GluestackUIProvider>
        <MainNavigation />
    </GluestackUIProvider>
  );
}