import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    flexCenter: ThemedCssFunction;
    flexDefault: ThemedCssFunction;
    flexColumn: ThemedCssFunction;
    flexColumnCenter: ThemedCssFunction;
    flexSpaceBetween: ThemedCssFunction;
  }
}