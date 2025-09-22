import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/globals.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  );
}
