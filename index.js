"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineReducers = void 0;
var react_1 = require("react");
var React = require('react');
/**
 * Carrega o valor do contexto
 * @param contexts
 * @param key
 * @returns Object
 */
function executeReducer(reducer) {
    try {
        var initialState = reducer();
        var data = initialState;
        if (data.hasOwnProperty('data'))
            data = data.data;
        return data;
    }
    catch (error) {
        return {};
    }
}
/**
 * Unifica os reducers
 * @param data
 * @returns object
 */
function uniqueReducer(data) {
    var prev = {};
    Object.keys(data).forEach(function (key) {
        prev[key] = executeReducer(data[key]);
    });
    return prev;
}
/**
 * Simula um useContext
 * @param contexts
 * @returns Object
 */
function PrivateUseContext(contexts) {
    return react_1.useContext(contexts);
}
/**
 * Simula um useReducer
 * @param reducer
 * @param initialState
 * @returns Object
 */
function PrivateUseReducer(reducer, initialState) {
    var _a = react_1.useReducer(reducer, initialState), store = _a[0], dispatch = _a[1];
    return {
        store: store,
        dispatch: dispatch
    };
}
var ContextAPI = /** @class */ (function () {
    function ContextAPI(contexts) {
        var _this = this;
        if (contexts === void 0) { contexts = {}; }
        this.contexts = react_1.createContext({});
        /**
         * Retorna uma lista de providers
         * @returns Object
         */
        this.useContext = function () {
            return PrivateUseContext(_this.contexts);
        };
        /**
         * Simula um reducer para o useReducer
         * @param state
         * @param action
         * @returns
         */
        this.reducer = function (state, action) {
            Object.keys(state).forEach(function (key) {
                state[key] = ContextAPI.providerResult(state[key], action);
            });
            return __assign({}, state);
        };
        this.contexts = react_1.createContext(contexts);
    }
    Object.defineProperty(ContextAPI.prototype, "Provider", {
        /**
         * Utilizado para criar um Provider
         * @example const Context = new ContextAPI();
         * @example <Context.Provider value={}>...</Context.Provider>
         */
        get: function () {
            return this.contexts.Provider;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextAPI.prototype, "Consumer", {
        /**
         * Utilizado para criar um Consumer
         * @example const Context = new ContextAPI();
         * @example <Context.Consumer>...</Context.Consumer>
         */
        get: function () {
            return this.contexts.Consumer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextAPI.prototype, "initialState", {
        /**
         * Pega os valores iniciais declarados na context api
         */
        get: function () {
            return uniqueReducer(this.useContext());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContextAPI.prototype, "providerValues", {
        /**
         * Retorna os objetos que serão utilizados no provider
         * @returns Object
         */
        get: function () {
            return PrivateUseReducer(this.reducer, this.initialState);
        },
        enumerable: false,
        configurable: true
    });
    /**
    * Permite a combinação de vários contextos. Semelhante ao combineReducers do redux
    * @param items
    * @returns Object
    */
    ContextAPI.combineReducers = function (slices) {
        var results = {};
        Object.keys(slices).forEach(function (key) {
            results[key] = slices[key];
        });
        return results;
    };
    /**
     * Retorna os resultos do Provider
     * @param state
     * @param action
     * @returns Object
     */
    ContextAPI.providerResult = function (state, action) {
        var _a;
        if (!action)
            return state;
        if (action.type === 'all') {
            return action.data;
        }
        else if (state.hasOwnProperty(action.type)) {
            return __assign(__assign({}, state), (_a = {}, _a[action.type] = action.data, _a));
        }
        else {
            return state;
        }
    };
    return ContextAPI;
}());
exports.default = ContextAPI;
var combineReducers = ContextAPI.combineReducers;
exports.combineReducers = combineReducers;
//# sourceMappingURL=index.js.map