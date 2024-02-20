import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IWebsiteListItem {
  Id: string;
  Title: string;
  Link: string;
  Database: {
    Description: string;
    Url: string;
  };
}

export interface ISpFxHttpClientDemoProps {
  spHttpClient: SPHttpClient;
  siteUrl: string;
}

export interface ISpFxHttpClientDemoState {
  websites: IWebsiteListItem[];
}

export class SpFxHttpClientDemo extends React.Component<
  ISpFxHttpClientDemoProps,
  ISpFxHttpClientDemoState
> {
  constructor(props: ISpFxHttpClientDemoProps) {
    super(props);
    this.state = {
      websites: [],
    };
  }

  private _getListItems = async (): Promise<IWebsiteListItem[]> => {
    try {
      const response = await this.props.spHttpClient.get(
        `${this.props.siteUrl}/_api/web/lists/getbytitle('Websites')/items?$select=Id,Title,Database`,
        SPHttpClient.configurations.v1
      );
      const jsonResponse = await response.json();
      console.log('jsonResponse', jsonResponse);
      return jsonResponse.value as IWebsiteListItem[];
    } catch (error) {
      console.error('Error fetching list items:', error);
      return [];
    }
  };

  private onGetListItems = async (): Promise<void> => {
    const items: IWebsiteListItem[] = await this._getListItems();
    this.setState({ websites: items });
  };

  public render(): React.ReactElement<ISpFxHttpClientDemoProps> {
    return (
      <div>
        <div>
          <button onClick={this.onGetListItems}>Get List Items</button>
        </div>
        <div>
          <ul>
            {this.state.websites.map((item) => (
              <li key={item.Id}>
                <p>{item.Title}</p>
                {item.Database.Url && (
                  <a href={item.Database.Url}>{item.Database.Description}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SpFxHttpClientDemo;
