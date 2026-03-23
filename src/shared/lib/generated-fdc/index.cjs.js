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

const createContactLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateContactLead', inputVars);
}
createContactLeadRef.operationName = 'CreateContactLead';
exports.createContactLeadRef = createContactLeadRef;

exports.createContactLead = function createContactLead(dcOrVars, vars) {
  return executeMutation(createContactLeadRef(dcOrVars, vars));
};

const upsertZaloContactRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertZaloContact', inputVars);
}
upsertZaloContactRef.operationName = 'UpsertZaloContact';
exports.upsertZaloContactRef = upsertZaloContactRef;

exports.upsertZaloContact = function upsertZaloContact(dcOrVars, vars) {
  return executeMutation(upsertZaloContactRef(dcOrVars, vars));
};

const upsertDoctorProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorProfile', inputVars);
}
upsertDoctorProfileRef.operationName = 'UpsertDoctorProfile';
exports.upsertDoctorProfileRef = upsertDoctorProfileRef;

exports.upsertDoctorProfile = function upsertDoctorProfile(dcOrVars, vars) {
  return executeMutation(upsertDoctorProfileRef(dcOrVars, vars));
};

const upsertNotificationPreferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertNotificationPreference', inputVars);
}
upsertNotificationPreferenceRef.operationName = 'UpsertNotificationPreference';
exports.upsertNotificationPreferenceRef = upsertNotificationPreferenceRef;

exports.upsertNotificationPreference = function upsertNotificationPreference(dcOrVars, vars) {
  return executeMutation(upsertNotificationPreferenceRef(dcOrVars, vars));
};

const upsertWorkingScheduleSlotRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertWorkingScheduleSlot', inputVars);
}
upsertWorkingScheduleSlotRef.operationName = 'UpsertWorkingScheduleSlot';
exports.upsertWorkingScheduleSlotRef = upsertWorkingScheduleSlotRef;

exports.upsertWorkingScheduleSlot = function upsertWorkingScheduleSlot(dcOrVars, vars) {
  return executeMutation(upsertWorkingScheduleSlotRef(dcOrVars, vars));
};

const upsertDigitalSignatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitalSignature', inputVars);
}
upsertDigitalSignatureRef.operationName = 'UpsertDigitalSignature';
exports.upsertDigitalSignatureRef = upsertDigitalSignatureRef;

exports.upsertDigitalSignature = function upsertDigitalSignature(dcOrVars, vars) {
  return executeMutation(upsertDigitalSignatureRef(dcOrVars, vars));
};

const createSupportRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSupportRequest', inputVars);
}
createSupportRequestRef.operationName = 'CreateSupportRequest';
exports.createSupportRequestRef = createSupportRequestRef;

exports.createSupportRequest = function createSupportRequest(dcOrVars, vars) {
  return executeMutation(createSupportRequestRef(dcOrVars, vars));
};

const upsertAssistantMessageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAssistantMessage', inputVars);
}
upsertAssistantMessageRef.operationName = 'UpsertAssistantMessage';
exports.upsertAssistantMessageRef = upsertAssistantMessageRef;

exports.upsertAssistantMessage = function upsertAssistantMessage(dcOrVars, vars) {
  return executeMutation(upsertAssistantMessageRef(dcOrVars, vars));
};

const upsertScheduleEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertScheduleEvent', inputVars);
}
upsertScheduleEventRef.operationName = 'UpsertScheduleEvent';
exports.upsertScheduleEventRef = upsertScheduleEventRef;

exports.upsertScheduleEvent = function upsertScheduleEvent(dcOrVars, vars) {
  return executeMutation(upsertScheduleEventRef(dcOrVars, vars));
};

const upsertScheduleAttachmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertScheduleAttachment', inputVars);
}
upsertScheduleAttachmentRef.operationName = 'UpsertScheduleAttachment';
exports.upsertScheduleAttachmentRef = upsertScheduleAttachmentRef;

exports.upsertScheduleAttachment = function upsertScheduleAttachment(dcOrVars, vars) {
  return executeMutation(upsertScheduleAttachmentRef(dcOrVars, vars));
};

const createShiftSwapRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateShiftSwapRequest', inputVars);
}
createShiftSwapRequestRef.operationName = 'CreateShiftSwapRequest';
exports.createShiftSwapRequestRef = createShiftSwapRequestRef;

