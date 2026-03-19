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

export interface CreateAiDiagnosisData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}

export interface CreateAiDiagnosisVariables {
  patientUid: string;
  fundusImageUrl: string;
  riskLevel: string;
  confidenceScore: number;
  aiAnalysis?: string | null;
  doctorAdvice?: string | null;
}

export interface CreateAppointmentData {
  appointment_insert: Appointment_Key;
}

export interface CreateAppointmentVariables {
  patientUid: string;
  doctorName: string;
  scheduledAt: TimestampString;
  status?: string | null;
  meetingLink?: string | null;
  symptoms?: string | null;
}

export interface CreateFamilyLinkData {
  familyLink_insert: FamilyLink_Key;
}

export interface CreateFamilyLinkVariables {
  accountOwnerUid: string;
  relativeName: string;
  relationship: string;
}

export interface CreatePatientProfileData {
  patientProfile_insert: PatientProfile_Key;
}

export interface CreatePatientProfileVariables {
  userUid: string;
  assignedDoctorUid?: string | null;
  dob?: string | null;
  gender?: string | null;
  cccd?: string | null;
  occupation?: string | null;
  insuranceNumber?: string | null;
  address?: string | null;
  height?: number | null;
  weight?: number | null;
  bloodType?: string | null;
  allergies?: string | null;
  insuranceQRCode?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  uid: string;
  email: string;
  role: string;
  displayName?: string | null;
  userCode?: string | null;
  status?: string | null;
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  authProvider?: string | null;
  passwordSet?: boolean | null;
  passwordLastChangedAt?: string | null;
}

export interface FamilyLink_Key {
  id: UUIDString;
  __typename?: 'FamilyLink_Key';
}

export interface GetAiDiagnosesData {
  aiDiagnoses: ({
    id: UUIDString;
    patientUid: string;
    fundusImageUrl: string;
    riskLevel: string;
    confidenceScore: number;
    aiAnalysis?: string | null;
    doctorAdvice?: string | null;
    patient: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      status?: string | null;
      role: string;
    } & User_Key;
  } & AiDiagnosis_Key)[];
}

export interface GetAllUsersData {
  users: ({
    uid: string;
    displayName: string;
    email: string;
    userCode?: string | null;
    status?: string | null;
    role: string;
    authProvider?: string | null;
    passwordSet?: boolean | null;
    passwordLastChangedAt?: string | null;
  } & User_Key)[];
}

export interface GetAppointmentsData {
  appointments: ({
    id: UUIDString;
    patientUid: string;
    doctorName: string;
    scheduledAt: TimestampString;
    status: string;
    meetingLink?: string | null;
    symptoms?: string | null;
    patient: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      status?: string | null;
      role: string;
    } & User_Key;
  } & Appointment_Key)[];
}

export interface GetDoctorsData {
  users: ({
    uid: string;
    displayName: string;
    email: string;
    userCode?: string | null;
    role: string;
    status?: string | null;
  } & User_Key)[];
}

export interface GetPatientsByDoctorData {
  patientProfiles: ({
    id: UUIDString;
    userUid: string;
    assignedDoctorUid?: string | null;
    dob?: string | null;
    gender?: string | null;
    cccd?: string | null;
    occupation?: string | null;
    insuranceNumber?: string | null;
    address?: string | null;
    height?: number | null;
    weight?: number | null;
    bloodType?: string | null;
    allergies?: string | null;
    insuranceQRCode?: string | null;
    user: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      status?: string | null;
      role: string;
      photoURL?: string | null;
      createdAt?: string | null;
      createdBy?: string | null;
      updatedAt?: string | null;
      updatedBy?: string | null;
    } & User_Key;
  } & PatientProfile_Key)[];
}

export interface GetPatientsByDoctorVariables {
  doctorUid: string;
}

export interface PatientProfile_Key {
  id: UUIDString;
  __typename?: 'PatientProfile_Key';
}

export interface SeedAdminUserData {
  user_insert: User_Key;
}

export interface SeedAiDiagnosisLeMinhData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}

export interface SeedAiDiagnosisNguyenGiaBaoData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}

export interface SeedAiDiagnosisPhamThuHaData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}

export interface SeedAiDiagnosisVoThanhTrucData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}

export interface SeedAppointmentLeMinh1Data {
  appointment_insert: Appointment_Key;
}

export interface SeedAppointmentLeMinh2Data {
  appointment_insert: Appointment_Key;
}

