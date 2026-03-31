const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'mav3-db',
  location: 'asia-northeast1'
};
exports.connectorConfig = connectorConfig;

const isDataConnectInstance = (value) =>
  Boolean(value) && typeof value === 'object' && 'enableEmulator' in value;

const validateArgsWithOptions = (
  config,
  dcOrVarsOrOptions,
  varsOrOptions,
  options,
  hasVars
) => {
  if (hasVars) {
    const hasDc = isDataConnectInstance(dcOrVarsOrOptions);
    const parsedArgs = hasDc
      ? validateArgs(config, dcOrVarsOrOptions, varsOrOptions, true)
      : validateArgs(config, dcOrVarsOrOptions, undefined, true);

    return {
      ...parsedArgs,
      options: hasDc ? options : varsOrOptions
    };
  }

  const hasDc = isDataConnectInstance(dcOrVarsOrOptions);
  const parsedArgs = hasDc
    ? validateArgs(config, dcOrVarsOrOptions, undefined, false)
    : validateArgs(config, undefined, undefined, false);

  return {
    ...parsedArgs,
    options: hasDc ? varsOrOptions : dcOrVarsOrOptions
  };
};

const addTestPatientRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTestPatient');
}
addTestPatientRef.operationName = 'AddTestPatient';
exports.addTestPatientRef = addTestPatientRef;

exports.addTestPatient = function addTestPatient(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(addTestPatientRef(dcInstance, inputVars));
}
;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserRef(dcInstance, inputVars));
}
;

const createPatientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePatientProfile', inputVars);
}
createPatientProfileRef.operationName = 'CreatePatientProfile';
exports.createPatientProfileRef = createPatientProfileRef;

exports.createPatientProfile = function createPatientProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPatientProfileRef(dcInstance, inputVars));
}
;

const createFamilyLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFamilyLink', inputVars);
}
createFamilyLinkRef.operationName = 'CreateFamilyLink';
exports.createFamilyLinkRef = createFamilyLinkRef;

exports.createFamilyLink = function createFamilyLink(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createFamilyLinkRef(dcInstance, inputVars));
}
;

const createAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAppointment', inputVars);
}
createAppointmentRef.operationName = 'CreateAppointment';
exports.createAppointmentRef = createAppointmentRef;

exports.createAppointment = function createAppointment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAppointmentRef(dcInstance, inputVars));
}
;

const createAiDiagnosisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAiDiagnosis', inputVars);
}
createAiDiagnosisRef.operationName = 'CreateAiDiagnosis';
exports.createAiDiagnosisRef = createAiDiagnosisRef;

exports.createAiDiagnosis = function createAiDiagnosis(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAiDiagnosisRef(dcInstance, inputVars));
}
;

const createContactLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateContactLead', inputVars);
}
createContactLeadRef.operationName = 'CreateContactLead';
exports.createContactLeadRef = createContactLeadRef;

exports.createContactLead = function createContactLead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createContactLeadRef(dcInstance, inputVars));
}
;

const upsertZaloContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertZaloContact', inputVars);
}
upsertZaloContactRef.operationName = 'UpsertZaloContact';
exports.upsertZaloContactRef = upsertZaloContactRef;

exports.upsertZaloContact = function upsertZaloContact(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertZaloContactRef(dcInstance, inputVars));
}
;

const upsertDoctorProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorProfile', inputVars);
}
upsertDoctorProfileRef.operationName = 'UpsertDoctorProfile';
exports.upsertDoctorProfileRef = upsertDoctorProfileRef;

exports.upsertDoctorProfile = function upsertDoctorProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDoctorProfileRef(dcInstance, inputVars));
}
;

const upsertNotificationPreferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNotificationPreference', inputVars);
}
upsertNotificationPreferenceRef.operationName = 'UpsertNotificationPreference';
exports.upsertNotificationPreferenceRef = upsertNotificationPreferenceRef;

exports.upsertNotificationPreference = function upsertNotificationPreference(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertNotificationPreferenceRef(dcInstance, inputVars));
}
;

const upsertWorkingScheduleSlotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertWorkingScheduleSlot', inputVars);
}
upsertWorkingScheduleSlotRef.operationName = 'UpsertWorkingScheduleSlot';
exports.upsertWorkingScheduleSlotRef = upsertWorkingScheduleSlotRef;

exports.upsertWorkingScheduleSlot = function upsertWorkingScheduleSlot(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertWorkingScheduleSlotRef(dcInstance, inputVars));
}
;

const upsertDigitalSignatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitalSignature', inputVars);
}
upsertDigitalSignatureRef.operationName = 'UpsertDigitalSignature';
exports.upsertDigitalSignatureRef = upsertDigitalSignatureRef;

exports.upsertDigitalSignature = function upsertDigitalSignature(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDigitalSignatureRef(dcInstance, inputVars));
}
;

const createSupportRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSupportRequest', inputVars);
}
createSupportRequestRef.operationName = 'CreateSupportRequest';
exports.createSupportRequestRef = createSupportRequestRef;

exports.createSupportRequest = function createSupportRequest(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSupportRequestRef(dcInstance, inputVars));
}
;

const upsertAssistantMessageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAssistantMessage', inputVars);
}
upsertAssistantMessageRef.operationName = 'UpsertAssistantMessage';
exports.upsertAssistantMessageRef = upsertAssistantMessageRef;

exports.upsertAssistantMessage = function upsertAssistantMessage(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAssistantMessageRef(dcInstance, inputVars));
}
;

const upsertScheduleEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertScheduleEvent', inputVars);
}
upsertScheduleEventRef.operationName = 'UpsertScheduleEvent';
exports.upsertScheduleEventRef = upsertScheduleEventRef;

exports.upsertScheduleEvent = function upsertScheduleEvent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertScheduleEventRef(dcInstance, inputVars));
}
;

const upsertScheduleAttachmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertScheduleAttachment', inputVars);
}
upsertScheduleAttachmentRef.operationName = 'UpsertScheduleAttachment';
exports.upsertScheduleAttachmentRef = upsertScheduleAttachmentRef;

exports.upsertScheduleAttachment = function upsertScheduleAttachment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertScheduleAttachmentRef(dcInstance, inputVars));
}
;

const createShiftSwapRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateShiftSwapRequest', inputVars);
}
createShiftSwapRequestRef.operationName = 'CreateShiftSwapRequest';
exports.createShiftSwapRequestRef = createShiftSwapRequestRef;

exports.createShiftSwapRequest = function createShiftSwapRequest(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createShiftSwapRequestRef(dcInstance, inputVars));
}
;

const upsertPrescriptionDraftRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionDraft', inputVars);
}
upsertPrescriptionDraftRef.operationName = 'UpsertPrescriptionDraft';
exports.upsertPrescriptionDraftRef = upsertPrescriptionDraftRef;

exports.upsertPrescriptionDraft = function upsertPrescriptionDraft(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertPrescriptionDraftRef(dcInstance, inputVars));
}
;

const upsertPrescriptionDraftItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionDraftItem', inputVars);
}
upsertPrescriptionDraftItemRef.operationName = 'UpsertPrescriptionDraftItem';
exports.upsertPrescriptionDraftItemRef = upsertPrescriptionDraftItemRef;

exports.upsertPrescriptionDraftItem = function upsertPrescriptionDraftItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertPrescriptionDraftItemRef(dcInstance, inputVars));
}
;

const deletePrescriptionDraftItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrescriptionDraftItem', inputVars);
}
deletePrescriptionDraftItemRef.operationName = 'DeletePrescriptionDraftItem';
exports.deletePrescriptionDraftItemRef = deletePrescriptionDraftItemRef;

exports.deletePrescriptionDraftItem = function deletePrescriptionDraftItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePrescriptionDraftItemRef(dcInstance, inputVars));
}
;

const updateAiDiagnosisReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAiDiagnosisReview', inputVars);
}
updateAiDiagnosisReviewRef.operationName = 'UpdateAiDiagnosisReview';
exports.updateAiDiagnosisReviewRef = updateAiDiagnosisReviewRef;

