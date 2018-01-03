(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d3ac841bb5cf68d01c6c"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(14)(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withToast;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Toast = __webpack_require__(26);

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withToast(OriginalComponent) {
  return class WithToast extends _react2.default.Component {
    constructor(props) {
      super(props);
      this.state = {
        toastVisible: false,
        toastMessage: '',
        toastType: 'success'
      };
      this.showSuccess = this.showSuccess.bind(this);
      this.showError = this.showError.bind(this);
      this.dismissToast = this.dismissToast.bind(this);
    }

    showSuccess(message) {
      this.setState({ toastVisible: true, toastMessage: message,
        toastType: 'success' });
    }

    showError(message) {
      this.setState({ toastVisible: true, toastMessage: message,
        toastType: 'danger' });
    }

    dismissToast() {
      this.setState({ toastVisible: false });
    }

    render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(OriginalComponent, _extends({
          showError: this.showError, showSuccess: this.showSuccess
        }, this.props)),
        _react2.default.createElement(_Toast2.default, {
          showing: this.state.toastVisible, message: this.state.toastMessage,
          onDismiss: this.dismissToast, bsStyle: this.state.toastType })
      );
    }
  };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDB = exports.app = undefined;

var _express = __webpack_require__(9);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(18);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = __webpack_require__(19);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _mongodb = __webpack_require__(8);

var _issue = __webpack_require__(20);

var _issue2 = _interopRequireDefault(_issue);

var _renderedPageRouter = __webpack_require__(21);

var _renderedPageRouter2 = _interopRequireDefault(_renderedPageRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import SourceMapSupport from 'source-map-support';
// SourceMapSupport.install();
// import 'babel-polyfill';

//import path from 'path';
const app = (0, _express2.default)();
app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());
app.use((0, _expressSession2.default)({ secret: 'h7e3f5s6', resave: false,
  saveUninitialized: true }));

app.all('/api/*', (req, res, next) => {
  if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
    if (!req.session || !req.session.user) {
      console.log("the session is : ", req.session);
      res.status(403).send({
        message: 'You are not authorized to perform the operation'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.get('/api/users/me', (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({ signedIn: false, name: '' });
  }
});

app.post('/signin', (req, res) => {
  if (!req.body.id_token) {
    res.status(400).send({ code: 400, message: 'Missing token. ' });
    return;
  }
  console.log("tried to sign in  -- session ", req.body.id_token);
  fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.id_token}`).then(response => {
    if (!response.ok) response.json().then(error => Promise.reject(error));
    response.json().then(data => {
      req.session.user = {
        signedIn: true, name: data.given_name
      };
      console.log("signed in successfully  -- session ", req.session);
      res.json(req.session.user);
    });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server error ${error}` });
  });
});

app.post('/signout', (req, res) => {
  if (req.session) req.session.destroy();
  res.json({ status: 'ok' });
});

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json({type: 'application/*+json'}));
//app.use(require('connect').bodyParser());
//app.use(app.router);


let db;

if (process.env.NODE_ENV !== 'production') {
  const webpack = __webpack_require__(12);
  const webpackDevMiddleware = __webpack_require__(37);
  const webpackHotMiddleware = __webpack_require__(38);

  const config = __webpack_require__(39);
  config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.delete('/api/issues/:id', (req, res) => {
  console.log("server -- trying to delete issue  ");
  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid  issue ID format: ${error}` });
    return;
  }
  db.collection('issues').deleteOne({ _id: issueId }).then(deleteResult => {
    if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object no found' });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal server error : ${error}` });
  });
});

app.put('/api/issues/:id', (req, res) => {

  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format : ${error}` });
    return;
  }
  const issue = req.body;

  delete issue._id;
  const err = _issue2.default.validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  console.log("the title to update is : " + issue.created);
  db.collection('issues').updateOne({ _id: issueId }, _issue2.default.convertIssue(issue)).then(() => db.collection('issues').find({ _id: issueId }).limit(1).next()).then(savedIssue => {
    res.json(savedIssue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server error : ${error}` });
  });
});

app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  if (req.query.search) filter.$text = { $search: req.query.search };
  if (req.query._summary === undefined) {
    const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
    let limit = req.query.limit ? parseInt(req.query._limit, 10) : 20;
    if (limit > 50) limit = 50;
    const cursor = db.collection('issues').find(filter).sort({ _id: 1 }).skip(offset).limit(limit);
    let totalCount;
    cursor.count(false).then(result => {
      totalCount = result;
      return cursor.toArray();
    }).then(issues => {
      const metadata = { total_count: totalCount };
      res.json({ metadata: metadata, records: issues });
      console.log("request");
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
  } else {
    db.collection('issues').aggregate([{ $match: filter }, { $group: { _id: { owner: '$owner', status: '$status' },
        count: { $sum: 1 }
      } }]).toArray().then(results => {
      const stats = {};
      results.forEach(result => {
        if (!stats[result._id.owner]) stats[result._id.owner] = {};
        stats[result._id.owner][result._id.status] = result.count;
      });
      res.json(stats);
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server error : ${error}` });
    });
  }
});

app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {

    issueId = (0, _mongodb.ObjectId)(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue Id format: ${req.params.id} ${error}` });
    return;
  }

  db.collection('issues').find({ _id: issueId }).limit(1).next().then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });else res.json(issue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal server error: ${error}` });
  });
});

app.post('/api/issues', (req, res) => {

  const newIssue = req.body;
  // newIssue.id = issues.length +1;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }
  console.log('******** hello ********');
  const err = _issue2.default.validateIssue(newIssue);
  if (err) {
    console.log('******** error ********');
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').insertOne(_issue2.default.cleanupIssue(newIssue)).then(result => {
    console.log('******** hello1 ********');
    db.collection('issues').find({ _id: result.insertedId }).limit(1).next().then(newIssue => {
      console.log('******** hello2 ********');
      res.json(newIssue);
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server error : ${error}` });
    });
  });

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve('static/index.html'));
  // });

  // issues.push(newIssue);

  // res.json(newIssue);
});
app.use('*', _renderedPageRouter2.default);
// app.listen(3000, ()=>{
//   console.log('App started on port 3000');
// });

