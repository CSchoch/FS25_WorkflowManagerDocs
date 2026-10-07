import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const WEB_EDITOR = 'https://cschoch.github.io/FS25_WorkflowManagerWebeditor/';

/* The hero shows a workflow the way the web editor draws it: a route of stops coloured by the
   mod that runs them. These are the first steps of a real harvest workflow. */
type Stop =
  | {kind: 'gate'; num: string; job: string}
  | {kind: 'ad' | 'cp'; num: string; job: string; where: [string, string][]; support?: boolean; running?: boolean};

const ROUTE: Stop[] = [
  {kind: 'gate', num: '1', job: 'Wait for Leader'},
  {kind: 'ad', num: '2', job: 'Drive To', where: [['Felder 41-60/', 'Feld 43']]},
  {kind: 'cp', num: '3', job: 'Field Work', where: [['F43/', 'Dreschen 14m']], running: true},
  {kind: 'ad', num: '3.1', job: 'Unload Combine', support: true, where: [['Felder 41-60/', 'Feld 43'], ['_Hof 1 Mitte/', 'Hof 1 Silo']]},
  {kind: 'gate', num: '4', job: 'Unlock Follower'},
  {kind: 'ad', num: '5', job: 'Drive To', where: [['Felder 41-60/', 'Feld 45']]},
];

function Route(): ReactNode {
  return (
    <figure className={styles.routeFigure}>
      <ol className={styles.route} aria-label="Example workflow: the first steps of a harvest">
        {ROUTE.map((s) => (
          <li
            key={s.num}
            className={clsx(styles.stop, styles[s.kind], s.kind !== 'gate' && s.support && styles.support, s.kind !== 'gate' && s.running && styles.running)}>
            <span className={styles.num}>{s.num}</span>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.job}>{s.job}</span>
            {s.kind !== 'gate' && (
              <span className={styles.where}>
                {s.where.map(([group, leaf], i) => (
                  <span key={leaf}>
                    {i > 0 && <span className={styles.arrow} aria-label="then"> → </span>}
                    <span className={styles.grp}>{group}</span>
                    {leaf}
                  </span>
                ))}
              </span>
            )}
            {s.kind !== 'gate' && s.running && <span className={styles.now}>running</span>}
          </li>
        ))}
      </ol>
      <figcaption>
        The first steps of a harvest workflow: the combine waits for its leader, drives out and
        threshes, while a support vehicle unloads it and takes the grain to the silo.
      </figcaption>
    </figure>
  );
}

function Hero(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroCopy}>
          <Heading as="h1" className={styles.title}>
            One list of steps. AutoDrive drives it, Courseplay works the fields.
          </Heading>
          <p className={styles.lede}>
            Workflow Manager is a Farming Simulator 25 mod that runs a vehicle through a list you
            write once: drive to the field, work it, unload, move on to the next. With helper
            vehicles, convoys, and multiplayer.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              Get started
            </Link>
            <Link className="button button--secondary button--outline button--lg" href={WEB_EDITOR}>
              Open the web editor
            </Link>
          </div>
        </div>
        <Route />
      </div>
    </header>
  );
}

/* Grouped the way the step dialog groups them: by the mod that runs the step. */
const GROUPS = [
  {
    kind: 'ad',
    name: 'AutoDrive',
    jobs: ['Drive To', 'Pickup and Deliver', 'Deliver', 'Load', 'Unload Combine', 'Park', 'Refuel', 'Repair'],
    text: 'Moves the vehicle between places on your AutoDrive network. Park, Refuel, and Repair find the spot themselves.',
  },
  {
    kind: 'cp',
    name: 'Courseplay',
    jobs: ['Field Work', 'Bale Collect'],
    text: 'Works a saved course. A field-work step can set the seed type, and resumes at its waypoint after a savegame load.',
  },
  {
    kind: 'gate',
    name: 'Sync markers',
    jobs: ['Wait for Leader', 'Unlock Follower'],
    text: 'Hold a vehicle at a checkpoint until the one ahead has cleared the field, for convoys and staggered work.',
  },
] as const;

function Steps(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.h2}>What a step can be</Heading>
        <div className={styles.groups}>
          {GROUPS.map((g) => (
            <div key={g.name} className={clsx(styles.group, styles[g.kind])}>
              <Heading as="h3" className={styles.groupName}>
                <span className={styles.node} aria-hidden="true" />
                {g.name}
              </Heading>
              <p>{g.text}</p>
              <ul className={styles.jobs}>
                {g.jobs.map((j) => <li key={j}>{j}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.note}>
          Any main step can carry <strong>support steps</strong> for a second vehicle: an unloader
          shadowing a combine, a trailer on the forage harvester.{' '}
          See <Link to="/docs/workflows/step-types">all step types</Link> and{' '}
          <Link to="/docs/workflows/linked-workflows">multi-vehicle workflows</Link>.
        </p>
      </div>
    </section>
  );
}

function Where(): ReactNode {
  return (
    <section className={clsx(styles.section, styles.where2)}>
      <div className={clsx('container', styles.showcase)}>
        <div className={styles.shot}>
          <div className={styles.stack}>
            <img
              src={require('@site/static/img/screenshots/editor-support-steps.png').default}
              alt="The in-game workflow editor listing steps with their support steps"
              loading="lazy"
            />
            <img
              className={styles.hud}
              src={require('@site/static/img/screenshots/hud-running.png').default}
              alt="The vehicle HUD: workflow name, current step, Courseplay progress, and transport buttons"
              loading="lazy"
            />
          </div>
          <div className={styles.shotText}>
            <Heading as="h2" className={styles.h2}>In the game</Heading>
            <p>
              Press <kbd>Left Alt</kbd> + <kbd>W</kbd> to build a workflow in the game's own
              dialogs, then start it from the vehicle. The HUD shows the step it's on and lets you
              pause, skip back or ahead, and stop.
            </p>
            <Link to="/docs/workflows/creating-workflows">Creating workflows</Link>
          </div>
        </div>
        <div className={styles.shot}>
          <img
            className={styles.browser}
            src={require('@site/static/img/screenshots/web-editor.png').default}
            alt="The web editor showing a workflow as a route of steps"
            loading="lazy"
          />
          <div className={styles.shotText}>
            <Heading as="h2" className={styles.h2}>In your browser</Heading>
            <p>
              Plan long workflows with a keyboard and a big screen. In Chrome or Edge, open your
              savegame folder and save straight back into it while the game runs. Elsewhere,
              import and export the file.
            </p>
            <Link to="/docs/web-editor">Web editor guide</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Needs(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={clsx('container', styles.needs)}>
        <Heading as="h2" className={styles.h2}>What you need</Heading>
        <ul>
          <li><strong>Farming Simulator 25</strong></li>
          <li><strong>Courseplay</strong> for FS25, with at least one saved course</li>
          <li>
            <strong>AutoDrive</strong> for FS25, only if a workflow uses AutoDrive, Park, Refuel,
            or Repair steps
          </li>
        </ul>
        <Link className="button button--primary" to="/docs/installation">Install Workflow Manager</Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="Workflow Manager for Farming Simulator 25: chain AutoDrive and Courseplay into one list of steps, with support vehicles, convoys and multiplayer.">
      <Hero />
      <main>
        <Steps />
        <Where />
        <Needs />
      </main>
    </Layout>
  );
}