export interface SeedAppointmentNguyenGiaBaoData {
  appointment_insert: Appointment_Key;
}

export interface SeedAppointmentPhamThuHaData {
  appointment_insert: Appointment_Key;
}

export interface SeedAppointmentVoThanhTrucData {
  appointment_insert: Appointment_Key;
}

export interface SeedDoctorNguyenHoangMinhData {
  user_insert: User_Key;
}

export interface SeedDoctorTranLanAnhData {
  user_insert: User_Key;
}

export interface SeedFamilyLinkLeMinhData {
  familyLink_insert: FamilyLink_Key;
}

export interface SeedFamilyLinkNguyenGiaBaoData {
  familyLink_insert: FamilyLink_Key;
}

export interface SeedFamilyLinkPhamThuHaData {
  familyLink_insert: FamilyLink_Key;
}

export interface SeedFamilyLinkVoThanhTrucData {
  familyLink_insert: FamilyLink_Key;
}

export interface SeedPatientLeMinhData {
  user_insert: User_Key;
}

export interface SeedPatientNguyenGiaBaoData {
  user_insert: User_Key;
}

export interface SeedPatientPhamThuHaData {
  user_insert: User_Key;
}

export interface SeedPatientVoThanhTrucData {
  user_insert: User_Key;
}

export interface SeedProfileLeMinhData {
  patientProfile_insert: PatientProfile_Key;
}

export interface SeedProfileNguyenGiaBaoData {
  patientProfile_insert: PatientProfile_Key;
}

export interface SeedProfilePhamThuHaData {
  patientProfile_insert: PatientProfile_Key;
}

export interface SeedProfileVoThanhTrucData {
  patientProfile_insert: PatientProfile_Key;
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

interface CreatePatientProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePatientProfileVariables): MutationRef<CreatePatientProfileData, CreatePatientProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePatientProfileVariables): MutationRef<CreatePatientProfileData, CreatePatientProfileVariables>;
  operationName: string;
}
export const createPatientProfileRef: CreatePatientProfileRef;

export function createPatientProfile(vars: CreatePatientProfileVariables): MutationPromise<CreatePatientProfileData, CreatePatientProfileVariables>;
export function createPatientProfile(dc: DataConnect, vars: CreatePatientProfileVariables): MutationPromise<CreatePatientProfileData, CreatePatientProfileVariables>;

interface CreateFamilyLinkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFamilyLinkVariables): MutationRef<CreateFamilyLinkData, CreateFamilyLinkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFamilyLinkVariables): MutationRef<CreateFamilyLinkData, CreateFamilyLinkVariables>;
  operationName: string;
}
export const createFamilyLinkRef: CreateFamilyLinkRef;

export function createFamilyLink(vars: CreateFamilyLinkVariables): MutationPromise<CreateFamilyLinkData, CreateFamilyLinkVariables>;
export function createFamilyLink(dc: DataConnect, vars: CreateFamilyLinkVariables): MutationPromise<CreateFamilyLinkData, CreateFamilyLinkVariables>;

interface CreateAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAppointmentVariables): MutationRef<CreateAppointmentData, CreateAppointmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAppointmentVariables): MutationRef<CreateAppointmentData, CreateAppointmentVariables>;
  operationName: string;
}
export const createAppointmentRef: CreateAppointmentRef;

export function createAppointment(vars: CreateAppointmentVariables): MutationPromise<CreateAppointmentData, CreateAppointmentVariables>;
export function createAppointment(dc: DataConnect, vars: CreateAppointmentVariables): MutationPromise<CreateAppointmentData, CreateAppointmentVariables>;

interface CreateAiDiagnosisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAiDiagnosisVariables): MutationRef<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAiDiagnosisVariables): MutationRef<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;
  operationName: string;
}
export const createAiDiagnosisRef: CreateAiDiagnosisRef;

export function createAiDiagnosis(vars: CreateAiDiagnosisVariables): MutationPromise<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;
export function createAiDiagnosis(dc: DataConnect, vars: CreateAiDiagnosisVariables): MutationPromise<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;

interface GetDoctorsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDoctorsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetDoctorsData, undefined>;
  operationName: string;
}
export const getDoctorsRef: GetDoctorsRef;

export function getDoctors(): QueryPromise<GetDoctorsData, undefined>;
export function getDoctors(dc: DataConnect): QueryPromise<GetDoctorsData, undefined>;

interface GetPatientsByDoctorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPatientsByDoctorVariables): QueryRef<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPatientsByDoctorVariables): QueryRef<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;
  operationName: string;
}
export const getPatientsByDoctorRef: GetPatientsByDoctorRef;

