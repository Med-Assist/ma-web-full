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

export const createContactLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateContactLead', inputVars);
}
createContactLeadRef.operationName = 'CreateContactLead';

export function createContactLead(dcOrVars, vars) {
  return executeMutation(createContactLeadRef(dcOrVars, vars));
}

export const upsertZaloContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertZaloContact', inputVars);
}
upsertZaloContactRef.operationName = 'UpsertZaloContact';

export function upsertZaloContact(dcOrVars, vars) {
  return executeMutation(upsertZaloContactRef(dcOrVars, vars));
}

export const upsertDoctorProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorProfile', inputVars);
}
upsertDoctorProfileRef.operationName = 'UpsertDoctorProfile';

export function upsertDoctorProfile(dcOrVars, vars) {
  return executeMutation(upsertDoctorProfileRef(dcOrVars, vars));
}

export const upsertNotificationPreferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNotificationPreference', inputVars);
}
upsertNotificationPreferenceRef.operationName = 'UpsertNotificationPreference';

export function upsertNotificationPreference(dcOrVars, vars) {
  return executeMutation(upsertNotificationPreferenceRef(dcOrVars, vars));
}

export const upsertWorkingScheduleSlotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertWorkingScheduleSlot', inputVars);
}
upsertWorkingScheduleSlotRef.operationName = 'UpsertWorkingScheduleSlot';

export function upsertWorkingScheduleSlot(dcOrVars, vars) {
  return executeMutation(upsertWorkingScheduleSlotRef(dcOrVars, vars));
}

export const upsertDigitalSignatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitalSignature', inputVars);
}
upsertDigitalSignatureRef.operationName = 'UpsertDigitalSignature';

export function upsertDigitalSignature(dcOrVars, vars) {
  return executeMutation(upsertDigitalSignatureRef(dcOrVars, vars));
}

export const createSupportRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSupportRequest', inputVars);
}
createSupportRequestRef.operationName = 'CreateSupportRequest';

export function createSupportRequest(dcOrVars, vars) {
  return executeMutation(createSupportRequestRef(dcOrVars, vars));
}

export const upsertAssistantMessageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAssistantMessage', inputVars);
}
upsertAssistantMessageRef.operationName = 'UpsertAssistantMessage';

export function upsertAssistantMessage(dcOrVars, vars) {
  return executeMutation(upsertAssistantMessageRef(dcOrVars, vars));
}

export const upsertScheduleEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertScheduleEvent', inputVars);
}
upsertScheduleEventRef.operationName = 'UpsertScheduleEvent';

export function upsertScheduleEvent(dcOrVars, vars) {
  return executeMutation(upsertScheduleEventRef(dcOrVars, vars));
}

export const upsertScheduleAttachmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertScheduleAttachment', inputVars);
}
upsertScheduleAttachmentRef.operationName = 'UpsertScheduleAttachment';

export function upsertScheduleAttachment(dcOrVars, vars) {
  return executeMutation(upsertScheduleAttachmentRef(dcOrVars, vars));
}

export const createShiftSwapRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateShiftSwapRequest', inputVars);
}
createShiftSwapRequestRef.operationName = 'CreateShiftSwapRequest';

export function createShiftSwapRequest(dcOrVars, vars) {
  return executeMutation(createShiftSwapRequestRef(dcOrVars, vars));
}

export const upsertPrescriptionDraftRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionDraft', inputVars);
}
upsertPrescriptionDraftRef.operationName = 'UpsertPrescriptionDraft';

export function upsertPrescriptionDraft(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionDraftRef(dcOrVars, vars));
}

export const upsertPrescriptionDraftItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionDraftItem', inputVars);
}
upsertPrescriptionDraftItemRef.operationName = 'UpsertPrescriptionDraftItem';

export function upsertPrescriptionDraftItem(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionDraftItemRef(dcOrVars, vars));
}

