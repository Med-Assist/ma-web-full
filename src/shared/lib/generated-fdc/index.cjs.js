const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'mav3-db',
  location: 'asia-northeast1'
};
exports.connectorConfig = connectorConfig;

const addTestPatientRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTestPatient');
}
addTestPatientRef.operationName = 'AddTestPatient';
exports.addTestPatientRef = addTestPatientRef;

exports.addTestPatient = function addTestPatient(dc) {
  return executeMutation(addTestPatientRef(dc));
};

const getAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}
getAllUsersRef.operationName = 'GetAllUsers';
exports.getAllUsersRef = getAllUsersRef;

exports.getAllUsers = function getAllUsers(dc) {
  return executeQuery(getAllUsersRef(dc));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const createPatientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePatientProfile', inputVars);
}
createPatientProfileRef.operationName = 'CreatePatientProfile';
exports.createPatientProfileRef = createPatientProfileRef;

exports.createPatientProfile = function createPatientProfile(dcOrVars, vars) {
  return executeMutation(createPatientProfileRef(dcOrVars, vars));
};

const createFamilyLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFamilyLink', inputVars);
}
createFamilyLinkRef.operationName = 'CreateFamilyLink';
exports.createFamilyLinkRef = createFamilyLinkRef;

exports.createFamilyLink = function createFamilyLink(dcOrVars, vars) {
  return executeMutation(createFamilyLinkRef(dcOrVars, vars));
};

const createAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAppointment', inputVars);
}
createAppointmentRef.operationName = 'CreateAppointment';
exports.createAppointmentRef = createAppointmentRef;

exports.createAppointment = function createAppointment(dcOrVars, vars) {
  return executeMutation(createAppointmentRef(dcOrVars, vars));
};

const createAiDiagnosisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAiDiagnosis', inputVars);
}
createAiDiagnosisRef.operationName = 'CreateAiDiagnosis';
exports.createAiDiagnosisRef = createAiDiagnosisRef;

exports.createAiDiagnosis = function createAiDiagnosis(dcOrVars, vars) {
  return executeMutation(createAiDiagnosisRef(dcOrVars, vars));
};

const getDoctorsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctors');
}
getDoctorsRef.operationName = 'GetDoctors';
exports.getDoctorsRef = getDoctorsRef;

exports.getDoctors = function getDoctors(dc) {
  return executeQuery(getDoctorsRef(dc));
};

const getPatientsByDoctorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPatientsByDoctor', inputVars);
}
getPatientsByDoctorRef.operationName = 'GetPatientsByDoctor';
exports.getPatientsByDoctorRef = getPatientsByDoctorRef;

exports.getPatientsByDoctor = function getPatientsByDoctor(dcOrVars, vars) {
  return executeQuery(getPatientsByDoctorRef(dcOrVars, vars));
};

const getAppointmentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppointments');
}
getAppointmentsRef.operationName = 'GetAppointments';
exports.getAppointmentsRef = getAppointmentsRef;

exports.getAppointments = function getAppointments(dc) {
  return executeQuery(getAppointmentsRef(dc));
};

const getAiDiagnosesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAiDiagnoses');
}
getAiDiagnosesRef.operationName = 'GetAiDiagnoses';
exports.getAiDiagnosesRef = getAiDiagnosesRef;

exports.getAiDiagnoses = function getAiDiagnoses(dc) {
  return executeQuery(getAiDiagnosesRef(dc));
};

const seedAdminUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAdminUser');
}
seedAdminUserRef.operationName = 'SeedAdminUser';
exports.seedAdminUserRef = seedAdminUserRef;

exports.seedAdminUser = function seedAdminUser(dc) {
  return executeMutation(seedAdminUserRef(dc));
};

const seedDoctorNguyenHoangMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedDoctorNguyenHoangMinh');
}
seedDoctorNguyenHoangMinhRef.operationName = 'SeedDoctorNguyenHoangMinh';
exports.seedDoctorNguyenHoangMinhRef = seedDoctorNguyenHoangMinhRef;

exports.seedDoctorNguyenHoangMinh = function seedDoctorNguyenHoangMinh(dc) {
  return executeMutation(seedDoctorNguyenHoangMinhRef(dc));
};

const seedDoctorTranLanAnhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedDoctorTranLanAnh');
}
seedDoctorTranLanAnhRef.operationName = 'SeedDoctorTranLanAnh';
exports.seedDoctorTranLanAnhRef = seedDoctorTranLanAnhRef;

exports.seedDoctorTranLanAnh = function seedDoctorTranLanAnh(dc) {
  return executeMutation(seedDoctorTranLanAnhRef(dc));
};

const seedPatientLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientLeMinh');
}
seedPatientLeMinhRef.operationName = 'SeedPatientLeMinh';
exports.seedPatientLeMinhRef = seedPatientLeMinhRef;

exports.seedPatientLeMinh = function seedPatientLeMinh(dc) {
  return executeMutation(seedPatientLeMinhRef(dc));
};

const seedPatientPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientPhamThuHa');
}
seedPatientPhamThuHaRef.operationName = 'SeedPatientPhamThuHa';
exports.seedPatientPhamThuHaRef = seedPatientPhamThuHaRef;

exports.seedPatientPhamThuHa = function seedPatientPhamThuHa(dc) {
  return executeMutation(seedPatientPhamThuHaRef(dc));
};

const seedPatientNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientNguyenGiaBao');
}
seedPatientNguyenGiaBaoRef.operationName = 'SeedPatientNguyenGiaBao';
exports.seedPatientNguyenGiaBaoRef = seedPatientNguyenGiaBaoRef;

exports.seedPatientNguyenGiaBao = function seedPatientNguyenGiaBao(dc) {
  return executeMutation(seedPatientNguyenGiaBaoRef(dc));
};

const seedPatientVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientVoThanhTruc');
}
seedPatientVoThanhTrucRef.operationName = 'SeedPatientVoThanhTruc';
exports.seedPatientVoThanhTrucRef = seedPatientVoThanhTrucRef;

exports.seedPatientVoThanhTruc = function seedPatientVoThanhTruc(dc) {
  return executeMutation(seedPatientVoThanhTrucRef(dc));
};

const seedProfileLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileLeMinh');
}
seedProfileLeMinhRef.operationName = 'SeedProfileLeMinh';
exports.seedProfileLeMinhRef = seedProfileLeMinhRef;

exports.seedProfileLeMinh = function seedProfileLeMinh(dc) {
  return executeMutation(seedProfileLeMinhRef(dc));
};

const seedProfilePhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfilePhamThuHa');
}
seedProfilePhamThuHaRef.operationName = 'SeedProfilePhamThuHa';
exports.seedProfilePhamThuHaRef = seedProfilePhamThuHaRef;

exports.seedProfilePhamThuHa = function seedProfilePhamThuHa(dc) {
  return executeMutation(seedProfilePhamThuHaRef(dc));
};

const seedProfileNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileNguyenGiaBao');
}
seedProfileNguyenGiaBaoRef.operationName = 'SeedProfileNguyenGiaBao';
exports.seedProfileNguyenGiaBaoRef = seedProfileNguyenGiaBaoRef;

exports.seedProfileNguyenGiaBao = function seedProfileNguyenGiaBao(dc) {
  return executeMutation(seedProfileNguyenGiaBaoRef(dc));
};

const seedProfileVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileVoThanhTruc');
}
seedProfileVoThanhTrucRef.operationName = 'SeedProfileVoThanhTruc';
exports.seedProfileVoThanhTrucRef = seedProfileVoThanhTrucRef;

exports.seedProfileVoThanhTruc = function seedProfileVoThanhTruc(dc) {
  return executeMutation(seedProfileVoThanhTrucRef(dc));
};

const seedFamilyLinkLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkLeMinh');
}
seedFamilyLinkLeMinhRef.operationName = 'SeedFamilyLinkLeMinh';
exports.seedFamilyLinkLeMinhRef = seedFamilyLinkLeMinhRef;

exports.seedFamilyLinkLeMinh = function seedFamilyLinkLeMinh(dc) {
  return executeMutation(seedFamilyLinkLeMinhRef(dc));
};

const seedFamilyLinkPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkPhamThuHa');
}
seedFamilyLinkPhamThuHaRef.operationName = 'SeedFamilyLinkPhamThuHa';
exports.seedFamilyLinkPhamThuHaRef = seedFamilyLinkPhamThuHaRef;

exports.seedFamilyLinkPhamThuHa = function seedFamilyLinkPhamThuHa(dc) {
  return executeMutation(seedFamilyLinkPhamThuHaRef(dc));
};

const seedFamilyLinkNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkNguyenGiaBao');
}
seedFamilyLinkNguyenGiaBaoRef.operationName = 'SeedFamilyLinkNguyenGiaBao';
exports.seedFamilyLinkNguyenGiaBaoRef = seedFamilyLinkNguyenGiaBaoRef;

exports.seedFamilyLinkNguyenGiaBao = function seedFamilyLinkNguyenGiaBao(dc) {
  return executeMutation(seedFamilyLinkNguyenGiaBaoRef(dc));
};

const seedFamilyLinkVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkVoThanhTruc');
}
seedFamilyLinkVoThanhTrucRef.operationName = 'SeedFamilyLinkVoThanhTruc';
exports.seedFamilyLinkVoThanhTrucRef = seedFamilyLinkVoThanhTrucRef;

exports.seedFamilyLinkVoThanhTruc = function seedFamilyLinkVoThanhTruc(dc) {
  return executeMutation(seedFamilyLinkVoThanhTrucRef(dc));
};

const seedAppointmentLeMinh1Ref = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentLeMinh1');
}
seedAppointmentLeMinh1Ref.operationName = 'SeedAppointmentLeMinh1';
exports.seedAppointmentLeMinh1Ref = seedAppointmentLeMinh1Ref;

exports.seedAppointmentLeMinh1 = function seedAppointmentLeMinh1(dc) {
  return executeMutation(seedAppointmentLeMinh1Ref(dc));
};

const seedAppointmentLeMinh2Ref = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentLeMinh2');
}
seedAppointmentLeMinh2Ref.operationName = 'SeedAppointmentLeMinh2';
exports.seedAppointmentLeMinh2Ref = seedAppointmentLeMinh2Ref;

exports.seedAppointmentLeMinh2 = function seedAppointmentLeMinh2(dc) {
  return executeMutation(seedAppointmentLeMinh2Ref(dc));
};

const seedAppointmentPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentPhamThuHa');
}
seedAppointmentPhamThuHaRef.operationName = 'SeedAppointmentPhamThuHa';
exports.seedAppointmentPhamThuHaRef = seedAppointmentPhamThuHaRef;

exports.seedAppointmentPhamThuHa = function seedAppointmentPhamThuHa(dc) {
  return executeMutation(seedAppointmentPhamThuHaRef(dc));
};

const seedAppointmentNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentNguyenGiaBao');
}
seedAppointmentNguyenGiaBaoRef.operationName = 'SeedAppointmentNguyenGiaBao';
exports.seedAppointmentNguyenGiaBaoRef = seedAppointmentNguyenGiaBaoRef;

exports.seedAppointmentNguyenGiaBao = function seedAppointmentNguyenGiaBao(dc) {
  return executeMutation(seedAppointmentNguyenGiaBaoRef(dc));
};

const seedAppointmentVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentVoThanhTruc');
}
seedAppointmentVoThanhTrucRef.operationName = 'SeedAppointmentVoThanhTruc';
exports.seedAppointmentVoThanhTrucRef = seedAppointmentVoThanhTrucRef;

exports.seedAppointmentVoThanhTruc = function seedAppointmentVoThanhTruc(dc) {
  return executeMutation(seedAppointmentVoThanhTrucRef(dc));
};

const seedAiDiagnosisLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisLeMinh');
}
seedAiDiagnosisLeMinhRef.operationName = 'SeedAiDiagnosisLeMinh';
exports.seedAiDiagnosisLeMinhRef = seedAiDiagnosisLeMinhRef;

exports.seedAiDiagnosisLeMinh = function seedAiDiagnosisLeMinh(dc) {
  return executeMutation(seedAiDiagnosisLeMinhRef(dc));
};

const seedAiDiagnosisPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisPhamThuHa');
}
seedAiDiagnosisPhamThuHaRef.operationName = 'SeedAiDiagnosisPhamThuHa';
exports.seedAiDiagnosisPhamThuHaRef = seedAiDiagnosisPhamThuHaRef;

exports.seedAiDiagnosisPhamThuHa = function seedAiDiagnosisPhamThuHa(dc) {
  return executeMutation(seedAiDiagnosisPhamThuHaRef(dc));
};

const seedAiDiagnosisNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisNguyenGiaBao');
}
seedAiDiagnosisNguyenGiaBaoRef.operationName = 'SeedAiDiagnosisNguyenGiaBao';
exports.seedAiDiagnosisNguyenGiaBaoRef = seedAiDiagnosisNguyenGiaBaoRef;

exports.seedAiDiagnosisNguyenGiaBao = function seedAiDiagnosisNguyenGiaBao(dc) {
  return executeMutation(seedAiDiagnosisNguyenGiaBaoRef(dc));
};

const seedAiDiagnosisVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisVoThanhTruc');
}
seedAiDiagnosisVoThanhTrucRef.operationName = 'SeedAiDiagnosisVoThanhTruc';
exports.seedAiDiagnosisVoThanhTrucRef = seedAiDiagnosisVoThanhTrucRef;

exports.seedAiDiagnosisVoThanhTruc = function seedAiDiagnosisVoThanhTruc(dc) {
  return executeMutation(seedAiDiagnosisVoThanhTrucRef(dc));
};
