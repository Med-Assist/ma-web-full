"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getAllUsers, type GetAllUsersData } from "./generated-fdc";
import { getMedAssistDataConnect } from "./dataconnect";
import { getActiveDoctorUid } from "./medassist-runtime";

export type MedAssistRole = "admin" | "doctor" | "patient";

const ACTIVE_ROLE_KEY = "medassist_active_role";

let cachedUserRecords: GetAllUsersData["users"] | null = null;
let cachedUserRecordsPromise: Promise<GetAllUsersData["users"]> | null = null;

function normalizeRole(role?: string | null): MedAssistRole {
  const normalized = (role || "").trim().toLowerCase();

  if (normalized === "admin") {
    return "admin";
  }

  if (normalized === "patient") {
    return "patient";
  }

  return "doctor";
}

function readRememberedRole() {
  if (typeof window === "undefined") {
    return "doctor" as MedAssistRole;
  }

  try {
    return normalizeRole(window.localStorage.getItem(ACTIVE_ROLE_KEY));
  } catch {
    return "doctor" as MedAssistRole;
  }
}

export function rememberActiveRole(role?: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ACTIVE_ROLE_KEY, normalizeRole(role));
  } catch {
    // Ignore storage failures in restricted environments.
  }
}

export function clearRememberedRole() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(ACTIVE_ROLE_KEY);
  } catch {
    // Ignore storage failures in restricted environments.
  }
}

export function getRememberedRole() {
  return readRememberedRole();
}

async function loadUserRecords(force = false) {
  if (!force && cachedUserRecords) {
    return cachedUserRecords;
  }

  if (!force && cachedUserRecordsPromise) {
    return cachedUserRecordsPromise;
  }

  cachedUserRecordsPromise = getAllUsers(getMedAssistDataConnect())
    .then((response) => {
      cachedUserRecords = response.data.users;
      return response.data.users;
    })
    .finally(() => {
      cachedUserRecordsPromise = null;
    });

  return cachedUserRecordsPromise;
}

export async function resolveCurrentUserRecord(uid?: string | null, force = false) {
  const targetUid = (uid || auth.currentUser?.uid || getActiveDoctorUid()).trim();
  if (!targetUid) {
    return null;
  }

  const users = await loadUserRecords(force);
  return users.find((user) => user.uid === targetUid) || null;
}

export async function resolveCurrentRole(uid?: string | null, force = false) {
  const currentUser = await resolveCurrentUserRecord(uid, force);
  const role = normalizeRole(currentUser?.role);
  rememberActiveRole(role);
  return role;
}

export function useMedAssistRole() {
  const [role, setRole] = useState<MedAssistRole>(() => getRememberedRole());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const syncRole = async (uid?: string | null) => {
      try {
        const nextRole = await resolveCurrentRole(uid);
        if (mounted) {
          setRole(nextRole);
        }
      } catch (error) {
        console.error("Không thể xác định vai trò người dùng:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void syncRole(auth.currentUser?.uid || null);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (mounted) {
        setIsLoading(true);
      }
      void syncRole(user?.uid || null);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return {
    role,
    isLoading,
    isAdmin: role === "admin",
    isDoctor: role === "doctor",
    isPatient: role === "patient",
  };
}

export function useMedAssistUserRecord() {
  const [userRecord, setUserRecord] = useState<GetAllUsersData["users"][number] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const syncUserRecord = async (uid?: string | null) => {
      try {
        const nextRecord = await resolveCurrentUserRecord(uid);
        if (!mounted) {
          return;
        }

        setUserRecord(nextRecord);
        rememberActiveRole(nextRecord?.role);
      } catch (error) {
        console.error("Không thể đồng bộ hồ sơ người dùng hiện tại:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void syncUserRecord(auth.currentUser?.uid || null);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (mounted) {
        setIsLoading(true);
      }
      void syncUserRecord(user?.uid || null);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return {
    userRecord,
    role: normalizeRole(userRecord?.role),
    isLoading,
  };
}