export const deletePrescriptionDraftItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrescriptionDraftItem', inputVars);
}
deletePrescriptionDraftItemRef.operationName = 'DeletePrescriptionDraftItem';

export function deletePrescriptionDraftItem(dcOrVars, vars) {
  return executeMutation(deletePrescriptionDraftItemRef(dcOrVars, vars));
}

export const updateAiDiagnosisReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAiDiagnosisReview', inputVars);
}
updateAiDiagnosisReviewRef.operationName = 'UpdateAiDiagnosisReview';

export function updateAiDiagnosisReview(dcOrVars, vars) {
  return executeMutation(updateAiDiagnosisReviewRef(dcOrVars, vars));
}

export const upsertAiDiagnosisReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiDiagnosisReference', inputVars);
}
upsertAiDiagnosisReferenceRef.operationName = 'UpsertAiDiagnosisReference';

export function upsertAiDiagnosisReference(dcOrVars, vars) {
  return executeMutation(upsertAiDiagnosisReferenceRef(dcOrVars, vars));
}

export const upsertAppointmentAttachmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAppointmentAttachment', inputVars);
}
upsertAppointmentAttachmentRef.operationName = 'UpsertAppointmentAttachment';

export function upsertAppointmentAttachment(dcOrVars, vars) {
  return executeMutation(upsertAppointmentAttachmentRef(dcOrVars, vars));
}

export const upsertPatientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPatientProfile', inputVars);
}
upsertPatientProfileRef.operationName = 'UpsertPatientProfile';

export function upsertPatientProfile(dcOrVars, vars) {
  return executeMutation(upsertPatientProfileRef(dcOrVars, vars));
}

export const upsertFamilyLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertFamilyLink', inputVars);
}
upsertFamilyLinkRef.operationName = 'UpsertFamilyLink';

export function upsertFamilyLink(dcOrVars, vars) {
  return executeMutation(upsertFamilyLinkRef(dcOrVars, vars));
}

export const upsertAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAppointment', inputVars);
}
upsertAppointmentRef.operationName = 'UpsertAppointment';

export function upsertAppointment(dcOrVars, vars) {
  return executeMutation(upsertAppointmentRef(dcOrVars, vars));
}

export const upsertAiDiagnosisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiDiagnosis', inputVars);
}
upsertAiDiagnosisRef.operationName = 'UpsertAiDiagnosis';

export function upsertAiDiagnosis(dcOrVars, vars) {
  return executeMutation(upsertAiDiagnosisRef(dcOrVars, vars));
}

export const upsertConsultationRoomRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertConsultationRoom', inputVars);
}
upsertConsultationRoomRef.operationName = 'UpsertConsultationRoom';

export function upsertConsultationRoom(dcOrVars, vars) {
  return executeMutation(upsertConsultationRoomRef(dcOrVars, vars));
}

export const upsertLandingHeroContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingHeroContent', inputVars);
}
upsertLandingHeroContentRef.operationName = 'UpsertLandingHeroContent';

export function upsertLandingHeroContent(dcOrVars, vars) {
  return executeMutation(upsertLandingHeroContentRef(dcOrVars, vars));
}

export const upsertLandingFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingFeature', inputVars);
}
upsertLandingFeatureRef.operationName = 'UpsertLandingFeature';

export function upsertLandingFeature(dcOrVars, vars) {
  return executeMutation(upsertLandingFeatureRef(dcOrVars, vars));
}

export const upsertLandingArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingArticle', inputVars);
}
upsertLandingArticleRef.operationName = 'UpsertLandingArticle';

export function upsertLandingArticle(dcOrVars, vars) {
  return executeMutation(upsertLandingArticleRef(dcOrVars, vars));
}

export const upsertSupportContactInfoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSupportContactInfo', inputVars);
}
upsertSupportContactInfoRef.operationName = 'UpsertSupportContactInfo';

