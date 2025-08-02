import localFont from "next/font/local"

export const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const clashDisplay = localFont({
    src: [
        {
            path: "../public/fonts/clash_display/ClashDisplay-Variable.woff2",
            weight: "300 900",
            style: "normal"
        }
    ],
    variable: "--font-clash-display",
    display: "swap"
});