function setDB(newDB) {
  db = newDB;
}

exports.app = app;
exports.setDB = setDB;

// MongoClient.connect('mongodb://localhost/issuetracker').then((connection) => {
//   db = connection;
//
//   app.listen(3000, () => {
//     console.log('App started on port 3000');
//   });
// }).catch((error) => {
//   console.log('ERROR', error);
// });

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-router-bootstrap");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueAddNavItem extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  submit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.issueAdd;
    const newIssue = {
      owner: form.owner.value, title: form.title.value,
      status: 'New', created: new Date()
    };
    fetch('/api/issues', { method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          this.props.router.push(`/issues/${updatedIssue._id}`);
        });
      } else {
        response.json().then(error => {
          this.props.showError(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch(err => {
      this.props.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    return _react2.default.createElement(
      _reactBootstrap.NavItem,
      { onClick: this.showModal },
      ' ',
      _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }),
      'Create Issue',
      _react2.default.createElement(
        _reactBootstrap.Modal,
        { keyboard: true, show: this.state.showing, onHide: this.hideModal },
        _react2.default.createElement(
          _reactBootstrap.Modal.Header,
          { closeButton: true },
          _react2.default.createElement(
            _reactBootstrap.Modal.Title,
            null,
            ' Create Issue '
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Body,
          null,
          _react2.default.createElement(
            _reactBootstrap.Form,
            { name: 'issueAdd' },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(
                _reactBootstrap.ControlLabel,
                null,
                'Title'
              ),
              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', autoFocus: true })
            ),
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(
                _reactBootstrap.ControlLabel,
                null,
                'Owner'
              ),
              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner' })
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Footer,
          null,
          _react2.default.createElement(
            _reactBootstrap.ButtonToolbar,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { type: 'button', bsStyle: 'primary',
                onClick: this.submit },
              'Submit'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'link', onClick: this.hideModal },
              'Cancel'
            )
          )
        )
      )
    );
  }

}

IssueAddNavItem.propTypes = {
  router: _propTypes2.default.object,
  showError: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRouter.withRouter)(IssueAddNavItem);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueFilter extends _react2.default.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      status: props.initFilter.status || '',
      effort_gte: props.initFilter.effort_gte || '',
      effort_lte: props.initFilter.effort_lte || '',
      changed: false
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      changed: false
    });
  }
  resetFilter() {
    this.setState({
      status: this.props.initFilter.status || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      changed: false
    });
  }

  setFilterOpen(e) {
    e.preventDefault();
    this.props.setFilter({ status: "open" });
  }

  setFilterAssigned(e) {
    e.preventDefault();
    this.props.setFilter({ status: 'assigned' });
  }

  clearFilter(e) {
    e.preventDefault();
    this.props.setFilter({});
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortGte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_gte: e.target.value, changed: true });
    }
  }

  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_lte: e.target.value, changed: true });
    }
  }
  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setFilter(newFilter);
  }

  clearFilter() {
    this.props.setFilter({});
  }

  render() {
    //  const Separator = () => <span> | </span>
    return _react2.default.createElement(
      _reactBootstrap.Row,
      null,
      _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Status '
          ),
          _react2.default.createElement(
            _reactBootstrap.FormControl,
            { componentClass: 'select', value: this.state.status, onChange: this.onChangeStatus },
            _react2.default.createElement(
              'option',
              { value: '' },
              ' (any) '
            ),
            _react2.default.createElement(
              'option',
              { value: 'New' },
              'New '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Open' },
              ' Open '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Assigned' },
              'Assigned'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Fixed' },
              'Fixed '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Verified' },
              'Verified '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Closed' },
              'Closed '
            )
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            ' Effort '
          ),
          _react2.default.createElement(
            _reactBootstrap.InputGroup,
            null,
            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_gte, onChange: this.onChangeEffortGte }),
            _react2.default.createElement(
              _reactBootstrap.InputGroup.Addon,
              null,
              '-'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_lte, onChange: this.onChangeEffortLte })
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 6, sm: 4, md: 4, lg: 3 },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            '&npsp; '
          ),
          _react2.default.createElement(
            _reactBootstrap.ButtonToolbar,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: this.applyFilter },
              ' Apply '
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.resetFilter, disabled: !this.state.changed },
              ' Reset '
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.clearFilter },
              ' Clear '
            )
          )
        )
      )
    );
  }
}

