import * as React from 'react';
import styles from './Example1.module.scss'
import type { IExample1Props } from './IExample1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { SpFxHttpClientDemo } from './SPList/SPList';

const Example1: React.FC<IExample1Props> = (props) => {
  const {
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    siteUrl,
    spHttpClient,
  } = props;

  return (
    <section
      className={`${styles.example1} ${hasTeamsContext ? styles.teams : ''}`}
    >
      <div className={styles.welcome}>
        <img
          alt=''
          src={
            isDarkTheme
              ? require('../assets/welcome-dark.png')
              : require('../assets/welcome-light.png')
          }
          className={styles.welcomeImage}
        />
        <h2>Welcome, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
      </div>
      <div>
        <h3>Simple Sharepoint/React example!</h3>
        <p>This will populate a list from our Sharepoint site.</p>
        <SpFxHttpClientDemo siteUrl={siteUrl} spHttpClient={spHttpClient} />
      </div>
    </section>
  );
};

export default Example1;