export function upsertSupportContactInfo(dcOrVars, vars) {
  return executeMutation(upsertSupportContactInfoRef(dcOrVars, vars));
}

export const upsertDoctorProfileMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorProfileMetric', inputVars);
}
upsertDoctorProfileMetricRef.operationName = 'UpsertDoctorProfileMetric';

export function upsertDoctorProfileMetric(dcOrVars, vars) {
  return executeMutation(upsertDoctorProfileMetricRef(dcOrVars, vars));
}

export const upsertDashboardSpotlightCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDashboardSpotlightCase', inputVars);
}
upsertDashboardSpotlightCaseRef.operationName = 'UpsertDashboardSpotlightCase';

export function upsertDashboardSpotlightCase(dcOrVars, vars) {
  return executeMutation(upsertDashboardSpotlightCaseRef(dcOrVars, vars));
}

export const upsertServiceRecordRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertServiceRecord', inputVars);
}
upsertServiceRecordRef.operationName = 'UpsertServiceRecord';

export function upsertServiceRecord(dcOrVars, vars) {
  return executeMutation(upsertServiceRecordRef(dcOrVars, vars));
}

export const upsertDoctorAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorAvailability', inputVars);
}
upsertDoctorAvailabilityRef.operationName = 'UpsertDoctorAvailability';

export function upsertDoctorAvailability(dcOrVars, vars) {
  return executeMutation(upsertDoctorAvailabilityRef(dcOrVars, vars));
}

export const upsertPrescriptionTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionTemplate', inputVars);
}
upsertPrescriptionTemplateRef.operationName = 'UpsertPrescriptionTemplate';

export function upsertPrescriptionTemplate(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionTemplateRef(dcOrVars, vars));
}

export const upsertPrescriptionTemplateDrugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionTemplateDrug', inputVars);
}
upsertPrescriptionTemplateDrugRef.operationName = 'UpsertPrescriptionTemplateDrug';

export function upsertPrescriptionTemplateDrug(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionTemplateDrugRef(dcOrVars, vars));
}

export const upsertDrugCatalogItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDrugCatalogItem', inputVars);
}
upsertDrugCatalogItemRef.operationName = 'UpsertDrugCatalogItem';

export function upsertDrugCatalogItem(dcOrVars, vars) {
  return executeMutation(upsertDrugCatalogItemRef(dcOrVars, vars));
}

export const upsertReportSummaryMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportSummaryMetric', inputVars);
}
upsertReportSummaryMetricRef.operationName = 'UpsertReportSummaryMetric';

export function upsertReportSummaryMetric(dcOrVars, vars) {
  return executeMutation(upsertReportSummaryMetricRef(dcOrVars, vars));
}

export const upsertReportStageDistributionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportStageDistribution', inputVars);
}
upsertReportStageDistributionRef.operationName = 'UpsertReportStageDistribution';

export function upsertReportStageDistribution(dcOrVars, vars) {
  return executeMutation(upsertReportStageDistributionRef(dcOrVars, vars));
}

export const upsertReportTrendPointRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportTrendPoint', inputVars);
}
upsertReportTrendPointRef.operationName = 'UpsertReportTrendPoint';

export function upsertReportTrendPoint(dcOrVars, vars) {
  return executeMutation(upsertReportTrendPointRef(dcOrVars, vars));
}

export const upsertReportAlertCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportAlertCase', inputVars);
}
upsertReportAlertCaseRef.operationName = 'UpsertReportAlertCase';

export function upsertReportAlertCase(dcOrVars, vars) {
  return executeMutation(upsertReportAlertCaseRef(dcOrVars, vars));
}

export const upsertDigitizationJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitizationJob', inputVars);
}
upsertDigitizationJobRef.operationName = 'UpsertDigitizationJob';

export function upsertDigitizationJob(dcOrVars, vars) {
  return executeMutation(upsertDigitizationJobRef(dcOrVars, vars));
}

