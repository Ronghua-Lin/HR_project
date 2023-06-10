import { createReducer,on } from "@ngrx/store";
import {authenticationAction} from './authentication.action'

import {Login} from '../interface/authentication'

const initialState:any={}

export const authenticationReducer=createReducer(
  initialState,
  on(authenticationAction.userLogin,(state,user)=>user)

)