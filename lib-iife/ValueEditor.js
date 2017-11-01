/* src/ValueEditor.html generated by Svelte v1.41.2 */
var ValueEditor = (function() { "use strict";

	const strtotime = window.strtotime || require("locutus/php/datetime/strtotime");

function valueType(value, valueTypeCurrent, allowedTypes) {
  if (allowedTypes.length === 1) {
    return allowedTypes[0];
  }
  if (value === null) {
    return "date";
  }
  switch (typeof value) {
    case "number":
      if (value % 1 > 0) {
        return valueTypeCurrent || "float";
      } else {
        return valueTypeCurrent || "int";
      }
    case "boolean":
      return "boolean";
    case "string":
    default:
      return "string";
  }
}

	function data() {
  return {
    __dateInputTimestamp: 0,
    __dateInputInterpretation: "",
    valueTypeInitial: null,
    valueTypeCurrent: null,
    allowedTypes: ["string", "int", "float", "boolean", "date"],
    value: "",
    wholeValue: ["", ""],
  }
};

	var methods = {
  changeValueType () {
    const valueTypeCurrent = this.get("valueTypeCurrent");
    let value = this.get("value");

    switch (valueTypeCurrent) {
      case "string":
        this.fire("makeNotDate");
        value = ""+value;
        break;
      case "int":
        this.fire("makeNotDate");
        value = parseInt(value, 10);
        break;
      case "float":
        this.fire("makeNotDate");
        value = parseFloat(value, 10);
        break;
      case "boolean":
        this.fire("makeNotDate");
        value = !!value;
        break;
      case "date":
        this.fire("makeDate");
        this.handleDateInput();
        return;
    }

    this.set({value});
  },

  handleDateInput () {
    const wholeEntry = this.get("wholeEntry");
    let dateString = wholeEntry[2];
    const match = dateString.match(/^\s*(\d+)?\s*(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s*(\d+)?\s*$/i);
    if (match) {
      if (match[1] === undefined && match[2] === undefined) {
        dateString += " "+(new Date().getDate())+" ";
      }
      dateString += " "+(new Date().getFullYear());
    }
    const __dateInputTimestamp = this.interpretDate(dateString);
    const __dateInputInterpretation = __dateInputTimestamp ? this.formatDate(__dateInputTimestamp) : "Unrecognized";

    this.set({
      __dateInputTimestamp,
      __dateInputInterpretation
    });
  },

  interpretDate (input) {
    return strtotime(""+input);
  },

  formatDate (timestamp) {
    return new Date(timestamp * 1000).toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    });
  },

  makeInt () {
    this.set({value: parseInt(this.get("value"), 10)});
  }
};

	function oncreate() {
  if (!strtotime) {
    throw new Error("ValueEditor requires Locutus' strtotime for date interpretation.");
  }

  const valueTypeInitial = this.get("valueTypeInitial");
  const value = this.get("value");
  let valueTypeCurrent;
  if (value === null) {
    valueTypeCurrent = "date";
  } else {
    valueTypeCurrent = valueTypeInitial === null ? this.get("valueType") : valueTypeInitial;
  }
  this.set({valueTypeCurrent});

  if (valueTypeCurrent === "date") {
    this.handleDateInput();
  }

  let dateHandleInterval;
  this.observe("valueTypeCurrent", (value) => {
    if (value === "date") {
      if (!dateHandleInterval) {
        dateHandleInterval = setInterval(() => this.handleDateInput(), 1000);
      }
    } else {
      if (dateHandleInterval) {
        clearInterval(dateHandleInterval);
        dateHandleInterval = false;
      }
    }
  });

  this.observe("value", (newValue, oldValue) => {
    if (
        newValue === null && oldValue !== null
        || newValue !== null && oldValue === null
        || typeof newValue !== typeof oldValue
      ) {
      const valueType = this.get("valueType");
      this.set({valueTypeCurrent: valueType});
      if (valueType === "date") {
        this.handleDateInput();
      }
    }
  }, {init: false});
};

	function create_main_fragment(state, component) {
		var span, text;

		var if_block = (state.allowedTypes.length > 1) && create_if_block(state, component);

		var current_block_type = select_block_type_1(state);
		var if_block_1 = current_block_type && current_block_type(state, component);

		return {
			c: function create() {
				span = createElement("span");
				if (if_block) if_block.c();
				text = createText("\n  ");
				if (if_block_1) if_block_1.c();
			},

			m: function mount(target, anchor) {
				insertNode(span, target, anchor);
				if (if_block) if_block.m(span, null);
				appendNode(text, span);
				if (if_block_1) if_block_1.m(span, null);
			},

			p: function update(changed, state) {
				if (state.allowedTypes.length > 1) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(span, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (current_block_type === (current_block_type = select_block_type_1(state)) && if_block_1) {
					if_block_1.p(changed, state);
				} else {
					if (if_block_1) {
						if_block_1.u();
						if_block_1.d();
					}
					if_block_1 = current_block_type && current_block_type(state, component);
					if (if_block_1) if_block_1.c();
					if (if_block_1) if_block_1.m(span, null);
				}
			},

			u: function unmount() {
				detachNode(span);
				if (if_block) if_block.u();
				if (if_block_1) if_block_1.u();
			},

			d: function destroy() {
				if (if_block) if_block.d();
				if (if_block_1) if_block_1.d();
			}
		};
	}

	// (4:6) {{#if allowedTypes.indexOf("string") > -1}}
	function create_if_block_1(state, component) {
		var option;

		return {
			c: function create() {
				option = createElement("option");
				option.textContent = "String";
				this.h();
			},

			h: function hydrate() {
				option.__value = "string";
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (9:6) {{#if allowedTypes.indexOf("int") > -1}}
	function create_if_block_2(state, component) {
		var option;

		return {
			c: function create() {
				option = createElement("option");
				option.textContent = "Integer";
				this.h();
			},

			h: function hydrate() {
				option.__value = "int";
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (14:6) {{#if allowedTypes.indexOf("float") > -1}}
	function create_if_block_3(state, component) {
		var option;

		return {
			c: function create() {
				option = createElement("option");
				option.textContent = "Float";
				this.h();
			},

			h: function hydrate() {
				option.__value = "float";
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (19:6) {{#if allowedTypes.indexOf("boolean") > -1}}
	function create_if_block_4(state, component) {
		var option;

		return {
			c: function create() {
				option = createElement("option");
				option.textContent = "Boolean";
				this.h();
			},

			h: function hydrate() {
				option.__value = "boolean";
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (24:6) {{#if allowedTypes.indexOf("date") > -1}}
	function create_if_block_5(state, component) {
		var option;

		return {
			c: function create() {
				option = createElement("option");
				option.textContent = "Date";
				this.h();
			},

			h: function hydrate() {
				option.__value = "date";
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (2:2) {{#if allowedTypes.length > 1}}
	function create_if_block(state, component) {
		var text, select, if_block_anchor, if_block_1_anchor, if_block_2_anchor, if_block_3_anchor, select_updating = false, text_1;

		var if_block = (state.allowedTypes.indexOf("string") > -1) && create_if_block_1(state, component);

		var if_block_1 = (state.allowedTypes.indexOf("int") > -1) && create_if_block_2(state, component);

		var if_block_2 = (state.allowedTypes.indexOf("float") > -1) && create_if_block_3(state, component);

		var if_block_3 = (state.allowedTypes.indexOf("boolean") > -1) && create_if_block_4(state, component);

		var if_block_4 = (state.allowedTypes.indexOf("date") > -1) && create_if_block_5(state, component);

		function select_change_handler() {
			select_updating = true;
			var selectedOption = select.querySelector(':checked') || select.options[0];
			component.set({ valueTypeCurrent: selectedOption && selectedOption.__value });
			select_updating = false;
		}

		function change_handler(event) {
			component.changeValueType();
		}

		return {
			c: function create() {
				text = createText("(Type: ");
				select = createElement("select");
				if (if_block) if_block.c();
				if_block_anchor = createComment();
				if (if_block_1) if_block_1.c();
				if_block_1_anchor = createComment();
				if (if_block_2) if_block_2.c();
				if_block_2_anchor = createComment();
				if (if_block_3) if_block_3.c();
				if_block_3_anchor = createComment();
				if (if_block_4) if_block_4.c();
				text_1 = createText(")\n    Value:");
				this.h();
			},

			h: function hydrate() {
				if (!('valueTypeCurrent' in state)) component._root._beforecreate.push(select_change_handler);

				addListener(select, "change", select_change_handler);
				addListener(select, "change", change_handler);
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
				insertNode(select, target, anchor);
				if (if_block) if_block.m(select, null);
				appendNode(if_block_anchor, select);
				if (if_block_1) if_block_1.m(select, null);
				appendNode(if_block_1_anchor, select);
				if (if_block_2) if_block_2.m(select, null);
				appendNode(if_block_2_anchor, select);
				if (if_block_3) if_block_3.m(select, null);
				appendNode(if_block_3_anchor, select);
				if (if_block_4) if_block_4.m(select, null);

				var value = state.valueTypeCurrent;
				for (var i = 0; i < select.options.length; i += 1) {
					var option = select.options[i];

					if (option.__value === value) {
						option.selected = true;
						break;
					}
				}

				insertNode(text_1, target, anchor);
			},

			p: function update(changed, state) {
				if (state.allowedTypes.indexOf("string") > -1) {
					if (!if_block) {
						if_block = create_if_block_1(state, component);
						if_block.c();
						if_block.m(select, if_block_anchor);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (state.allowedTypes.indexOf("int") > -1) {
					if (!if_block_1) {
						if_block_1 = create_if_block_2(state, component);
						if_block_1.c();
						if_block_1.m(select, if_block_1_anchor);
					}
				} else if (if_block_1) {
					if_block_1.u();
					if_block_1.d();
					if_block_1 = null;
				}

				if (state.allowedTypes.indexOf("float") > -1) {
					if (!if_block_2) {
						if_block_2 = create_if_block_3(state, component);
						if_block_2.c();
						if_block_2.m(select, if_block_2_anchor);
					}
				} else if (if_block_2) {
					if_block_2.u();
					if_block_2.d();
					if_block_2 = null;
				}

				if (state.allowedTypes.indexOf("boolean") > -1) {
					if (!if_block_3) {
						if_block_3 = create_if_block_4(state, component);
						if_block_3.c();
						if_block_3.m(select, if_block_3_anchor);
					}
				} else if (if_block_3) {
					if_block_3.u();
					if_block_3.d();
					if_block_3 = null;
				}

				if (state.allowedTypes.indexOf("date") > -1) {
					if (!if_block_4) {
						if_block_4 = create_if_block_5(state, component);
						if_block_4.c();
						if_block_4.m(select, null);
					}
				} else if (if_block_4) {
					if_block_4.u();
					if_block_4.d();
					if_block_4 = null;
				}

				if (!select_updating) {
					var value = state.valueTypeCurrent;
					for (var i = 0; i < select.options.length; i += 1) {
						var option = select.options[i];

						if (option.__value === value) {
							option.selected = true;
							break;
						}
					}
				}
			},

			u: function unmount() {
				detachNode(text);
				detachNode(select);
				if (if_block) if_block.u();
				if (if_block_1) if_block_1.u();
				if (if_block_2) if_block_2.u();
				if (if_block_3) if_block_3.u();
				if (if_block_4) if_block_4.u();
				detachNode(text_1);
			},

			d: function destroy() {
				if (if_block) if_block.d();
				if (if_block_1) if_block_1.d();
				if (if_block_2) if_block_2.d();
				if (if_block_3) if_block_3.d();
				if (if_block_4) if_block_4.d();
				removeListener(select, "change", select_change_handler);
				removeListener(select, "change", change_handler);
			}
		};
	}

	// (39:59) {{#if value}}
	function create_if_block_10(state, component) {
		var text;

		return {
			c: function create() {
				text = createText("True");
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
			},

			u: function unmount() {
				detachNode(text);
			},

			d: noop
		};
	}

	// (39:76) {{else}}
	function create_if_block_11(state, component) {
		var text;

		return {
			c: function create() {
				text = createText("False");
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
			},

			u: function unmount() {
				detachNode(text);
			},

			d: noop
		};
	}

	// (32:2) {{#if valueType === "string"}}
	function create_if_block_6(state, component) {
		var input, input_updating = false;

		function input_input_handler() {
			input_updating = true;
			component.set({ value: input.value });
			input_updating = false;
		}

		return {
			c: function create() {
				input = createElement("input");
				this.h();
			},

			h: function hydrate() {
				input.type = "text";
				addListener(input, "input", input_input_handler);
			},

			m: function mount(target, anchor) {
				insertNode(input, target, anchor);

				input.value = state.value;
			},

			p: function update(changed, state) {
				if (!input_updating) {
					input.value = state.value;
				}
			},

			u: function unmount() {
				detachNode(input);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
			}
		};
	}

	// (34:32) 
	function create_if_block_7(state, component) {
		var input, input_updating = false;

		function input_input_handler() {
			input_updating = true;
			component.set({ value: toNumber(input.value) });
			input_updating = false;
		}

		function input_handler(event) {
			component.makeInt();
		}

		return {
			c: function create() {
				input = createElement("input");
				this.h();
			},

			h: function hydrate() {
				input.type = "number";
				addListener(input, "input", input_input_handler);
				addListener(input, "input", input_handler);
			},

			m: function mount(target, anchor) {
				insertNode(input, target, anchor);

				input.value = state.value;
			},

			p: function update(changed, state) {
				if (!input_updating) {
					input.value = state.value;
				}
			},

			u: function unmount() {
				detachNode(input);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				removeListener(input, "input", input_handler);
			}
		};
	}

	// (36:34) 
	function create_if_block_8(state, component) {
		var input, input_updating = false;

		function input_input_handler() {
			input_updating = true;
			component.set({ value: toNumber(input.value) });
			input_updating = false;
		}

		return {
			c: function create() {
				input = createElement("input");
				this.h();
			},

			h: function hydrate() {
				input.type = "number";
				addListener(input, "input", input_input_handler);
			},

			m: function mount(target, anchor) {
				insertNode(input, target, anchor);

				input.value = state.value;
			},

			p: function update(changed, state) {
				if (!input_updating) {
					input.value = state.value;
				}
			},

			u: function unmount() {
				detachNode(input);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
			}
		};
	}

	// (38:36) 
	function create_if_block_9(state, component) {
		var label, input, text, text_1;

		function input_change_handler() {
			component.set({ value: input.checked });
		}

		var current_block_type = select_block_type(state);
		var if_block = current_block_type(state, component);

		return {
			c: function create() {
				label = createElement("label");
				input = createElement("input");
				text = createText(" (");
				if_block.c();
				text_1 = createText(")");
				this.h();
			},

			h: function hydrate() {
				input.type = "checkbox";
				addListener(input, "change", input_change_handler);
			},

			m: function mount(target, anchor) {
				insertNode(label, target, anchor);
				appendNode(input, label);

				input.checked = state.value;

				appendNode(text, label);
				if_block.m(label, null);
				appendNode(text_1, label);
			},

			p: function update(changed, state) {
				input.checked = state.value;

				if (current_block_type !== (current_block_type = select_block_type(state))) {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, component);
					if_block.c();
					if_block.m(label, text_1);
				}
			},

			u: function unmount() {
				detachNode(label);
				if_block.u();
			},

			d: function destroy() {
				removeListener(input, "change", input_change_handler);
				if_block.d();
			}
		};
	}

	// (40:33) 
	function create_if_block_12(state, component) {
		var input, input_updating = false, text, code, text_1, text_2, abbr;

		function input_input_handler() {
			input_updating = true;
			var state = component.get();
			state.wholeEntry[2] = input.value;
			component.set({ wholeEntry: state.wholeEntry });
			input_updating = false;
		}

		function input_handler(event) {
			component.handleDateInput();
		}

		return {
			c: function create() {
				input = createElement("input");
				text = createText("\n    Interpreted as: ");
				code = createElement("code");
				text_1 = createText(state.__dateInputInterpretation);
				text_2 = createText(" ");
				abbr = createElement("abbr");
				abbr.textContent = "(!)";
				this.h();
			},

			h: function hydrate() {
				input.type = "text";
				input.placeholder = "Enter a date in basically any format, including things like \"now\", \"last friday\", \"+1 week\", and \"oct 12, 2017 3:00 pm\"";
				input.title = "Enter a date in basically any format, including things like \"now\", \"last friday\", \"+1 week\", and \"oct 12, 2017 3:00 pm\"";
				addListener(input, "input", input_input_handler);
				addListener(input, "input", input_handler);
				code.className = "date-interpretation";
				abbr.title = "This interpretation may be inaccurate, as PHP's strtotime function may return slightly different results, and the server may be using a different timezone.";
			},

			m: function mount(target, anchor) {
				insertNode(input, target, anchor);

				input.value = state.wholeEntry[2];

				insertNode(text, target, anchor);
				insertNode(code, target, anchor);
				appendNode(text_1, code);
				insertNode(text_2, target, anchor);
				insertNode(abbr, target, anchor);
			},

			p: function update(changed, state) {
				if (!input_updating) {
					input.value = state.wholeEntry[2];
				}

				if (changed.__dateInputInterpretation) {
					text_1.data = state.__dateInputInterpretation;
				}
			},

			u: function unmount() {
				detachNode(input);
				detachNode(text);
				detachNode(code);
				detachNode(text_2);
				detachNode(abbr);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				removeListener(input, "input", input_handler);
			}
		};
	}

	function select_block_type(state) {
		if (state.value) return create_if_block_10;
		return create_if_block_11;
	}

	function select_block_type_1(state) {
		if (state.valueType === "string") return create_if_block_6;
		if (state.valueType === "int") return create_if_block_7;
		if (state.valueType === "float") return create_if_block_8;
		if (state.valueType === "boolean") return create_if_block_9;
		if (state.valueType === "date") return create_if_block_12;
		return null;
	}

	function ValueEditor(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ value: 1, valueTypeCurrent: 1, allowedTypes: 1 }, this._state);

		var _oncreate = oncreate.bind(this);

		if (!options._root) {
			this._oncreate = [_oncreate];
			this._beforecreate = [];
		} else {
		 	this._root._oncreate.push(_oncreate);
		 }

		this._fragment = create_main_fragment(this._state, this);

		if (options.target) {
			this._fragment.c();
			this._fragment.m(options.target, options.anchor || null);

			callAll(this._beforecreate);
			callAll(this._oncreate);
		}
	}

	assign(ValueEditor.prototype, methods, {
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

	ValueEditor.prototype._recompute = function _recompute(changed, state) {
		if (changed.value || changed.valueTypeCurrent || changed.allowedTypes) {
			if (differs(state.valueType, (state.valueType = valueType(state.value, state.valueTypeCurrent, state.allowedTypes)))) changed.valueType = true;
		}
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function noop() {}

	function createComment() {
		return document.createComment('');
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function toNumber(value) {
		return value === '' ? undefined : +value;
	}

	function init(component, options) {
		component.options = options;

		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._root = options._root || component;
		component._bind = options._bind;
	}

	function assign(target) {
		var k,
			source,
			i = 1,
			len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) target[k] = source[k];
		}

		return target;
	}

	function callAll(fns) {
		while (fns && fns.length) fns.pop()();
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
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function observe(key, callback, options) {
		var group = options && options.defer
			? this._observers.post
			: this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function() {
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
			cancel: function() {
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
		return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
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
	return ValueEditor;
}());