export const upsertDigitizationMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitizationMetric', inputVars);
}
upsertDigitizationMetricRef.operationName = 'UpsertDigitizationMetric';

export function upsertDigitizationMetric(dcOrVars, vars) {
  return executeMutation(upsertDigitizationMetricRef(dcOrVars, vars));
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

export const getLandingWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLandingWorkspace');
}
getLandingWorkspaceRef.operationName = 'GetLandingWorkspace';

export function getLandingWorkspace(dc) {
  return executeQuery(getLandingWorkspaceRef(dc));
}

export const getZaloContactsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetZaloContacts');
}
getZaloContactsRef.operationName = 'GetZaloContacts';

export function getZaloContacts(dc) {
  return executeQuery(getZaloContactsRef(dc));
}

export const getDashboardHomeWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardHomeWorkspace', inputVars);
}
getDashboardHomeWorkspaceRef.operationName = 'GetDashboardHomeWorkspace';

export function getDashboardHomeWorkspace(dcOrVars, vars) {
  return executeQuery(getDashboardHomeWorkspaceRef(dcOrVars, vars));
}

export const getPatientWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPatientWorkspace', inputVars);
}
getPatientWorkspaceRef.operationName = 'GetPatientWorkspace';

export function getPatientWorkspace(dcOrVars, vars) {
  return executeQuery(getPatientWorkspaceRef(dcOrVars, vars));
}

export const getScheduleWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetScheduleWorkspace', inputVars);
}
getScheduleWorkspaceRef.operationName = 'GetScheduleWorkspace';

export function getScheduleWorkspace(dcOrVars, vars) {
  return executeQuery(getScheduleWorkspaceRef(dcOrVars, vars));
}

export const getConsultationWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConsultationWorkspace', inputVars);
}
getConsultationWorkspaceRef.operationName = 'GetConsultationWorkspace';

export function getConsultationWorkspace(dcOrVars, vars) {
  return executeQuery(getConsultationWorkspaceRef(dcOrVars, vars));
}

export const getAiDiagnosisWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAiDiagnosisWorkspace', inputVars);
}
getAiDiagnosisWorkspaceRef.operationName = 'GetAiDiagnosisWorkspace';

export function getAiDiagnosisWorkspace(dcOrVars, vars) {
  return executeQuery(getAiDiagnosisWorkspaceRef(dcOrVars, vars));
}

export const getPharmacyWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPharmacyWorkspace', inputVars);
}
getPharmacyWorkspaceRef.operationName = 'GetPharmacyWorkspace';

export function getPharmacyWorkspace(dcOrVars, vars) {
  return executeQuery(getPharmacyWorkspaceRef(dcOrVars, vars));
}

export const getReportsWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReportsWorkspace');
}
getReportsWorkspaceRef.operationName = 'GetReportsWorkspace';

export function getReportsWorkspace(dc) {
  return executeQuery(getReportsWorkspaceRef(dc));
}

export const getDoctorProfileWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctorProfileWorkspace', inputVars);
}
getDoctorProfileWorkspaceRef.operationName = 'GetDoctorProfileWorkspace';

export function getDoctorProfileWorkspace(dcOrVars, vars) {
  return executeQuery(getDoctorProfileWorkspaceRef(dcOrVars, vars));
}

export const getSettingsWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSettingsWorkspace', inputVars);
}
getSettingsWorkspaceRef.operationName = 'GetSettingsWorkspace';

export function getSettingsWorkspace(dcOrVars, vars) {
  return executeQuery(getSettingsWorkspaceRef(dcOrVars, vars));
}

export const getRecordDigitizationWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecordDigitizationWorkspace');
}
getRecordDigitizationWorkspaceRef.operationName = 'GetRecordDigitizationWorkspace';

export function getRecordDigitizationWorkspace(dc) {
  return executeQuery(getRecordDigitizationWorkspaceRef(dc));
}