exports.updateAiDiagnosisReview = function updateAiDiagnosisReview(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAiDiagnosisReviewRef(dcInstance, inputVars));
}
;

const upsertAiDiagnosisReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiDiagnosisReference', inputVars);
}
upsertAiDiagnosisReferenceRef.operationName = 'UpsertAiDiagnosisReference';
exports.upsertAiDiagnosisReferenceRef = upsertAiDiagnosisReferenceRef;

exports.upsertAiDiagnosisReference = function upsertAiDiagnosisReference(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAiDiagnosisReferenceRef(dcInstance, inputVars));
}
;

const upsertAppointmentAttachmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAppointmentAttachment', inputVars);
}
upsertAppointmentAttachmentRef.operationName = 'UpsertAppointmentAttachment';
exports.upsertAppointmentAttachmentRef = upsertAppointmentAttachmentRef;

exports.upsertAppointmentAttachment = function upsertAppointmentAttachment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAppointmentAttachmentRef(dcInstance, inputVars));
}
;

const upsertPatientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPatientProfile', inputVars);
}
upsertPatientProfileRef.operationName = 'UpsertPatientProfile';
exports.upsertPatientProfileRef = upsertPatientProfileRef;

exports.upsertPatientProfile = function upsertPatientProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertPatientProfileRef(dcInstance, inputVars));
}
;

const upsertFamilyLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertFamilyLink', inputVars);
}
upsertFamilyLinkRef.operationName = 'UpsertFamilyLink';
exports.upsertFamilyLinkRef = upsertFamilyLinkRef;

exports.upsertFamilyLink = function upsertFamilyLink(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertFamilyLinkRef(dcInstance, inputVars));
}
;

const upsertAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAppointment', inputVars);
}
upsertAppointmentRef.operationName = 'UpsertAppointment';
exports.upsertAppointmentRef = upsertAppointmentRef;

exports.upsertAppointment = function upsertAppointment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAppointmentRef(dcInstance, inputVars));
}
;

const upsertAiDiagnosisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiDiagnosis', inputVars);
}
upsertAiDiagnosisRef.operationName = 'UpsertAiDiagnosis';
exports.upsertAiDiagnosisRef = upsertAiDiagnosisRef;

exports.upsertAiDiagnosis = function upsertAiDiagnosis(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertAiDiagnosisRef(dcInstance, inputVars));
}
;

const upsertConsultationRoomRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertConsultationRoom', inputVars);
}
upsertConsultationRoomRef.operationName = 'UpsertConsultationRoom';
exports.upsertConsultationRoomRef = upsertConsultationRoomRef;

exports.upsertConsultationRoom = function upsertConsultationRoom(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertConsultationRoomRef(dcInstance, inputVars));
}
;

const upsertLandingHeroContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingHeroContent', inputVars);
}
upsertLandingHeroContentRef.operationName = 'UpsertLandingHeroContent';
exports.upsertLandingHeroContentRef = upsertLandingHeroContentRef;

exports.upsertLandingHeroContent = function upsertLandingHeroContent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertLandingHeroContentRef(dcInstance, inputVars));
}
;

const upsertLandingFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingFeature', inputVars);
}
upsertLandingFeatureRef.operationName = 'UpsertLandingFeature';
exports.upsertLandingFeatureRef = upsertLandingFeatureRef;

exports.upsertLandingFeature = function upsertLandingFeature(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertLandingFeatureRef(dcInstance, inputVars));
}
;

const upsertLandingArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingArticle', inputVars);
}
upsertLandingArticleRef.operationName = 'UpsertLandingArticle';
exports.upsertLandingArticleRef = upsertLandingArticleRef;

exports.upsertLandingArticle = function upsertLandingArticle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertLandingArticleRef(dcInstance, inputVars));
}
;

const upsertSupportContactInfoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSupportContactInfo', inputVars);
}
upsertSupportContactInfoRef.operationName = 'UpsertSupportContactInfo';
exports.upsertSupportContactInfoRef = upsertSupportContactInfoRef;

exports.upsertSupportContactInfo = function upsertSupportContactInfo(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertSupportContactInfoRef(dcInstance, inputVars));
}
;

const upsertDoctorProfileMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorProfileMetric', inputVars);
}
upsertDoctorProfileMetricRef.operationName = 'UpsertDoctorProfileMetric';
exports.upsertDoctorProfileMetricRef = upsertDoctorProfileMetricRef;

exports.upsertDoctorProfileMetric = function upsertDoctorProfileMetric(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDoctorProfileMetricRef(dcInstance, inputVars));
}
;

const upsertDashboardSpotlightCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDashboardSpotlightCase', inputVars);
}
upsertDashboardSpotlightCaseRef.operationName = 'UpsertDashboardSpotlightCase';
exports.upsertDashboardSpotlightCaseRef = upsertDashboardSpotlightCaseRef;

exports.upsertDashboardSpotlightCase = function upsertDashboardSpotlightCase(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDashboardSpotlightCaseRef(dcInstance, inputVars));
}
;

const upsertServiceRecordRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertServiceRecord', inputVars);
}
upsertServiceRecordRef.operationName = 'UpsertServiceRecord';
exports.upsertServiceRecordRef = upsertServiceRecordRef;

exports.upsertServiceRecord = function upsertServiceRecord(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertServiceRecordRef(dcInstance, inputVars));
}
;

const upsertDoctorAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorAvailability', inputVars);
}
upsertDoctorAvailabilityRef.operationName = 'UpsertDoctorAvailability';
exports.upsertDoctorAvailabilityRef = upsertDoctorAvailabilityRef;

exports.upsertDoctorAvailability = function upsertDoctorAvailability(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDoctorAvailabilityRef(dcInstance, inputVars));
}
;

const upsertPrescriptionTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionTemplate', inputVars);
}
upsertPrescriptionTemplateRef.operationName = 'UpsertPrescriptionTemplate';
exports.upsertPrescriptionTemplateRef = upsertPrescriptionTemplateRef;

exports.upsertPrescriptionTemplate = function upsertPrescriptionTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertPrescriptionTemplateRef(dcInstance, inputVars));
}
;

const upsertPrescriptionTemplateDrugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionTemplateDrug', inputVars);
}
upsertPrescriptionTemplateDrugRef.operationName = 'UpsertPrescriptionTemplateDrug';
exports.upsertPrescriptionTemplateDrugRef = upsertPrescriptionTemplateDrugRef;

exports.upsertPrescriptionTemplateDrug = function upsertPrescriptionTemplateDrug(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertPrescriptionTemplateDrugRef(dcInstance, inputVars));
}
;

const upsertDrugCatalogItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDrugCatalogItem', inputVars);
}
upsertDrugCatalogItemRef.operationName = 'UpsertDrugCatalogItem';
exports.upsertDrugCatalogItemRef = upsertDrugCatalogItemRef;

exports.upsertDrugCatalogItem = function upsertDrugCatalogItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDrugCatalogItemRef(dcInstance, inputVars));
}
;

const upsertReportSummaryMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportSummaryMetric', inputVars);
}
upsertReportSummaryMetricRef.operationName = 'UpsertReportSummaryMetric';
exports.upsertReportSummaryMetricRef = upsertReportSummaryMetricRef;

exports.upsertReportSummaryMetric = function upsertReportSummaryMetric(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReportSummaryMetricRef(dcInstance, inputVars));
}
;

const upsertReportStageDistributionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportStageDistribution', inputVars);
}
upsertReportStageDistributionRef.operationName = 'UpsertReportStageDistribution';
exports.upsertReportStageDistributionRef = upsertReportStageDistributionRef;

exports.upsertReportStageDistribution = function upsertReportStageDistribution(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReportStageDistributionRef(dcInstance, inputVars));
}
;

const upsertReportTrendPointRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportTrendPoint', inputVars);
}
upsertReportTrendPointRef.operationName = 'UpsertReportTrendPoint';
exports.upsertReportTrendPointRef = upsertReportTrendPointRef;

exports.upsertReportTrendPoint = function upsertReportTrendPoint(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReportTrendPointRef(dcInstance, inputVars));
}
;

const upsertReportAlertCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportAlertCase', inputVars);
}
upsertReportAlertCaseRef.operationName = 'UpsertReportAlertCase';
exports.upsertReportAlertCaseRef = upsertReportAlertCaseRef;

exports.upsertReportAlertCase = function upsertReportAlertCase(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertReportAlertCaseRef(dcInstance, inputVars));
}
;

const upsertDigitizationJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitizationJob', inputVars);
}
upsertDigitizationJobRef.operationName = 'UpsertDigitizationJob';
exports.upsertDigitizationJobRef = upsertDigitizationJobRef;

exports.upsertDigitizationJob = function upsertDigitizationJob(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDigitizationJobRef(dcInstance, inputVars));
}
;

const upsertDigitizationMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitizationMetric', inputVars);
}
upsertDigitizationMetricRef.operationName = 'UpsertDigitizationMetric';
exports.upsertDigitizationMetricRef = upsertDigitizationMetricRef;

exports.upsertDigitizationMetric = function upsertDigitizationMetric(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDigitizationMetricRef(dcInstance, inputVars));
}
;

const getAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllUsers');
}
getAllUsersRef.operationName = 'GetAllUsers';
exports.getAllUsersRef = getAllUsersRef;

exports.getAllUsers = function getAllUsers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getAllUsersRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getDoctorsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctors');
}
getDoctorsRef.operationName = 'GetDoctors';
exports.getDoctorsRef = getDoctorsRef;

exports.getDoctors = function getDoctors(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDoctorsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPatientsByDoctorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPatientsByDoctor', inputVars);
}
getPatientsByDoctorRef.operationName = 'GetPatientsByDoctor';
exports.getPatientsByDoctorRef = getPatientsByDoctorRef;

exports.getPatientsByDoctor = function getPatientsByDoctor(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPatientsByDoctorRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getAppointmentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAppointments');
}
getAppointmentsRef.operationName = 'GetAppointments';
exports.getAppointmentsRef = getAppointmentsRef;

exports.getAppointments = function getAppointments(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getAppointmentsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getAiDiagnosesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAiDiagnoses');
}
getAiDiagnosesRef.operationName = 'GetAiDiagnoses';
exports.getAiDiagnosesRef = getAiDiagnosesRef;

exports.getAiDiagnoses = function getAiDiagnoses(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getAiDiagnosesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const seedAdminUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAdminUser');
}
seedAdminUserRef.operationName = 'SeedAdminUser';
exports.seedAdminUserRef = seedAdminUserRef;

exports.seedAdminUser = function seedAdminUser(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAdminUserRef(dcInstance, inputVars));
}
;

const seedDoctorNguyenHoangMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedDoctorNguyenHoangMinh');
}
seedDoctorNguyenHoangMinhRef.operationName = 'SeedDoctorNguyenHoangMinh';
exports.seedDoctorNguyenHoangMinhRef = seedDoctorNguyenHoangMinhRef;

exports.seedDoctorNguyenHoangMinh = function seedDoctorNguyenHoangMinh(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedDoctorNguyenHoangMinhRef(dcInstance, inputVars));
}
;

const seedDoctorTranLanAnhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedDoctorTranLanAnh');
}
seedDoctorTranLanAnhRef.operationName = 'SeedDoctorTranLanAnh';
exports.seedDoctorTranLanAnhRef = seedDoctorTranLanAnhRef;

exports.seedDoctorTranLanAnh = function seedDoctorTranLanAnh(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedDoctorTranLanAnhRef(dcInstance, inputVars));
}
;

const seedPatientLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientLeMinh');
}
seedPatientLeMinhRef.operationName = 'SeedPatientLeMinh';
exports.seedPatientLeMinhRef = seedPatientLeMinhRef;

exports.seedPatientLeMinh = function seedPatientLeMinh(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedPatientLeMinhRef(dcInstance, inputVars));
}
;

const seedPatientPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientPhamThuHa');
}
seedPatientPhamThuHaRef.operationName = 'SeedPatientPhamThuHa';
exports.seedPatientPhamThuHaRef = seedPatientPhamThuHaRef;

exports.seedPatientPhamThuHa = function seedPatientPhamThuHa(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedPatientPhamThuHaRef(dcInstance, inputVars));
}
;

const seedPatientNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientNguyenGiaBao');
}
seedPatientNguyenGiaBaoRef.operationName = 'SeedPatientNguyenGiaBao';
exports.seedPatientNguyenGiaBaoRef = seedPatientNguyenGiaBaoRef;

exports.seedPatientNguyenGiaBao = function seedPatientNguyenGiaBao(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedPatientNguyenGiaBaoRef(dcInstance, inputVars));
}
;

const seedPatientVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedPatientVoThanhTruc');
}
seedPatientVoThanhTrucRef.operationName = 'SeedPatientVoThanhTruc';
exports.seedPatientVoThanhTrucRef = seedPatientVoThanhTrucRef;

exports.seedPatientVoThanhTruc = function seedPatientVoThanhTruc(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedPatientVoThanhTrucRef(dcInstance, inputVars));
}
;

const seedProfileLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileLeMinh');
}
seedProfileLeMinhRef.operationName = 'SeedProfileLeMinh';
exports.seedProfileLeMinhRef = seedProfileLeMinhRef;

exports.seedProfileLeMinh = function seedProfileLeMinh(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedProfileLeMinhRef(dcInstance, inputVars));
}
;

const seedProfilePhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfilePhamThuHa');
}
seedProfilePhamThuHaRef.operationName = 'SeedProfilePhamThuHa';
exports.seedProfilePhamThuHaRef = seedProfilePhamThuHaRef;

exports.seedProfilePhamThuHa = function seedProfilePhamThuHa(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedProfilePhamThuHaRef(dcInstance, inputVars));
}
;

const seedProfileNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileNguyenGiaBao');
}
seedProfileNguyenGiaBaoRef.operationName = 'SeedProfileNguyenGiaBao';
exports.seedProfileNguyenGiaBaoRef = seedProfileNguyenGiaBaoRef;

exports.seedProfileNguyenGiaBao = function seedProfileNguyenGiaBao(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedProfileNguyenGiaBaoRef(dcInstance, inputVars));
}
;

const seedProfileVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedProfileVoThanhTruc');
}
seedProfileVoThanhTrucRef.operationName = 'SeedProfileVoThanhTruc';
exports.seedProfileVoThanhTrucRef = seedProfileVoThanhTrucRef;

exports.seedProfileVoThanhTruc = function seedProfileVoThanhTruc(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedProfileVoThanhTrucRef(dcInstance, inputVars));
}
;

const seedFamilyLinkLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkLeMinh');
}
seedFamilyLinkLeMinhRef.operationName = 'SeedFamilyLinkLeMinh';
exports.seedFamilyLinkLeMinhRef = seedFamilyLinkLeMinhRef;

exports.seedFamilyLinkLeMinh = function seedFamilyLinkLeMinh(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedFamilyLinkLeMinhRef(dcInstance, inputVars));
}
;

const seedFamilyLinkPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkPhamThuHa');
}
seedFamilyLinkPhamThuHaRef.operationName = 'SeedFamilyLinkPhamThuHa';
exports.seedFamilyLinkPhamThuHaRef = seedFamilyLinkPhamThuHaRef;

exports.seedFamilyLinkPhamThuHa = function seedFamilyLinkPhamThuHa(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedFamilyLinkPhamThuHaRef(dcInstance, inputVars));
}
;

const seedFamilyLinkNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkNguyenGiaBao');
}
seedFamilyLinkNguyenGiaBaoRef.operationName = 'SeedFamilyLinkNguyenGiaBao';
exports.seedFamilyLinkNguyenGiaBaoRef = seedFamilyLinkNguyenGiaBaoRef;

exports.seedFamilyLinkNguyenGiaBao = function seedFamilyLinkNguyenGiaBao(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedFamilyLinkNguyenGiaBaoRef(dcInstance, inputVars));
}
;

const seedFamilyLinkVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedFamilyLinkVoThanhTruc');
}
seedFamilyLinkVoThanhTrucRef.operationName = 'SeedFamilyLinkVoThanhTruc';
exports.seedFamilyLinkVoThanhTrucRef = seedFamilyLinkVoThanhTrucRef;

