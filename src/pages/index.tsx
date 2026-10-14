import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

const WEB_EDITOR = 'https://cschoch.github.io/FS25_WorkflowManagerWebeditor/';

/* Step names as the game shows them, so each locale uses the in-game labels. */
function jobNames() {
  return {
    driveTo: translate({id: 'home.job.driveTo', message: 'Drive To'}),
    pickupDeliver: translate({id: 'home.job.pickupDeliver', message: 'Pickup and Deliver'}),
    deliver: translate({id: 'home.job.deliver', message: 'Deliver'}),
    load: translate({id: 'home.job.load', message: 'Load'}),
    unloadCombine: translate({id: 'home.job.unloadCombine', message: 'Unload Combine'}),
    park: translate({id: 'home.job.park', message: 'Park'}),
    refuel: translate({id: 'home.job.refuel', message: 'Refuel'}),
    repair: translate({id: 'home.job.repair', message: 'Repair'}),
    fieldWork: translate({id: 'home.job.fieldWork', message: 'Field Work'}),
    baleCollect: translate({id: 'home.job.baleCollect', message: 'Bale Collect'}),
    waitForLeader: translate({id: 'home.job.waitForLeader', message: 'Wait for Leader'}),
    unlockFollower: translate({id: 'home.job.unlockFollower', message: 'Unlock Follower'}),
  };
}

/* The hero shows a workflow the way the web editor draws it: a route of stops coloured by the
   mod that runs them. These are the first steps of a real harvest workflow. */
type Stop =
  | {kind: 'gate'; num: string; job: string}
  | {kind: 'ad' | 'cp'; num: string; job: string; where: [string, string][]; support?: boolean; running?: boolean};

function routeStops(): Stop[] {
  const j = jobNames();
  return [
    {kind: 'gate', num: '1', job: j.waitForLeader},
    {kind: 'ad', num: '2', job: j.driveTo, where: [['Felder 41-60/', 'Feld 43']]},
    {kind: 'cp', num: '3', job: j.fieldWork, where: [['F43/', 'Dreschen 14m']], running: true},
    {kind: 'ad', num: '3.1', job: j.unloadCombine, support: true, where: [['Felder 41-60/', 'Feld 43'], ['_Hof 1 Mitte/', 'Hof 1 Silo']]},
    {kind: 'gate', num: '4', job: j.unlockFollower},
    {kind: 'ad', num: '5', job: j.driveTo, where: [['Felder 41-60/', 'Feld 45']]},
  ];
}

function Route(): ReactNode {
  return (
    <figure className={styles.routeFigure}>
      <ol
        className={styles.route}
        aria-label={translate({id: 'home.route.label', message: 'Example workflow: the first steps of a harvest'})}>
        {routeStops().map((s) => (
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
                    {i > 0 && (
                      <span className={styles.arrow} aria-label={translate({id: 'home.route.then', message: 'then'})}>
                        {' → '}
                      </span>
                    )}
                    <span className={styles.grp}>{group}</span>
                    {leaf}
                  </span>
                ))}
              </span>
            )}
            {s.kind !== 'gate' && s.running && (
              <span className={styles.now}>
                <Translate id="home.route.running">running</Translate>
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption>
        <Translate id="home.route.caption">
          The first steps of a harvest workflow: the combine waits for its leader, drives out and
          threshes, while a support vehicle unloads it and takes the grain to the silo.
        </Translate>
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
            <Translate id="home.hero.title">
              One list of steps. AutoDrive drives it, Courseplay works the fields.
            </Translate>
          </Heading>
          <p className={styles.lede}>
            <Translate id="home.hero.lede">
              Workflow Manager is a Farming Simulator 25 mod that runs a vehicle through a list you
              write once: drive to the field, work it, unload, move on to the next. With helper
              vehicles, convoys, and multiplayer.
            </Translate>
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              <Translate id="home.hero.getStarted">Get started</Translate>
            </Link>
            <Link className="button button--secondary button--outline button--lg" href={WEB_EDITOR}>
              <Translate id="home.hero.openWebEditor">Open the web editor</Translate>
            </Link>
          </div>
        </div>
        <Route />
      </div>
    </header>
  );
}

/* Grouped the way the step dialog groups them: by the mod that runs the step. */
function stepGroups() {
  const j = jobNames();
  return [
    {
      kind: 'ad',
      name: 'AutoDrive',
      jobs: [j.driveTo, j.pickupDeliver, j.deliver, j.load, j.unloadCombine, j.park, j.refuel, j.repair],
      text: translate({
        id: 'home.steps.ad',
        message: 'Moves the vehicle between places on your AutoDrive network. Park, Refuel, and Repair find the spot themselves.',
      }),
    },
    {
      kind: 'cp',
      name: 'Courseplay',
      jobs: [j.fieldWork, j.baleCollect],
      text: translate({
        id: 'home.steps.cp',
        message: 'Works a saved course. A field-work step can set the seed type, and resumes at its waypoint after a savegame load.',
      }),
    },
    {
      kind: 'gate',
      name: translate({id: 'home.steps.markersName', message: 'Sync markers'}),
      jobs: [j.waitForLeader, j.unlockFollower],
      text: translate({
        id: 'home.steps.markers',
        message: 'Hold a vehicle at a checkpoint until the one ahead has cleared the field, for convoys and staggered work.',
      }),
    },
  ] as const;
}