exports.default = IssueFilter;
IssueFilter.propTypes = {
  setFilter: _propTypes2.default.func.isRequired,
  initFilter: _propTypes2.default.object
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
module.exports = __webpack_require__(40);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sourceMapSupport = __webpack_require__(16);

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

__webpack_require__(7);

var _http = __webpack_require__(17);

var _http2 = _interopRequireDefault(_http);

var _mongodb = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();


let appModule = __webpack_require__(5);
let db;
let server;

_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;
  server = _http2.default.createServer();
  appModule.setDB(db);
  server.on('request', appModule.app);
  server.listen(3000, () => {
    console.log("App started on port 3000");
  });
}).catch(error => {
  console.log('Error : ', error);
});

if (true) {
  module.hot.accept(5, () => {
    server.removeListener('request', appModule.app);
    appModule = __webpack_require__(5); //eslinit-disable-line
    appModule.setDB(db);
    server.on('request', appModule.app);
  });
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
};

function cleanupIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issue).forEach(field => {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });
  return cleanedUpIssue;
}

function convertIssue(issue) {
  if (issue.created) issue.created = new Date(issue.created);
  if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
  return cleanupIssue(issue);
}

function validateIssue(issue) {
  const errors = [];
  console.log(issue.status);
  Object.keys(issueFieldType).forEach(field => {
    console.log(issue[field]);
    if (issueFieldType[field] === 'required' && !issue[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (!validIssueStatus[issue.status]) {
    errors.push(`${issue.status} is not a valid status`);
  }
  return errors.length ? errors.join('; ') : null;
}

exports.default = {
  validateIssue: validateIssue,
  cleanupIssue: cleanupIssue,
  convertIssue: convertIssue
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(22);

var _reactRouter = __webpack_require__(3);

var _express = __webpack_require__(9);

var _express2 = _interopRequireDefault(_express);

var _template = __webpack_require__(23);

var _template2 = _interopRequireDefault(_template);

var _Routes = __webpack_require__(24);

var _Routes2 = _interopRequireDefault(_Routes);

var _ContextWrapper = __webpack_require__(36);

var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderedPageRouter = new _express2.default();

//import HelloWorld from '../static/src/HelloWorld.jsx';


renderedPageRouter.get('*', (req, res) => {
  (0, _reactRouter.match)({ routes: _Routes2.default, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log(" there is an error here : ", error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      console.log(" there is the redirectLocation here : ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const componentsWithData = renderProps.components.filter(c => c.dataFetcher);
      const dataFetchers = componentsWithData.map(c => c.dataFetcher({
        params: renderProps.params,
        location: renderProps.location,
        urlBase: 'http://localhost:3000', cookie: req.headers.cookie
      }));
      Promise.all(dataFetchers).then(dataList => {
        let initialState = {};
        dataList.forEach(namedData => {
          initialState = Object.assign(initialState, namedData);
        });

        const html = (0, _server.renderToString)(_react2.default.createElement(
          _ContextWrapper2.default,
          { initialState: initialState },
          _react2.default.createElement(_reactRouter.RouterContext, renderProps)
        ));
        res.status(200).send((0, _template2.default)(html, initialState));
      }).catch(err => {
        console.log(`Error rendering to string : ${err}`);
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
  // const initialState = {addressee: 'Universe'};
  // const html = renderToString(<HelloWorld {...initialState} />);
  // res.send(template(html, initialState));
});
exports.default = renderedPageRouter;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server.js");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;
function template(body, initialState) {
  return `<!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >
        <meta name="google-signin-client_id" content="vama50j9hj8rcg5omt0a6ra3h7fut7on.apps.googleusercontent.com">
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/react-select/dist/react-select.css" />
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <style>
          .aColor{
            color:red;
          }
        .panel-title a {display:block; width: 100%; cursor: pointer;}
        </style>
        <body>
          <div id="contents">${body}</div>

          <!--- this is where our component will appear -->
          <script>
            window.__INITIAL_STATE__ =${JSON.stringify(initialState)};
          </script>
          <script src="/vendor.bundle.js"></script>
          <script src="/app.bundle.js"></script>
          <script src="/config.js"></script>
        </body>
      </html>`;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(3);

var _App = __webpack_require__(25);

var _App2 = _interopRequireDefault(_App);

var _IssueList = __webpack_require__(30);

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = __webpack_require__(32);

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

var _IssueReport = __webpack_require__(35);

var _IssueReport2 = _interopRequireDefault(_IssueReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NoMatch = () => _react2.default.createElement(
  'p',
  null,
  'Page Not Found '
);

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: 'issues', component: (0, _reactRouter.withRouter)(_IssueList2.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'issues/:id', component: _IssueEdit2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'reports', component: (0, _reactRouter.withRouter)(_IssueReport2.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(7);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

var _reactRouterBootstrap = __webpack_require__(6);

var _IssueAddNavItem = __webpack_require__(10);

var _IssueAddNavItem2 = _interopRequireDefault(_IssueAddNavItem);

var _withToast = __webpack_require__(4);

var _withToast2 = _interopRequireDefault(_withToast);

var _Header = __webpack_require__(27);

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const HeaderWithToast = withToast(Header);
class App extends _react2.default.Component {
  static dataFetcher(_ref) {
    let urlBase = _ref.urlBase,
        cookie = _ref.cookie;

    const headers = cookie ? { headers: { Cookie: cookie } } : null;
    return fetch(`${urlBase || ''}/api/users/me`, headers).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ App: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    const user = context.initialState.App ? context.initialState.App : {};
    this.state = {
      user: user
    };
    this.onSignin = this.onSignin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount() {
    App.dataFetcher({}).then(data => {
      const user = data.App;
      this.setState({ user: user });
    });
  }

  onSignin(name) {
    this.setState({ user: { signedIn: true, name: name } });
  }

  onSignout(name) {
    this.setState({ user: { signedIn: false, name: '' } });
  }

  render() {
    const childrenWithUser = _react2.default.Children.map(this.props.children, child => _react2.default.cloneElement(child, { user: this.state.user }));
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_Header2.default, { user: this.state.user, onSignin: this.onSignin,
        onSignout: this.onSignout }),
      _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        childrenWithUser,
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'h5',
          null,
          _react2.default.createElement(
            'small',
            null,
            'Full source code available at  this',
            _react2.default.createElement(
              'a',
              { href: 'https://github.com/vasansr/prop-mern-stack' },
              'Github Repository'
            )
          )
        )
      )
    );
  }
}

exports.default = App;

//import ReactDOM from 'react-dom';
//import { Router, Route, Redirect, browserHistory } from 'react-router';

App.propTypes = {
  children: _react2.default.PropTypes.object.isRequired
};

App.contextTypes = {
  initialState: _react2.default.PropTypes.object
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Toast extends _react2.default.Component {
  ComponentDidUpdate() {
    if (this.props.showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(this.props.onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    return _react2.default.createElement(
      _reactBootstrap.Collapse,
      { 'in': this.props.showing },
      _react2.default.createElement(
        'div',
        { style: { position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center' } },
        _react2.default.createElement(
          _reactBootstrap.Alert,
          { style: { display: 'inline-block', width: 500 }, bsStyle: this.props.bsStyle,
            onDismiss: this.props.onDismiss },
          this.props.message
        )
      )
    );
  }
}

exports.default = Toast;
Toast.propTypes = {
  showing: _propTypes2.default.bool.isRequired,
  onDismiss: _propTypes2.default.func.isRequired,
  bsStyle: _propTypes2.default.string,
  message: _propTypes2.default.any.isRequired
};

Toast.defaultProps = {
  bsStyle: 'success'
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

var _reactRouterBootstrap = __webpack_require__(6);

var _reactRouter = __webpack_require__(3);

var _reactSelect = __webpack_require__(28);

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _IssueAddNavItem = __webpack_require__(10);

var _IssueAddNavItem2 = _interopRequireDefault(_IssueAddNavItem);

var _withToast = __webpack_require__(4);

var _withToast2 = _interopRequireDefault(_withToast);

var _SigninNavItem = __webpack_require__(29);

var _SigninNavItem2 = _interopRequireDefault(_SigninNavItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = props => {
  function searchIssues(input) {
    if (input.length < 2) return Promise.resolve({ options: [] });

    return fetch(`/api/issues?search=${input}`, { credentials: 'same-origin' }).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => {
        const options = data.records.map(issue => ({
          value: issue._id,
          label: `${issue._id.substr(-4)}: ${issue.title}`
        }));
        return { options: options };
      }).catch(error => {
        this.props.showError(`Error fetching data from server: ${error}`);
      });
    });
  }

  function filterOptions(options) {
    return options;
  }

  function selectIssue(item) {
    if (item) props.router.push(`/issues/${item.value}`);
  }

  return _react2.default.createElement(
    _reactBootstrap.Navbar,
    { fluid: true },
    _react2.default.createElement(
      _reactBootstrap.Col,
      { sm: 5 },
      _react2.default.createElement(
        _reactBootstrap.Navbar.Header,
        null,
        _react2.default.createElement(
          _reactBootstrap.Navbar.Brand,
          null,
          'Issue Tracker'
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Nav,
        null,
        _react2.default.createElement(
          _reactRouterBootstrap.LinkContainer,
          { to: '/issues' },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            null,
            'Issues'
          )
        ),
        _react2.default.createElement(
          _reactRouterBootstrap.LinkContainer,
          { to: '/reports' },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            null,
            'Reports'
          )
        )
      )
    ),
    _react2.default.createElement(
      _reactBootstrap.Col,
      { sm: 4 },
      _react2.default.createElement(
        'div',
        { style: { paddingTop: 8 } },
        _react2.default.createElement(_reactSelect2.default.Async, {
          instanceId: 'search', placeholder: 'Search ...', autoload: false, cache: false,
          loadOptions: searchIssues, filterOptions: filterOptions, onChange: selectIssue
        })
      )
    ),
    _react2.default.createElement(
      _reactBootstrap.Col,
      { sm: 3 },
      _react2.default.createElement(
        _reactBootstrap.Nav,
        { pullRight: true },
        props.user.signedIn ? _react2.default.createElement(_IssueAddNavItem2.default, { showError: props.showError }) : null,
        _react2.default.createElement(_SigninNavItem2.default, { user: props.user, onSignin: props.onSignin,
          onSignout: props.onSignout,
          showError: props.showError, showSuccess: props.showSuccess })
      )
    )
  );
};

Header.propTypes = {
  showError: _react2.default.PropTypes.func.isRequired,
  router: _react2.default.PropTypes.object,
  showSuccess: _react2.default.PropTypes.func.isRequired,
  onSignin: _react2.default.PropTypes.func.isRequired,
  onSignout: _react2.default.PropTypes.func.isRequired,
  user: _react2.default.PropTypes.object
};

exports.default = (0, _reactRouter.withRouter)((0, _withToast2.default)(Header));

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("react-select");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SigninNavItem extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false, disabled: true
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signout = this.signout.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount() {
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        if (!window.config || !window.config.googleClientId) {
          this.props.showError('Missing Google Client Id or  config file /static/config.js');
        } else {
          window.gapi.auth2.init({ client_id: window.config.googleClientId }).then(() => {
            this.setState({ disabled: false });
          });
        }
      }
    });
  }

  /*signin(){
    this.hideModal();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const name  = googleUser.getBasicProfile().getGivenName();
      console.log("signed in success - name : ", name);
      this.props.onSignin(name);
    }, error =>{
      this.props.showError(`Error authentication with Google ${error}`);
    });
  }*/

  signin() {
    this.hideModal();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      fetch('/signin', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: googleUser.getAuthResponse().id_token })
      }).then(response => {
        if (response.ok) {
          response.json().then(user => {
            this.props.onSignin(user.name);
          });
        } else {
          response.json().then(error => {
            this.props.showError(`App login failed : ${error}`);
          });
        }
      }).catch(err => {
        this.props.showError(`Error posting login to app: ${err}`);
      });
    }, error => {
      this.props.showError(`Error authentication with Google ${error}`);
    });
  }

  /*signout(){
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(response => {
      this.props.showSuccess('Successfully signed out.');
      this.props.onSignout();
    });
  }*/

  signout() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    fetch('/signout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) {
        auth2.signOut().then(() => {
          this.props.showSuccess('Successfully signed out');
          this.props.onSignout();
        });
      }
    });
  }

  showModal() {
    if (this.state.disabled) {
      this.props.showError('Missing Google Client Id or config file /static/config.js ');
    } else {
      this.setState({ showing: true });
    }
  }

  hideModal() {
    this.setState({ showing: false });
  }

  render() {
    if (this.props.user.signedIn) {
      return _react2.default.createElement(
        _reactBootstrap.NavDropdown,
        { title: this.props.user.name, id: 'user-dropdown' },
        _react2.default.createElement(
          _reactBootstrap.MenuItem,
          { onClick: this.signout },
          'Sign out'
        )
      );
    }
    return _react2.default.createElement(
      _reactBootstrap.NavItem,
      { onClick: this.showModal },
      ' Sign In',
      _react2.default.createElement(
        _reactBootstrap.Modal,
        { keyboard: true, show: this.state.showing, onHide: this.hideModal,
          bsSize: 'sm' },
        _react2.default.createElement(
          _reactBootstrap.Modal.Header,
          { closeButton: true },
          _react2.default.createElement(
            _reactBootstrap.Modal.Title,
            null,
            'Sign In'
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Body,
          null,
          _react2.default.createElement(
            _reactBootstrap.Button,
            { block: true, disabled: this.state.disabled, onClick: this.signin },
            _react2.default.createElement('img', { src: '/btn_google_signin_dark_normal_web.png', alt: 'Signin' })
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Footer,
          null,
          _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'link', onClick: this.hideModal },
            'Cancel '
          )
        )
      )
    );
  }
}

exports.default = SigninNavItem;
SigninNavItem.propTypes = {
  user: _react2.default.PropTypes.object,
  onSignin: _react2.default.PropTypes.func.isRequired,
  onSignout: _react2.default.PropTypes.func.isRequired,
  showError: _react2.default.PropTypes.func.isRequired,
  showSuccess: _react2.default.PropTypes.func.isRequired
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(31);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(1);

var _IssueFilter = __webpack_require__(11);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _withToast = __webpack_require__(4);

var _withToast2 = _interopRequireDefault(_withToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import IssueAdd from './IssueAdd.jsx';
const PAGE_SIZE = 10;
//import Toast from './Toast.jsx';


const IssueRow = props => {

  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }

  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        _reactRouter.Link,
        { to: `/issues/${props.issue._id}` },
        props.issue._id.substr(-4)
      )
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.status
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.owner
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.created.toDateString()
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.effort
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.title
    ),
    props.deleteIssue ? _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        _reactBootstrap.Button,
        { bsSize: 'xsmall', onClick: onDeleteClick },
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'trash' }),
        ' '
      )
    ) : null
  );
};

