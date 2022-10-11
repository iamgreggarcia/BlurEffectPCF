import { Stack, ThemeProvider } from "@fluentui/react";
import * as React from "react";
import { IBlurEffectProps } from "./Component.types";
const defaultBlur: string = "8px";

export const BlurEffectBackground = React.memo((props: IBlurEffectProps) => {
  const { width, height, blur } = props;

  // Set default blur effect to 8px

  const containerSize = React.useMemo(() => {
    return {
      height: height,
      width: width,
      backdropFilter: `blur(${blur})`,
    } as React.CSSProperties;
  }, [height]);

  const rootContainerStyle: React.CSSProperties = React.useMemo(() => {
    return {
      height: height,
      width: width,
      backdropFilter: `blur(${blur})`,
    };
  }, [width, height, blur]);

  return <Stack style={rootContainerStyle}></Stack>;
});

BlurEffectBackground.displayName = "BlurEffectBackground";
