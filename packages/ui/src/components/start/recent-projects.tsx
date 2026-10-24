import { ActionButton, Text } from '@react-spectrum/s2';
import Asset from '@react-spectrum/s2/icons/Asset';
import ChevronRight from '@react-spectrum/s2/icons/ChevronRight';
import Folder from '@react-spectrum/s2/icons/Folder';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };
import { recentProjects } from '../../model/home-workbench.ts';
import { videoTargetOf } from '../../model/space.ts';
import { useDirectory } from '../../state/directory-store.ts';
import { useShell } from '../../state/shell-store.ts';
import { useSpace } from '../../state/space-store.ts';
import { S } from '../shell-copy.ts';
import { W } from './home-workbench-copy.ts';

const section = style({ marginTop: 32, paddingTop: 24, borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: 'gray-100' });
const head = style({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 });
const heading = style({ margin: 0, fontSize: '[18px]', lineHeight: '[24px]', fontWeight: 'bold', color: 'gray-900' });
const note = style({ margin: 0, marginTop: 4, font: 'ui-sm', color: 'gray-600' });
const grid = style({ display: 'grid', gridTemplateColumns: { default: '[repeat(3, minmax(0, 1fr))]', isCompact: '[repeat(2, minmax(0, 1fr))]', isNarrow: '[minmax(0, 1fr)]' }, gap: 16 });
const card = style({ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 16, padding: 20, minWidth: 0, borderWidth: 1, borderStyle: 'solid', borderColor: 'gray-100', borderRadius: 'lg', backgroundColor: 'gray-25', boxShadow: 'emphasized' });
const mark = style({ display: 'grid', placeItems: 'center', size: 36, borderRadius: 'lg', backgroundColor: { tone: { blue: 'blue-100', purple: 'purple-200', seafoam: 'seafoam-200' } }, color: 'gray-900' });
const content = style({ display: 'flex', flexDirection: 'column', gap: 4, alignSelf: 'stretch', flexGrow: 1, minWidth: 0 });
const projectName = style({ margin: 0, font: 'ui', fontWeight: 'bold', color: 'gray-900', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
const detail = style({ display: 'flex', alignItems: 'center', gap: 4, margin: 0, font: 'ui-sm', color: 'gray-600', minWidth: 0 });
const oneLine = style({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 });
const action = style({ alignSelf: 'stretch', width: 'full' });
const tones = ['blue', 'purple', 'seafoam'] as const;

export function RecentProjects({ compact, narrow }: { compact: boolean; narrow: boolean }) {
  const { projects, conversations, ready } = useDirectory();
  const { entries, ready: spaceReady, scanning } = useSpace();
  const rows = recentProjects(projects, conversations, entries);
  const shell = useShell.getState();
  const browse = () => shell.go({ tab: 'space', category: 'all', projectId: null });
  return (
    <section className={section} aria-labelledby="home-recent-title">
      <div className={head}>
        <div><h2 id="home-recent-title" className={heading}>{W.recentTitle}</h2><p className={note}>{W.recentHint}</p></div>
        <ActionButton isQuiet size="S" onPress={browse}><Asset /><Text>{W.browse}</Text></ActionButton>
      </div>
      {!ready ? <p className={note} role="status">{S.common.loadingEllipsis}</p> : rows.length ? (
        <div className={grid({ isCompact: compact, isNarrow: narrow })}>
          {rows.map((row, index) => {
            const label = row.video ? W.continueVideo : row.conversation ? W.continueSession : W.startSession;
            const open = () => {
              if (row.video) shell.openVideo(videoTargetOf(row.video), { conversationId: null, projectId: row.project.id });
              else shell.go({ tab: 'home', conversationId: row.conversation?.id ?? null, projectId: row.conversation ? null : row.project.id });
            };
            return <article key={row.project.id} className={card}>
              <div className={mark({ tone: tones[index % tones.length]! })} aria-hidden="true"><Folder /></div>
              <div className={content}>
                <h3 className={projectName} title={row.project.name}>{row.project.name}</h3>
                <p className={detail}>{scanning ? S.common.loadingEllipsis : [W.videos(row.videoCount), W.sessions(row.conversations.length)].join(' · ')}</p>
                {row.video ? <p className={detail}><Asset /><span className={oneLine} title={row.video.name}>{row.video.name}</span></p> : null}
                {row.summary ? <p className={`${detail} ${oneLine}`} title={row.summary}>{row.summary}</p> : null}
              </div>
              <ActionButton isQuiet size="S" styles={action} isDisabled={!spaceReady || scanning} aria-label={`${label}: ${row.project.name}`} onPress={open}><Text>{label}</Text><ChevronRight /></ActionButton>
            </article>;
          })}
        </div>
      ) : <div className={card}><Folder /><p className={note}>{W.empty}</p><ActionButton isQuiet onPress={browse}><Text>{W.browse}</Text><ChevronRight /></ActionButton></div>}
    </section>
  );
}
