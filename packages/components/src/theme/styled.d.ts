import 'styled-components';
import { Theme } from './ThemeProvider';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme { }
}