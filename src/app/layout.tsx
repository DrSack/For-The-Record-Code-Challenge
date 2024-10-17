import { Header, LayoutWrapper } from "@/components";
import type { Metadata } from "next";
import { StyledLayoutBox } from "./styles";

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
        <StyledLayoutBox>
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
        </StyledLayoutBox>
      </body>
    </html>
  );
}
