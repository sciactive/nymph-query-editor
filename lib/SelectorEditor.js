(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './ValueEditor.html'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./ValueEditor.html'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.ValueEditor);
		global.SelectorEditor = mod.exports;
	}
})(this, function (exports, _ValueEditor) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ValueEditor2 = _interopRequireDefault(_ValueEditor);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function remainingClauses(selector, supportedClauses) {
		return Object.keys(supportedClauses).filter(function (i) {
			return !selector.hasOwnProperty(i);
		});
	}

	function clausesKeysTypes(selector, supportedClauses) {
		return Object.keys(selector).filter(function (i) {
			return i !== "type";
		}).map(function (key) {
			return supportedClauses.hasOwnProperty(key) ? { key: key, type: supportedClauses[key] } : { key: key, type: 'selector' };
		});
	}

	function isCompoundVectorClauseKeys(selector, supportedClauses) {
		var entries = Object.entries(selector);
		var filtered = entries.filter(function (i) {
			return i[0] !== "type" && !i[0].match(/^\d+$/) && supportedClauses[i[0]].vector;
		});
		var mapped = filtered.map(function (i) {
			i[1] = Array.isArray(i[1][0]);return i;
		});
		var map = mapped.length ? Object.assign.apply(Object, _toConsumableArray(mapped.map(function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2),
			    k = _ref2[0],
			    v = _ref2[1];

			return _defineProperty({}, k, v);
		}))) : {};
		return map;
	}

	function isCompoundScalarClauseKeys(selector, supportedClauses) {
		var entries = Object.entries(selector);
		var filtered = entries.filter(function (i) {
			return i[0] !== "type" && !i[0].match(/^\d+$/) && !supportedClauses[i[0]].vector;
		});
		var mapped = filtered.map(function (i) {
			i[1] = Array.isArray(i[1]);return i;
		});
		var map = mapped.length ? Object.assign.apply(Object, _toConsumableArray(mapped.map(function (_ref4) {
			var _ref5 = _slicedToArray(_ref4, 2),
			    k = _ref5[0],
			    v = _ref5[1];

			return _defineProperty({}, k, v);
		}))) : {};
		return map;
	}

	function data() {
		return {
			__newClause: "",
			supportedClauses: {
				"guid": { type: "int", vector: false, allowedTypes: ["int"] },
				"!guid": { type: "int", vector: false, allowedTypes: ["int"] },
				"tag": { type: "string", vector: false, allowedTypes: ["string"] },
				"!tag": { type: "string", vector: false, allowedTypes: ["string"] },
				"isset": { type: "string", vector: false, allowedTypes: ["string"] },
				"!isset": { type: "string", vector: false, allowedTypes: ["string"] },
				"data": { type: null, vector: true, allowedTypes: ["string", "int", "float", "boolean", "date"] },
				"!data": { type: null, vector: true, allowedTypes: ["string", "int", "float", "boolean", "date"] },
				"strict": { type: null, vector: true, allowedTypes: ["string", "int", "float", "boolean", "date"] },
				"!strict": { type: null, vector: true, allowedTypes: ["string", "int", "float", "boolean", "date"] },
				"array": { type: null, vector: true, allowedTypes: ["string", "int", "float", "boolean", "date"] },
				"!array": { type: null, vector: true, allowedTypes: ["string", "int", "float", "boolean", "date"] },
				"match": { type: "string", vector: true, allowedTypes: ["string"] },
				"!match": { type: "string", vector: true, allowedTypes: ["string"] },
				"pmatch": { type: "string", vector: true, allowedTypes: ["string"] },
				"!pmatch": { type: "string", vector: true, allowedTypes: ["string"] },
				"ipmatch": { type: "string", vector: true, allowedTypes: ["string"] },
				"!ipmatch": { type: "string", vector: true, allowedTypes: ["string"] },
				"like": { type: "string", vector: true, allowedTypes: ["string"] },
				"!like": { type: "string", vector: true, allowedTypes: ["string"] },
				"ilike": { type: "string", vector: true, allowedTypes: ["string"] },
				"!ilike": { type: "string", vector: true, allowedTypes: ["string"] },
				"gt": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"!gt": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"gte": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"!gte": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"lt": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"!lt": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"lte": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"!lte": { type: "float", vector: true, allowedTypes: ["int", "float", "date"] },
				"ref": { type: "int", vector: true, allowedTypes: ["int"] },
				"!ref": { type: "int", vector: true, allowedTypes: ["int"] }
			},
			selector: { type: '&' },
			classCheckbox: '',
			classInput: '',
			classSelect: '',
			classAddButton: '',
			classRemoveButton: ''
		};
	};

	var methods = {
		addClause: function addClause() {
			var selector = this.get("selector");
			var newClause = this.get("__newClause");
			var supportedClauses = this.get("supportedClauses");

			if (newClause === "") {
				return;
			}

			if (!(newClause in selector)) {
				selector[newClause] = this.getDefaultValue(supportedClauses[newClause]);
			}

			this.set({
				selector: selector,
				__newClause: ""
			});
		},
		removeClause: function removeClause(clause) {
			var selector = this.get("selector");
			delete selector[clause];
			this.set({ selector: selector });
		},
		addClauseEntry: function addClauseEntry(clause) {
			var selector = this.get("selector");
			var supportedClauses = this.get("supportedClauses");

			if (clause in selector) {
				if (supportedClauses[clause].vector && !this.isCompoundVectorClause(selector[clause]) || !supportedClauses[clause].vector && !this.isCompoundScalarClause(selector[clause])) {
					var firstEntry = selector[clause];
					selector[clause] = [firstEntry];
				}

				selector[clause].push(this.getDefaultValue(supportedClauses[clause]));
			}

			this.set({ selector: selector });
		},
		removeClauseEntry: function removeClauseEntry(clause, index) {
			var selector = this.get("selector");
			var supportedClauses = this.get("supportedClauses");

			if (clause in selector) {
				selector[clause].splice(index, 1);

				if (supportedClauses[clause].vector && selector[clause].length === 1 && this.isCompoundVectorClause(selector[clause]) || !supportedClauses[clause].vector && selector[clause].length === 1 && this.isCompoundScalarClause(selector[clause])) {
					var firstEntry = selector[clause][0];
					selector[clause] = firstEntry;
				}
			}

			this.set({ selector: selector });
		},
		makeDate: function makeDate(clauseKey, index) {
			var selector = this.get("selector");

			if (index === null) {
				selector[clauseKey][1] = null;
				if (selector[clauseKey].length === 2) {
					selector[clauseKey].push("");
				}
			} else {
				selector[clauseKey][index][1] = null;
				if (selector[clauseKey][index].length === 2) {
					selector[clauseKey][index].push("");
				}
			}

			this.set({ selector: selector });
		},
		makeNotDate: function makeNotDate(clauseKey, index) {
			var selector = this.get("selector");

			if (index === null) {
				if (selector[clauseKey].length === 3) {
					selector[clauseKey].splice(2, 1);
				}
			} else {
				if (selector[clauseKey][index].length === 3) {
					selector[clauseKey][index].splice(2, 1);
				}
			}

			this.set({ selector: selector });
		},
		getDefaultValue: function getDefaultValue(typeObj) {
			switch (typeObj.type) {
				case "int":
					return typeObj.vector ? ["", 1] : 1;
				case "float":
					return typeObj.vector ? ["", 0.1] : 0.1;
				case "boolean":
					return typeObj.vector ? ["", true] : true;
				case "string":
				default:
					return typeObj.vector ? ["", ""] : "";
			}
		},
		addSelector: function addSelector() {
			var selector = this.get("selector");

			// Find the first number that's not taken.
			var i = 1;
			while (selector.hasOwnProperty("" + i)) {
				i++;
			}
			selector["" + i] = { "type": "&" };

			this.set({ selector: selector });
		},
		removeSelector: function removeSelector(key) {
			var selector = this.get("selector");
			this.set({ selector: { type: '&' } });

			// Delete the keyed selector.
			delete selector[key];
			// Rearrange all the following selectors.
			var i = parseInt(key, 10) + 1;
			while (selector.hasOwnProperty("" + i)) {
				selector["" + (i - 1)] = selector["" + i];
				delete selector["" + i];
				i++;
			}

			this.set({ selector: selector });
		},
		isCompoundVectorClause: function isCompoundVectorClause(value) {
			return Array.isArray(value[0]);
		},
		isCompoundScalarClause: function isCompoundScalarClause(value) {
			return Array.isArray(value);
		}
	};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-2783728598", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-2783728598-style';
		style.textContent = "[svelte-2783728598].selector,[svelte-2783728598] .selector{margin:.5em;padding:.5em;display:flex;flex-direction:column;border:1px dotted}[svelte-2783728598].selector .clause,[svelte-2783728598] .selector .clause,[svelte-2783728598].selector .clause .clause-entry,[svelte-2783728598] .selector .clause .clause-entry{padding:.5em 1em;display:flex;flex-direction:row}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var div,
		    text,
		    div_1,
		    div_2,
		    text_2,
		    div_3,
		    select,
		    option,
		    text_3,
		    option_1,
		    text_4,
		    option_2,
		    text_5,
		    option_3,
		    text_6,
		    select_updating = false,
		    text_9,
		    text_10;

		var if_block = state.remainingClauses.length && create_if_block(state, component);

		function select_change_handler() {
			var state = component.get();
			select_updating = true;
			state.selector.type = selectValue(select);
			component.set({ selector: state.selector });
			select_updating = false;
		}

		var clausesKeysTypes_1 = state.clausesKeysTypes;

		var each_blocks = [];

		for (var i = 0; i < clausesKeysTypes_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(state, clausesKeysTypes_1, clausesKeysTypes_1[i], i, component);
		}

		return {
			c: function create() {
				div = createElement("div");
				if (if_block) if_block.c();
				text = createText("\n  {\n  ");
				div_1 = createElement("div");
				div_2 = createElement("div");
				div_2.textContent = "type:";
				text_2 = createText("\n    ");
				div_3 = createElement("div");
				select = createElement("select");
				option = createElement("option");
				text_3 = createText("& (All clauses in the selector must be true.)");
				option_1 = createElement("option");
				text_4 = createText("| (At least one clause in the selector must be true.)");
				option_2 = createElement("option");
				text_5 = createText("!& (All clauses in the selector must be false.)");
				option_3 = createElement("option");
				text_6 = createText("!| (At least one clause in the selector must be false.)");
				text_9 = createText("\n  ");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text_10 = createText("\n  }");
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(div);
				div_2.className = "name";
				option.__value = "&";
				option.value = option.__value;
				option_1.__value = "|";
				option_1.value = option_1.__value;
				option_2.__value = "!&";
				option_2.value = option_2.__value;
				option_3.__value = "!|";
				option_3.value = option_3.__value;
				addListener(select, "change", select_change_handler);
				if (!('selector' in state)) component.root._beforecreate.push(select_change_handler);
				select.className = state.classSelect;
				div_3.className = "value";
				div_1.className = "clause";
				div.className = "selector";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				if (if_block) if_block.m(div, null);
				appendNode(text, div);
				appendNode(div_1, div);
				appendNode(div_2, div_1);
				appendNode(text_2, div_1);
				appendNode(div_3, div_1);
				appendNode(select, div_3);
				appendNode(option, select);
				appendNode(text_3, option);
				appendNode(option_1, select);
				appendNode(text_4, option_1);
				appendNode(option_2, select);
				appendNode(text_5, option_2);
				appendNode(option_3, select);
				appendNode(text_6, option_3);

				selectOption(select, state.selector.type);

				appendNode(text_9, div);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div, null);
				}

				appendNode(text_10, div);
			},

			p: function update(changed, state) {
				if (state.remainingClauses.length) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(div, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (!select_updating) selectOption(select, state.selector.type);
				if (changed.classSelect) {
					select.className = state.classSelect;
				}

				var clausesKeysTypes_1 = state.clausesKeysTypes;

				if (changed.clausesKeysTypes || changed.selector || changed.classCheckbox || changed.classInput || changed.classSelect || changed.classAddButton || changed.classRemoveButton || changed.isCompoundVectorClauseKeys || changed.isCompoundScalarClauseKeys) {
					for (var i = 0; i < clausesKeysTypes_1.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, clausesKeysTypes_1, clausesKeysTypes_1[i], i);
						} else {
							each_blocks[i] = create_each_block_1(state, clausesKeysTypes_1, clausesKeysTypes_1[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(div, text_10);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = clausesKeysTypes_1.length;
				}
			},

			u: function unmount() {
				detachNode(div);
				if (if_block) if_block.u();

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				if (if_block) if_block.d();
				removeListener(select, "change", select_change_handler);

				destroyEach(each_blocks);
			}
		};
	}

	// (9:8) {{#each remainingClauses as clause}}
	function create_each_block(state, remainingClauses_1, clause, clause_index, component) {
		var option,
		    text_value = clause,
		    text,
		    option_value_value;

		return {
			c: function create() {
				option = createElement("option");
				text = createText(text_value);
				this.h();
			},

			h: function hydrate() {
				option.__value = option_value_value = clause;
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
				appendNode(text, option);
			},

			p: function update(changed, state, remainingClauses_1, clause, clause_index) {
				if (changed.remainingClauses && text_value !== (text_value = clause)) {
					text.data = text_value;
				}

				if (changed.remainingClauses && option_value_value !== (option_value_value = clause)) {
					option.__value = option_value_value;
				}

				option.value = option.__value;
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (2:2) {{#if remainingClauses.length}}
	function create_if_block(state, component) {
		var div,
		    text,
		    select,
		    option,
		    text_1,
		    select_updating = false,
		    text_2,
		    button,
		    text_4,
		    button_1;

		var remainingClauses_1 = state.remainingClauses;

		var each_blocks = [];

		for (var i = 0; i < remainingClauses_1.length; i += 1) {
			each_blocks[i] = create_each_block(state, remainingClauses_1, remainingClauses_1[i], i, component);
		}

		function select_change_handler() {
			select_updating = true;
			component.set({ __newClause: selectValue(select) });
			select_updating = false;
		}

		function change_handler(event) {
			component.addClause();
		}

		function click_handler(event) {
			component.addSelector();
		}

		function click_handler_1(event) {
			component.fire('remove');
		}

		return {
			c: function create() {
				div = createElement("div");
				text = createText("Add Clause:\n      ");
				select = createElement("select");
				option = createElement("option");
				text_1 = createText("- Select a Clause -");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text_2 = createText("\n      ");
				button = createElement("button");
				button.textContent = "Add Selector Clause";
				text_4 = createText("\n      ");
				button_1 = createElement("button");
				button_1.textContent = "Remove Selector";
				this.h();
			},

			h: function hydrate() {
				option.selected = true;
				option.__value = '';
				option.value = option.__value;
				addListener(select, "change", select_change_handler);
				if (!('__newClause' in state)) component.root._beforecreate.push(select_change_handler);
				select.className = state.classSelect;
				addListener(select, "change", change_handler);
				button.className = state.classAddButton;
				addListener(button, "click", click_handler);
				button_1.className = state.classRemoveButton;
				addListener(button_1, "click", click_handler_1);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(text, div);
				appendNode(select, div);
				appendNode(option, select);
				appendNode(text_1, option);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(select, null);
				}

				selectOption(select, state.__newClause);

				appendNode(text_2, div);
				appendNode(button, div);
				appendNode(text_4, div);
				appendNode(button_1, div);
			},

			p: function update(changed, state) {
				var remainingClauses_1 = state.remainingClauses;

				if (changed.remainingClauses) {
					for (var i = 0; i < remainingClauses_1.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, remainingClauses_1, remainingClauses_1[i], i);
						} else {
							each_blocks[i] = create_each_block(state, remainingClauses_1, remainingClauses_1[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = remainingClauses_1.length;
				}

				if (!select_updating) selectOption(select, state.__newClause);
				if (changed.classSelect) {
					select.className = state.classSelect;
				}

				if (changed.classAddButton) {
					button.className = state.classAddButton;
				}

				if (changed.classRemoveButton) {
					button_1.className = state.classRemoveButton;
				}
			},

			u: function unmount() {
				detachNode(div);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				destroyEach(each_blocks);

				removeListener(select, "change", select_change_handler);
				removeListener(select, "change", change_handler);
				removeListener(button, "click", click_handler);
				removeListener(button_1, "click", click_handler_1);
			}
		};
	}

	// (41:2) {{#each clausesKeysTypes as clause}}
	function create_each_block_1(state, clausesKeysTypes_1, clause, clause_index, component) {
		var div,
		    div_1,
		    text_value = clause.key,
		    text,
		    text_1,
		    text_2,
		    div_2,
		    text_4;

		var current_block_type = select_block_type_2(state, clausesKeysTypes_1, clause, clause_index);
		var if_block = current_block_type(state, clausesKeysTypes_1, clause, clause_index, component);

		var if_block_1 = clause.type !== "selector" && create_if_block_8(state, clausesKeysTypes_1, clause, clause_index, component);

		return {
			c: function create() {
				div = createElement("div");
				div_1 = createElement("div");
				text = createText(text_value);
				text_1 = createText(":");
				text_2 = createText("\n      ");
				div_2 = createElement("div");
				if_block.c();
				text_4 = createText("\n      ");
				if (if_block_1) if_block_1.c();
				this.h();
			},

			h: function hydrate() {
				div_1.className = "name";
				div_2.className = "value";
				div.className = "clause";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(div_1, div);
				appendNode(text, div_1);
				appendNode(text_1, div_1);
				appendNode(text_2, div);
				appendNode(div_2, div);
				if_block.m(div_2, null);
				appendNode(text_4, div);
				if (if_block_1) if_block_1.m(div, null);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				if (changed.clausesKeysTypes && text_value !== (text_value = clause.key)) {
					text.data = text_value;
				}

				if (current_block_type === (current_block_type = select_block_type_2(state, clausesKeysTypes_1, clause, clause_index)) && if_block) {
					if_block.p(changed, state, clausesKeysTypes_1, clause, clause_index);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, clausesKeysTypes_1, clause, clause_index, component);
					if_block.c();
					if_block.m(div_2, null);
				}

				if (clause.type !== "selector") {
					if (if_block_1) {
						if_block_1.p(changed, state, clausesKeysTypes_1, clause, clause_index);
					} else {
						if_block_1 = create_if_block_8(state, clausesKeysTypes_1, clause, clause_index, component);
						if_block_1.c();
						if_block_1.m(div, null);
					}
				} else if (if_block_1) {
					if_block_1.u();
					if_block_1.d();
					if_block_1 = null;
				}
			},

			u: function unmount() {
				detachNode(div);
				if_block.u();
				if (if_block_1) if_block_1.u();
			},

			d: function destroy() {
				if_block.d();
				if (if_block_1) if_block_1.d();
			}
		};
	}

	// (63:14) {{#each selector[clause.key] as clauseEntry, index}}
	function create_each_block_2(state, clausesKeysTypes_1, clause, clause_index, each_value, clauseEntry, index, component) {
		var div,
		    text,
		    input,
		    input_updating = false,
		    text_1,
		    valueeditor_updating = {},
		    text_2,
		    button;

		function input_input_handler() {
			var context = input._svelte;
			var state = component.get();
			input_updating = true;
			context.each_value[context.index][0] = input.value;
			component.set({ selector: state.selector, clausesKeysTypes: state.clausesKeysTypes });
			input_updating = false;
		}

		var valueeditor_initial_data = {
			valueTypeInitial: clause.type.type,
			allowedTypes: clause.type.allowedTypes,
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect
		};
		if (index in each_value) {
			valueeditor_initial_data.value = clauseEntry[1];
			valueeditor_updating.value = true;
		}
		if (index in each_value) {
			valueeditor_initial_data.wholeEntry = clauseEntry;
			valueeditor_updating.wholeEntry = true;
		}
		var valueeditor = new _ValueEditor2.default({
			root: component.root,
			data: valueeditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!valueeditor_updating.value && changed.value) {
					var list = valueeditor_context.each_value;
					var index = valueeditor_context.index;
					list[index][1] = childState.value;

					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}

				if (!valueeditor_updating.wholeEntry && changed.wholeEntry) {
					var list = valueeditor_context.each_value;
					var index = valueeditor_context.index;
					list[index] = childState.wholeEntry;

					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component.root._beforecreate.push(function () {
			var state = component.get(),
			    childState = valueeditor.get(),
			    newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				var list = valueeditor_context.each_value;
				var index = valueeditor_context.index;
				list[index][1] = childState.value;

				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}

			if (!valueeditor_updating.wholeEntry) {
				var list = valueeditor_context.each_value;
				var index = valueeditor_context.index;
				list[index] = childState.wholeEntry;

				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			valueeditor_updating = { value: true, wholeEntry: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		valueeditor.on("makeDate", function (event) {
			var clausesKeysTypes_1 = valueeditor_context.clausesKeysTypes_1,
			    clause_index = valueeditor_context.clause_index,
			    clause = clausesKeysTypes_1[clause_index];
			var each_value = valueeditor_context.each_value,
			    index = valueeditor_context.index,
			    clauseEntry = each_value[index];

			component.makeDate(clause.key, index);
		});
		valueeditor.on("makeNotDate", function (event) {
			var clausesKeysTypes_1 = valueeditor_context.clausesKeysTypes_1,
			    clause_index = valueeditor_context.clause_index,
			    clause = clausesKeysTypes_1[clause_index];
			var each_value = valueeditor_context.each_value,
			    index = valueeditor_context.index,
			    clauseEntry = each_value[index];

			component.makeNotDate(clause.key, index);
		});

		var valueeditor_context = {
			clausesKeysTypes_1: clausesKeysTypes_1,
			clause_index: clause_index,
			each_value: each_value,
			index: index
		};

		return {
			c: function create() {
				div = createElement("div");
				text = createText("[");
				input = createElement("input");
				text_1 = createText(",\n                    ");
				valueeditor._fragment.c();
				text_2 = createText("]\n                  ");
				button = createElement("button");
				button.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				addListener(input, "input", input_input_handler);
				input.className = state.classInput;
				input.type = "text";
				input.placeholder = "property name";

				input._svelte = {
					each_value: each_value,
					index: index
				};

				button.className = state.classRemoveButton;
				addListener(button, "click", click_handler_1);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index,
					each_value: each_value,
					index: index
				};

				div.className = "clause-entry";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(text, div);
				appendNode(input, div);

				input.value = clauseEntry[0];

				appendNode(text_1, div);
				valueeditor._mount(div, null);
				appendNode(text_2, div);
				appendNode(button, div);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index, each_value, clauseEntry, index) {
				if (!input_updating) input.value = clauseEntry[0];
				if (changed.classInput) {
					input.className = state.classInput;
				}

				input._svelte.each_value = each_value;
				input._svelte.index = index;

				var valueeditor_changes = {};
				if (changed.clausesKeysTypes) valueeditor_changes.valueTypeInitial = clause.type.type;
				if (changed.clausesKeysTypes) valueeditor_changes.allowedTypes = clause.type.allowedTypes;
				if (changed.classCheckbox) valueeditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) valueeditor_changes.classInput = state.classInput;
				if (changed.classSelect) valueeditor_changes.classSelect = state.classSelect;
				if (!valueeditor_updating.value && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.value = clauseEntry[1];
					valueeditor_updating.value = true;
				}
				if (!valueeditor_updating.wholeEntry && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.wholeEntry = clauseEntry;
					valueeditor_updating.wholeEntry = true;
				}
				valueeditor._set(valueeditor_changes);
				valueeditor_updating = {};

				valueeditor_context.clausesKeysTypes_1 = clausesKeysTypes_1;
				valueeditor_context.clause_index = clause_index;
				valueeditor_context.each_value = each_value;
				valueeditor_context.index = index;

				if (changed.classRemoveButton) {
					button.className = state.classRemoveButton;
				}

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;
				button._svelte.each_value = each_value;
				button._svelte.index = index;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				valueeditor.destroy(false);
				removeListener(button, "click", click_handler_1);
			}
		};
	}

	// (62:12) {{#if isCompoundVectorClauseKeys[clause.key]}}
	function create_if_block_4(state, clausesKeysTypes_1, clause, clause_index, component) {
		var each_anchor;

		var each_value = state.selector[clause.key];

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block_2(state, clausesKeysTypes_1, clause, clause_index, each_value, each_value[i], i, component);
		}

		return {
			c: function create() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m: function mount(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insertNode(each_anchor, target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				var each_value = state.selector[clause.key];

				if (changed.classInput || changed.selector || changed.clausesKeysTypes || changed.classCheckbox || changed.classSelect || changed.classRemoveButton) {
					for (var i = 0; i < each_value.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, clausesKeysTypes_1, clause, clause_index, each_value, each_value[i], i);
						} else {
							each_blocks[i] = create_each_block_2(state, clausesKeysTypes_1, clause, clause_index, each_value, each_value[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = each_value.length;
				}
			},

			u: function unmount() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				detachNode(each_anchor);
			},

			d: function destroy() {
				destroyEach(each_blocks);
			}
		};
	}

	// (79:12) {{else}}
	function create_if_block_5(state, clausesKeysTypes_1, clause, clause_index, component) {
		var div,
		    input,
		    input_updating = false,
		    text,
		    valueeditor_updating = {};

		function input_input_handler() {
			var state = component.get();
			input_updating = true;
			state.selector[clause.key][0] = input.value;
			component.set({ selector: state.selector });
			input_updating = false;
		}

		var valueeditor_initial_data = {
			valueTypeInitial: clause.type.type,
			allowedTypes: clause.type.allowedTypes,
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect
		};
		if (1 in state.selector[clause.key]) {
			valueeditor_initial_data.value = state.selector[clause.key][1];
			valueeditor_updating.value = true;
		}
		if (clause.key in state.selector) {
			valueeditor_initial_data.wholeEntry = state.selector[clause.key];
			valueeditor_updating.wholeEntry = true;
		}
		var valueeditor = new _ValueEditor2.default({
			root: component.root,
			data: valueeditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!valueeditor_updating.value && changed.value) {
					state.selector[clause.key][1] = childState.value;
					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}

				if (!valueeditor_updating.wholeEntry && changed.wholeEntry) {
					state.selector[clause.key] = childState.wholeEntry;
					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component.root._beforecreate.push(function () {
			var state = component.get(),
			    childState = valueeditor.get(),
			    newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				state.selector[clause.key][1] = childState.value;
				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}

			if (!valueeditor_updating.wholeEntry) {
				state.selector[clause.key] = childState.wholeEntry;
				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			valueeditor_updating = { value: true, wholeEntry: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		valueeditor.on("makeDate", function (event) {
			var clausesKeysTypes_1 = valueeditor_context.clausesKeysTypes_1,
			    clause_index = valueeditor_context.clause_index,
			    clause = clausesKeysTypes_1[clause_index];

			component.makeDate(clause.key, null);
		});
		valueeditor.on("makeNotDate", function (event) {
			var clausesKeysTypes_1 = valueeditor_context.clausesKeysTypes_1,
			    clause_index = valueeditor_context.clause_index,
			    clause = clausesKeysTypes_1[clause_index];

			component.makeNotDate(clause.key, null);
		});

		var valueeditor_context = {
			clausesKeysTypes_1: clausesKeysTypes_1,
			clause_index: clause_index,
			state: state
		};

		return {
			c: function create() {
				div = createElement("div");
				input = createElement("input");
				text = createText(",\n                ");
				valueeditor._fragment.c();
				this.h();
			},

			h: function hydrate() {
				addListener(input, "input", input_input_handler);
				input.className = state.classInput;
				input.type = "text";
				input.placeholder = "property name";

				input._svelte = {
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index
				};

				div.className = "clause-entry";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(input, div);

				input.value = state.selector[clause.key][0];

				appendNode(text, div);
				valueeditor._mount(div, null);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				if (!input_updating) input.value = state.selector[clause.key][0];
				if (changed.classInput) {
					input.className = state.classInput;
				}

				input._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				input._svelte.clause_index = clause_index;

				var valueeditor_changes = {};
				if (changed.clausesKeysTypes) valueeditor_changes.valueTypeInitial = clause.type.type;
				if (changed.clausesKeysTypes) valueeditor_changes.allowedTypes = clause.type.allowedTypes;
				if (changed.classCheckbox) valueeditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) valueeditor_changes.classInput = state.classInput;
				if (changed.classSelect) valueeditor_changes.classSelect = state.classSelect;
				if (!valueeditor_updating.value && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.value = state.selector[clause.key][1];
					valueeditor_updating.value = true;
				}
				if (!valueeditor_updating.wholeEntry && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.wholeEntry = state.selector[clause.key];
					valueeditor_updating.wholeEntry = true;
				}
				valueeditor._set(valueeditor_changes);
				valueeditor_updating = {};

				valueeditor_context.clausesKeysTypes_1 = clausesKeysTypes_1;
				valueeditor_context.clause_index = clause_index;
				valueeditor_context.state = state;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				valueeditor.destroy(false);
			}
		};
	}

	// (96:14) {{#each selector[clause.key] as clauseEntry, index}}
	function create_each_block_3(state, clausesKeysTypes_1, clause, clause_index, each_value, clauseEntry, index, component) {
		var div,
		    valueeditor_updating = {},
		    text,
		    button;

		var valueeditor_initial_data = {
			valueTypeInitial: clause.type.type,
			allowedTypes: clause.type.allowedTypes,
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect
		};
		if (index in each_value) {
			valueeditor_initial_data.value = clauseEntry;
			valueeditor_updating.value = true;
		}
		var valueeditor = new _ValueEditor2.default({
			root: component.root,
			data: valueeditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!valueeditor_updating.value && changed.value) {
					var list = valueeditor_context.each_value;
					var index = valueeditor_context.index;
					list[index] = childState.value;

					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component.root._beforecreate.push(function () {
			var state = component.get(),
			    childState = valueeditor.get(),
			    newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				var list = valueeditor_context.each_value;
				var index = valueeditor_context.index;
				list[index] = childState.value;

				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			valueeditor_updating = { value: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		var valueeditor_context = {
			each_value: each_value,
			index: index
		};

		return {
			c: function create() {
				div = createElement("div");
				valueeditor._fragment.c();
				text = createText("\n                  ");
				button = createElement("button");
				button.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				button.className = state.classRemoveButton;
				addListener(button, "click", click_handler_2);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index,
					each_value: each_value,
					index: index
				};

				div.className = "clause-entry";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				valueeditor._mount(div, null);
				appendNode(text, div);
				appendNode(button, div);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index, each_value, clauseEntry, index) {
				var valueeditor_changes = {};
				if (changed.clausesKeysTypes) valueeditor_changes.valueTypeInitial = clause.type.type;
				if (changed.clausesKeysTypes) valueeditor_changes.allowedTypes = clause.type.allowedTypes;
				if (changed.classCheckbox) valueeditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) valueeditor_changes.classInput = state.classInput;
				if (changed.classSelect) valueeditor_changes.classSelect = state.classSelect;
				if (!valueeditor_updating.value && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.value = clauseEntry;
					valueeditor_updating.value = true;
				}
				valueeditor._set(valueeditor_changes);
				valueeditor_updating = {};

				valueeditor_context.each_value = each_value;
				valueeditor_context.index = index;

				if (changed.classRemoveButton) {
					button.className = state.classRemoveButton;
				}

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;
				button._svelte.each_value = each_value;
				button._svelte.index = index;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				valueeditor.destroy(false);
				removeListener(button, "click", click_handler_2);
			}
		};
	}

	// (61:10) {{#if clause.type.vector}}
	function create_if_block_3(state, clausesKeysTypes_1, clause, clause_index, component) {
		var if_block_anchor;

		var current_block_type = select_block_type(state, clausesKeysTypes_1, clause, clause_index);
		var if_block = current_block_type(state, clausesKeysTypes_1, clause, clause_index, component);

		return {
			c: function create() {
				if_block.c();
				if_block_anchor = createComment();
			},

			m: function mount(target, anchor) {
				if_block.m(target, anchor);
				insertNode(if_block_anchor, target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				if (current_block_type === (current_block_type = select_block_type(state, clausesKeysTypes_1, clause, clause_index)) && if_block) {
					if_block.p(changed, state, clausesKeysTypes_1, clause, clause_index);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, clausesKeysTypes_1, clause, clause_index, component);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			},

			u: function unmount() {
				if_block.u();
				detachNode(if_block_anchor);
			},

			d: function destroy() {
				if_block.d();
			}
		};
	}

	// (95:12) {{#if isCompoundScalarClauseKeys[clause.key]}}
	function create_if_block_6(state, clausesKeysTypes_1, clause, clause_index, component) {
		var each_anchor;

		var each_value = state.selector[clause.key];

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block_3(state, clausesKeysTypes_1, clause, clause_index, each_value, each_value[i], i, component);
		}

		return {
			c: function create() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m: function mount(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insertNode(each_anchor, target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				var each_value = state.selector[clause.key];

				if (changed.selector || changed.clausesKeysTypes || changed.classCheckbox || changed.classInput || changed.classSelect || changed.classRemoveButton) {
					for (var i = 0; i < each_value.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, clausesKeysTypes_1, clause, clause_index, each_value, each_value[i], i);
						} else {
							each_blocks[i] = create_each_block_3(state, clausesKeysTypes_1, clause, clause_index, each_value, each_value[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = each_value.length;
				}
			},

			u: function unmount() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				detachNode(each_anchor);
			},

			d: function destroy() {
				destroyEach(each_blocks);
			}
		};
	}

	// (108:12) {{else}}
	function create_if_block_7(state, clausesKeysTypes_1, clause, clause_index, component) {
		var div,
		    valueeditor_updating = {};

		var valueeditor_initial_data = {
			valueTypeInitial: clause.type.type,
			allowedTypes: clause.type.allowedTypes,
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect
		};
		if (clause.key in state.selector) {
			valueeditor_initial_data.value = state.selector[clause.key];
			valueeditor_updating.value = true;
		}
		var valueeditor = new _ValueEditor2.default({
			root: component.root,
			data: valueeditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!valueeditor_updating.value && changed.value) {
					state.selector[clause.key] = childState.value;
					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component.root._beforecreate.push(function () {
			var state = component.get(),
			    childState = valueeditor.get(),
			    newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				state.selector[clause.key] = childState.value;
				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			valueeditor_updating = { value: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		var valueeditor_context = {
			state: state,
			clausesKeysTypes_1: clausesKeysTypes_1,
			clause_index: clause_index
		};

		return {
			c: function create() {
				div = createElement("div");
				valueeditor._fragment.c();
				this.h();
			},

			h: function hydrate() {
				div.className = "clause-entry";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				valueeditor._mount(div, null);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				var valueeditor_changes = {};
				if (changed.clausesKeysTypes) valueeditor_changes.valueTypeInitial = clause.type.type;
				if (changed.clausesKeysTypes) valueeditor_changes.allowedTypes = clause.type.allowedTypes;
				if (changed.classCheckbox) valueeditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) valueeditor_changes.classInput = state.classInput;
				if (changed.classSelect) valueeditor_changes.classSelect = state.classSelect;
				if (!valueeditor_updating.value && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.value = state.selector[clause.key];
					valueeditor_updating.value = true;
				}
				valueeditor._set(valueeditor_changes);
				valueeditor_updating = {};

				valueeditor_context.state = state;
				valueeditor_context.clausesKeysTypes_1 = clausesKeysTypes_1;
				valueeditor_context.clause_index = clause_index;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				valueeditor.destroy(false);
			}
		};
	}

	// (47:8) {{#if clause.type === "selector"}}
	function create_if_block_1(state, clausesKeysTypes_1, clause, clause_index, component) {
		var selectoreditor_updating = {};

		var selectoreditor_initial_data = {
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect,
			classAddButton: state.classAddButton,
			classRemoveButton: state.classRemoveButton
		};
		if (clause.key in state.selector) {
			selectoreditor_initial_data.selector = state.selector[clause.key];
			selectoreditor_updating.selector = true;
		}
		var selectoreditor = new SelectorEditor({
			root: component.root,
			data: selectoreditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!selectoreditor_updating.selector && changed.selector) {
					state.selector[clause.key] = childState.selector;
					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				selectoreditor_updating = assign({}, changed);
				component._set(newState);
				selectoreditor_updating = {};
			}
		});

		component.root._beforecreate.push(function () {
			var state = component.get(),
			    childState = selectoreditor.get(),
			    newState = {};
			if (!childState) return;
			if (!selectoreditor_updating.selector) {
				state.selector[clause.key] = childState.selector;
				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			selectoreditor_updating = { selector: true };
			component._set(newState);
			selectoreditor_updating = {};
		});

		selectoreditor.on("remove", function (event) {
			var clausesKeysTypes_1 = selectoreditor_context.clausesKeysTypes_1,
			    clause_index = selectoreditor_context.clause_index,
			    clause = clausesKeysTypes_1[clause_index];

			component.removeSelector(clause.key);
		});

		var selectoreditor_context = {
			clausesKeysTypes_1: clausesKeysTypes_1,
			clause_index: clause_index,
			state: state
		};

		return {
			c: function create() {
				selectoreditor._fragment.c();
			},

			m: function mount(target, anchor) {
				selectoreditor._mount(target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				var selectoreditor_changes = {};
				if (changed.classCheckbox) selectoreditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) selectoreditor_changes.classInput = state.classInput;
				if (changed.classSelect) selectoreditor_changes.classSelect = state.classSelect;
				if (changed.classAddButton) selectoreditor_changes.classAddButton = state.classAddButton;
				if (changed.classRemoveButton) selectoreditor_changes.classRemoveButton = state.classRemoveButton;
				if (!selectoreditor_updating.selector && changed.selector || changed.clausesKeysTypes) {
					selectoreditor_changes.selector = state.selector[clause.key];
					selectoreditor_updating.selector = true;
				}
				selectoreditor._set(selectoreditor_changes);
				selectoreditor_updating = {};

				selectoreditor_context.clausesKeysTypes_1 = clausesKeysTypes_1;
				selectoreditor_context.clause_index = clause_index;
				selectoreditor_context.state = state;
			},

			u: function unmount() {
				selectoreditor._unmount();
			},

			d: function destroy() {
				selectoreditor.destroy(false);
			}
		};
	}

	// (56:8) {{else}}
	function create_if_block_2(state, clausesKeysTypes_1, clause, clause_index, component) {
		var div, button, text_2, text_3;

		var current_block_type = select_block_type_1(state, clausesKeysTypes_1, clause, clause_index);
		var if_block = current_block_type(state, clausesKeysTypes_1, clause, clause_index, component);

		return {
			c: function create() {
				div = createElement("div");
				button = createElement("button");
				button.textContent = "Add Entry";
				text_2 = createText("\n          [\n          ");
				if_block.c();
				text_3 = createText("\n          ]");
				this.h();
			},

			h: function hydrate() {
				button.className = state.classAddButton;
				addListener(button, "click", click_handler);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index
				};
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(button, div);
				insertNode(text_2, target, anchor);
				if_block.m(target, anchor);
				insertNode(text_3, target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				if (changed.classAddButton) {
					button.className = state.classAddButton;
				}

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;

				if (current_block_type === (current_block_type = select_block_type_1(state, clausesKeysTypes_1, clause, clause_index)) && if_block) {
					if_block.p(changed, state, clausesKeysTypes_1, clause, clause_index);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, clausesKeysTypes_1, clause, clause_index, component);
					if_block.c();
					if_block.m(text_3.parentNode, text_3);
				}
			},

			u: function unmount() {
				detachNode(div);
				detachNode(text_2);
				if_block.u();
				detachNode(text_3);
			},

			d: function destroy() {
				removeListener(button, "click", click_handler);
				if_block.d();
			}
		};
	}

	// (123:6) {{#if clause.type !== "selector"}}
	function create_if_block_8(state, clausesKeysTypes_1, clause, clause_index, component) {
		var div, button;

		return {
			c: function create() {
				div = createElement("div");
				button = createElement("button");
				button.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				button.className = state.classRemoveButton;
				addListener(button, "click", click_handler_3);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index
				};

				div.className = "remove";
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(button, div);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause, clause_index) {
				if (changed.classRemoveButton) {
					button.className = state.classRemoveButton;
				}

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(button, "click", click_handler_3);
			}
		};
	}

	function click_handler(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1,
		    clause_index = this._svelte.clause_index,
		    clause = clausesKeysTypes_1[clause_index];
		component.addClauseEntry(clause.key);
	}

	function click_handler_1(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1,
		    clause_index = this._svelte.clause_index,
		    clause = clausesKeysTypes_1[clause_index];
		var each_value = this._svelte.each_value,
		    index = this._svelte.index,
		    clauseEntry = each_value[index];
		component.removeClauseEntry(clause.key, index);
	}

	function select_block_type(state, clausesKeysTypes_1, clause, clause_index) {
		if (state.isCompoundVectorClauseKeys[clause.key]) return create_if_block_4;
		return create_if_block_5;
	}

	function click_handler_2(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1,
		    clause_index = this._svelte.clause_index,
		    clause = clausesKeysTypes_1[clause_index];
		var each_value = this._svelte.each_value,
		    index = this._svelte.index,
		    clauseEntry = each_value[index];
		component.removeClauseEntry(clause.key, index);
	}

	function select_block_type_1(state, clausesKeysTypes_1, clause, clause_index) {
		if (clause.type.vector) return create_if_block_3;
		if (state.isCompoundScalarClauseKeys[clause.key]) return create_if_block_6;
		return create_if_block_7;
	}

	function select_block_type_2(state, clausesKeysTypes_1, clause, clause_index) {
		if (clause.type === "selector") return create_if_block_1;
		return create_if_block_2;
	}

	function click_handler_3(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1,
		    clause_index = this._svelte.clause_index,
		    clause = clausesKeysTypes_1[clause_index];
		component.removeClause(clause.key);
	}

	function SelectorEditor(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ selector: 1, supportedClauses: 1 }, this._state);

		if (!document.getElementById("svelte-2783728598-style")) add_css();

		if (!options.root) {
			this._oncreate = [];
			this._beforecreate = [];
			this._aftercreate = [];
		}

		this._fragment = create_main_fragment(this._state, this);

		if (options.target) {
			this._fragment.c();
			this._fragment.m(options.target, options.anchor || null);

			this._lock = true;
			callAll(this._beforecreate);
			callAll(this._oncreate);
			callAll(this._aftercreate);
			this._lock = false;
		}
	}

	assign(SelectorEditor.prototype, methods, {
		destroy: destroy,
		get: get,
		fire: fire,
		observe: observe,
		on: on,
		set: set,
		teardown: destroy,
		_set: _set,
		_mount: _mount,
		_unmount: _unmount
	});

	SelectorEditor.prototype._recompute = function _recompute(changed, state) {
		if (changed.selector || changed.supportedClauses) {
			if (differs(state.remainingClauses, state.remainingClauses = remainingClauses(state.selector, state.supportedClauses))) changed.remainingClauses = true;
			if (differs(state.clausesKeysTypes, state.clausesKeysTypes = clausesKeysTypes(state.selector, state.supportedClauses))) changed.clausesKeysTypes = true;
			if (differs(state.isCompoundVectorClauseKeys, state.isCompoundVectorClauseKeys = isCompoundVectorClauseKeys(state.selector, state.supportedClauses))) changed.isCompoundVectorClauseKeys = true;
			if (differs(state.isCompoundScalarClauseKeys, state.isCompoundScalarClauseKeys = isCompoundScalarClauseKeys(state.selector, state.supportedClauses))) changed.isCompoundScalarClauseKeys = true;
		}
	};

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function selectValue(select) {
		var selectedOption = select.querySelector(':checked') || select.options[0];
		return selectedOption && selectedOption.__value;
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function selectOption(select, value) {
		for (var i = 0; i < select.options.length; i += 1) {
			var option = select.options[i];

			if (option.__value === value) {
				option.selected = true;
				return;
			}
		}
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function destroyEach(iterations) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d();
		}
	}

	function noop() {}

	function assign(target) {
		var k,
		    source,
		    i = 1,
		    len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) {
				target[k] = source[k];
			}
		}

		return target;
	}

	function createComment() {
		return document.createComment('');
	}

	function init(component, options) {
		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._bind = options._bind;

		component.options = options;
		component.root = options.root || component;
		component.store = component.root.options.store;
	}

	function callAll(fns) {
		while (fns && fns.length) {
			fns.pop()();
		}
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = this.get = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = this._state = null;
	}

	function get(key) {
		return key ? this._state[key] : this._state;
	}

	function fire(eventName, data) {
		var handlers = eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function observe(key, callback, options) {
		var group = options && options.defer ? this._observers.post : this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function cancel() {
				var index = group[key].indexOf(callback);
				if (~index) group[key].splice(index, 1);
			}
		};
	}

	function on(eventName, handler) {
		if (eventName === 'teardown') return this.on('destroy', handler);

		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function cancel() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		this.root._lock = true;
		callAll(this.root._beforecreate);
		callAll(this.root._oncreate);
		callAll(this.root._aftercreate);
		this.root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
		    changed = {},
		    dirty = false;

		for (var key in newState) {
			if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign({}, oldState, newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
			this._fragment.p(changed, this._state);
			dispatchObservers(this, this._observers.post, changed, this._state, oldState);
		}
	}

	function _mount(target, anchor) {
		this._fragment.m(target, anchor);
	}

	function _unmount() {
		if (this._fragment) this._fragment.u();
	}

	function differs(a, b) {
		return a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
	}

	function blankObject() {
		return Object.create(null);
	}

	function dispatchObservers(component, group, changed, newState, oldState) {
		for (var key in group) {
			if (!changed[key]) continue;

			var newValue = newState[key];
			var oldValue = oldState[key];

			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
	exports.default = SelectorEditor;
});