IssueRow.propTypes = {
  issue: _propTypes2.default.object.isRequired,
  deleteIssue: _propTypes2.default.func
};

function IssueTable(props) {
  const issueRows = props.issues.map(issue => _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue }));

  return _react2.default.createElement(
    _reactBootstrap.Table,
    { bordered: true, condensed: true, hover: true, responsive: true },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Id'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Title'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Owner'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Created'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Effort'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Completion Date'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Title'
        ),
        props.deleteIssue ? _react2.default.createElement('th', null) : null
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      issueRows
    )
  );
}

IssueTable.propTypes = {
  issues: _propTypes2.default.array.isRequired,
  deleteIssue: _propTypes2.default.func
};

class IssueList extends _react2.default.Component {

  static dataFetcher(_ref) {
    let urlBase = _ref.urlBase,
        location = _ref.location;

    const query = Object.assign({}, location.query);
    const pageStr = query._page;
    if (pageStr) {
      delete query._page;
      query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
    }
    query._limit = PAGE_SIZE;
    const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
    return fetch(`${urlBase || ''}/api/issues?${search}`, { credentials: 'same-origin' }).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueList: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    //const issues = context.initialState.data.records;
    //const issues = context.initialState && context.initialState.IssueList ? context.initialState.IssueList.records : [];
    const data = context.initialState.IssueList ? context.initialState.IssueList : { metadata: { totalCount: 0 }, records: [] };
    const issues = data.records;

    issues.forEach(issue => {
      issue.created = new Date(issue.created);
      if (issue.completionDate) {
        issue.completionDate = new Date(issue.completionDate);
      }
    });
    this.state = { issues: issues,
      totalCount: data.metadata.totalCount
    };

    this.selectPage = this.selectPage.bind(this);
    //this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  deleteIssue(id) {
    const headers = props.user;
    fetch(`/api/issues/${id}`, { method: 'DELETE', credentials: 'same-origin' }).then(response => {
      if (!response.ok) this.props.showError('Failed to delete issue');else this.loadData();
    });
  }

