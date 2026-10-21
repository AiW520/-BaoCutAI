const test = require('node:test');
const assert = require('node:assert/strict');
global.window = {};
require('./model-agent-projects.js');
require('./model-home-workbench.js');
const W = global.window.BC_HOME_WORKBENCH;

const dirs = [
  {id: 'd1', name: 'First', path: '/first', mtime: 1},
  {id: 'd2', name: 'Second', path: '/second', mtime: 2},
  {id: 'd3', name: 'Archived', path: '/archived', mtime: 0, archived: true},
];
const movies = [
  {id: 'm1', title: 'Older edit', dir: 'd1', mtime: 30},
  {id: 'm2', title: 'Recent edit', dir: 'd1', mtime: 3},
];
const sessions = [{id: 's1', title: 'Continue this cut', project: 'm1', ago: 1, messages: []}];

test('recent project cards use the project tree order and pick each newest video', () => {
  const result = W.recentProjects({dirs, movies, sessions});
  assert.deepEqual(result.map((project) => project.id), ['d1', 'd2']);
  assert.equal(result[0].movie.id, 'm2');
  assert.equal(result[0].session.id, 's1');
  assert.equal(result[1].movie, null);
  assert.equal(result[1].session, null);
});

test('recent project limit is bounded without mutating source records', () => {
  const before = movies.map((movie) => movie.id);
  assert.deepEqual(W.recentProjects({dirs, movies, sessions}, 1).map((project) => project.id), ['d1']);
  assert.deepEqual(movies.map((movie) => movie.id), before);
  assert.deepEqual(W.recentProjects({dirs: [], movies: [], sessions: []}), []);
});
