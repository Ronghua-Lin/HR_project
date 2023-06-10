import { createActionGroup,props } from "@ngrx/store";

import {People} from '../interface/people'

export const HRAction=createActionGroup({
  source: '[employee profile page] employees',
  events:{
    'Get Employees': props<{employee_profiles:People[]} >(),

  }
})