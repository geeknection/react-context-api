import { Context } from "react";
export interface ActionProvider {
    type: string;
    data: any;
}
export interface UseReducer {
    data?: any;
    dispatch: (action: ActionProvider) => void;
}
declare class ContextAPI {
    ContextProviderConsumer: Context<{}>;
    private context;
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
    get Consumer(): import("react").Consumer<{}>;
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
}
export default ContextAPI;
declare const combineReducers: (slices: any) => any;
export { combineReducers };