exports.createShiftSwapRequest = function createShiftSwapRequest(dcOrVars, vars) {
  return executeMutation(createShiftSwapRequestRef(dcOrVars, vars));
};

const upsertPrescriptionDraftRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionDraft', inputVars);
}
upsertPrescriptionDraftRef.operationName = 'UpsertPrescriptionDraft';
exports.upsertPrescriptionDraftRef = upsertPrescriptionDraftRef;

exports.upsertPrescriptionDraft = function upsertPrescriptionDraft(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionDraftRef(dcOrVars, vars));
};

const upsertPrescriptionDraftItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionDraftItem', inputVars);
}
upsertPrescriptionDraftItemRef.operationName = 'UpsertPrescriptionDraftItem';
exports.upsertPrescriptionDraftItemRef = upsertPrescriptionDraftItemRef;

exports.upsertPrescriptionDraftItem = function upsertPrescriptionDraftItem(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionDraftItemRef(dcOrVars, vars));
};

const deletePrescriptionDraftItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePrescriptionDraftItem', inputVars);
}
deletePrescriptionDraftItemRef.operationName = 'DeletePrescriptionDraftItem';
exports.deletePrescriptionDraftItemRef = deletePrescriptionDraftItemRef;

exports.deletePrescriptionDraftItem = function deletePrescriptionDraftItem(dcOrVars, vars) {
  return executeMutation(deletePrescriptionDraftItemRef(dcOrVars, vars));
};

const updateAiDiagnosisReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAiDiagnosisReview', inputVars);
}
updateAiDiagnosisReviewRef.operationName = 'UpdateAiDiagnosisReview';
exports.updateAiDiagnosisReviewRef = updateAiDiagnosisReviewRef;

exports.updateAiDiagnosisReview = function updateAiDiagnosisReview(dcOrVars, vars) {
  return executeMutation(updateAiDiagnosisReviewRef(dcOrVars, vars));
};

const upsertAiDiagnosisReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiDiagnosisReference', inputVars);
}
upsertAiDiagnosisReferenceRef.operationName = 'UpsertAiDiagnosisReference';
exports.upsertAiDiagnosisReferenceRef = upsertAiDiagnosisReferenceRef;

exports.upsertAiDiagnosisReference = function upsertAiDiagnosisReference(dcOrVars, vars) {
  return executeMutation(upsertAiDiagnosisReferenceRef(dcOrVars, vars));
};

const upsertAppointmentAttachmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAppointmentAttachment', inputVars);
}
upsertAppointmentAttachmentRef.operationName = 'UpsertAppointmentAttachment';
exports.upsertAppointmentAttachmentRef = upsertAppointmentAttachmentRef;

exports.upsertAppointmentAttachment = function upsertAppointmentAttachment(dcOrVars, vars) {
  return executeMutation(upsertAppointmentAttachmentRef(dcOrVars, vars));
};

const upsertPatientProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPatientProfile', inputVars);
}
upsertPatientProfileRef.operationName = 'UpsertPatientProfile';
exports.upsertPatientProfileRef = upsertPatientProfileRef;

exports.upsertPatientProfile = function upsertPatientProfile(dcOrVars, vars) {
  return executeMutation(upsertPatientProfileRef(dcOrVars, vars));
};

const upsertFamilyLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertFamilyLink', inputVars);
}
upsertFamilyLinkRef.operationName = 'UpsertFamilyLink';
exports.upsertFamilyLinkRef = upsertFamilyLinkRef;

exports.upsertFamilyLink = function upsertFamilyLink(dcOrVars, vars) {
  return executeMutation(upsertFamilyLinkRef(dcOrVars, vars));
};

const upsertAppointmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAppointment', inputVars);
}
upsertAppointmentRef.operationName = 'UpsertAppointment';
exports.upsertAppointmentRef = upsertAppointmentRef;

exports.upsertAppointment = function upsertAppointment(dcOrVars, vars) {
  return executeMutation(upsertAppointmentRef(dcOrVars, vars));
};

const upsertAiDiagnosisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertAiDiagnosis', inputVars);
}
upsertAiDiagnosisRef.operationName = 'UpsertAiDiagnosis';
exports.upsertAiDiagnosisRef = upsertAiDiagnosisRef;

