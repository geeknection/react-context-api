import {
    useReducer,
    Context,
    createContext,
    useContext
} from "react";
const React = require('react');

export interface ActionProvider {
    type: string,
    data: any,
    reducer: string
}

export interface UseReducer {
    store: any,
    dispatch: (action: ActionProvider) => void
}
/**
 * Carrega o valor do contexto
 * @param contexts 
 * @param key 
 * @returns Object
 */
function executeReducer(reducer: any) {
    try {
        const initialState = reducer();
        let data: any = initialState;
        if (data.hasOwnProperty('data')) data = data.data;
        return data;
    } catch (error) {
        return {}
    }
}
/**
 * Unifica os reducers
 * @param data 
 * @returns object
 */
function uniqueReducer(data: any) {
    let prev: any = {};
    Object.keys(data).forEach(key => {
        prev[key] = executeReducer(data[key]);
    });
    return prev;
}
/**
 * Simula um useContext
 * @param contexts 
 * @returns Object
 */
function PrivateUseContext(contexts: any) {
    return useContext(contexts);
}
/**
 * Simula um useReducer
 * @param reducer 
 * @param initialState 
 * @returns Object
 */
function PrivateUseReducer(reducer: any, initialState: any) {
    const [store, dispatch] = useReducer(reducer, initialState);
    return {
        store,
        dispatch
    }
}

class ContextAPI {
    public contexts: Context<{}> = createContext({});
    constructor(contexts = {}) {
        this.contexts = createContext(contexts);
    }
    /**
     * Utilizado para criar um Provider
     * @example const Context = new ContextAPI();
     * @example <Context.Provider value={}>...</Context.Provider>
     */
    public get Provider() {
        return this.contexts.Provider;
    }
    /**
     * Utilizado para criar um Consumer
     * @example const Context = new ContextAPI();
     * @example <Context.Consumer>...</Context.Consumer>
     */
    public get Consumer(): any {
        return this.contexts.Consumer;
    }
    /**
     * Pega os valores iniciais declarados na context api
     */
    public get initialState() {
        return uniqueReducer(this.useContext());
    }
    /**
     * Retorna uma lista de providers
     * @returns Object
     */
    public useContext = (): any => {
        return PrivateUseContext(this.contexts);
    }
    /**
    * Permite a combinação de vários contextos. Semelhante ao combineReducers do redux
    * @param items 
    * @returns Object
    */
    public static combineReducers = (slices: any) => {
        let results: any = {};
        Object.keys(slices).forEach(key => {
            results[key] = slices[key]
        });
        return results;
    }
    /**
     * Retorna os resultos do Provider
     * @param state 
     * @param action 
     * @returns Object
     */
    public static providerResult = (state: any, action?: ActionProvider) => {
        if (!action) return state;
        if (action.type === 'all') {
            return action.data;
        }
        else if (state.hasOwnProperty(action.type)) {
            return {
                ...state,
                [action.type]: action.data
            }
        }
        else {
            return state;
        }
    }
    /**
     * Simula um reducer para o useReducer
     * @param state 
     * @param action 
     * @returns 
     */
    public reducer = (state: any, action: ActionProvider) => {
        Object.keys(state).forEach(key => {
            state[key] = ContextAPI.providerResult(state[key], action);
        });
        return {
            ...state
        };
    }
    /**
     * Retorna os objetos que serão utilizados no provider
     * @returns Object
     */
    public get providerValues() {
        return PrivateUseReducer(this.reducer, this.initialState);
    }
}

export default ContextAPI;
const combineReducers = ContextAPI.combineReducers;
export {
    combineReducers
}