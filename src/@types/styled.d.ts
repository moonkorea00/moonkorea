import 'styled-components';

type Colors = Record<string, string | Colors>;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    flexCenter: ThemedCssFunction;
    flexDefault: ThemedCssFunction;
    flexColumn: ThemedCssFunction;
    flexColumnCenter: ThemedCssFunction;
    flexCenterEnd: ThemedCssFunction;
    flexSpaceBetween: ThemedCssFunction;
    flexAlignCenter: ThemedCssFunction;
  }
}