exports.upsertAiDiagnosis = function upsertAiDiagnosis(dcOrVars, vars) {
  return executeMutation(upsertAiDiagnosisRef(dcOrVars, vars));
};

const upsertConsultationRoomRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertConsultationRoom', inputVars);
}
upsertConsultationRoomRef.operationName = 'UpsertConsultationRoom';
exports.upsertConsultationRoomRef = upsertConsultationRoomRef;

exports.upsertConsultationRoom = function upsertConsultationRoom(dcOrVars, vars) {
  return executeMutation(upsertConsultationRoomRef(dcOrVars, vars));
};

const upsertLandingHeroContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingHeroContent', inputVars);
}
upsertLandingHeroContentRef.operationName = 'UpsertLandingHeroContent';
exports.upsertLandingHeroContentRef = upsertLandingHeroContentRef;

exports.upsertLandingHeroContent = function upsertLandingHeroContent(dcOrVars, vars) {
  return executeMutation(upsertLandingHeroContentRef(dcOrVars, vars));
};

const upsertLandingFeatureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingFeature', inputVars);
}
upsertLandingFeatureRef.operationName = 'UpsertLandingFeature';
exports.upsertLandingFeatureRef = upsertLandingFeatureRef;

exports.upsertLandingFeature = function upsertLandingFeature(dcOrVars, vars) {
  return executeMutation(upsertLandingFeatureRef(dcOrVars, vars));
};

const upsertLandingArticleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertLandingArticle', inputVars);
}
upsertLandingArticleRef.operationName = 'UpsertLandingArticle';
exports.upsertLandingArticleRef = upsertLandingArticleRef;

exports.upsertLandingArticle = function upsertLandingArticle(dcOrVars, vars) {
  return executeMutation(upsertLandingArticleRef(dcOrVars, vars));
};

const upsertSupportContactInfoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSupportContactInfo', inputVars);
}
upsertSupportContactInfoRef.operationName = 'UpsertSupportContactInfo';
exports.upsertSupportContactInfoRef = upsertSupportContactInfoRef;

exports.upsertSupportContactInfo = function upsertSupportContactInfo(dcOrVars, vars) {
  return executeMutation(upsertSupportContactInfoRef(dcOrVars, vars));
};

const upsertDoctorProfileMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorProfileMetric', inputVars);
}
upsertDoctorProfileMetricRef.operationName = 'UpsertDoctorProfileMetric';
exports.upsertDoctorProfileMetricRef = upsertDoctorProfileMetricRef;

exports.upsertDoctorProfileMetric = function upsertDoctorProfileMetric(dcOrVars, vars) {
  return executeMutation(upsertDoctorProfileMetricRef(dcOrVars, vars));
};

const upsertDashboardSpotlightCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDashboardSpotlightCase', inputVars);
}
upsertDashboardSpotlightCaseRef.operationName = 'UpsertDashboardSpotlightCase';
exports.upsertDashboardSpotlightCaseRef = upsertDashboardSpotlightCaseRef;

exports.upsertDashboardSpotlightCase = function upsertDashboardSpotlightCase(dcOrVars, vars) {
  return executeMutation(upsertDashboardSpotlightCaseRef(dcOrVars, vars));
};

const upsertServiceRecordRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertServiceRecord', inputVars);
}
upsertServiceRecordRef.operationName = 'UpsertServiceRecord';
exports.upsertServiceRecordRef = upsertServiceRecordRef;

exports.upsertServiceRecord = function upsertServiceRecord(dcOrVars, vars) {
  return executeMutation(upsertServiceRecordRef(dcOrVars, vars));
};

const upsertDoctorAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDoctorAvailability', inputVars);
}
upsertDoctorAvailabilityRef.operationName = 'UpsertDoctorAvailability';
exports.upsertDoctorAvailabilityRef = upsertDoctorAvailabilityRef;

exports.upsertDoctorAvailability = function upsertDoctorAvailability(dcOrVars, vars) {
  return executeMutation(upsertDoctorAvailabilityRef(dcOrVars, vars));
};

const upsertPrescriptionTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionTemplate', inputVars);
}
upsertPrescriptionTemplateRef.operationName = 'UpsertPrescriptionTemplate';
exports.upsertPrescriptionTemplateRef = upsertPrescriptionTemplateRef;

