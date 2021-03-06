import {
    useReducer,
    Context,
    createContext
} from "react";
const React = require('react');

export interface ActionProvider {
    type: string,
    data: any
}

export interface UseReducer {
    data?: any,
    dispatch: (action: ActionProvider) => void
}

/**
 * Simula um useReducer
 * @param contexts 
 * @param key 
 * @returns Object
 */
function PrivateUseReducer(contexts: any, key: any) {
    const reducer = contexts[key];
    const initialState = reducer();
    const [state, dispatch] = useReducer(reducer, initialState);
    let data: any = state;
    if (data.hasOwnProperty('data')) data = data.data;
    return {
        data,
        dispatch
    }
}
/**
 * Simula um useContext
 * @param contexts 
 * @returns @returns Object
 */
function PrivateUseContext(contexts: any) {
    let results: any = {};
    Object.keys(contexts).forEach((key) => {
        results[key] = PrivateUseReducer(contexts, key);
    });
    return results;
}

class ContextAPI {
    public ContextProviderConsumer: Context<{}> = createContext({});
    private context = {};
    constructor(contexts = {}) {
        this.ContextProviderConsumer = createContext(contexts);
        this.context = contexts;
    }
    /**
     * Utilizado para criar um Provider
     * @example const Context = new ContextAPI();
     * @example <Context.Provider value={}>...</Context.Provider>
     */
    public get Provider() {
        return this.ContextProviderConsumer.Provider;
    }
    /**
     * Utilizado para criar um Consumer
     * @example const Context = new ContextAPI();
     * @example <Context.Consumer>...</Context.Consumer>
     */
    public get Consumer() {
        return this.ContextProviderConsumer.Consumer;
    }
    /**
     * Retorna uma lista de providers
     * @returns Object
     */
    public useContext = (): any => {
        const obj: any = this.context;
        const contexted = PrivateUseContext(obj);
        return contexted;
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
            return {
                ...state,
                data: {
                    ...action.data
                }
            };
        }
        else if (state.data.hasOwnProperty(action.type)) {
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.type]: action.data
                }
            };
        }
        else {
            return state;
        }
    }
}

export default ContextAPI;
const combineReducers = ContextAPI.combineReducers;
export {
    combineReducers
}