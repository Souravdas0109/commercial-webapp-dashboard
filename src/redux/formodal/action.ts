import {TOGGLE} from './constants'

export const toggle=(value:boolean)=>{
    return {
        type:TOGGLE,
        payload:value
    }
}