exports.upsertPrescriptionTemplate = function upsertPrescriptionTemplate(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionTemplateRef(dcOrVars, vars));
};

const upsertPrescriptionTemplateDrugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPrescriptionTemplateDrug', inputVars);
}
upsertPrescriptionTemplateDrugRef.operationName = 'UpsertPrescriptionTemplateDrug';
exports.upsertPrescriptionTemplateDrugRef = upsertPrescriptionTemplateDrugRef;

exports.upsertPrescriptionTemplateDrug = function upsertPrescriptionTemplateDrug(dcOrVars, vars) {
  return executeMutation(upsertPrescriptionTemplateDrugRef(dcOrVars, vars));
};

const upsertDrugCatalogItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDrugCatalogItem', inputVars);
}
upsertDrugCatalogItemRef.operationName = 'UpsertDrugCatalogItem';
exports.upsertDrugCatalogItemRef = upsertDrugCatalogItemRef;

exports.upsertDrugCatalogItem = function upsertDrugCatalogItem(dcOrVars, vars) {
  return executeMutation(upsertDrugCatalogItemRef(dcOrVars, vars));
};

const upsertReportSummaryMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportSummaryMetric', inputVars);
}
upsertReportSummaryMetricRef.operationName = 'UpsertReportSummaryMetric';
exports.upsertReportSummaryMetricRef = upsertReportSummaryMetricRef;

exports.upsertReportSummaryMetric = function upsertReportSummaryMetric(dcOrVars, vars) {
  return executeMutation(upsertReportSummaryMetricRef(dcOrVars, vars));
};

const upsertReportStageDistributionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportStageDistribution', inputVars);
}
upsertReportStageDistributionRef.operationName = 'UpsertReportStageDistribution';
exports.upsertReportStageDistributionRef = upsertReportStageDistributionRef;

exports.upsertReportStageDistribution = function upsertReportStageDistribution(dcOrVars, vars) {
  return executeMutation(upsertReportStageDistributionRef(dcOrVars, vars));
};

const upsertReportTrendPointRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportTrendPoint', inputVars);
}
upsertReportTrendPointRef.operationName = 'UpsertReportTrendPoint';
exports.upsertReportTrendPointRef = upsertReportTrendPointRef;

exports.upsertReportTrendPoint = function upsertReportTrendPoint(dcOrVars, vars) {
  return executeMutation(upsertReportTrendPointRef(dcOrVars, vars));
};

const upsertReportAlertCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertReportAlertCase', inputVars);
}
upsertReportAlertCaseRef.operationName = 'UpsertReportAlertCase';
exports.upsertReportAlertCaseRef = upsertReportAlertCaseRef;

exports.upsertReportAlertCase = function upsertReportAlertCase(dcOrVars, vars) {
  return executeMutation(upsertReportAlertCaseRef(dcOrVars, vars));
};

const upsertDigitizationJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitizationJob', inputVars);
}
upsertDigitizationJobRef.operationName = 'UpsertDigitizationJob';
exports.upsertDigitizationJobRef = upsertDigitizationJobRef;

exports.upsertDigitizationJob = function upsertDigitizationJob(dcOrVars, vars) {
  return executeMutation(upsertDigitizationJobRef(dcOrVars, vars));
};

const upsertDigitizationMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDigitizationMetric', inputVars);
}
upsertDigitizationMetricRef.operationName = 'UpsertDigitizationMetric';
exports.upsertDigitizationMetricRef = upsertDigitizationMetricRef;

exports.upsertDigitizationMetric = function upsertDigitizationMetric(dcOrVars, vars) {
  return executeMutation(upsertDigitizationMetricRef(dcOrVars, vars));
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

const getLandingWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLandingWorkspace');
}
getLandingWorkspaceRef.operationName = 'GetLandingWorkspace';
exports.getLandingWorkspaceRef = getLandingWorkspaceRef;

exports.getLandingWorkspace = function getLandingWorkspace(dc) {
  return executeQuery(getLandingWorkspaceRef(dc));
};

const getZaloContactsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetZaloContacts');
}
getZaloContactsRef.operationName = 'GetZaloContacts';
exports.getZaloContactsRef = getZaloContactsRef;

exports.getZaloContacts = function getZaloContacts(dc) {
  return executeQuery(getZaloContactsRef(dc));
};

const getDashboardHomeWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardHomeWorkspace', inputVars);
}
getDashboardHomeWorkspaceRef.operationName = 'GetDashboardHomeWorkspace';
exports.getDashboardHomeWorkspaceRef = getDashboardHomeWorkspaceRef;

exports.getDashboardHomeWorkspace = function getDashboardHomeWorkspace(dcOrVars, vars) {
  return executeQuery(getDashboardHomeWorkspaceRef(dcOrVars, vars));
};

const getPatientWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPatientWorkspace', inputVars);
}
getPatientWorkspaceRef.operationName = 'GetPatientWorkspace';
exports.getPatientWorkspaceRef = getPatientWorkspaceRef;

exports.getPatientWorkspace = function getPatientWorkspace(dcOrVars, vars) {
  return executeQuery(getPatientWorkspaceRef(dcOrVars, vars));
};

const getScheduleWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetScheduleWorkspace', inputVars);
}
getScheduleWorkspaceRef.operationName = 'GetScheduleWorkspace';
exports.getScheduleWorkspaceRef = getScheduleWorkspaceRef;

exports.getScheduleWorkspace = function getScheduleWorkspace(dcOrVars, vars) {
  return executeQuery(getScheduleWorkspaceRef(dcOrVars, vars));
};

const getConsultationWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConsultationWorkspace', inputVars);
}
getConsultationWorkspaceRef.operationName = 'GetConsultationWorkspace';
exports.getConsultationWorkspaceRef = getConsultationWorkspaceRef;

exports.getConsultationWorkspace = function getConsultationWorkspace(dcOrVars, vars) {
  return executeQuery(getConsultationWorkspaceRef(dcOrVars, vars));
};

const getAiDiagnosisWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAiDiagnosisWorkspace', inputVars);
}
getAiDiagnosisWorkspaceRef.operationName = 'GetAiDiagnosisWorkspace';
exports.getAiDiagnosisWorkspaceRef = getAiDiagnosisWorkspaceRef;

exports.getAiDiagnosisWorkspace = function getAiDiagnosisWorkspace(dcOrVars, vars) {
  return executeQuery(getAiDiagnosisWorkspaceRef(dcOrVars, vars));
};

const getPharmacyWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPharmacyWorkspace', inputVars);
}
getPharmacyWorkspaceRef.operationName = 'GetPharmacyWorkspace';
exports.getPharmacyWorkspaceRef = getPharmacyWorkspaceRef;

exports.getPharmacyWorkspace = function getPharmacyWorkspace(dcOrVars, vars) {
  return executeQuery(getPharmacyWorkspaceRef(dcOrVars, vars));
};

const getReportsWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetReportsWorkspace');
}
getReportsWorkspaceRef.operationName = 'GetReportsWorkspace';
exports.getReportsWorkspaceRef = getReportsWorkspaceRef;

exports.getReportsWorkspace = function getReportsWorkspace(dc) {
  return executeQuery(getReportsWorkspaceRef(dc));
};

const getDoctorProfileWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDoctorProfileWorkspace', inputVars);
}
getDoctorProfileWorkspaceRef.operationName = 'GetDoctorProfileWorkspace';
exports.getDoctorProfileWorkspaceRef = getDoctorProfileWorkspaceRef;

exports.getDoctorProfileWorkspace = function getDoctorProfileWorkspace(dcOrVars, vars) {
  return executeQuery(getDoctorProfileWorkspaceRef(dcOrVars, vars));
};

const getSettingsWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSettingsWorkspace', inputVars);
}
getSettingsWorkspaceRef.operationName = 'GetSettingsWorkspace';
exports.getSettingsWorkspaceRef = getSettingsWorkspaceRef;

exports.getSettingsWorkspace = function getSettingsWorkspace(dcOrVars, vars) {
  return executeQuery(getSettingsWorkspaceRef(dcOrVars, vars));
};

const getRecordDigitizationWorkspaceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecordDigitizationWorkspace');
}
getRecordDigitizationWorkspaceRef.operationName = 'GetRecordDigitizationWorkspace';
exports.getRecordDigitizationWorkspaceRef = getRecordDigitizationWorkspaceRef;

exports.getRecordDigitizationWorkspace = function getRecordDigitizationWorkspace(dc) {
  return executeQuery(getRecordDigitizationWorkspaceRef(dc));
};
