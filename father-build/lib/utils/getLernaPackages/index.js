"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLernaPackages = getLernaPackages;
exports.getStreamPackages = getStreamPackages;

var _project = require("@lerna/project");

var _queryGraph = require("@lerna/query-graph");

var _filterPackages = require("@lerna/filter-packages");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 获取lerna项目包集合
 * @param cwd
 */
function getLernaPackages(_x) {
  return _getLernaPackages.apply(this, arguments);
}

function _getLernaPackages() {
  _getLernaPackages = _asyncToGenerator(function* (cwd, ops = {}) {
    var _getPackagesSync;

    const _ops$include = ops.include,
          include = _ops$include === void 0 ? [] : _ops$include,
          _ops$exclude = ops.exclude,
          exclude = _ops$exclude === void 0 ? [] : _ops$exclude,
          _ops$skipPrivate = ops.skipPrivate,
          skipPrivate = _ops$skipPrivate === void 0 ? false : _ops$skipPrivate;
    const allPkgs = (_getPackagesSync = (0, _project.getPackagesSync)(cwd)) !== null && _getPackagesSync !== void 0 ? _getPackagesSync : [];
    const pkgs = (0, _filterPackages.filterPackages)(allPkgs, include, exclude, !skipPrivate, true);
    return yield getStreamPackages(pkgs);
  });
  return _getLernaPackages.apply(this, arguments);
}

function getStreamPackages(pkgs) {
  const graph = new _queryGraph.QueryGraph(pkgs, 'allDependencies', true);
  return new Promise(resolve => {
    const returnValues = [];

    const queueNextAvailablePackages = () => graph.getAvailablePackages() // @ts-ignore
    .forEach(({
      pkg,
      name
    }) => {
      graph.markAsTaken(name);
      Promise.resolve(pkg).then(value => returnValues.push(value)).then(() => graph.markAsDone(pkg)).then(() => queueNextAvailablePackages());
    });

    queueNextAvailablePackages();
    setTimeout(() => {
      resolve(returnValues);
    }, 0);
  });
}