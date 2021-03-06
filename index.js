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
 * Simula um useReducer
 * @param contexts
 * @param key
 * @returns Object
 */
function PrivateUseReducer(contexts, key) {
    var reducer = contexts[key];
    var initialState = reducer();
    var _a = react_1.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    var data = state;
    if (data.hasOwnProperty('data'))
        data = data.data;
    return {
        data: data,
        dispatch: dispatch
    };
}
/**
 * Simula um useContext
 * @param contexts
 * @returns @returns Object
 */
function PrivateUseContext(contexts) {
    var results = {};
    Object.keys(contexts).forEach(function (key) {
        results[key] = PrivateUseReducer(contexts, key);
    });
    return results;
}
var ContextAPI = /** @class */ (function () {
    function ContextAPI(contexts) {
        var _this = this;
        if (contexts === void 0) { contexts = {}; }
        this.ContextProviderConsumer = react_1.createContext({});
        this.context = {};
        /**
         * Retorna uma lista de providers
         * @returns Object
         */
        this.useContext = function () {
            var obj = _this.context;
            var contexted = PrivateUseContext(obj);
            return contexted;
        };
        this.ContextProviderConsumer = react_1.createContext(contexts);
        this.context = contexts;
    }
    Object.defineProperty(ContextAPI.prototype, "Provider", {
        /**
         * Utilizado para criar um Provider
         * @example const Context = new ContextAPI();
         * @example <Context.Provider value={}>...</Context.Provider>
         */
        get: function () {
            return this.ContextProviderConsumer.Provider;
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
            return this.ContextProviderConsumer.Consumer;
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
            return __assign(__assign({}, state), { data: __assign({}, action.data) });
        }
        else if (state.data.hasOwnProperty(action.type)) {
            return __assign(__assign({}, state), { data: __assign(__assign({}, state.data), (_a = {}, _a[action.type] = action.data, _a)) });
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