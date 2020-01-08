const NumberIsNaN =
  Number.isNaN ||
  function NumberIsNaN(value) {
    return value !== value;
  };

const R = typeof Reflect === 'object' ? Reflect : null;
const ReflectApply =
  R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof listener
    );
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit(
        'newListener',
        type,
        listener.listener ? listener.listener : listener
      );

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend
        ? [listener, existing]
        : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w: any = new Error(
        'Possible EventEmitter memory leak detected. ' +
          existing.length +
          ' ' +
          String(type) +
          ' listeners ' +
          'added. Use emitter.setMaxListeners() to ' +
          'increase limit'
      );
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return that.defaultMaxListeners;
  return that._maxListeners;
}

function onceWrapper(...args: any[]) {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  let state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener,
  };
  let wrapped: any = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

class EventEmitter {
  constructor() {
    this.init();
  }
  _events = undefined;
  _eventsCount = 0;
  _maxListeners = undefined;
  _defaultMaxListeners = 10;

  init() {
    if (
      this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events
    ) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
  }

  emit(type, ...args: any[]) {
    let doError = type === 'error';

    const events: any = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;

    if (doError) {
      let er;
      if (args.length > 0) er = args[0];
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      }
      // At least give some kind of context to the user
      let err: any = new Error(
        'Unhandled error.' + (er ? ' (' + er.message + ')' : '')
      );
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    let handler = events[type];

    if (handler === undefined) return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      let len = handler.length;
      let listeners = arrayClone(handler, len);
      for (let i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
    }

    return true;
  }

  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }

  on(type, listener) {
    return _addListener(this, type, listener, false);
  }

  once(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError(
        'The "listener" argument must be of type Function. Received type ' +
          typeof listener
      );
    }
    this.on(type, _onceWrap(this, type, listener));
    return this;
  }

  removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function') {
      throw new TypeError(
        'The "listener" argument must be of type Function. Received type ' +
          typeof listener
      );
    }

    events = this._events;
    if (events === undefined) return this;

    list = events[type];
    if (list === undefined) return this;

    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) this._events = Object.create(null);
      else {
        delete events[type];
        if (events.removeListener)
          this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (position === 0) list.shift();
      else {
        spliceOne(list, position);
      }

      if (list.length === 1) events[type] = list[0];

      if (events.removeListener !== undefined)
        this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  }

  removeAllListeners(type) {
    var listeners, events, i;

    events = this._events;
    if (events === undefined) return this;

    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== undefined) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else delete events[type];
      }
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
      // LIFO order
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }

    return this;
  }

  off(type, listener) {
    this.removeListener(type, listener);
  }

  getMaxListeners() {
    return $getMaxListeners(this);
  }

  get defaultMaxListeners() {
    return this._defaultMaxListeners;
  }

  set defaultMaxListeners(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          arg +
          '.'
      );
    }
    this._defaultMaxListeners = arg;
  }
}

function arrayClone(arr, n) {
  const copy = new Array(n);
  for (let i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}

export default () => {
  return new EventEmitter();
};
