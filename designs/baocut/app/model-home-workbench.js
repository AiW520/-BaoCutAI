/* Home workbench projections. Project ordering remains owned by BC_AGENT_PROJECTS. */
(function () {
  const AP = window.BC_AGENT_PROJECTS;

  function recentProjects(data, limit = 3) {
    return AP.tree(data || {}).projects
      .filter((project) => !project.dir.archived)
      .slice(0, limit)
      .map((project) => {
        const movie = [...project.movies].sort((a, b) => (a.mtime ?? Infinity) - (b.mtime ?? Infinity))[0] || null;
        const session = project.sessions[0] || null;
        return {
          id: project.dir.id,
          name: project.dir.name,
          path: project.dir.path,
          movie,
          movieCount: project.movies.length,
          session,
          sessionCount: project.sessions.length,
          summary: AP.summaryText(project.summary),
        };
      });
  }

  const root = typeof window !== 'undefined' ? window : globalThis;
  root.BC_HOME_WORKBENCH = {recentProjects};
})();