exports.seedFamilyLinkVoThanhTruc = function seedFamilyLinkVoThanhTruc(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedFamilyLinkVoThanhTrucRef(dcInstance, inputVars));
}
;

const seedAppointmentLeMinh1Ref = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentLeMinh1');
}
seedAppointmentLeMinh1Ref.operationName = 'SeedAppointmentLeMinh1';
exports.seedAppointmentLeMinh1Ref = seedAppointmentLeMinh1Ref;

exports.seedAppointmentLeMinh1 = function seedAppointmentLeMinh1(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAppointmentLeMinh1Ref(dcInstance, inputVars));
}
;

const seedAppointmentLeMinh2Ref = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentLeMinh2');
}
seedAppointmentLeMinh2Ref.operationName = 'SeedAppointmentLeMinh2';
exports.seedAppointmentLeMinh2Ref = seedAppointmentLeMinh2Ref;

exports.seedAppointmentLeMinh2 = function seedAppointmentLeMinh2(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAppointmentLeMinh2Ref(dcInstance, inputVars));
}
;

const seedAppointmentPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentPhamThuHa');
}
seedAppointmentPhamThuHaRef.operationName = 'SeedAppointmentPhamThuHa';
exports.seedAppointmentPhamThuHaRef = seedAppointmentPhamThuHaRef;

exports.seedAppointmentPhamThuHa = function seedAppointmentPhamThuHa(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAppointmentPhamThuHaRef(dcInstance, inputVars));
}
;

const seedAppointmentNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentNguyenGiaBao');
}
seedAppointmentNguyenGiaBaoRef.operationName = 'SeedAppointmentNguyenGiaBao';
exports.seedAppointmentNguyenGiaBaoRef = seedAppointmentNguyenGiaBaoRef;

exports.seedAppointmentNguyenGiaBao = function seedAppointmentNguyenGiaBao(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAppointmentNguyenGiaBaoRef(dcInstance, inputVars));
}
;

const seedAppointmentVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAppointmentVoThanhTruc');
}
seedAppointmentVoThanhTrucRef.operationName = 'SeedAppointmentVoThanhTruc';
exports.seedAppointmentVoThanhTrucRef = seedAppointmentVoThanhTrucRef;

exports.seedAppointmentVoThanhTruc = function seedAppointmentVoThanhTruc(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAppointmentVoThanhTrucRef(dcInstance, inputVars));
}
;

const seedAiDiagnosisLeMinhRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisLeMinh');
}
seedAiDiagnosisLeMinhRef.operationName = 'SeedAiDiagnosisLeMinh';
exports.seedAiDiagnosisLeMinhRef = seedAiDiagnosisLeMinhRef;

exports.seedAiDiagnosisLeMinh = function seedAiDiagnosisLeMinh(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAiDiagnosisLeMinhRef(dcInstance, inputVars));
}
;

const seedAiDiagnosisPhamThuHaRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisPhamThuHa');
}
seedAiDiagnosisPhamThuHaRef.operationName = 'SeedAiDiagnosisPhamThuHa';
exports.seedAiDiagnosisPhamThuHaRef = seedAiDiagnosisPhamThuHaRef;

exports.seedAiDiagnosisPhamThuHa = function seedAiDiagnosisPhamThuHa(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAiDiagnosisPhamThuHaRef(dcInstance, inputVars));
}
;

const seedAiDiagnosisNguyenGiaBaoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisNguyenGiaBao');
}
seedAiDiagnosisNguyenGiaBaoRef.operationName = 'SeedAiDiagnosisNguyenGiaBao';
exports.seedAiDiagnosisNguyenGiaBaoRef = seedAiDiagnosisNguyenGiaBaoRef;

exports.seedAiDiagnosisNguyenGiaBao = function seedAiDiagnosisNguyenGiaBao(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAiDiagnosisNguyenGiaBaoRef(dcInstance, inputVars));
}
;

const seedAiDiagnosisVoThanhTrucRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SeedAiDiagnosisVoThanhTruc');
}
seedAiDiagnosisVoThanhTrucRef.operationName = 'SeedAiDiagnosisVoThanhTruc';
exports.seedAiDiagnosisVoThanhTrucRef = seedAiDiagnosisVoThanhTrucRef;

