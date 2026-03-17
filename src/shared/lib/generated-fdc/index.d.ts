import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddTestPatientData {
  user_insert: User_Key;
}

export interface AiDiagnosis_Key {
  id: UUIDString;
  __typename?: 'AiDiagnosis_Key';
}

export interface Appointment_Key {
  id: UUIDString;
  __typename?: 'Appointment_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  uid: string;
  email: string;
  role: string;
}

export interface FamilyLink_Key {
  id: UUIDString;
  __typename?: 'FamilyLink_Key';
}

export interface GetAllUsersData {
  users: ({
    uid: string;
    displayName: string;
    email: string;
    role: string;
  } & User_Key)[];
}

export interface PatientProfile_Key {
  id: UUIDString;
  __typename?: 'PatientProfile_Key';
}

export interface User_Key {
  uid: string;
  __typename?: 'User_Key';
}

interface AddTestPatientRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddTestPatientData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<AddTestPatientData, undefined>;
  operationName: string;
}
export const addTestPatientRef: AddTestPatientRef;

export function addTestPatient(): MutationPromise<AddTestPatientData, undefined>;
export function addTestPatient(dc: DataConnect): MutationPromise<AddTestPatientData, undefined>;

interface GetAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllUsersData, undefined>;
  operationName: string;
}
export const getAllUsersRef: GetAllUsersRef;

export function getAllUsers(): QueryPromise<GetAllUsersData, undefined>;
export function getAllUsers(dc: DataConnect): QueryPromise<GetAllUsersData, undefined>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

