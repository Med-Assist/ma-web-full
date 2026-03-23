"use client";

import { DEFAULT_LANDING_WORKSPACE } from "./defaultLandingWorkspace";

export function useLandingWorkspace() {
  return {
    data: DEFAULT_LANDING_WORKSPACE,
    isLoading: false,
  };
}
