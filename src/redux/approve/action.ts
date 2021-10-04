import {TOGGLE} from './constants'

export const toggleApp=(value:boolean)=>{
    return {
        type:TOGGLE,
        payload:value
    }
}

