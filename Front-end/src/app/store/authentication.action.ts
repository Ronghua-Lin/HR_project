import { createActionGroup,props } from "@ngrx/store";
import {Login,Signup} from '../interface/authentication'

export const authenticationAction=createActionGroup({
  source: '[authentication page] Users',
  events:{
    'User Signup': props<Signup >(),
    'User Login': props<Signup >()
  }
})