export function getPatientsByDoctor(vars: GetPatientsByDoctorVariables): QueryPromise<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;
export function getPatientsByDoctor(dc: DataConnect, vars: GetPatientsByDoctorVariables): QueryPromise<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;

interface GetAppointmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAppointmentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAppointmentsData, undefined>;
  operationName: string;
}
export const getAppointmentsRef: GetAppointmentsRef;

export function getAppointments(): QueryPromise<GetAppointmentsData, undefined>;
export function getAppointments(dc: DataConnect): QueryPromise<GetAppointmentsData, undefined>;

interface GetAiDiagnosesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAiDiagnosesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAiDiagnosesData, undefined>;
  operationName: string;
}
export const getAiDiagnosesRef: GetAiDiagnosesRef;

export function getAiDiagnoses(): QueryPromise<GetAiDiagnosesData, undefined>;
export function getAiDiagnoses(dc: DataConnect): QueryPromise<GetAiDiagnosesData, undefined>;

interface SeedAdminUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAdminUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAdminUserData, undefined>;
  operationName: string;
}
export const seedAdminUserRef: SeedAdminUserRef;

export function seedAdminUser(): MutationPromise<SeedAdminUserData, undefined>;
export function seedAdminUser(dc: DataConnect): MutationPromise<SeedAdminUserData, undefined>;

interface SeedDoctorNguyenHoangMinhRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedDoctorNguyenHoangMinhData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedDoctorNguyenHoangMinhData, undefined>;
  operationName: string;
}
export const seedDoctorNguyenHoangMinhRef: SeedDoctorNguyenHoangMinhRef;

export function seedDoctorNguyenHoangMinh(): MutationPromise<SeedDoctorNguyenHoangMinhData, undefined>;
export function seedDoctorNguyenHoangMinh(dc: DataConnect): MutationPromise<SeedDoctorNguyenHoangMinhData, undefined>;

interface SeedDoctorTranLanAnhRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedDoctorTranLanAnhData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedDoctorTranLanAnhData, undefined>;
  operationName: string;
}
export const seedDoctorTranLanAnhRef: SeedDoctorTranLanAnhRef;

export function seedDoctorTranLanAnh(): MutationPromise<SeedDoctorTranLanAnhData, undefined>;
export function seedDoctorTranLanAnh(dc: DataConnect): MutationPromise<SeedDoctorTranLanAnhData, undefined>;

interface SeedPatientLeMinhRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientLeMinhData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedPatientLeMinhData, undefined>;
  operationName: string;
}
export const seedPatientLeMinhRef: SeedPatientLeMinhRef;

export function seedPatientLeMinh(): MutationPromise<SeedPatientLeMinhData, undefined>;
export function seedPatientLeMinh(dc: DataConnect): MutationPromise<SeedPatientLeMinhData, undefined>;

interface SeedPatientPhamThuHaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientPhamThuHaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedPatientPhamThuHaData, undefined>;
  operationName: string;
}
export const seedPatientPhamThuHaRef: SeedPatientPhamThuHaRef;

export function seedPatientPhamThuHa(): MutationPromise<SeedPatientPhamThuHaData, undefined>;
export function seedPatientPhamThuHa(dc: DataConnect): MutationPromise<SeedPatientPhamThuHaData, undefined>;

interface SeedPatientNguyenGiaBaoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientNguyenGiaBaoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedPatientNguyenGiaBaoData, undefined>;
  operationName: string;
}
export const seedPatientNguyenGiaBaoRef: SeedPatientNguyenGiaBaoRef;

export function seedPatientNguyenGiaBao(): MutationPromise<SeedPatientNguyenGiaBaoData, undefined>;
export function seedPatientNguyenGiaBao(dc: DataConnect): MutationPromise<SeedPatientNguyenGiaBaoData, undefined>;

interface SeedPatientVoThanhTrucRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientVoThanhTrucData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedPatientVoThanhTrucData, undefined>;
  operationName: string;
}
export const seedPatientVoThanhTrucRef: SeedPatientVoThanhTrucRef;

export function seedPatientVoThanhTruc(): MutationPromise<SeedPatientVoThanhTrucData, undefined>;
export function seedPatientVoThanhTruc(dc: DataConnect): MutationPromise<SeedPatientVoThanhTrucData, undefined>;

