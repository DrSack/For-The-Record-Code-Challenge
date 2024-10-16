import { Header, LayoutWrapper } from "@/components";
import { Box } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FTR Code Assessment",
  description: "FTR Code Assessment created on next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
        </Box>
      </body>
    </html>
  );
}
