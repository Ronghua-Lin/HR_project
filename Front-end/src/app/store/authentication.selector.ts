import { createFeatureSelector } from "@ngrx/store";

// createFeatureSelector will select a single slice of state
export const selectAuthentication = createFeatureSelector('authentication');