  setFilter(query) {
    if (this.props.location.query !== query) {
      this.props.router.push({ pathname: this.props.location.pathname, query: query });
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;

    if (oldQuery === newQuery) {
      return;
    }

    if (oldQuery.status == newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte && oldQuery._page === newQuery._page) {
      return;
    }

    this.loadData();
  }

  selectPage(eventkey) {
    const query = Object.assign(this.props.location.query, { _page: eventkey });
    this.props.router.push({ pathname: this.props.location.pathname, query: query });
  }

  loadData() {
    // fetch(`/api/issues${this.props.location.search}`).then(response => {
    //   if (response.ok) {
    //     response.json().then(data => {
    //       data.records.forEach(issue => {
    //         issue.created = new Date(issue.created);
    //         if (issue.completionDate) {
    //           issue.completionDate = new Date(issue.completionDate);
    //         }
    //       });
    //       this.setState({ issues: data.records });
    //     });
    //   } else {
    //     response.json().then(error => {
    //       this.showError(`Failed to fetch issues ${error.message}`);
    //     });
    //   }
    // }).catch(err => {
    //   this.showError(`Error in fetching data from server: ${err}`);
    // });

    IssueList.dataFetcher({ location: this.props.location }).then(data => {
      const issues = data.IssueList.records;
      issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });
      this.setState({ issues: issues, totalCount: data.IssueList.metadata.total_count });
    }).catch(err => {
      this.props.showError(`Error in fetching data from server: ${err}`);
    });
  }

  // createIssue(newIssue) {
  //   fetch('/api/issues', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newIssue),
  //   }).then(response => {
  //     if (response.ok) {
  //       response.json().then(updatedIssue => {
  //         updatedIssue.created = new Date(updatedIssue.created);
  //         if (updatedIssue.completionDate) {
  //           updatedIssue.completionDate = new Date(updatedIssue.completionDate);
  //         }
  //         const newIssues = this.state.issues.concat(updatedIssue);
  //         this.setState({ issues: newIssues });
  //       });
  //     } else {
  //       response.json().then(error => {
  //         this.props.showError(`Failed to add issue: ${error.message}`);
  //       });
  //     }
  //   }).catch(err => {
  //     this.props.showError(`Error in sending data to server: ${err.message}`);
  //   });
  // }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Panel,
        { collapsible: true, header: 'Filter' },
        _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter,
          initFilter: this.props.location.query })
      ),
      _react2.default.createElement(_reactBootstrap.Pagination, {

        items: Math.ceil(this.state.totalCount / PAGE_SIZE),
        activePage: parseInt(this.props.location.query._page || '1', 10),
        onSelect: this.selectPage, maxButtons: 7, next: true, prev: true, boundaryLinks: true }),
      _react2.default.createElement(IssueTable, { issues: this.state.issues,
        deleteIssue: this.props.user.signedIn ? this.deleteIssue : null })
    );
  }
}

