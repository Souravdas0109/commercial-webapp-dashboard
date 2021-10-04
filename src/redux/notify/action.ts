import {TOGGLE} from './constants'

export const toggleNotify=(value:boolean)=>{
    return {
        type:TOGGLE,
        payload:value
    }
}

