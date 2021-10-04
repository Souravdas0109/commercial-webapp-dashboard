import {TOGGLE} from './constants'
const initState={
    value:false
}

interface reducerprops{
    type: string,
    payload:boolean
}
const toggleReducerNotify=(state = initState, action:reducerprops) => {
    switch (action.type) {
        case TOGGLE:
            return {value:!action.payload}
        default:
            return state;
    }
};

export default toggleReducerNotify