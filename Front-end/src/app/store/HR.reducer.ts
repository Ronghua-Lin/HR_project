import { createReducer,on } from "@ngrx/store";
import {HRAction} from './HR.action'
import {People} from '../interface/people'

// employee_profiles:People[]=[]
const initialState:any={}

export const HRReducer=createReducer(
  initialState,
  on(HRAction.getEmployees,(state,{employee_profiles})=> { return {...state,employee_profiles}})

)