interface SeedProfileLeMinhRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfileLeMinhData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedProfileLeMinhData, undefined>;
  operationName: string;
}
export const seedProfileLeMinhRef: SeedProfileLeMinhRef;

export function seedProfileLeMinh(): MutationPromise<SeedProfileLeMinhData, undefined>;
export function seedProfileLeMinh(dc: DataConnect): MutationPromise<SeedProfileLeMinhData, undefined>;

interface SeedProfilePhamThuHaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfilePhamThuHaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedProfilePhamThuHaData, undefined>;
  operationName: string;
}
export const seedProfilePhamThuHaRef: SeedProfilePhamThuHaRef;

export function seedProfilePhamThuHa(): MutationPromise<SeedProfilePhamThuHaData, undefined>;
export function seedProfilePhamThuHa(dc: DataConnect): MutationPromise<SeedProfilePhamThuHaData, undefined>;

interface SeedProfileNguyenGiaBaoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfileNguyenGiaBaoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedProfileNguyenGiaBaoData, undefined>;
  operationName: string;
}
export const seedProfileNguyenGiaBaoRef: SeedProfileNguyenGiaBaoRef;

export function seedProfileNguyenGiaBao(): MutationPromise<SeedProfileNguyenGiaBaoData, undefined>;
export function seedProfileNguyenGiaBao(dc: DataConnect): MutationPromise<SeedProfileNguyenGiaBaoData, undefined>;

interface SeedProfileVoThanhTrucRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfileVoThanhTrucData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedProfileVoThanhTrucData, undefined>;
  operationName: string;
}
export const seedProfileVoThanhTrucRef: SeedProfileVoThanhTrucRef;

export function seedProfileVoThanhTruc(): MutationPromise<SeedProfileVoThanhTrucData, undefined>;
export function seedProfileVoThanhTruc(dc: DataConnect): MutationPromise<SeedProfileVoThanhTrucData, undefined>;

interface SeedFamilyLinkLeMinhRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkLeMinhData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedFamilyLinkLeMinhData, undefined>;
  operationName: string;
}
export const seedFamilyLinkLeMinhRef: SeedFamilyLinkLeMinhRef;

export function seedFamilyLinkLeMinh(): MutationPromise<SeedFamilyLinkLeMinhData, undefined>;
export function seedFamilyLinkLeMinh(dc: DataConnect): MutationPromise<SeedFamilyLinkLeMinhData, undefined>;

interface SeedFamilyLinkPhamThuHaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkPhamThuHaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedFamilyLinkPhamThuHaData, undefined>;
  operationName: string;
}
export const seedFamilyLinkPhamThuHaRef: SeedFamilyLinkPhamThuHaRef;

export function seedFamilyLinkPhamThuHa(): MutationPromise<SeedFamilyLinkPhamThuHaData, undefined>;
export function seedFamilyLinkPhamThuHa(dc: DataConnect): MutationPromise<SeedFamilyLinkPhamThuHaData, undefined>;

interface SeedFamilyLinkNguyenGiaBaoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkNguyenGiaBaoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedFamilyLinkNguyenGiaBaoData, undefined>;
  operationName: string;
}
export const seedFamilyLinkNguyenGiaBaoRef: SeedFamilyLinkNguyenGiaBaoRef;

export function seedFamilyLinkNguyenGiaBao(): MutationPromise<SeedFamilyLinkNguyenGiaBaoData, undefined>;
export function seedFamilyLinkNguyenGiaBao(dc: DataConnect): MutationPromise<SeedFamilyLinkNguyenGiaBaoData, undefined>;

interface SeedFamilyLinkVoThanhTrucRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkVoThanhTrucData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedFamilyLinkVoThanhTrucData, undefined>;
  operationName: string;
}
export const seedFamilyLinkVoThanhTrucRef: SeedFamilyLinkVoThanhTrucRef;

export function seedFamilyLinkVoThanhTruc(): MutationPromise<SeedFamilyLinkVoThanhTrucData, undefined>;
export function seedFamilyLinkVoThanhTruc(dc: DataConnect): MutationPromise<SeedFamilyLinkVoThanhTrucData, undefined>;

interface SeedAppointmentLeMinh1Ref {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentLeMinh1Data, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAppointmentLeMinh1Data, undefined>;
  operationName: string;
}
export const seedAppointmentLeMinh1Ref: SeedAppointmentLeMinh1Ref;

export function seedAppointmentLeMinh1(): MutationPromise<SeedAppointmentLeMinh1Data, undefined>;
export function seedAppointmentLeMinh1(dc: DataConnect): MutationPromise<SeedAppointmentLeMinh1Data, undefined>;

