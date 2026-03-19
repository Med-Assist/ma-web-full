import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'mav3-db',
  location: 'asia-northeast1'
};

export const addTestPatientRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTestPatient');
}
addTestPatientRef.operationName = 'AddTestPatient';

export function addTestPatient(dc) {
  return executeMutation(addTestPatientRef(dc));
}

export const getAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}
getAllUsersRef.operationName = 'GetAllUsers';

export function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
}

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const createPatientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePatientProfile', inputVars);
}
createPatientProfileRef.operationName = 'CreatePatientProfile';

export function createPatientProfile(dcOrVars, vars) {
  return executeMutation(createPatientProfileRef(dcOrVars, vars));
}

export const createFamilyLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFamilyLink', inputVars);
}
createFamilyLinkRef.operationName = 'CreateFamilyLink';

export function createFamilyLink(dcOrVars, vars) {
  return executeMutation(createFamilyLinkRef(dcOrVars, vars));
}

export const createAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAppointment', inputVars);
}
createAppointmentRef.operationName = 'CreateAppointment';

export function createAppointment(dcOrVars, vars) {
  return executeMutation(createAppointmentRef(dcOrVars, vars));
}

export const createAiDiagnosisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAiDiagnosis', inputVars);
}
createAiDiagnosisRef.operationName = 'CreateAiDiagnosis';

export function createAiDiagnosis(dcOrVars, vars) {
  return executeMutation(createAiDiagnosisRef(dcOrVars, vars));
}

export const getDoctorsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctors');
}
getDoctorsRef.operationName = 'GetDoctors';

export function getDoctors(dc) {
  return executeQuery(getDoctorsRef(dc));
}

export const getPatientsByDoctorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPatientsByDoctor', inputVars);
}
getPatientsByDoctorRef.operationName = 'GetPatientsByDoctor';

export function getPatientsByDoctor(dcOrVars, vars) {
  return executeQuery(getPatientsByDoctorRef(dcOrVars, vars));
}

export const getAppointmentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppointments');
}
getAppointmentsRef.operationName = 'GetAppointments';

export function getAppointments(dc) {
  return executeQuery(getAppointmentsRef(dc));
}

export const getAiDiagnosesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAiDiagnoses');
}
getAiDiagnosesRef.operationName = 'GetAiDiagnoses';

export function getAiDiagnoses(dc) {
  return executeQuery(getAiDiagnosesRef(dc));
}

export const seedAdminUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAdminUser');
}
seedAdminUserRef.operationName = 'SeedAdminUser';

export function seedAdminUser(dc) {
  return executeMutation(seedAdminUserRef(dc));
}

export const seedDoctorNguyenHoangMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedDoctorNguyenHoangMinh');
}
seedDoctorNguyenHoangMinhRef.operationName = 'SeedDoctorNguyenHoangMinh';

export function seedDoctorNguyenHoangMinh(dc) {
  return executeMutation(seedDoctorNguyenHoangMinhRef(dc));
}

export const seedDoctorTranLanAnhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedDoctorTranLanAnh');
}
seedDoctorTranLanAnhRef.operationName = 'SeedDoctorTranLanAnh';

export function seedDoctorTranLanAnh(dc) {
  return executeMutation(seedDoctorTranLanAnhRef(dc));
}

export const seedPatientLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientLeMinh');
}
seedPatientLeMinhRef.operationName = 'SeedPatientLeMinh';

export function seedPatientLeMinh(dc) {
  return executeMutation(seedPatientLeMinhRef(dc));
}

export const seedPatientPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientPhamThuHa');
}
seedPatientPhamThuHaRef.operationName = 'SeedPatientPhamThuHa';

export function seedPatientPhamThuHa(dc) {
  return executeMutation(seedPatientPhamThuHaRef(dc));
}

export const seedPatientNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientNguyenGiaBao');
}
seedPatientNguyenGiaBaoRef.operationName = 'SeedPatientNguyenGiaBao';

export function seedPatientNguyenGiaBao(dc) {
  return executeMutation(seedPatientNguyenGiaBaoRef(dc));
}

export const seedPatientVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientVoThanhTruc');
}
seedPatientVoThanhTrucRef.operationName = 'SeedPatientVoThanhTruc';

export function seedPatientVoThanhTruc(dc) {
  return executeMutation(seedPatientVoThanhTrucRef(dc));
}

export const seedProfileLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileLeMinh');
}
seedProfileLeMinhRef.operationName = 'SeedProfileLeMinh';

export function seedProfileLeMinh(dc) {
  return executeMutation(seedProfileLeMinhRef(dc));
}

export const seedProfilePhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfilePhamThuHa');
}
seedProfilePhamThuHaRef.operationName = 'SeedProfilePhamThuHa';