IssueList.contextTypes = {
  initialState: _propTypes2.default.object
};

IssueList.propTypes = {
  location: _propTypes2.default.object.isRequired,
  router: _propTypes2.default.object,
  showError: _propTypes2.default.func.isRequired,
  user: _propTypes2.default.object.isRequired
};

const IssueListWithToast = (0, _withToast2.default)(IssueList);
IssueListWithToast.dataFetcher = IssueList.dataFetcher;

exports.default = IssueListWithToast;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactRouterBootstrap = __webpack_require__(6);

var _reactBootstrap = __webpack_require__(1);

var _NumInput = __webpack_require__(33);

var _NumInput2 = _interopRequireDefault(_NumInput);

var _DateInput = __webpack_require__(34);

var _DateInput2 = _interopRequireDefault(_DateInput);

var _withToast = __webpack_require__(4);

var _withToast2 = _interopRequireDefault(_withToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueEdit extends _react2.default.Component {
  // eslint-disable-line
  static dataFetcher(_ref) {
    let params = _ref.params,
        urlBase = _ref.urlBase;

    return fetch(`${urlBase || ''}/api/issues/${params.id}`, { credentials: 'same-origin' }).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueEdit: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    // const issue = context.initialState.data;
    // issue.created = new Date(issue.created);
    // issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;

    let issue;
    if (context.initialState && context.initialState.IssueEdit) {
      issue = context.initialState.IssueEdit;
      issue.created = new Date(issue.created);
      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
    } else {
      issue = {
        _id: '',
        title: '',
        owner: '',
        effort: null,
        completionDate: null,
        created: null
      };
    }

    this.state = {
      issue: issue,
      invalidFields: {},
      showingValidation: false
    };
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {

    if (prevProps.params.id !== this.props.params.id) {
      this.loadData();
    }
  }

  onValidityChange(event, valid) {
    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }
    this.setState({ invalidFields: invalidFields });
  }

  showValidation(event) {
    this.setState({ showingValidation: true });
  }

  dismissValidation(event) {
    this.setState({ showingValidation: false });
  }
  onSubmit(event) {
    event.preventDefault();
    this.showValidation();
    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }
    fetch(`/api/issues/${this.props.params.id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.issue)
    }).then(response => {
      if (response.ok) {
        response.json().then(updateIssue => {
          updateIssue.created = new Date(updateIssue.created);
          if (updateIssue.completionDate) {
            updateIssue.completionDate = new Date(updateIssue.completionDate);
          }
          this.setState({ issue: updateIssue });
          this.props.showSuccess('Updated issue successfully.');
        });
      } else {
        response.json().then(error => {
          this.props.showError(`Failed to update issue: ${error.message}`);
        });
      }
    }).catch(err => {
      this.props.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  onChange(event, convertedValue) {
    const issue = Object.assign({}, this.state.issue);
    const value = convertedValue != null ? convertedValue : event.target.value;
    issue[event.target.name] = value;

    if (event.target.name === 'effort' && value === '') {
      issue[event.target.name] = null;
    }

    if (event.target.name === 'completionDate' && typeof value !== 'string') {
      issue[event.target.name] = value.toDateString();
    }
    this.setState({ issue: issue });
  }

  loadData() {
    // fetch(`/api/issues/${this.props.params.id}`).then(response =>{
    //   if(response.ok){
    //     response.json().then(issue =>{
    //       issue.created = new Date(issue.created);
    //       issue.completionDate = issue.completionDate != null ?
    //        new Date(issue.completionDate) : '';
    //       this.setState({ issue });
    //     });
    //   }else{
    //     response.json().then(error =>{
    //       this.showError(`Failed to fetch issue: ${error.message}`);
    //     });
    //
    //   }
    // }).catch(err => {
    //   this.showError(`Error in fetching data from server : ${err.message}`);
    // });

    IssueEdit.dataFetcher({ params: this.props.params }).then(data => {
      const issue = data.IssueEdit;
      issue.created = new Date(issue.created);
      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
      this.setState({ issue: issue });
    }).catch(err => {
      this.showError(`Error in fetching data from server : ${err.message}`);
    });
  }

  render() {
    const issue = this.state.issue;
    let validationMessage = null;
    if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
      validationMessage = _react2.default.createElement(
        _reactBootstrap.Alert,
        { bsStyle: 'danger', onDismiss: this.dismissValidation },
        'Please correct invalid Fields before submitting.'
      );
    }
    return _react2.default.createElement(
      _reactBootstrap.Panel,
      { header: 'Edit Issue' },
      _react2.default.createElement(
        _reactBootstrap.Form,
        { horizontal: true, onSubmit: this.onSubmit },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'ID'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(
              _reactBootstrap.FormControl.Static,
              null,
              issue._id
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Created'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(
              _reactBootstrap.FormControl.Static,
              null,
              issue.created ? issue.created.toDateString() : ''
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Status'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(
              _reactBootstrap.FormControl,
              { componentClass: 'select', name: 'status', value: issue.status, onChange: this.onChange },
              _react2.default.createElement(
                'option',
                { value: 'New' },
                ' New '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Open' },
                'Open '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Assigned' },
                ' Assigned '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Fixed' },
                ' Fixed '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Verified' },
                'Verified '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Closed' },
                ' Closed '
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Owner '
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner', type: 'text', value: this.state.issue.owner, onChange: this.onChange })
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Effort'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: _NumInput2.default, name: 'effort', type: 'text', value: this.state.issue.effort, onChange: this.onChange })
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          { validationState: this.state.invalidFields.completionDate ? 'error' : null },
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            ' Completion Date '
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: _DateInput2.default, name: 'completionDate', value: issue.completionDate,
              onChange: this.onChange, onValidityChange: this.onValidityChange }),
            _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { smOffset: 3, sm: 6 },
            _react2.default.createElement(
              _reactBootstrap.ButtonToolbar,
              null,
              _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'primary', type: 'submit', disabled: !this.props.user.signedIn },
                'Submit'
              ),
              _react2.default.createElement(
                _reactRouterBootstrap.LinkContainer,
                { to: '/issues' },
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsStyle: 'link' },
                  'Back '
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { smOffset: 3, sm: 9 },
            validationMessage
          )
        )
      )
    );
  }
}
//import Toast from './Toast.jsx';


IssueEdit.contextTypes = {
  initialState: _react2.default.PropTypes.object
};

IssueEdit.propTypes = {
  params: _propTypes2.default.object.isRequired,
  showSuccess: _propTypes2.default.func.isRequired,
  showError: _propTypes2.default.func.isRequired,
  user: _react2.default.PropTypes.object.isRequired
};

const IssueEditWithToast = (0, _withToast2.default)(IssueEdit);
IssueEditWithToast.dataFetcher = IssueEdit.dataFetcher;

exports.default = IssueEditWithToast;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NumInput extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ value: this.format(newProps.value) });
  }

  onBlur(e) {
    this.props.onChange(e, this.unformat(this.state.value));
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  format(num) {
    return num != null ? num.toString() : '';
  }

  unformat(str) {
    const val = parseInt(str, 10);
    return isNaN(val) ? null : val;
  }

  render() {
    return _react2.default.createElement('input', _extends({ type: 'text' }, this.props, { value: this.state.value, onBlur: this.onBlur, onChange: this.onChange }));
  }
}exports.default = NumInput;
;

NumInput.propTypes = {
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateInput extends _react2.default.Component {
  constructor(props) {
    super(props);
    //  console.log(props.value);
    //    console.log(typeof props.value);

    this.state = { value: this.editFormat(props.value),
      focused: false, valid: true };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.setState({ value: this.editFormat(newProps.value) });
    }
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const value = this.unformat(this.state.value);
    const valid = this.state.value === '' || value != null;

    if (valid !== this.state.valid && this.props.onValidityChange) {
      this.props.onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid: valid });
    if (valid) this.props.onChange(e, value);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  displayFormat(date) {
    return date != null && date !== '' ? new Date(date).toDateString() : '';
  }

  editFormat(date) {
    // var myDate = Date.now(); // Date.now() returns a string, so you can't call toDateString() again on a string
    return date != null && date !== '' ? new Date(date).toDateString() : '';
  }

  unformat(str) {
    const val = new Date(str);
    return isNaN(val.getTime()) ? null : val;
  }

  render() {

    const value = this.state.focused || !this.state.valid ? this.state.value : this.displayFormat(this.props.value);
    const childProps = Object.assign({}, this.props);
    delete childProps.onValidityChange;
    return _react2.default.createElement('input', _extends({ type: 'text' }, childProps, {
      value: value, placeholder: this.state.focused ? 'yyyy-mm-dd' : null,
      onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange }));
  }
}

exports.default = DateInput;
DateInput.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  onValidityChange: _propTypes2.default.func,
  name: _propTypes2.default.string.isRequired
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

var _IssueFilter = __webpack_require__(11);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _withToast = __webpack_require__(4);

var _withToast2 = _interopRequireDefault(_withToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = props => _react2.default.createElement(
  'tr',
  null,
  _react2.default.createElement(
    'td',
    null,
    props.owner
  ),
  statuses.map((status, index) => _react2.default.createElement(
    'td',
    { key: index },
    props.counts[status]
  ))
);

StatRow.propTypes = {
  owner: _react2.default.PropTypes.string.isRequired,
  counts: _react2.default.PropTypes.object.isRequired
};

class IssueReport extends _react2.default.Component {
  static dataFetcher(_ref) {
    let urlBase = _ref.urlBase,
        location = _ref.location;

    const search = location.search ? `${location.search}&_summary` : '?_summary';
    return fetch(`${urlBase || ''}/api/issues${search}`, { credentials: 'same-origin' }).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueReport: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    const stats = context.initialState.IssueReport ? context.initialState.IssueReport : {};
    this.state = {
      stats: stats
    };
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;

    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte == newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query: query });
  }

  loadData() {
    IssueReport.dataFetcher({ location: this.props.location }).then(data => {
      this.setState({ stats: data.IssueReport });
    }).catch(err => {
      this.props.showError(`Error in fetching data from server: ${err}`);
    });
  }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Panel,
        { collapsible: true, header: 'Filter' },
        _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter, initFilter: this.props.location.query })
      ),
      _react2.default.createElement(
        _reactBootstrap.Table,
        { bordered: true, condensed: true, hover: true, responsive: true },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement('th', null),
            statuses.map((status, index) => _react2.default.createElement(
              'td',
              { key: index },
              status
            ))
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          Object.keys(this.state.stats).map((owner, index) => _react2.default.createElement(StatRow, { key: index, owner: owner, counts: this.state.stats[owner] }))
        )
      )
    );
  }
}

IssueReport.propTypes = {
  location: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object,
  showError: _react2.default.PropTypes.func.isRequired
};

IssueReport.contextTypes = {
  initialState: _react2.default.PropTypes.object
};

const IssueReportWithToast = (0, _withToast2.default)(IssueReport);
IssueReportWithToast.dataFetcher = IssueReport.dataFetcher;

exports.default = IssueReportWithToast;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContextWrapper extends _react2.default.Component {
  getChildContext() {
    return { initialState: this.props.initialState };
  }

  render() {
    return this.props.children;
  }
}

exports.default = ContextWrapper;
ContextWrapper.childContextTypes = {
  initialState: _react2.default.PropTypes.object
};

ContextWrapper.propTypes = {
  children: _propTypes2.default.object.isRequired,
  initialState: _propTypes2.default.object
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const webpack = __webpack_require__(12);

module.exports = {
  entry: {
    //app: ['./static/src/App.jsx'],
    app: ['./client/Client.jsx'],
    vendor: ['react', 'react-dom', 'isomorphic-fetch', 'react-router', 'react-bootstrap', 'react-router-bootstrap']
  },
  output: {
    path: `${__dirname}/static`,
    filename: 'app.bundle.js'
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })],
  devtool: 'source-map',
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '*': {
        target: 'http://localhost:3000'
      },
      historyApiFallback: true
    }
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__(13);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__(41)(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(13);

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ })
/******/ ])));
//# sourceMappingURL=server.bundle.js.map