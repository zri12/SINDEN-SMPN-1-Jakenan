import { AppRoutes } from "./routes/AppRoutes";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";

export default function App() {
  return (
    <AppSettingsProvider>
      <AppRoutes />
    </AppSettingsProvider>
  );
}