interface SeedAppointmentLeMinh2Ref {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentLeMinh2Data, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAppointmentLeMinh2Data, undefined>;
  operationName: string;
}
export const seedAppointmentLeMinh2Ref: SeedAppointmentLeMinh2Ref;

export function seedAppointmentLeMinh2(): MutationPromise<SeedAppointmentLeMinh2Data, undefined>;
export function seedAppointmentLeMinh2(dc: DataConnect): MutationPromise<SeedAppointmentLeMinh2Data, undefined>;

interface SeedAppointmentPhamThuHaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentPhamThuHaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAppointmentPhamThuHaData, undefined>;
  operationName: string;
}
export const seedAppointmentPhamThuHaRef: SeedAppointmentPhamThuHaRef;

export function seedAppointmentPhamThuHa(): MutationPromise<SeedAppointmentPhamThuHaData, undefined>;
export function seedAppointmentPhamThuHa(dc: DataConnect): MutationPromise<SeedAppointmentPhamThuHaData, undefined>;

interface SeedAppointmentNguyenGiaBaoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentNguyenGiaBaoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAppointmentNguyenGiaBaoData, undefined>;
  operationName: string;
}
export const seedAppointmentNguyenGiaBaoRef: SeedAppointmentNguyenGiaBaoRef;

export function seedAppointmentNguyenGiaBao(): MutationPromise<SeedAppointmentNguyenGiaBaoData, undefined>;
export function seedAppointmentNguyenGiaBao(dc: DataConnect): MutationPromise<SeedAppointmentNguyenGiaBaoData, undefined>;

interface SeedAppointmentVoThanhTrucRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentVoThanhTrucData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAppointmentVoThanhTrucData, undefined>;
  operationName: string;
}
export const seedAppointmentVoThanhTrucRef: SeedAppointmentVoThanhTrucRef;

export function seedAppointmentVoThanhTruc(): MutationPromise<SeedAppointmentVoThanhTrucData, undefined>;
export function seedAppointmentVoThanhTruc(dc: DataConnect): MutationPromise<SeedAppointmentVoThanhTrucData, undefined>;

interface SeedAiDiagnosisLeMinhRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisLeMinhData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAiDiagnosisLeMinhData, undefined>;
  operationName: string;
}
export const seedAiDiagnosisLeMinhRef: SeedAiDiagnosisLeMinhRef;

export function seedAiDiagnosisLeMinh(): MutationPromise<SeedAiDiagnosisLeMinhData, undefined>;
export function seedAiDiagnosisLeMinh(dc: DataConnect): MutationPromise<SeedAiDiagnosisLeMinhData, undefined>;

interface SeedAiDiagnosisPhamThuHaRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisPhamThuHaData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAiDiagnosisPhamThuHaData, undefined>;
  operationName: string;
}
export const seedAiDiagnosisPhamThuHaRef: SeedAiDiagnosisPhamThuHaRef;

export function seedAiDiagnosisPhamThuHa(): MutationPromise<SeedAiDiagnosisPhamThuHaData, undefined>;
export function seedAiDiagnosisPhamThuHa(dc: DataConnect): MutationPromise<SeedAiDiagnosisPhamThuHaData, undefined>;

interface SeedAiDiagnosisNguyenGiaBaoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisNguyenGiaBaoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAiDiagnosisNguyenGiaBaoData, undefined>;
  operationName: string;
}
export const seedAiDiagnosisNguyenGiaBaoRef: SeedAiDiagnosisNguyenGiaBaoRef;

export function seedAiDiagnosisNguyenGiaBao(): MutationPromise<SeedAiDiagnosisNguyenGiaBaoData, undefined>;
export function seedAiDiagnosisNguyenGiaBao(dc: DataConnect): MutationPromise<SeedAiDiagnosisNguyenGiaBaoData, undefined>;

interface SeedAiDiagnosisVoThanhTrucRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisVoThanhTrucData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<SeedAiDiagnosisVoThanhTrucData, undefined>;
  operationName: string;
}
export const seedAiDiagnosisVoThanhTrucRef: SeedAiDiagnosisVoThanhTrucRef;

export function seedAiDiagnosisVoThanhTruc(): MutationPromise<SeedAiDiagnosisVoThanhTrucData, undefined>;
export function seedAiDiagnosisVoThanhTruc(dc: DataConnect): MutationPromise<SeedAiDiagnosisVoThanhTrucData, undefined>;

