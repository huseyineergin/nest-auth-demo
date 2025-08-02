// "use client";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import * as React from "react";

// type ThemeProviderProps = Readonly<React.ComponentProps<typeof NextThemesProvider>>;

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
