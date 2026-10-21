/* Home workbench modules: recent project cards share the canonical project/session tree. */
(function () {
  function RecentProjects() {
    const app = useApp();
    const W = window.BC_HOME_WORKBENCH;
    const rows = W.recentProjects({dirs: app.dirs, movies: app.activeProjects, sessions: app.sessions});
    const R = window.RSP;
    return <section className="hwb-recent" aria-labelledby="hwb-recent-title">
      <div className="hwb-section-head">
        <div>
          <h2 id="hwb-recent-title">最近的项目</h2>
          <p>从上次停下的地方继续</p>
        </div>
        <R.ActionButton isQuiet size="S" onPress={() => app.go({r: 'projects'})}>
          <R.Icons.Asset /><R.Text>浏览所有作品</R.Text>
        </R.ActionButton>
      </div>
      {rows.length ? <div className="hwb-projects">
        {rows.map((project, index) => {
          const target = project.movie ? () => app.openMovie(project.movie.id)
            : project.session ? () => app.openSession(project.session.id)
              : () => app.go({r: 'agent', dir: project.id});
          const verb = project.movie ? '继续剪辑' : project.session ? '继续会话' : '开始会话';
          const meta = [
            project.movieCount ? `${project.movieCount} 部视频` : null,
            project.sessionCount ? `${project.sessionCount} 个会话` : null,
          ].filter(Boolean).join(' · ') || '新项目';
          return <article className="hwb-project" key={project.id}>
            <div className={`hwb-project__mark hwb-project__mark--${index % 3}`} aria-hidden="true"><R.Icons.Folder /></div>
            <div className="hwb-project__body">
              <h3 title={project.name}>{project.name}</h3>
              <p className="hwb-project__meta">{meta}</p>
              {project.movie ? <p className="hwb-project__movie"><R.Icons.Asset />{project.movie.title}</p> : null}
              {project.summary ? <p className="hwb-project__status">{project.summary}</p> : null}
            </div>
            <R.ActionButton isQuiet size="S" aria-label={`${verb}：${project.name}`} onPress={target}>
              <R.Text>{verb}</R.Text><R.Icons.ChevronRight />
            </R.ActionButton>
          </article>;
        })}
      </div> : <div className="hwb-empty"><R.Icons.Folder /><p>创建一个项目，集中管理视频和创作会话。</p>
        <R.ActionButton isQuiet size="S" onPress={() => app.go({r: 'projects'})}><R.Text>浏览 Space</R.Text><R.Icons.ChevronRight /></R.ActionButton>
      </div>}
    </section>;
  }

  Object.assign(window, {RecentProjects});
})();
