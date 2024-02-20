import { SPHttpClient } from '@microsoft/sp-http';

export interface IExample1Props {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteUrl: string;
  spHttpClient: SPHttpClient;
}
