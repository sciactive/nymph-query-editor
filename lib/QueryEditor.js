(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './SelectorEditor.html', './ValueEditor.html'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./SelectorEditor.html'), require('./ValueEditor.html'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.SelectorEditor, global.ValueEditor);
		global.QueryEditor = mod.exports;
	}
})(this, function (exports, _SelectorEditor, _ValueEditor) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _SelectorEditor2 = _interopRequireDefault(_SelectorEditor);

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

	function remainingOptions(options, supportedOptions) {
		return Object.keys(supportedOptions).filter(function (i) {
			return !options.hasOwnProperty(i);
		});
	}

	function optionsKeysTypes(options, supportedOptions) {
		return Object.keys(options).map(function (key) {
			return { key: key, type: supportedOptions[key] };
		});
	}

	function queryText(options, selectors) {
		var json = JSON.stringify([options].concat(_toConsumableArray(selectors)), null, 2);
		var regex = /\[\s*([^\[\]]*)(?:[\t\n]+|\s{2,})([^\[\]]*)\s*\]/g;
		var regex2 = /\[\s*([^\[\]]*[^\[\]\s])\s+\]/g;
		while (json.match(regex)) {
			json = json.replace(regex, "[$1 $2]");
		}
		while (json.match(regex2)) {
			json = json.replace(regex2, "[$1]");
		}
		return "Nymph.getEntities(" + json.slice(1, -1) + ")";
	}

	function data() {
		return {
			__newOption: "",
			__showHelpDialog: false,
			supportedClasses: [],
			supportedOptions: {
				"class": "class",
				"limit": "int",
				"offset": "int",
				"reverse": "boolean",
				"sort": ["cdate", "mdate", "guid"],
				"skip_ac": "boolean"
			},
			options: {},
			selectors: [],
			showQuery: false,
			classCheckbox: '',
			classInput: '',
			classSelect: '',
			classAddButton: '',
			classRemoveButton: '',
			classButton: ''
		};
	};

	var methods = {
		addOption: function addOption() {
			var options = this.get("options");
			var newOption = this.get("__newOption");
			var supportedOptions = this.get("supportedOptions");

			if (newOption === "") {
				return;
			}

			if (!(newOption in options)) {
				options[newOption] = this.getDefaultValue(supportedOptions[newOption]);
			}

			this.set({
				options: options,
				__newOption: ""
			});
		},
		removeOption: function removeOption(option) {
			var options = this.get("options");
			delete options[option];
			this.set({ options: options });
		},
		getDefaultValue: function getDefaultValue(type) {
			switch (type) {
				case "class":
					var classes = this.get("supportedClasses");
					return classes.length ? classes[0].class : '';
				case "int":
					return 0;
				case "float":
					return 0.0;
				case "boolean":
					return true;
				case "string":
					return "";
				case "date":
					return Date.now();
				default:
					if (Array.isArray(type)) {
						return type[0];
					}
					return "";
			}
		},
		addSelector: function addSelector() {
			var selectors = this.get("selectors");
			selectors.push({ type: '&' });
			this.set({ selectors: selectors });
		},
		removeSelector: function removeSelector(index) {
			var selectors = this.get("selectors");
			selectors.splice(index, 1);
			this.set({ selectors: selectors });
		},
		openHelpDialog: function openHelpDialog() {
			this.set({ __showHelp: true });
		},
		closeHelpDialog: function closeHelpDialog() {
			this.set({ __showHelp: false });
		}
	};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-672087078", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-672087078-style';
		style.textContent = "[svelte-672087078].query-editor,[svelte-672087078] .query-editor{font-family:monospace}[svelte-672087078].options-editor,[svelte-672087078] .options-editor,[svelte-672087078].selector-editor,[svelte-672087078] .selector-editor,[svelte-672087078].selector-editor .selector,[svelte-672087078] .selector-editor .selector{padding-left:1em;display:flex;flex-direction:column}[svelte-672087078].options-editor .option,[svelte-672087078] .options-editor .option,[svelte-672087078].selector-editor .selector .clause,[svelte-672087078] .selector-editor .selector .clause{padding:.5em 1em;display:flex;flex-direction:row}[svelte-672087078].query-result,[svelte-672087078] .query-result{border:1px solid}[svelte-672087078].query-result .query,[svelte-672087078] .query-result .query{font-family:monospace;margin:0;padding:1em;overflow:auto;max-height:200px}[svelte-672087078].help-dialog-container,[svelte-672087078] .help-dialog-container{display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000}[svelte-672087078].help-dialog-overlay,[svelte-672087078] .help-dialog-overlay{position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0, 0, 0, 0.3);z-index:1}[svelte-672087078].help-dialog,[svelte-672087078] .help-dialog{display:flex;flex-direction:column;box-shadow:0px 5px 36px 0px rgba(0,0,0,0.25);background-color:#fff;padding:2em;max-height:80vh;max-width:80vw;overflow:auto;z-index:2}[svelte-672087078].help-dialog > *,[svelte-672087078] .help-dialog > *{margin-bottom:1em}[svelte-672087078].help-dialog > *:last-child,[svelte-672087078] .help-dialog > *:last-child{margin-bottom:0}[svelte-672087078].help-dialog .actions,[svelte-672087078] .help-dialog .actions{display:flex;flex-direction:row;justify-content:flex-end;align-items:center}[svelte-672087078].help-dialog .actions > *,[svelte-672087078] .help-dialog .actions > *{margin-left:1em}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var div, h2, text, button, text_2, h3, text_4, div_1, text_5, pre, text_7, text_8, pre_1, text_11, h3_1, text_13, div_2, div_3, button_1, text_16, text_18, div_4, label, input, text_19, text_21, text_22;

		function click_handler(event) {
			component.openHelpDialog();
		}

		var if_block = state.remainingOptions.length && create_if_block(state, component);

		var optionsKeysTypes_1 = state.optionsKeysTypes;

		var each_blocks = [];

		for (var i = 0; i < optionsKeysTypes_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(state, optionsKeysTypes_1, optionsKeysTypes_1[i], i, component);
		}

		function click_handler_1(event) {
			component.addSelector();
		}

		var selectors = state.selectors;

		var each_1_blocks = [];

		for (var i = 0; i < selectors.length; i += 1) {
			each_1_blocks[i] = create_each_block_4(state, selectors, selectors[i], i, component);
		}

		function input_change_handler() {
			component.set({ showQuery: input.checked });
		}

		var if_block_1 = state.showQuery && create_if_block_4(state, component);

		var if_block_2 = state.__showHelp && create_if_block_5(state, component);

		return {
			c: function create() {
				div = createElement("div");
				h2 = createElement("h2");
				text = createText("Query Editor ");
				button = createElement("button");
				button.textContent = "Help";
				text_2 = createText("\n  ");
				h3 = createElement("h3");
				h3.textContent = "Options";
				text_4 = createText("\n  ");
				div_1 = createElement("div");
				if (if_block) if_block.c();
				text_5 = createText("\n    ");
				pre = createElement("pre");
				pre.textContent = "{";
				text_7 = createText("\n    ");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text_8 = createText("\n    ");
				pre_1 = createElement("pre");
				pre_1.textContent = "}";
				text_11 = createText("\n  ");
				h3_1 = createElement("h3");
				h3_1.textContent = "Selectors";
				text_13 = createText("\n  ");
				div_2 = createElement("div");
				div_3 = createElement("div");
				button_1 = createElement("button");
				button_1.textContent = "Add Selector";
				text_16 = createText("\n    ");

				for (var i = 0; i < each_1_blocks.length; i += 1) {
					each_1_blocks[i].c();
				}

				text_18 = createText("\n  ");
				div_4 = createElement("div");
				label = createElement("label");
				input = createElement("input");
				text_19 = createText("Show Query Preview");
				text_21 = createText("\n  ");
				if (if_block_1) if_block_1.c();
				text_22 = createText("\n  ");
				if (if_block_2) if_block_2.c();
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(div);
				div.className = "query-editor";
				button.className = state.classButton;
				addListener(button, "click", click_handler);
				div_1.className = "options-editor";
				div_2.className = "selector-editor";
				button_1.className = state.classAddButton;
				addListener(button_1, "click", click_handler_1);
				input.className = state.classCheckbox;
				input.type = "checkbox";
				addListener(input, "change", input_change_handler);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(h2, div);
				appendNode(text, h2);
				appendNode(button, h2);
				appendNode(text_2, div);
				appendNode(h3, div);
				appendNode(text_4, div);
				appendNode(div_1, div);
				if (if_block) if_block.m(div_1, null);
				appendNode(text_5, div_1);
				appendNode(pre, div_1);
				appendNode(text_7, div_1);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div_1, null);
				}

				appendNode(text_8, div_1);
				appendNode(pre_1, div_1);
				appendNode(text_11, div);
				appendNode(h3_1, div);
				appendNode(text_13, div);
				appendNode(div_2, div);
				appendNode(div_3, div_2);
				appendNode(button_1, div_3);
				appendNode(text_16, div_2);

				for (var i = 0; i < each_1_blocks.length; i += 1) {
					each_1_blocks[i].m(div_2, null);
				}

				appendNode(text_18, div);
				appendNode(div_4, div);
				appendNode(label, div_4);
				appendNode(input, label);

				input.checked = state.showQuery;

				appendNode(text_19, label);
				appendNode(text_21, div);
				if (if_block_1) if_block_1.m(div, null);
				appendNode(text_22, div);
				if (if_block_2) if_block_2.m(div, null);
			},

			p: function update(changed, state) {
				if (changed.classButton) {
					button.className = state.classButton;
				}

				if (state.remainingOptions.length) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(div_1, text_5);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				var optionsKeysTypes_1 = state.optionsKeysTypes;

				if (changed.optionsKeysTypes || changed.classSelect || changed.options || changed.supportedClasses || changed.classCheckbox || changed.classInput || changed.classRemoveButton) {
					for (var i = 0; i < optionsKeysTypes_1.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, optionsKeysTypes_1, optionsKeysTypes_1[i], i);
						} else {
							each_blocks[i] = create_each_block_1(state, optionsKeysTypes_1, optionsKeysTypes_1[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(div_1, text_8);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = optionsKeysTypes_1.length;
				}

				if (changed.classAddButton) {
					button_1.className = state.classAddButton;
				}

				var selectors = state.selectors;

				if (changed.selectors || changed.classCheckbox || changed.classInput || changed.classSelect || changed.classAddButton || changed.classRemoveButton) {
					for (var i = 0; i < selectors.length; i += 1) {
						if (each_1_blocks[i]) {
							each_1_blocks[i].p(changed, state, selectors, selectors[i], i);
						} else {
							each_1_blocks[i] = create_each_block_4(state, selectors, selectors[i], i, component);
							each_1_blocks[i].c();
							each_1_blocks[i].m(div_2, null);
						}
					}

					for (; i < each_1_blocks.length; i += 1) {
						each_1_blocks[i].u();
						each_1_blocks[i].d();
					}
					each_1_blocks.length = selectors.length;
				}

				if (changed.classCheckbox) {
					input.className = state.classCheckbox;
				}

				input.checked = state.showQuery;

				if (state.showQuery) {
					if (if_block_1) {
						if_block_1.p(changed, state);
					} else {
						if_block_1 = create_if_block_4(state, component);
						if_block_1.c();
						if_block_1.m(div, text_22);
					}
				} else if (if_block_1) {
					if_block_1.u();
					if_block_1.d();
					if_block_1 = null;
				}

				if (state.__showHelp) {
					if (if_block_2) {
						if_block_2.p(changed, state);
					} else {
						if_block_2 = create_if_block_5(state, component);
						if_block_2.c();
						if_block_2.m(div, null);
					}
				} else if (if_block_2) {
					if_block_2.u();
					if_block_2.d();
					if_block_2 = null;
				}
			},

			u: function unmount() {
				detachNode(div);
				if (if_block) if_block.u();

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				for (var i = 0; i < each_1_blocks.length; i += 1) {
					each_1_blocks[i].u();
				}

				if (if_block_1) if_block_1.u();
				if (if_block_2) if_block_2.u();
			},

			d: function destroy() {
				removeListener(button, "click", click_handler);
				if (if_block) if_block.d();

				destroyEach(each_blocks);

				removeListener(button_1, "click", click_handler_1);

				destroyEach(each_1_blocks);

				removeListener(input, "change", input_change_handler);
				if (if_block_1) if_block_1.d();
				if (if_block_2) if_block_2.d();
			}
		};
	}

	// (12:10) {{#each remainingOptions as option}}
	function create_each_block(state, remainingOptions_1, option, option_index, component) {
		var option_1,
		    option_1_value_value,
		    text_value = option,
		    text;

		return {
			c: function create() {
				option_1 = createElement("option");
				text = createText(text_value);
				this.h();
			},

			h: function hydrate() {
				option_1.__value = option_1_value_value = option;
				option_1.value = option_1.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option_1, target, anchor);
				appendNode(text, option_1);
			},

			p: function update(changed, state, remainingOptions_1, option, option_index) {
				if (changed.remainingOptions && option_1_value_value !== (option_1_value_value = option)) {
					option_1.__value = option_1_value_value;
				}

				option_1.value = option_1.__value;
				if (changed.remainingOptions && text_value !== (text_value = option)) {
					text.data = text_value;
				}
			},

			u: function unmount() {
				detachNode(option_1);
			},

			d: noop
		};
	}

	// (5:4) {{#if remainingOptions.length}}
	function create_if_block(state, component) {
		var div,
		    text,
		    select,
		    option,
		    select_updating = false;

		var remainingOptions_1 = state.remainingOptions;

		var each_blocks = [];

		for (var i = 0; i < remainingOptions_1.length; i += 1) {
			each_blocks[i] = create_each_block(state, remainingOptions_1, remainingOptions_1[i], i, component);
		}

		function select_change_handler() {
			select_updating = true;
			var selectedOption = select.querySelector(':checked') || select.options[0];
			component.set({ __newOption: selectedOption && selectedOption.__value });
			select_updating = false;
		}

		function change_handler(event) {
			component.addOption();
		}

		return {
			c: function create() {
				div = createElement("div");
				text = createText("Add Option:\n        ");
				select = createElement("select");
				option = createElement("option");
				option.textContent = "- Select an Option -";

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				this.h();
			},

			h: function hydrate() {
				option.selected = true;
				option.__value = '';
				option.value = option.__value;
				select.className = state.classSelect;

				if (!('__newOption' in state)) component._root._beforecreate.push(select_change_handler);

				addListener(select, "change", select_change_handler);
				addListener(select, "change", change_handler);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(text, div);
				appendNode(select, div);
				appendNode(option, select);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(select, null);
				}

				var value = state.__newOption;
				for (var i = 0; i < select.options.length; i += 1) {
					var option_2 = select.options[i];

					if (option_2.__value === value) {
						option_2.selected = true;
						break;
					}
				}
			},

			p: function update(changed, state) {
				var remainingOptions_1 = state.remainingOptions;

				if (changed.remainingOptions) {
					for (var i = 0; i < remainingOptions_1.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, remainingOptions_1, remainingOptions_1[i], i);
						} else {
							each_blocks[i] = create_each_block(state, remainingOptions_1, remainingOptions_1[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = remainingOptions_1.length;
				}

				if (changed.classSelect) {
					select.className = state.classSelect;
				}

				if (!select_updating) {
					var value = state.__newOption;
					for (var i = 0; i < select.options.length; i += 1) {
						var option_2 = select.options[i];

						if (option_2.__value === value) {
							option_2.selected = true;
							break;
						}
					}
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
			}
		};
	}

	// (21:4) {{#each optionsKeysTypes as option}}
	function create_each_block_1(state, optionsKeysTypes_1, option_1, option_index, component) {
		var div,
		    div_1,
		    text_value = option_1.key,
		    text,
		    text_1,
		    text_2,
		    div_2,
		    text_4,
		    div_3,
		    button;

		var current_block_type = select_block_type(state, optionsKeysTypes_1, option_1, option_index);
		var if_block = current_block_type(state, optionsKeysTypes_1, option_1, option_index, component);

		return {
			c: function create() {
				div = createElement("div");
				div_1 = createElement("div");
				text = createText(text_value);
				text_1 = createText(":");
				text_2 = createText("\n        ");
				div_2 = createElement("div");
				if_block.c();
				text_4 = createText("\n        ");
				div_3 = createElement("div");
				button = createElement("button");
				button.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				div.className = "option";
				div_1.className = "name";
				div_2.className = "value";
				div_3.className = "remove";
				button.className = state.classRemoveButton;
				addListener(button, "click", click_handler);

				button._svelte = {
					component: component,
					optionsKeysTypes_1: optionsKeysTypes_1,
					option_index: option_index
				};
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
				appendNode(div_3, div);
				appendNode(button, div_3);
			},

			p: function update(changed, state, optionsKeysTypes_1, option_1, option_index) {
				if (changed.optionsKeysTypes && text_value !== (text_value = option_1.key)) {
					text.data = text_value;
				}

				if (current_block_type === (current_block_type = select_block_type(state, optionsKeysTypes_1, option_1, option_index)) && if_block) {
					if_block.p(changed, state, optionsKeysTypes_1, option_1, option_index);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, optionsKeysTypes_1, option_1, option_index, component);
					if_block.c();
					if_block.m(div_2, null);
				}

				if (changed.classRemoveButton) {
					button.className = state.classRemoveButton;
				}

				button._svelte.optionsKeysTypes_1 = optionsKeysTypes_1;
				button._svelte.option_index = option_index;
			},

			u: function unmount() {
				detachNode(div);
				if_block.u();
			},

			d: function destroy() {
				if_block.d();
				removeListener(button, "click", click_handler);
			}
		};
	}

	// (29:14) {{#each supportedClasses as curClass}}
	function create_each_block_2(state, optionsKeysTypes_1, option_1, option_index, supportedClasses, curClass, curClass_index, component) {
		var option_2,
		    option_2_value_value,
		    text_value = curClass.class,
		    text;

		return {
			c: function create() {
				option_2 = createElement("option");
				text = createText(text_value);
				this.h();
			},

			h: function hydrate() {
				option_2.__value = option_2_value_value = curClass.class;
				option_2.value = option_2.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option_2, target, anchor);
				appendNode(text, option_2);
			},

			p: function update(changed, state, optionsKeysTypes_1, option_1, option_index, supportedClasses, curClass, curClass_index) {
				if (changed.supportedClasses && option_2_value_value !== (option_2_value_value = curClass.class)) {
					option_2.__value = option_2_value_value;
				}

				option_2.value = option_2.__value;
				if (changed.supportedClasses && text_value !== (text_value = curClass.class)) {
					text.data = text_value;
				}
			},

			u: function unmount() {
				detachNode(option_2);
			},

			d: noop
		};
	}

	// (45:14) {{#each option.type as enumVal}}
	function create_each_block_3(state, optionsKeysTypes_1, option_1, option_index, type, enumVal, enumVal_index, component) {
		var option_2,
		    option_2_value_value,
		    text_value = enumVal,
		    text;

		return {
			c: function create() {
				option_2 = createElement("option");
				text = createText(text_value);
				this.h();
			},

			h: function hydrate() {
				option_2.__value = option_2_value_value = enumVal;
				option_2.value = option_2.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option_2, target, anchor);
				appendNode(text, option_2);
			},

			p: function update(changed, state, optionsKeysTypes_1, option_1, option_index, type, enumVal, enumVal_index) {
				if (changed.optionsKeysTypes && option_2_value_value !== (option_2_value_value = enumVal)) {
					option_2.__value = option_2_value_value;
				}

				option_2.value = option_2.__value;
				if (changed.optionsKeysTypes && text_value !== (text_value = enumVal)) {
					text.data = text_value;
				}
			},

			u: function unmount() {
				detachNode(option_2);
			},

			d: noop
		};
	}

	// (27:10) {{#if option.type === "class"}}
	function create_if_block_1(state, optionsKeysTypes_1, option_1, option_index, component) {
		var select,
		    select_updating = false;

		var supportedClasses = state.supportedClasses;

		var each_blocks = [];

		for (var i = 0; i < supportedClasses.length; i += 1) {
			each_blocks[i] = create_each_block_2(state, optionsKeysTypes_1, option_1, option_index, supportedClasses, supportedClasses[i], i, component);
		}

		function select_change_handler() {
			select_updating = true;
			var selectedOption = select.querySelector(':checked') || select.options[0];
			var state = component.get();
			state.options[option_1.key] = selectedOption && selectedOption.__value;
			component.set({ options: state.options, optionsKeysTypes: state.optionsKeysTypes });
			select_updating = false;
		}

		return {
			c: function create() {
				select = createElement("select");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				this.h();
			},

			h: function hydrate() {
				select.className = state.classSelect;

				if (!('options' in state)) component._root._beforecreate.push(select_change_handler);

				addListener(select, "change", select_change_handler);

				select._svelte = {
					optionsKeysTypes_1: optionsKeysTypes_1,
					option_index: option_index
				};
			},

			m: function mount(target, anchor) {
				insertNode(select, target, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(select, null);
				}

				var value = state.options[option_1.key];
				for (var i = 0; i < select.options.length; i += 1) {
					var option_2 = select.options[i];

					if (option_2.__value === value) {
						option_2.selected = true;
						break;
					}
				}
			},

			p: function update(changed, state, optionsKeysTypes_1, option_1, option_index) {
				var supportedClasses = state.supportedClasses;

				if (changed.supportedClasses) {
					for (var i = 0; i < supportedClasses.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, optionsKeysTypes_1, option_1, option_index, supportedClasses, supportedClasses[i], i);
						} else {
							each_blocks[i] = create_each_block_2(state, optionsKeysTypes_1, option_1, option_index, supportedClasses, supportedClasses[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = supportedClasses.length;
				}

				if (changed.classSelect) {
					select.className = state.classSelect;
				}

				if (!select_updating) {
					var value = state.options[option_1.key];
					for (var i = 0; i < select.options.length; i += 1) {
						var option_2 = select.options[i];

						if (option_2.__value === value) {
							option_2.selected = true;
							break;
						}
					}
				}

				select._svelte.optionsKeysTypes_1 = optionsKeysTypes_1;
				select._svelte.option_index = option_index;
			},

			u: function unmount() {
				detachNode(select);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				destroyEach(each_blocks);

				removeListener(select, "change", select_change_handler);
			}
		};
	}

	// (35:99) 
	function create_if_block_2(state, optionsKeysTypes_1, option_1, option_index, component) {
		var valueeditor_updating = {};

		var valueeditor_initial_data = {
			valueTypeInitial: option_1.type,
			allowedTypes: [option_1.type],
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect
		};
		if (option_1.key in state.options) {
			valueeditor_initial_data.value = state.options[option_1.key];
			valueeditor_updating.value = true;
		}
		var valueeditor = new _ValueEditor2.default({
			_root: component._root,
			data: valueeditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!valueeditor_updating.value && changed.value) {
					state.options[option_1.key] = childState.value;
					newState.options = state.options;
					newState.optionsKeysTypes = state.optionsKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component._root._beforecreate.push(function () {
			var state = component.get(),
			    childState = valueeditor.get(),
			    newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				state.options[option_1.key] = childState.value;
				newState.options = state.options;
				newState.optionsKeysTypes = state.optionsKeysTypes;
			}
			valueeditor_updating = { value: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		var valueeditor_context = {
			state: state,
			optionsKeysTypes_1: optionsKeysTypes_1,
			option_index: option_index
		};

		return {
			c: function create() {
				valueeditor._fragment.c();
			},

			m: function mount(target, anchor) {
				valueeditor._mount(target, anchor);
			},

			p: function update(changed, state, optionsKeysTypes_1, option_1, option_index) {
				var valueeditor_changes = {};
				if (changed.optionsKeysTypes) valueeditor_changes.valueTypeInitial = option_1.type;
				if (changed.optionsKeysTypes) valueeditor_changes.allowedTypes = [option_1.type];
				if (changed.classCheckbox) valueeditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) valueeditor_changes.classInput = state.classInput;
				if (changed.classSelect) valueeditor_changes.classSelect = state.classSelect;
				if (!valueeditor_updating.value && changed.options || changed.optionsKeysTypes) {
					valueeditor_changes.value = state.options[option_1.key];
					valueeditor_updating.value = true;
				}
				valueeditor._set(valueeditor_changes);
				valueeditor_updating = {};

				valueeditor_context.state = state;
				valueeditor_context.optionsKeysTypes_1 = optionsKeysTypes_1;
				valueeditor_context.option_index = option_index;
			},

			u: function unmount() {
				valueeditor._unmount();
			},

			d: function destroy() {
				valueeditor.destroy(false);
			}
		};
	}

	// (43:10) {{else}}
	function create_if_block_3(state, optionsKeysTypes_1, option_1, option_index, component) {
		var select,
		    select_updating = false;

		var type = option_1.type;

		var each_blocks = [];

		for (var i = 0; i < type.length; i += 1) {
			each_blocks[i] = create_each_block_3(state, optionsKeysTypes_1, option_1, option_index, type, type[i], i, component);
		}

		function select_change_handler() {
			select_updating = true;
			var selectedOption = select.querySelector(':checked') || select.options[0];
			var state = component.get();
			state.options[option_1.key] = selectedOption && selectedOption.__value;
			component.set({ options: state.options, optionsKeysTypes: state.optionsKeysTypes });
			select_updating = false;
		}

		return {
			c: function create() {
				select = createElement("select");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				this.h();
			},

			h: function hydrate() {
				select.className = state.classSelect;

				if (!('options' in state)) component._root._beforecreate.push(select_change_handler);

				addListener(select, "change", select_change_handler);

				select._svelte = {
					optionsKeysTypes_1: optionsKeysTypes_1,
					option_index: option_index
				};
			},

			m: function mount(target, anchor) {
				insertNode(select, target, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(select, null);
				}

				var value = state.options[option_1.key];
				for (var i = 0; i < select.options.length; i += 1) {
					var option_2 = select.options[i];

					if (option_2.__value === value) {
						option_2.selected = true;
						break;
					}
				}
			},

			p: function update(changed, state, optionsKeysTypes_1, option_1, option_index) {
				var type = option_1.type;

				if (changed.optionsKeysTypes) {
					for (var i = 0; i < type.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, optionsKeysTypes_1, option_1, option_index, type, type[i], i);
						} else {
							each_blocks[i] = create_each_block_3(state, optionsKeysTypes_1, option_1, option_index, type, type[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = type.length;
				}

				if (changed.classSelect) {
					select.className = state.classSelect;
				}

				if (!select_updating) {
					var value = state.options[option_1.key];
					for (var i = 0; i < select.options.length; i += 1) {
						var option_2 = select.options[i];

						if (option_2.__value === value) {
							option_2.selected = true;
							break;
						}
					}
				}

				select._svelte.optionsKeysTypes_1 = optionsKeysTypes_1;
				select._svelte.option_index = option_index;
			},

			u: function unmount() {
				detachNode(select);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				destroyEach(each_blocks);

				removeListener(select, "change", select_change_handler);
			}
		};
	}

	// (65:4) {{#each selectors as selector, index}}
	function create_each_block_4(state, selectors, selector, index, component) {
		var selectoreditor_updating = {};

		var selectoreditor_initial_data = {
			classCheckbox: state.classCheckbox,
			classInput: state.classInput,
			classSelect: state.classSelect,
			classAddButton: state.classAddButton,
			classRemoveButton: state.classRemoveButton
		};
		if (index in selectors) {
			selectoreditor_initial_data.selector = selector;
			selectoreditor_updating.selector = true;
		}
		var selectoreditor = new _SelectorEditor2.default({
			_root: component._root,
			data: selectoreditor_initial_data,
			_bind: function _bind(changed, childState) {
				var state = component.get(),
				    newState = {};
				if (!selectoreditor_updating.selector && changed.selector) {
					var list = selectoreditor_context.selectors;
					var index = selectoreditor_context.index;
					list[index] = childState.selector;

					newState.selectors = state.selectors;
				}
				selectoreditor_updating = assign({}, changed);
				component._set(newState);
				selectoreditor_updating = {};
			}
		});

		component._root._beforecreate.push(function () {
			var state = component.get(),
			    childState = selectoreditor.get(),
			    newState = {};
			if (!childState) return;
			if (!selectoreditor_updating.selector) {
				var list = selectoreditor_context.selectors;
				var index = selectoreditor_context.index;
				list[index] = childState.selector;

				newState.selectors = state.selectors;
			}
			selectoreditor_updating = { selector: true };
			component._set(newState);
			selectoreditor_updating = {};
		});

		selectoreditor.on("remove", function (event) {
			var selectors = selectoreditor_context.selectors,
			    index = selectoreditor_context.index,
			    selector = selectors[index];

			component.removeSelector(index);
		});

		var selectoreditor_context = {
			selectors: selectors,
			index: index
		};

		return {
			c: function create() {
				selectoreditor._fragment.c();
			},

			m: function mount(target, anchor) {
				selectoreditor._mount(target, anchor);
			},

			p: function update(changed, state, selectors, selector, index) {
				var selectoreditor_changes = {};
				if (changed.classCheckbox) selectoreditor_changes.classCheckbox = state.classCheckbox;
				if (changed.classInput) selectoreditor_changes.classInput = state.classInput;
				if (changed.classSelect) selectoreditor_changes.classSelect = state.classSelect;
				if (changed.classAddButton) selectoreditor_changes.classAddButton = state.classAddButton;
				if (changed.classRemoveButton) selectoreditor_changes.classRemoveButton = state.classRemoveButton;
				if (!selectoreditor_updating.selector && changed.selectors) {
					selectoreditor_changes.selector = selector;
					selectoreditor_updating.selector = true;
				}
				selectoreditor._set(selectoreditor_changes);
				selectoreditor_updating = {};

				selectoreditor_context.selectors = selectors;
				selectoreditor_context.index = index;
			},

			u: function unmount() {
				selectoreditor._unmount();
			},

			d: function destroy() {
				selectoreditor.destroy(false);
			}
		};
	}

	// (79:2) {{#if showQuery}}
	function create_if_block_4(state, component) {
		var h3, text_1, div, pre, text_2;

		return {
			c: function create() {
				h3 = createElement("h3");
				h3.textContent = "Query";
				text_1 = createText("\n    ");
				div = createElement("div");
				pre = createElement("pre");
				text_2 = createText(state.queryText);
				this.h();
			},

			h: function hydrate() {
				div.className = "query-result";
				pre.className = "query";
			},

			m: function mount(target, anchor) {
				insertNode(h3, target, anchor);
				insertNode(text_1, target, anchor);
				insertNode(div, target, anchor);
				appendNode(pre, div);
				appendNode(text_2, pre);
			},

			p: function update(changed, state) {
				if (changed.queryText) {
					text_2.data = state.queryText;
				}
			},

			u: function unmount() {
				detachNode(h3);
				detachNode(text_1);
				detachNode(div);
			},

			d: noop
		};
	}

	// (85:2) {{#if __showHelp}}
	function create_if_block_5(state, component) {
		var div, div_1, text, div_2, h3, text_2, div_3, text_11, div_4, text_13, div_5, text_20, div_6, text_39, div_7, text_41, div_8, text_54, div_9, button;

		function click_handler_1(event) {
			component.closeHelpDialog();
		}

		function click_handler_2(event) {
			component.closeHelpDialog();
		}

		return {
			c: function create() {
				div = createElement("div");
				div_1 = createElement("div");
				text = createText("\n    ");
				div_2 = createElement("div");
				h3 = createElement("h3");
				h3.textContent = "How to Build Nymph Queries";
				text_2 = createText("\n\n      ");
				div_3 = createElement("div");
				div_3.innerHTML = "options is an associative array, which contains any of the following\n        settings (in the form options['name'] = value):\n\n        <ul><li>class - (string) The class to create each entity with.</li>\n          <li>limit - (int) The limit of entities to be returned.</li>\n          <li>offset - (int) The offset from the oldest matching entity to start\n            retrieving.</li>\n          <li>reverse - (bool) If true, entities will be retrieved from newest to\n            oldest. Therefore, offset will be from the newest entity.</li>\n          <li>sort - (string) How to sort the entities. Accepts \"guid\", \"cdate\", and\n            \"mdate\". Defaults to \"cdate\".</li>\n          <li>skip_ac - (bool) If true, the user manager will not filter returned\n            entities according to access controls.</li>\n        </ul>";
				text_11 = createText("\n\n      ");
				div_4 = createElement("div");
				div_4.textContent = "If a class is specified, it must have a factory() static method that\n        returns a new instance.";
				text_13 = createText("\n\n      ");
				div_5 = createElement("div");
				div_5.innerHTML = "Selectors are also associative arrays. Any amount of selectors can be\n        provided. Empty selectors will be ignored. The first member of a selector\n        must be a \"type\" string. The type string can be:\n\n        <ul><li>& - (and) All values in the selector must be true.</li>\n          <li>| - (or) At least one value in the selector must be true.</li>\n          <li>!& - (not and) All values in the selector must be false.</li>\n          <li>!| - (not or) At least one value in the selector must be false.</li>\n        </ul>";
				text_20 = createText("\n\n      ");
				div_6 = createElement("div");
				div_6.innerHTML = "The rest of the entries in the selector are either more selectors or\n        associative entries called selector clauses, which can be any of the\n        following (in the form selector['name'] = value, or\n        selector['name'] = [value1, value2,...]):\n\n        <ul><li>guid - A GUID. True if the entity's GUID is equal.</li>\n          <li>tag - A tag. True if the entity has the tag.</li>\n          <li>isset - A name. True if the named variable exists and is not null.</li>\n          <li>data - An array with a name, then value. True if the named variable is\n            defined and equal.</li>\n          <li>strict - An array with a name, then value. True if the named variable\n            is defined and identical.</li>\n          <li>array - An array with a name, then value. True if the named variable is\n            an array containing the value. Uses in_array().</li>\n          <li>match - An array with a name, then regular expression. True if the\n            named variable matches. Uses preg_match(). More powerful than \"pmatch\"\n            but slower. Must be surrounded by \"/\" delimiters.</li>\n          <li>pmatch - An array with a name, then regular expression. True if the\n            named variable matches. Uses POSIX RegExp. Case sensitive. Faster than\n            \"match\". Must *not* be surrounded by any delimiters.</li>\n          <li>ipmatch - An array with a name, then regular expression. True if the\n            named variable matches. Uses POSIX RegExp. Case insensitive. Faster\n            than \"match\". Must *not* be surrounded by any delimiters.</li>\n          <li>like - An array with a name, then pattern. True if the named variable\n            matches. Uses % for variable length wildcard and _ for single character\n            wildcard. Case sensitive.</li>\n          <li>ilike - An array with a name, then pattern. True if the named variable\n            matches. Uses % for variable length wildcard and _ for single character\n            wildcard. Case insensitive.</li>\n          <li>gt - An array with a name, then value. True if the named variable is\n            greater than the value.</li>\n          <li>gte - An array with a name, then value. True if the named variable is\n            greater than or equal to the value.</li>\n          <li>lt - An array with a name, then value. True if the named variable is\n            less than the value.</li>\n          <li>lte - An array with a name, then value. True if the named variable is\n            less than or equal to the value.</li>\n          <li>ref - An array with a name, then either a entity, or a GUID. True if\n            the named variable is the entity or an array containing the entity.</li>\n        </ul>";
				text_39 = createText("\n\n      ");
				div_7 = createElement("div");
				div_7.textContent = "These clauses can all be negated, by prefixing them with an exclamation\n        point, such as \"!isset\".";
				text_41 = createText("\n\n      ");
				div_8 = createElement("div");
				div_8.innerHTML = "This example will retrieve the last two entities where:\n\n        <ul><li>It has 'person' tag.</li>\n          <li>spouse exists and is not null.</li>\n          <li>gender is male and lname is Smith.</li>\n          <li>warnings is not an integer 0.</li>\n          <li>It has 'level1' and 'level2' tags, or it has 'access1' and 'access2'\n            tags.</li>\n          <li>It has either 'employee' or 'manager' tag.</li>\n          <li>name is either Clark, James, Chris, Christopher, Jake, or Jacob.</li>\n          <li>If age is 22 or more, then pay is not greater than 8.</li>\n        </ul>\n\n        <pre>Nymph.getEntities(\n  {\n    'reverse': true,\n    'limit': 2\n  },\n  {\n    'type': '&', // all must be true\n    'tag': 'person',\n    'isset': 'spouse',\n    'data': [\n      ['gender', 'male'],\n      ['lname', 'Smith']\n    ],\n    '!strict': ['warnings', 0]\n  },\n  {\n    'type': '|', // at least one of the selectors in this must evaluate to true\n    '1': {\n      'type': '&',\n      'tag': ['level1', 'level2']\n    },\n    '2': {\n      'type': '&',\n      'tag': ['access1', 'access2']\n    }\n  },\n  {\n    'type': '|', // at least one must be true\n    'tag': ['employee', 'manager']\n  },\n  {\n    'type': '|',\n    'data': [\n      ['name', 'Clark'],\n      ['name', 'James']\n    ],\n    'pmatch': [\n      ['name', 'Chris(topher)?'],\n      ['name', 'Ja(ke|cob)']\n    ]\n  },\n  {\n    'type': '!|', // at least one must be false\n    'gte': ['age', 22],\n    'gt': ['pay', 8]\n  }\n);</pre>";
				text_54 = createText("\n\n      ");
				div_9 = createElement("div");
				button = createElement("button");
				button.textContent = "Close";
				this.h();
			},

			h: function hydrate() {
				div.className = "help-dialog-container";
				div_1.className = "help-dialog-overlay";
				addListener(div_1, "click", click_handler_1);
				div_2.className = "help-dialog";
				div_9.className = "actions";
				button.className = state.classButton;
				addListener(button, "click", click_handler_2);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(div_1, div);
				appendNode(text, div);
				appendNode(div_2, div);
				appendNode(h3, div_2);
				appendNode(text_2, div_2);
				appendNode(div_3, div_2);
				appendNode(text_11, div_2);
				appendNode(div_4, div_2);
				appendNode(text_13, div_2);
				appendNode(div_5, div_2);
				appendNode(text_20, div_2);
				appendNode(div_6, div_2);
				appendNode(text_39, div_2);
				appendNode(div_7, div_2);
				appendNode(text_41, div_2);
				appendNode(div_8, div_2);
				appendNode(text_54, div_2);
				appendNode(div_9, div_2);
				appendNode(button, div_9);
			},

			p: function update(changed, state) {
				if (changed.classButton) {
					button.className = state.classButton;
				}
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(div_1, "click", click_handler_1);
				removeListener(button, "click", click_handler_2);
			}
		};
	}

	function select_block_type(state, optionsKeysTypes_1, option_1, option_index) {
		if (option_1.type === "class") return create_if_block_1;
		if (option_1.type === "int" || option_1.type === "boolean" || option_1.type === "string") return create_if_block_2;
		return create_if_block_3;
	}

	function click_handler(event) {
		var component = this._svelte.component;
		var optionsKeysTypes_1 = this._svelte.optionsKeysTypes_1,
		    option_index = this._svelte.option_index,
		    option_1 = optionsKeysTypes_1[option_index];
		component.removeOption(option_1.key);
	}

	function QueryEditor(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ options: 1, supportedOptions: 1, selectors: 1 }, this._state);

		if (!document.getElementById("svelte-672087078-style")) add_css();

		if (!options._root) {
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

	assign(QueryEditor.prototype, methods, {
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

	QueryEditor.prototype._recompute = function _recompute(changed, state) {
		if (changed.options || changed.supportedOptions) {
			if (differs(state.remainingOptions, state.remainingOptions = remainingOptions(state.options, state.supportedOptions))) changed.remainingOptions = true;
			if (differs(state.optionsKeysTypes, state.optionsKeysTypes = optionsKeysTypes(state.options, state.supportedOptions))) changed.optionsKeysTypes = true;
		}

		if (changed.options || changed.selectors) {
			if (differs(state.queryText, state.queryText = queryText(state.options, state.selectors))) changed.queryText = true;
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

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
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

	function init(component, options) {
		component.options = options;

		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._root = options._root || component;
		component._bind = options._bind;
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
		if (this._root._lock) return;
		this._root._lock = true;
		callAll(this._root._beforecreate);
		callAll(this._root._oncreate);
		callAll(this._root._aftercreate);
		this._root._lock = false;
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
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}

	function _mount(target, anchor) {
		this._fragment.m(target, anchor);
	}

	function _unmount() {
		this._fragment.u();
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
	exports.default = QueryEditor;
});