function Steps(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.h2}>
          <Translate id="home.steps.title">What a step can be</Translate>
        </Heading>
        <div className={styles.groups}>
          {stepGroups().map((g) => (
            <div key={g.kind} className={clsx(styles.group, styles[g.kind])}>
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
          <Translate
            id="home.steps.note"
            values={{
              supportSteps: (
                <strong>
                  <Translate id="home.steps.note.supportSteps">support steps</Translate>
                </strong>
              ),
              allStepTypes: (
                <Link to="/docs/workflows/step-types">
                  <Translate id="home.steps.note.allStepTypes">all step types</Translate>
                </Link>
              ),
              multiVehicle: (
                <Link to="/docs/workflows/linked-workflows">
                  <Translate id="home.steps.note.multiVehicle">multi-vehicle workflows</Translate>
                </Link>
              ),
            }}>
            {'Any main step can carry {supportSteps} for a second vehicle: an unloader shadowing a combine, a trailer on the forage harvester. See {allStepTypes} and {multiVehicle}.'}
          </Translate>
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
              alt={translate({
                id: 'home.where.editorAlt',
                message: 'The in-game workflow editor listing steps with their support steps',
              })}
              loading="lazy"
            />
            <img
              className={styles.hud}
              src={require('@site/static/img/screenshots/hud-running.png').default}
              alt={translate({
                id: 'home.where.hudAlt',
                message: 'The vehicle HUD: workflow name, current step, Courseplay progress, and transport buttons',
              })}
              loading="lazy"
            />
          </div>
          <div className={styles.shotText}>
            <Heading as="h2" className={styles.h2}>
              <Translate id="home.where.gameTitle">In the game</Translate>
            </Heading>
            <p>
              <Translate
                id="home.where.gameText"
                values={{
                  keys: (
                    <>
                      <kbd>
                        <Translate id="home.where.leftAlt">Left Alt</Translate>
                      </kbd>{' '}
                      + <kbd>W</kbd>
                    </>
                  ),
                }}>
                {"Press {keys} to build a workflow in the game's own dialogs, then start it from the vehicle. The HUD shows the step it's on and lets you pause, skip back or ahead, and stop."}
              </Translate>
            </p>
            <Link to="/docs/workflows/creating-workflows">
              <Translate id="home.where.gameLink">Creating workflows</Translate>
            </Link>
          </div>
        </div>
        <div className={styles.shot}>
          <img
            className={styles.browser}
            src={require('@site/static/img/screenshots/web-editor.png').default}
            alt={translate({id: 'home.where.webAlt', message: 'The web editor showing a workflow as a route of steps'})}
            loading="lazy"
          />
          <div className={styles.shotText}>
            <Heading as="h2" className={styles.h2}>
              <Translate id="home.where.webTitle">In your browser</Translate>
            </Heading>
            <p>
              <Translate id="home.where.webText">
                Plan long workflows with a keyboard and a big screen. In Chrome or Edge, open your
                savegame folder and save straight back into it while the game runs. Elsewhere,
                import and export the file.
              </Translate>
            </p>
            <Link to="/docs/web-editor">
              <Translate id="home.where.webLink">Web editor guide</Translate>
            </Link>
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
        <Heading as="h2" className={styles.h2}>
          <Translate id="home.needs.title">What you need</Translate>
        </Heading>
        <ul>
          <li><strong>Farming Simulator 25</strong></li>
          <li>
            <Translate id="home.needs.cp" values={{name: <strong>Courseplay</strong>}}>
              {'{name} for FS25, with at least one saved course'}
            </Translate>
          </li>
          <li>
            <Translate id="home.needs.ad" values={{name: <strong>AutoDrive</strong>}}>
              {'{name} for FS25, only if a workflow uses AutoDrive, Park, Refuel, or Repair steps'}
            </Translate>
          </li>
        </ul>
        <Link className="button button--primary" to="/docs/installation">
          <Translate id="home.needs.install">Install Workflow Manager</Translate>
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({id: 'home.meta.title', message: 'Home'})}
      description={translate({
        id: 'home.meta.description',
        message:
          'Workflow Manager for Farming Simulator 25: chain AutoDrive and Courseplay into one list of steps, with support vehicles, convoys and multiplayer.',
      })}>
      <Hero />
      <main>
        <Steps />
        <Where />
        <Needs />
      </main>
    </Layout>
  );
}