export function seedProfilePhamThuHa(dc) {
  return executeMutation(seedProfilePhamThuHaRef(dc));
}

export const seedProfileNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileNguyenGiaBao');
}
seedProfileNguyenGiaBaoRef.operationName = 'SeedProfileNguyenGiaBao';

export function seedProfileNguyenGiaBao(dc) {
  return executeMutation(seedProfileNguyenGiaBaoRef(dc));
}

export const seedProfileVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileVoThanhTruc');
}
seedProfileVoThanhTrucRef.operationName = 'SeedProfileVoThanhTruc';

export function seedProfileVoThanhTruc(dc) {
  return executeMutation(seedProfileVoThanhTrucRef(dc));
}

export const seedFamilyLinkLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkLeMinh');
}
seedFamilyLinkLeMinhRef.operationName = 'SeedFamilyLinkLeMinh';

export function seedFamilyLinkLeMinh(dc) {
  return executeMutation(seedFamilyLinkLeMinhRef(dc));
}

export const seedFamilyLinkPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkPhamThuHa');
}
seedFamilyLinkPhamThuHaRef.operationName = 'SeedFamilyLinkPhamThuHa';

export function seedFamilyLinkPhamThuHa(dc) {
  return executeMutation(seedFamilyLinkPhamThuHaRef(dc));
}

export const seedFamilyLinkNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkNguyenGiaBao');
}
seedFamilyLinkNguyenGiaBaoRef.operationName = 'SeedFamilyLinkNguyenGiaBao';

export function seedFamilyLinkNguyenGiaBao(dc) {
  return executeMutation(seedFamilyLinkNguyenGiaBaoRef(dc));
}

export const seedFamilyLinkVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkVoThanhTruc');
}
seedFamilyLinkVoThanhTrucRef.operationName = 'SeedFamilyLinkVoThanhTruc';

export function seedFamilyLinkVoThanhTruc(dc) {
  return executeMutation(seedFamilyLinkVoThanhTrucRef(dc));
}

export const seedAppointmentLeMinh1Ref = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentLeMinh1');
}
seedAppointmentLeMinh1Ref.operationName = 'SeedAppointmentLeMinh1';

export function seedAppointmentLeMinh1(dc) {
  return executeMutation(seedAppointmentLeMinh1Ref(dc));
}

export const seedAppointmentLeMinh2Ref = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentLeMinh2');
}
seedAppointmentLeMinh2Ref.operationName = 'SeedAppointmentLeMinh2';

export function seedAppointmentLeMinh2(dc) {
  return executeMutation(seedAppointmentLeMinh2Ref(dc));
}

export const seedAppointmentPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentPhamThuHa');
}
seedAppointmentPhamThuHaRef.operationName = 'SeedAppointmentPhamThuHa';

export function seedAppointmentPhamThuHa(dc) {
  return executeMutation(seedAppointmentPhamThuHaRef(dc));
}

export const seedAppointmentNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentNguyenGiaBao');
}
seedAppointmentNguyenGiaBaoRef.operationName = 'SeedAppointmentNguyenGiaBao';

export function seedAppointmentNguyenGiaBao(dc) {
  return executeMutation(seedAppointmentNguyenGiaBaoRef(dc));
}

export const seedAppointmentVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentVoThanhTruc');
}
seedAppointmentVoThanhTrucRef.operationName = 'SeedAppointmentVoThanhTruc';

export function seedAppointmentVoThanhTruc(dc) {
  return executeMutation(seedAppointmentVoThanhTrucRef(dc));
}

export const seedAiDiagnosisLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisLeMinh');
}
seedAiDiagnosisLeMinhRef.operationName = 'SeedAiDiagnosisLeMinh';

export function seedAiDiagnosisLeMinh(dc) {
  return executeMutation(seedAiDiagnosisLeMinhRef(dc));
}

export const seedAiDiagnosisPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisPhamThuHa');
}
seedAiDiagnosisPhamThuHaRef.operationName = 'SeedAiDiagnosisPhamThuHa';

export function seedAiDiagnosisPhamThuHa(dc) {
  return executeMutation(seedAiDiagnosisPhamThuHaRef(dc));
}

export const seedAiDiagnosisNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisNguyenGiaBao');
}
seedAiDiagnosisNguyenGiaBaoRef.operationName = 'SeedAiDiagnosisNguyenGiaBao';

export function seedAiDiagnosisNguyenGiaBao(dc) {
  return executeMutation(seedAiDiagnosisNguyenGiaBaoRef(dc));
}

export const seedAiDiagnosisVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisVoThanhTruc');
}
seedAiDiagnosisVoThanhTrucRef.operationName = 'SeedAiDiagnosisVoThanhTruc';

export function seedAiDiagnosisVoThanhTruc(dc) {
  return executeMutation(seedAiDiagnosisVoThanhTrucRef(dc));
}

