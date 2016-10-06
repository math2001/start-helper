var code = {
	js: `var all, any, code, copyObject, copyText, forEach, globMatch, openInNewTab;

		forEach = function(obj, func) {
			var i, j, key, keys, len;
			if (typeof obj !== 'object') {
				console.error("forEach(...) needs an OBJECT (not a '" + (typeof obj) + "' and a function");
			}
			keys = Object.keys(obj);
			for (i = j = 0, len = keys.length; j < len; i = ++j) {
				key = keys[i];
				if ('stop' === func(key, obj[key], obj, i)) {
					return obj;
				}
			}
			return obj;
		};

		copyObject = function(obj) {
			return $.extend({}, obj);
		};

		copyText = function(text) {
			var $el;
			$el = $('<textarea type="text">').val(text).css({
				position: 'absolute',
				left: '-100%',
				top: '-100%',
				opacity: 0
			}).appendTo(document.body);
			$el[0].select();
			if (!document.execCommand('copy')) {
				console.warn('Unable to copy.');
				return false;
			}
			$el.remove();
			return text;
		};

		code = function(letter) {
			if (letter === 'ctrl') {
				return 17;
			}
			if (letter === 'alt') {
				return 18;
			}
			if (letter === 'escape') {
				return 27;
			}
			if (letter === 'enter' || letter === 'return') {
				return 13;
			}
			if (letter.length !== 1) {
				return console.error("code: unknow abrv '" + letter + "'");
			}
			return letter.charCodeAt(0) - 32;
		};

		openInNewTab = function(url) {
			var $el;
			$el = $('<a>a link</a>').attr({
				target: '_blank',
				href: url
			}).css({
				position: 'absolute',
				left: '-100%',
				top: '-100%',
				width: 0,
				height: 0,
				opacity: 0
			}).appendTo(document.body);
			$el[0].click();
			return $el.remove();
		};

		any = function(arr) {
			var el, j, len;
			for (j = 0, len = arr.length; j < len; j++) {
				el = arr[j];
				if (el) {
					return true;
				}
			}
			return false;
		};

		all = function(arr) {
			var el, j, len;
			for (j = 0, len = arr.length; j < len; j++) {
				el = arr[j];
				if (!el) {
					return false;
				}
			}
			return true;
		};

		globMatch = function(pattern, elements) {
			var element, j, len, match, regex;
			pattern = pattern.replace(/[\-\[\]\/\{\}\(\)\+\.\^\$]/g, "\\$&");
			pattern = pattern.replace(/([^\\]?)\*/g, '$1.*');
			regex = new RegExp('^' + pattern + '$');
			if (typeof elements === 'object') {
				match = [];
				for (j = 0, len = elements.length; j < len; j++) {
					element = elements[j];
					if (regex.test(element)) {
						match.push(element);
					}
				}
				return match;
			} else if (typeof elements === 'string') {
				return regex.test(elements);
			} else {
				return console.error("Does not support " + (typeof elements));
			}
		};

		Array.prototype.__update = function(arr) {
			var j, len, val;
			while (this.length > 0) {
				this.pop();
			}
			for (j = 0, len = arr.length; j < len; j++) {
				val = arr[j];
				this.push(val);
			}
			return this;
		};

		Array.prototype.remove = function(valToRemove, times) {
			var arr, j, len, val;
			if (times == null) {
				times = 2;
			}
			arr = [];
			for (j = 0, len = this.length; j < len; j++) {
				val = this[j];
				if (times === 0 || val !== valToRemove) {
					arr.push(val);
				} else if (val === valToRemove) {
					times -= 1;
				}
			}
			return this.__update(arr);
		};

		Array.prototype.get = function(index) {
			if (index < 0) {
				index = this.length + index;
			}
			return this[index];
		};

		String.prototype.strip = function(charToRemove) {
			var char, cont, end, i, j, k, len, len1, ref, start;
			if (charToRemove == null) {
				charToRemove = ' ';
			}
			start = 0;
			end = this.length;
			cont = true;
			for (i = j = 0, len = this.length; j < len; i = ++j) {
				char = this[i];
				if (cont === true && char === charToRemove) {
					start++;
				} else {
					cont = false;
				}
			}
			cont = true;
			ref = this.split('').reverse();
			for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
				char = ref[i];
				if (cont === true && char === charToRemove) {
					end--;
				} else {
					cont = false;
				}
			}
			return this.slice(start, end);
		};

		String.prototype.wrap = function(char) {
			if (char == null) {
				char = '"';
			}
			return char + this + char;
		};

		String.prototype.capitalize = function() {
			return this[0].toUpperCase() + this.slice(1);
		};

		$.fn.exists = function(nice) {
			if (nice == null) {
				nice = false;
			}
			return this.length > 0;
		};

		$.arrayDiff = function(arr1, arr2) {
			var arr, i, j, len, val;
			arr = [];
			for (i = j = 0, len = arr1.length; j < len; i = ++j) {
				val = arr1[i];
				if (arr2.indexOf(val) === -1) {
					arr.push(val);
				}
			}
			return arr;
		};

		$.fn.outerHTML = function(html) {
			if (html) {
				if (typeof html === typeof alert) {
					html = html.bind(this)();
				}
				return this.each(function() {
					return this.outerHTML = html;
				});
			} else {
				return this.outerHTML;
			}
		};`,
	php: `<?php 
		function debug() {
			foreach (func_get_args() as $k => $v) {
				if ($v === true) {
					$v = 'True';
				} elseif ($v === false) {
					$v = 'False';
				} elseif ($v === null) {
					$v = 'None';
				}
				echo "<pre>".print_r($v, true)."</pre>"; 
			}
		}
		function kill() {
			call_user_func_array('debug', func_get_args());
			echo '<p style="color: white; background-color: red">kill</p>';
			die();
		}	
		function pathjoin() {
			$path = [];
			foreach (func_get_args() as $k => $v) {
				$path[] = trim(trim($v, '/'), DIRECTORY_SEPARATOR);
			}
			return implode(DIRECTORY_SEPARATOR, $path);
		}
		function hasAny() {
			$args = func_get_args();
			$arr = $args[sizeof($args) - 1];
			foreach (array_slice($args, 0, sizeof($args) - 1) as $k => $v) {
				if (in_array($v, $arr)) {
					return true;
				}
			}
			return false;
		}

		function is_ajax() {
			return isset($_SERVER['HTTP_X_REQUESTED_WITH']); 
		}

		function listdir($path) {
			$items = [];
			$dir = opendir(utf8_decode($path));
			if (!$dir) {
				return false;
			}
			while (($item = readdir($dir)) !== false) {
				if (!in_array($item, ['.', '..'])) {
					$items[] = utf8_encode($item);
				}
			}
			return $items;
		}`,
	python: `from __future__ import print_function
		import sys

		def die(*mes):
			if len(mes) != 0:
				s = ' '.join([str(m) for m in mes])
				sys.stdout.write(s + '\n')
			sys.exit(0)

		def int_all(*li):
			return [int(i) for i in li]

		def str_all(*li):
			return [str(i) for i in li]

		class Counter:
			def __init__(self):
				self.nb = 1

			def update(self):
				self.nb += 1

			def th(self, nb):
				# 5th for example
				return self.nb % nb == 0

		def get_mtd(obj):
			all = dir(obj)
			all.remove('__doc__')
			all.remove('__module__')
			mtd = []
			for el in all:
				if 'method' in str(type(getattr(obj, el))):
					mtd.append(el)
			return mtd

		def get_attr(obj):
			all = dir(obj)
			all.remove('__doc__')
			all.remove('__module__')
			attr = []
			for el in all:
				if not 'method' in str(type(getattr(obj, el))):
					attr.append(el)
			return attr

		def echo(*args, **kwargs):
			""" To not match the research "print" """
			text = kwargs.get('sep', ' ').join([str(el) for el in args]) + kwargs.get('end', '\n')
			sys.stdout.write(text)

		def debug(*anything, **args):
			""" 
				A simple function that print list and arg nicely.
				@params:
					start: char(s) to print at the begining         (default '')
					sep  : char(s) to print between each 'anything' (default '\n')
					end  : char(s) to print at the end              (default '\n')

			"""
			class window: # object to save var (like js)
				pass

			def get_type(anything):
				return str(type(anything)).replace("<type '", "").replace("'>", '')

			def default_val(d, key, val):
				if not key in d.keys():
					d[key] = val
				return True

			def debug_list(arr, indent=True):
				text = []
				window.indent += 1
				for i, thing in enumerate(arr):
					if type(thing) == list:
						text.append(debug_list(thing))
					elif type(thing) == dict:
						text.append(debug_dict(thing))
					else:
						if type(thing) == str:
							thing = '"' + thing + '"'
						elif type(thing) == int:
							thing = str(thing)
						else:
							thing = str(thing)
						text.append((window.char * window.indent) + thing + (',\n' if i < len(arr) - 1 else ''))
				text = ''.join(text)
				window.indent -= 1
				text = (window.indent * window.char * int(indent)) + '[\n' + text + '\n' + (window.indent * window.char) + ']\n'
				return text

			def debug_dict(arr, indent=True):
				text = []
				window.indent += 1
				for i, key in enumerate(arr.keys()):
					text.append((window.char * window.indent) + key + ': ')
					thing = arr[key]
					if type(thing) == list:
						text.append(debug_list(thing, False))
					elif type(thing) == dict:
						text.append(debug_dict(thing, False))
					else:
						if type(thing) == str:
							thing = '"' + thing + '"'
						elif type(thing) == int:
							thing = str(thing)
						else:
							thing = str(thing)
						text.append(thing + (',\n' if i < len(arr) - 1 else ''))
				text = ''.join(text)
				window.indent -= 1
				text = (window.indent * window.char) + '{\n' + text + '\n' + (window.indent * window.char) + '}\n'
				return text


			window.char = ' '
			default_val(args, 'tab', 4)
			if type(args['tab']) == int:
				window.char *= args['tab']
			elif type(args['tab']) == str:
				window.char = args['tab']
			else:
				echo('!error! 'tab' args is not valid')

			window.indent = 0
			text = []
			for thing in anything:
				if type(thing) == list:
					text.append(debug_list(thing))
				elif type(thing) == dict:
					text.append(debug_dict(thing))
				else:
					if type(thing) == str:
						thing = '"' + thing + '"'
					elif type(thing) == int:
						thing = str(thing)
					text.append(thing)

			default_val(args, 'sep', '\n')
			default_val(args, 'end', '')
			default_val(args, 'start', '')

			final_text = args['start']
			final_text += str(args['sep']).join(text) + str(args['end'])
			if args.get('rtn', False):
				return final_text
			else:
				echo(final_text, sep='', end='')`,
}