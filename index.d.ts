import { Context } from "react";
export interface ActionProvider {
    type: string;
    data: any;
    reducer: string;
}
export interface UseReducer {
    store: any;
    dispatch: (action: ActionProvider) => void;
}
declare class ContextAPI {
    contexts: Context<{}>;
    constructor(contexts?: {});
    /**
     * Utilizado para criar um Provider
     * @example const Context = new ContextAPI();
     * @example <Context.Provider value={}>...</Context.Provider>
     */
    get Provider(): import("react").Provider<{}>;
    /**
     * Utilizado para criar um Consumer
     * @example const Context = new ContextAPI();
     * @example <Context.Consumer>...</Context.Consumer>
     */
    get Consumer(): any;
    /**
     * Pega os valores iniciais declarados na context api
     */
    get initialState(): any;
    /**
     * Retorna uma lista de providers
     * @returns Object
     */
    useContext: () => any;
    /**
    * Permite a combinação de vários contextos. Semelhante ao combineReducers do redux
    * @param items
    * @returns Object
    */
    static combineReducers: (slices: any) => any;
    /**
     * Retorna os resultos do Provider
     * @param state
     * @param action
     * @returns Object
     */
    static providerResult: (state: any, action?: ActionProvider) => any;
    /**
     * Simula um reducer para o useReducer
     * @param state
     * @param action
     * @returns
     */
    reducer: (state: any, action: ActionProvider) => any;
    /**
     * Retorna os objetos que serão utilizados no provider
     * @returns Object
     */
    get providerValues(): {
        store: unknown;
        dispatch: import("react").DispatchWithoutAction;
    };
}
export default ContextAPI;
declare const combineReducers: (slices: any) => any;
export { combineReducers };
