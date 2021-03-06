# `@buuhv/react-context-api`

Creating a Context API has never been easier than it is now.
You no longer need to use Redux or Create a new structure for each project.
Using react-context-api you can create your structure in seconds.
Thanks to react-context-api you no longer need to declare a huge object for the return of your data from the reducer, react-context-api does it for you.


## Getting started

`npm install @buuhv/react-context-api --save`

## Usage

## Creating interfaces
```typescript
import { UseReducer, ActionProvider } from "@buuhv/react-context-api";

export interface SystemProvider extends UseReducer {
    data: {
        loading: boolean
    }
}
export interface ContextsProps {
    system: SystemProvider
}
```

---

## Creating Providers
```typescript
import ContextAPI, { ActionProvider } from "@buuhv/react-context-api";
import { SystemProvider } from "../interfaces";

const initial = {
    data: {
        loading: false
    },
    dispatch: () => null
}

const systemProvider = (state = initial, action?: ActionProvider ): SystemProvider => {
    return ContextAPI.providerResult(state, action);
}

export default systemProvider;
```

---

## Creating Context API
```typescript
import ContextAPI, { combineReducers } from "@buuhv/react-context-api";
import systemProvider from "./providers/sytemProvider";
import { ContextsProps } from "./interfaces";

export const contexts = combineReducers({
    system: systemProvider
});

/**
 * How to Create Context Usage with Context API
 */
const useContextAPI = (): ContextsProps => new ContextAPI(contexts).useContext();
/**
 * How to create a Provider or Consumer that encompasses the entire application
 */
const Context = new ContextAPI();
const Provider = Context.Provider;
const Consumer = Context.Provider;

export {
    Provider,
    Consumer,
    useContextAPI
}

```

---

## Using
```typescript
import React, { useEffect, useMemo } from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { useContextAPI } from '#/reducers';

function HomeScreen(props: RouteComponentProps): JSX.Element {
    const { system } = useContextAPI();
    const { dispatch, data } = system;
    const handleTest = () => {
        dispatch({
            type: 'loading',
            data: !data.loading
        });
    }
    useEffect(() => {
        console.log(data.loading);
    }, [data.loading]);
    return(
        <div>
            <button className='btn btn-primary' onClick={handleTest}>Test</button>
        </div>
    );
}

export default withRouter(HomeScreen);
```

---

## Contributors

This module was extracted from `ReactJs` core. Please reffer to https://github.com/geeknection/react-context-api/contributors for the complete list of contributors.

## License
The library is released under the MIT licence. For more information see `LICENSE`.