exports.seedAiDiagnosisVoThanhTruc = function seedAiDiagnosisVoThanhTruc(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(seedAiDiagnosisVoThanhTrucRef(dcInstance, inputVars));
}
;

const getLandingWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLandingWorkspace');
}
getLandingWorkspaceRef.operationName = 'GetLandingWorkspace';
exports.getLandingWorkspaceRef = getLandingWorkspaceRef;

exports.getLandingWorkspace = function getLandingWorkspace(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getLandingWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getZaloContactsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetZaloContacts');
}
getZaloContactsRef.operationName = 'GetZaloContacts';
exports.getZaloContactsRef = getZaloContactsRef;

exports.getZaloContacts = function getZaloContacts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getZaloContactsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getDashboardHomeWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardHomeWorkspace', inputVars);
}
getDashboardHomeWorkspaceRef.operationName = 'GetDashboardHomeWorkspace';
exports.getDashboardHomeWorkspaceRef = getDashboardHomeWorkspaceRef;

exports.getDashboardHomeWorkspace = function getDashboardHomeWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getDashboardHomeWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPatientWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPatientWorkspace', inputVars);
}
getPatientWorkspaceRef.operationName = 'GetPatientWorkspace';
exports.getPatientWorkspaceRef = getPatientWorkspaceRef;

exports.getPatientWorkspace = function getPatientWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPatientWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getScheduleWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetScheduleWorkspace', inputVars);
}
getScheduleWorkspaceRef.operationName = 'GetScheduleWorkspace';
exports.getScheduleWorkspaceRef = getScheduleWorkspaceRef;

exports.getScheduleWorkspace = function getScheduleWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getScheduleWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getConsultationWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConsultationWorkspace', inputVars);
}
getConsultationWorkspaceRef.operationName = 'GetConsultationWorkspace';
exports.getConsultationWorkspaceRef = getConsultationWorkspaceRef;

exports.getConsultationWorkspace = function getConsultationWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getConsultationWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getAiDiagnosisWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAiDiagnosisWorkspace', inputVars);
}
getAiDiagnosisWorkspaceRef.operationName = 'GetAiDiagnosisWorkspace';
exports.getAiDiagnosisWorkspaceRef = getAiDiagnosisWorkspaceRef;

exports.getAiDiagnosisWorkspace = function getAiDiagnosisWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAiDiagnosisWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPharmacyWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPharmacyWorkspace', inputVars);
}
getPharmacyWorkspaceRef.operationName = 'GetPharmacyWorkspace';
exports.getPharmacyWorkspaceRef = getPharmacyWorkspaceRef;

exports.getPharmacyWorkspace = function getPharmacyWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPharmacyWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getReportsWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReportsWorkspace');
}
getReportsWorkspaceRef.operationName = 'GetReportsWorkspace';
exports.getReportsWorkspaceRef = getReportsWorkspaceRef;

exports.getReportsWorkspace = function getReportsWorkspace(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getReportsWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getDoctorProfileWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctorProfileWorkspace', inputVars);
}
getDoctorProfileWorkspaceRef.operationName = 'GetDoctorProfileWorkspace';
exports.getDoctorProfileWorkspaceRef = getDoctorProfileWorkspaceRef;

exports.getDoctorProfileWorkspace = function getDoctorProfileWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getDoctorProfileWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getSettingsWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSettingsWorkspace', inputVars);
}
getSettingsWorkspaceRef.operationName = 'GetSettingsWorkspace';
exports.getSettingsWorkspaceRef = getSettingsWorkspaceRef;

exports.getSettingsWorkspace = function getSettingsWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSettingsWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getRecordDigitizationWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecordDigitizationWorkspace');
}
getRecordDigitizationWorkspaceRef.operationName = 'GetRecordDigitizationWorkspace';
exports.getRecordDigitizationWorkspaceRef = getRecordDigitizationWorkspaceRef;

exports.getRecordDigitizationWorkspace = function getRecordDigitizationWorkspace(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getRecordDigitizationWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
