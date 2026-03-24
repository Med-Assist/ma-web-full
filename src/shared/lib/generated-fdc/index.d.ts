import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddTestPatientData {
  user_upsert: User_Key;
}

export interface AiDiagnosisReference_Key {
  id: string;
  __typename?: 'AiDiagnosisReference_Key';
}

export interface AiDiagnosis_Key {
  id: UUIDString;
  __typename?: 'AiDiagnosis_Key';
}

export interface AppointmentAttachment_Key {
  id: string;
  __typename?: 'AppointmentAttachment_Key';
}

export interface Appointment_Key {
  id: UUIDString;
  __typename?: 'Appointment_Key';
}

export interface AssistantMessage_Key {
  id: string;
  __typename?: 'AssistantMessage_Key';
}

export interface ConsultationRoom_Key {
  id: string;
  __typename?: 'ConsultationRoom_Key';
}

export interface ContactLead_Key {
  id: UUIDString;
  __typename?: 'ContactLead_Key';
}

export interface CreateAiDiagnosisData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}

export interface CreateAiDiagnosisVariables {
  patientUid: string;
  doctorUid?: string | null;
  fundusImageUrl: string;
  riskLevel: string;
  confidenceScore: number;
  aiAnalysis?: string | null;
  doctorAdvice?: string | null;
  stageLabel?: string | null;
  aiScore?: string | null;
  examDate?: string | null;
  deviceName?: string | null;
  technicianName?: string | null;
  archiveImagePath?: string | null;
  doctorApproved?: boolean | null;
  reportSummary?: string | null;
}

export interface CreateAppointmentData {
  appointment_insert: Appointment_Key;
}

export interface CreateAppointmentVariables {
  patientUid: string;
  doctorUid?: string | null;
  doctorName: string;
  scheduledAt: TimestampString;
  endAt?: TimestampString | null;
  status?: string | null;
  meetingLink?: string | null;
  symptoms?: string | null;
  specialty?: string | null;
  appointmentType?: string | null;
  queueLabel?: string | null;
  currentDoctorNote?: string | null;
  countdownLabel?: string | null;
}

export interface CreateContactLeadData {
  contactLead_insert: ContactLead_Key;
}

export interface CreateContactLeadVariables {
  name: string;
  email: string;
  role: string;
  message: string;
  createdAt: string;
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

export interface CreateShiftSwapRequestData {
  shiftSwapRequest_insert: ShiftSwapRequest_Key;
}

export interface CreateShiftSwapRequestVariables {
  requesterUid: string;
  targetDoctorUid: string;
  department: string;
  shiftKey: string;
  createdAt: string;
}

export interface CreateSupportRequestData {
  supportRequest_insert: SupportRequest_Key;
}

export interface CreateSupportRequestVariables {
  doctorUid?: string | null;
  source: string;
  message: string;
  createdAt: string;
}

export interface CreateUserData {
  user_upsert: User_Key;
}

export interface CreateUserVariables {
  uid: string;
  email: string;
  role: string;
  displayName: string;
  userCode?: string | null;
  status?: string | null;
  phone?: string | null;
  photoURL?: string | null;
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  authProvider?: string | null;
  passwordSet?: boolean | null;
  passwordLastChangedAt?: string | null;
}

export interface DashboardSpotlightCase_Key {
  id: string;
  __typename?: 'DashboardSpotlightCase_Key';
}

export interface DeletePrescriptionDraftItemData {
  prescriptionDraftItem_delete?: PrescriptionDraftItem_Key | null;
}

export interface DeletePrescriptionDraftItemVariables {
  id: string;
}

export interface DigitalSignature_Key {
  id: string;
  __typename?: 'DigitalSignature_Key';
}

export interface DigitizationJob_Key {
  id: string;
  __typename?: 'DigitizationJob_Key';
}

export interface DigitizationMetric_Key {
  id: string;
  __typename?: 'DigitizationMetric_Key';
}

export interface DoctorAvailability_Key {
  id: string;
  __typename?: 'DoctorAvailability_Key';
}

export interface DoctorProfileMetric_Key {
  id: string;
  __typename?: 'DoctorProfileMetric_Key';
}

export interface DoctorProfile_Key {
  id: string;
  __typename?: 'DoctorProfile_Key';
}

export interface DrugCatalogItem_Key {
  id: string;
  __typename?: 'DrugCatalogItem_Key';
}

export interface FamilyLink_Key {
  id: UUIDString;
  __typename?: 'FamilyLink_Key';
}

export interface GetAiDiagnosesData {
  aiDiagnoses: ({
    id: UUIDString;
    patientUid: string;
    doctorUid?: string | null;
    fundusImageUrl: string;
    riskLevel: string;
    confidenceScore: number;
    aiAnalysis?: string | null;
    doctorAdvice?: string | null;
    stageLabel?: string | null;
    aiScore?: string | null;
    examDate?: string | null;
    deviceName?: string | null;
    technicianName?: string | null;
    archiveImagePath?: string | null;
    doctorApproved?: boolean | null;
    reportSummary?: string | null;
    patient: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      status?: string | null;
      role: string;
      phone?: string | null;
    } & User_Key;
      doctor?: {
        uid: string;
        displayName: string;
        email: string;
        userCode?: string | null;
        photoURL?: string | null;
      } & User_Key;
  } & AiDiagnosis_Key)[];
}

export interface GetAiDiagnosisWorkspaceData {
  aiDiagnoses: ({
    id: UUIDString;
    patientUid: string;
    doctorUid?: string | null;
    fundusImageUrl: string;
    riskLevel: string;
    confidenceScore: number;
    aiAnalysis?: string | null;
    doctorAdvice?: string | null;
    stageLabel?: string | null;
    aiScore?: string | null;
    examDate?: string | null;
    deviceName?: string | null;
    technicianName?: string | null;
    archiveImagePath?: string | null;
    doctorApproved?: boolean | null;
    reportSummary?: string | null;
    patient: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      phone?: string | null;
    } & User_Key;
      doctor?: {
        uid: string;
        displayName: string;
        photoURL?: string | null;
      } & User_Key;
  } & AiDiagnosis_Key)[];
    aiDiagnosisReferences: ({
      id: string;
      diagnosisId: UUIDString;
      label: string;
      diseaseLevel: string;
      aiScore: string;
      confidence: string;
      doctorNote: string;
      archiveLabel: string;
      displayOrder: number;
    } & AiDiagnosisReference_Key)[];
}

export interface GetAiDiagnosisWorkspaceVariables {
  doctorUid: string;
}

export interface GetAllUsersData {
  users: ({
    uid: string;
    displayName: string;
    email: string;
    userCode?: string | null;
    status?: string | null;
    role: string;
    phone?: string | null;
    photoURL?: string | null;
    authProvider?: string | null;
    passwordSet?: boolean | null;
    passwordLastChangedAt?: string | null;
  } & User_Key)[];
}

export interface GetAppointmentsData {
  appointments: ({
    id: UUIDString;
    patientUid: string;
    doctorUid?: string | null;
    doctorName: string;
    scheduledAt: TimestampString;
    endAt?: TimestampString | null;
    status: string;
    meetingLink?: string | null;
    symptoms?: string | null;
    specialty?: string | null;
    appointmentType?: string | null;
    queueLabel?: string | null;
    currentDoctorNote?: string | null;
    countdownLabel?: string | null;
    patient: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      status?: string | null;
      role: string;
      phone?: string | null;
    } & User_Key;
      doctor?: {
        uid: string;
        displayName: string;
        email: string;
        userCode?: string | null;
        phone?: string | null;
        photoURL?: string | null;
      } & User_Key;
  } & Appointment_Key)[];
}

export interface GetConsultationWorkspaceData {
  appointments: ({
    id: UUIDString;
    patientUid: string;
    doctorUid?: string | null;
    doctorName: string;
    scheduledAt: TimestampString;
    endAt?: TimestampString | null;
    status: string;
    meetingLink?: string | null;
    symptoms?: string | null;
    specialty?: string | null;
    appointmentType?: string | null;
    queueLabel?: string | null;
    currentDoctorNote?: string | null;
    countdownLabel?: string | null;
    patient: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      phone?: string | null;
      photoURL?: string | null;
    } & User_Key;
  } & Appointment_Key)[];
    appointmentAttachments: ({
      id: string;
      appointmentId: UUIDString;
      fileName: string;
      fileType: string;
      fileUrl?: string | null;
      displayOrder: number;
    } & AppointmentAttachment_Key)[];
      consultationRooms: ({
        id: string;
        displayDate: string;
        status: string;
        badge: string;
        timeLabel: string;
        title: string;
        description: string;
        membersLabel: string;
        actionLabel?: string | null;
        displayOrder: number;
      } & ConsultationRoom_Key)[];
}

export interface GetConsultationWorkspaceVariables {
  doctorUid: string;
}

export interface GetDashboardHomeWorkspaceData {
  doctorProfiles: ({
    id: string;
    doctorUid: string;
    fullName: string;
    dob?: string | null;
    gender?: string | null;
    phone?: string | null;
    specialty?: string | null;
    certNumber?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    verificationStatus: string;
    verificationDocumentName?: string | null;
    verificationDocumentDataUrl?: string | null;
    verificationUpdatedAt?: string | null;
    updatedAt?: string | null;
  } & DoctorProfile_Key)[];
    users: ({
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      status?: string | null;
      role: string;
      phone?: string | null;
      photoURL?: string | null;
    } & User_Key)[];
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
      } & PatientProfile_Key)[];
        aiDiagnoses: ({
          id: UUIDString;
          patientUid: string;
          doctorUid?: string | null;
          riskLevel: string;
          confidenceScore: number;
          stageLabel?: string | null;
          examDate?: string | null;
        } & AiDiagnosis_Key)[];
          appointments: ({
            id: UUIDString;
            patientUid: string;
            doctorUid?: string | null;
            doctorName: string;
            scheduledAt: TimestampString;
            endAt?: TimestampString | null;
            status: string;
            specialty?: string | null;
            appointmentType?: string | null;
            queueLabel?: string | null;
            countdownLabel?: string | null;
            symptoms?: string | null;
            meetingLink?: string | null;
            currentDoctorNote?: string | null;
            patient: {
              uid: string;
              displayName: string;
              email: string;
              userCode?: string | null;
              phone?: string | null;
              photoURL?: string | null;
            } & User_Key;
          } & Appointment_Key)[];
            dashboardSpotlightCases: ({
              id: string;
              patientName: string;
              patientCode: string;
              dob: string;
              age: number;
              gender: string;
              symptoms: string;
              externalRecordNote: string;
              primaryServiceTitle: string;
              primaryServiceSubtitle: string;
              secondaryServiceTitle: string;
              secondaryServiceSubtitle: string;
              avatarUrl: string;
            } & DashboardSpotlightCase_Key)[];
              serviceRecords: ({
                id: string;
                spotlightCaseId?: string | null;
                patientName: string;
                patientCode: string;
                serviceName: string;
                specialty: string;
                doctorName: string;
                dateTimeLabel: string;
                diagnosis: string;
                quantity: number;
                unitPrice: number;
                insuranceCoveragePercent: number;
                displayOrder: number;
              } & ServiceRecord_Key)[];
                assistantMessages: ({
                  id: string;
                  threadKey: string;
                  role: string;
                  content: string;
                  timestampLabel: string;
                  createdAt: string;
                  displayOrder: number;
                } & AssistantMessage_Key)[];
                  scheduleEvents: ({
                    id: string;
                    doctorUid: string;
                    patientUid?: string | null;
                    title: string;
                    eventType: string;
                    department?: string | null;
                    scheduledDate: string;
                    startTime: string;
                    endTime: string;
                    status: string;
                    colorTone?: string | null;
                    roomName?: string | null;
                    insuranceNumber?: string | null;
                    patientNameOverride?: string | null;
                    timeString?: string | null;
                    priority?: string | null;
                    meetingLink?: string | null;
                    notes?: string | null;
                    attachmentsCount: number;
                    displayOrder: number;
                    isCompleted: boolean;
                    isDeleted: boolean;
                    patient?: {
                      uid: string;
                      displayName: string;
                      userCode?: string | null;
                      phone?: string | null;
                    } & User_Key;
                  } & ScheduleEvent_Key)[];
}

export interface GetDashboardHomeWorkspaceVariables {
  doctorUid: string;
}

export interface GetDoctorProfileWorkspaceData {
  doctorProfiles: ({
    id: string;
    doctorUid: string;
    fullName: string;
    dob?: string | null;
    gender?: string | null;
    phone?: string | null;
    specialty?: string | null;
    certNumber?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    verificationStatus: string;
    verificationDocumentName?: string | null;
    verificationDocumentDataUrl?: string | null;
    verificationUpdatedAt?: string | null;
    updatedAt?: string | null;
  } & DoctorProfile_Key)[];
    doctorProfileMetrics: ({
      id: string;
      doctorProfileId: string;
      section: string;
      label: string;
      valueNumber?: number | null;
      valueText?: string | null;
      helper?: string | null;
      countLabel?: string | null;
      accent?: string | null;
      isActive?: boolean | null;
      displayOrder: number;
    } & DoctorProfileMetric_Key)[];
}

export interface GetDoctorProfileWorkspaceVariables {
  doctorUid: string;
}

export interface GetDoctorsData {
  users: ({
    uid: string;
    displayName: string;
    email: string;
    userCode?: string | null;
    role: string;
    status?: string | null;
    phone?: string | null;
    photoURL?: string | null;
  } & User_Key)[];
}

export interface GetLandingWorkspaceData {
  landingHeroContents: ({
    id: string;
    badgeText: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    body: string;
    primaryButtonLabel: string;
    primaryButtonTarget: string;
    secondaryButtonLabel: string;
    secondaryButtonTarget: string;
    patientCodeLabel: string;
    accuracyLabel: string;
    imagePath: string;
  } & LandingHeroContent_Key)[];
    landingFeatures: ({
      id: string;
      section: string;
      iconKey: string;
      title: string;
      description: string;
      displayOrder: number;
    } & LandingFeature_Key)[];
      landingArticles: ({
        id: string;
        title: string;
        excerpt: string;
        content: string;
        link?: string | null;
        imagePath: string;
        iconKey: string;
        displayOrder: number;
      } & LandingArticle_Key)[];
        supportContactInfos: ({
          id: string;
          centerBadge: string;
          headlinePrefix: string;
          headlineAccent: string;
          headlineBrand: string;
          description: string;
          email: string;
          phone: string;
          location: string;
        } & SupportContactInfo_Key)[];
}

export interface GetPatientWorkspaceData {
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
      phone?: string | null;
      photoURL?: string | null;
    } & User_Key;
  } & PatientProfile_Key)[];
    aiDiagnoses: ({
      id: UUIDString;
      patientUid: string;
      riskLevel: string;
      confidenceScore: number;
      stageLabel?: string | null;
      examDate?: string | null;
    } & AiDiagnosis_Key)[];
      appointments: ({
        id: UUIDString;
        patientUid: string;
        status: string;
        scheduledAt: TimestampString;
      } & Appointment_Key)[];
}

export interface GetPatientWorkspaceVariables {
  doctorUid: string;
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
      phone?: string | null;
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

export interface GetPharmacyWorkspaceData {
  prescriptionTemplates: ({
    id: string;
    title: string;
    subtitle: string;
    specialty: string;
    badge: string;
    summary: string;
    iconKey: string;
    displayOrder: number;
  } & PrescriptionTemplate_Key)[];
    prescriptionTemplateDrugs: ({
      id: string;
      templateId: string;
      name: string;
      description: string;
      dosage: string;
      quantity: string;
      unit: string;
      timing: string;
      duration: string;
      price: number;
      displayOrder: number;
    } & PrescriptionTemplateDrug_Key)[];
      drugCatalogItems: ({
        id: string;
        name: string;
        description: string;
        activeIngredient?: string | null;
        unit: string;
        price: number;
        category: string;
        searchKeywords?: string | null;
        isAvailable: boolean;
      } & DrugCatalogItem_Key)[];
        prescriptionDrafts: ({
          id: string;
          doctorUid: string;
          patientUid: string;
          activeTemplateId?: string | null;
          note?: string | null;
          status: string;
          updatedAt?: string | null;
          patient: {
            uid: string;
            displayName: string;
            email: string;
            userCode?: string | null;
            phone?: string | null;
          } & User_Key;
        } & PrescriptionDraft_Key)[];
          prescriptionDraftItems: ({
            id: string;
            draftId: string;
            drugName: string;
            note?: string | null;
            quantity: string;
            unit: string;
            dosage: string;
            timing: string;
            duration: string;
            price: number;
            sourceType?: string | null;
            sourceId?: string | null;
            displayOrder: number;
          } & PrescriptionDraftItem_Key)[];
            patientProfiles: ({
              id: UUIDString;
              userUid: string;
              dob?: string | null;
              gender?: string | null;
              user: {
                uid: string;
                displayName: string;
                email: string;
                userCode?: string | null;
                phone?: string | null;
              } & User_Key;
            } & PatientProfile_Key)[];
}

export interface GetPharmacyWorkspaceVariables {
  doctorUid: string;
}

export interface GetRecordDigitizationWorkspaceData {
  digitizationJobs: ({
    id: string;
    title: string;
    subtitle: string;
    progressPercent: number;
    facilityName: string;
    patientName: string;
    examDate: string;
    doctorName: string;
    sourceDocumentTitle: string;
    sourceDocumentBody: string;
    historyLabel: string;
  } & DigitizationJob_Key)[];
    digitizationMetrics: ({
      id: string;
      jobId: string;
      code: string;
      label: string;
      value: string;
      status: string;
      reference?: string | null;
      tone: string;
      displayOrder: number;
    } & DigitizationMetric_Key)[];
}

export interface GetReportsWorkspaceData {
  reportSummaryMetrics: ({
    id: string;
    title: string;
    valueText: string;
    helper: string;
    delta: string;
    deltaTone: string;
    iconKey: string;
    displayOrder: number;
  } & ReportSummaryMetric_Key)[];
    reportStageDistributions: ({
      id: string;
      label: string;
      value: number;
      displayOrder: number;
    } & ReportStageDistribution_Key)[];
      reportTrendPoints: ({
        id: string;
        label: string;
        x: number;
        y: number;
        series: string;
        displayOrder: number;
      } & ReportTrendPoint_Key)[];
        reportAlertCases: ({
          id: string;
          patientUid?: string | null;
          initials: string;
          name: string;
          recordId: string;
          conclusion: string;
          phone: string;
          displayOrder: number;
        } & ReportAlertCase_Key)[];
}

export interface GetScheduleWorkspaceData {
  scheduleEvents: ({
    id: string;
    doctorUid: string;
    patientUid?: string | null;
    title: string;
    eventType: string;
    department?: string | null;
    scheduledDate: string;
    startTime: string;
    endTime: string;
    status: string;
    colorTone?: string | null;
    roomName?: string | null;
    insuranceNumber?: string | null;
    patientNameOverride?: string | null;
    timeString?: string | null;
    priority?: string | null;
    meetingLink?: string | null;
    notes?: string | null;
    attachmentsCount: number;
    displayOrder: number;
    isCompleted: boolean;
    isDeleted: boolean;
    patient?: {
      uid: string;
      displayName: string;
      email: string;
      userCode?: string | null;
      phone?: string | null;
    } & User_Key;
  } & ScheduleEvent_Key)[];
    scheduleAttachments: ({
      id: string;
      eventId: string;
      fileName: string;
      fileType: string;
      fileUrl?: string | null;
      displayOrder: number;
    } & ScheduleAttachment_Key)[];
      doctorAvailabilities: ({
        id: string;
        doctorUid: string;
        department: string;
        shiftKey: string;
        status: string;
        displayOrder: number;
        doctor: {
          uid: string;
          displayName: string;
          email: string;
          phone?: string | null;
          photoURL?: string | null;
        } & User_Key;
      } & DoctorAvailability_Key)[];
        patientProfiles: ({
          id: UUIDString;
          userUid: string;
          insuranceNumber?: string | null;
          dob?: string | null;
          gender?: string | null;
          user: {
            uid: string;
            displayName: string;
            email: string;
            userCode?: string | null;
            phone?: string | null;
          } & User_Key;
        } & PatientProfile_Key)[];
}

export interface GetScheduleWorkspaceVariables {
  doctorUid: string;
}

export interface GetSettingsWorkspaceData {
  notificationPreferences: ({
    id: string;
    doctorUid: string;
    language: string;
    newApptEmail: boolean;
    newApptApp: boolean;
    reminderEmail: boolean;
    reminderApp: boolean;
    reportEmail: boolean;
    reportApp: boolean;
    twoFactorEnabled: boolean;
    updatedAt?: string | null;
  } & NotificationPreference_Key)[];
    workingScheduleSlots: ({
      id: string;
      doctorUid: string;
      dayIndex: number;
      hour: number;
      isActive: boolean;
      updatedAt?: string | null;
    } & WorkingScheduleSlot_Key)[];
      digitalSignatures: ({
        id: string;
        doctorUid: string;
        imageDataUrl?: string | null;
        uploadedAt?: string | null;
      } & DigitalSignature_Key)[];
        users: ({
          uid: string;
          displayName: string;
          email: string;
          role: string;
          phone?: string | null;
          passwordLastChangedAt?: string | null;
        } & User_Key)[];
}

export interface GetSettingsWorkspaceVariables {
  doctorUid: string;
}

export interface GetZaloContactsData {
  zaloContacts: ({
    id: string;
    name: string;
    initials: string;
    phone: string;
    zaloLink: string;
    colorToken: string;
    displayOrder: number;
  } & ZaloContact_Key)[];
}

export interface LandingArticle_Key {
  id: string;
  __typename?: 'LandingArticle_Key';
}

export interface LandingFeature_Key {
  id: string;
  __typename?: 'LandingFeature_Key';
}

export interface LandingHeroContent_Key {
  id: string;
  __typename?: 'LandingHeroContent_Key';
}

export interface NotificationPreference_Key {
  id: string;
  __typename?: 'NotificationPreference_Key';
}

export interface PatientProfile_Key {
  id: UUIDString;
  __typename?: 'PatientProfile_Key';
}

export interface PrescriptionDraftItem_Key {
  id: string;
  __typename?: 'PrescriptionDraftItem_Key';
}

export interface PrescriptionDraft_Key {
  id: string;
  __typename?: 'PrescriptionDraft_Key';
}

export interface PrescriptionTemplateDrug_Key {
  id: string;
  __typename?: 'PrescriptionTemplateDrug_Key';
}

export interface PrescriptionTemplate_Key {
  id: string;
  __typename?: 'PrescriptionTemplate_Key';
}

export interface ReportAlertCase_Key {
  id: string;
  __typename?: 'ReportAlertCase_Key';
}

export interface ReportStageDistribution_Key {
  id: string;
  __typename?: 'ReportStageDistribution_Key';
}

export interface ReportSummaryMetric_Key {
  id: string;
  __typename?: 'ReportSummaryMetric_Key';
}

export interface ReportTrendPoint_Key {
  id: string;
  __typename?: 'ReportTrendPoint_Key';
}

export interface ScheduleAttachment_Key {
  id: string;
  __typename?: 'ScheduleAttachment_Key';
}

export interface ScheduleEvent_Key {
  id: string;
  __typename?: 'ScheduleEvent_Key';
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

export interface ServiceRecord_Key {
  id: string;
  __typename?: 'ServiceRecord_Key';
}

export interface ShiftSwapRequest_Key {
  id: UUIDString;
  __typename?: 'ShiftSwapRequest_Key';
}

export interface SupportContactInfo_Key {
  id: string;
  __typename?: 'SupportContactInfo_Key';
}

export interface SupportRequest_Key {
  id: UUIDString;
  __typename?: 'SupportRequest_Key';
}

export interface UpdateAiDiagnosisReviewData {
  aiDiagnosis_update?: AiDiagnosis_Key | null;
}

export interface UpdateAiDiagnosisReviewVariables {
  id: UUIDString;
  doctorAdvice?: string | null;
  doctorApproved?: boolean | null;
  reportSummary?: string | null;
  aiScore?: string | null;
  confidenceScore?: number | null;
}

export interface UpsertAiDiagnosisData {
  aiDiagnosis_upsert: AiDiagnosis_Key;
}

export interface UpsertAiDiagnosisReferenceData {
  aiDiagnosisReference_upsert: AiDiagnosisReference_Key;
}

export interface UpsertAiDiagnosisReferenceVariables {
  id: string;
  diagnosisId: UUIDString;
  label: string;
  diseaseLevel: string;
  aiScore: string;
  confidence: string;
  doctorNote: string;
  archiveLabel: string;
  displayOrder: number;
}

export interface UpsertAiDiagnosisVariables {
  id: UUIDString;
  patientUid: string;
  doctorUid?: string | null;
  fundusImageUrl: string;
  riskLevel: string;
  confidenceScore: number;
  aiAnalysis?: string | null;
  doctorAdvice?: string | null;
  stageLabel?: string | null;
  aiScore?: string | null;
  examDate?: string | null;
  deviceName?: string | null;
  technicianName?: string | null;
  archiveImagePath?: string | null;
  doctorApproved?: boolean | null;
  reportSummary?: string | null;
}

export interface UpsertAppointmentAttachmentData {
  appointmentAttachment_upsert: AppointmentAttachment_Key;
}

export interface UpsertAppointmentAttachmentVariables {
  id: string;
  appointmentId: UUIDString;
  fileName: string;
  fileType: string;
  fileUrl?: string | null;
  displayOrder: number;
}

export interface UpsertAppointmentData {
  appointment_upsert: Appointment_Key;
}

export interface UpsertAppointmentVariables {
  id: UUIDString;
  patientUid: string;
  doctorUid?: string | null;
  doctorName: string;
  scheduledAt: TimestampString;
  endAt?: TimestampString | null;
  status: string;
  meetingLink?: string | null;
  symptoms?: string | null;
  specialty?: string | null;
  appointmentType?: string | null;
  queueLabel?: string | null;
  currentDoctorNote?: string | null;
  countdownLabel?: string | null;
}

export interface UpsertAssistantMessageData {
  assistantMessage_upsert: AssistantMessage_Key;
}

export interface UpsertAssistantMessageVariables {
  id: string;
  threadKey: string;
  role: string;
  content: string;
  timestampLabel: string;
  createdAt: string;
  displayOrder: number;
}

export interface UpsertConsultationRoomData {
  consultationRoom_upsert: ConsultationRoom_Key;
}

export interface UpsertConsultationRoomVariables {
  id: string;
  displayDate: string;
  status: string;
  badge: string;
  timeLabel: string;
  title: string;
  description: string;
  membersLabel: string;
  actionLabel?: string | null;
  displayOrder: number;
}

export interface UpsertDashboardSpotlightCaseData {
  dashboardSpotlightCase_upsert: DashboardSpotlightCase_Key;
}

export interface UpsertDashboardSpotlightCaseVariables {
  id: string;
  patientName: string;
  patientCode: string;
  dob: string;
  age: number;
  gender: string;
  symptoms: string;
  externalRecordNote: string;
  primaryServiceTitle: string;
  primaryServiceSubtitle: string;
  secondaryServiceTitle: string;
  secondaryServiceSubtitle: string;
  avatarUrl: string;
}

export interface UpsertDigitalSignatureData {
  digitalSignature_upsert: DigitalSignature_Key;
}

export interface UpsertDigitalSignatureVariables {
  id: string;
  doctorUid: string;
  imageDataUrl?: string | null;
  uploadedAt?: string | null;
}

export interface UpsertDigitizationJobData {
  digitizationJob_upsert: DigitizationJob_Key;
}

export interface UpsertDigitizationJobVariables {
  id: string;
  title: string;
  subtitle: string;
  progressPercent: number;
  facilityName: string;
  patientName: string;
  examDate: string;
  doctorName: string;
  sourceDocumentTitle: string;
  sourceDocumentBody: string;
  historyLabel: string;
}

export interface UpsertDigitizationMetricData {
  digitizationMetric_upsert: DigitizationMetric_Key;
}

export interface UpsertDigitizationMetricVariables {
  id: string;
  jobId: string;
  code: string;
  label: string;
  value: string;
  status: string;
  reference?: string | null;
  tone: string;
  displayOrder: number;
}

export interface UpsertDoctorAvailabilityData {
  doctorAvailability_upsert: DoctorAvailability_Key;
}

export interface UpsertDoctorAvailabilityVariables {
  id: string;
  doctorUid: string;
  department: string;
  shiftKey: string;
  status: string;
  displayOrder: number;
}

export interface UpsertDoctorProfileData {
  doctorProfile_upsert: DoctorProfile_Key;
}

export interface UpsertDoctorProfileMetricData {
  doctorProfileMetric_upsert: DoctorProfileMetric_Key;
}

export interface UpsertDoctorProfileMetricVariables {
  id: string;
  doctorProfileId: string;
  section: string;
  label: string;
  valueNumber?: number | null;
  valueText?: string | null;
  helper?: string | null;
  countLabel?: string | null;
  accent?: string | null;
  isActive?: boolean | null;
  displayOrder: number;
}

export interface UpsertDoctorProfileVariables {
  id: string;
  doctorUid: string;
  fullName: string;
  dob?: string | null;
  gender?: string | null;
  phone?: string | null;
  specialty?: string | null;
  certNumber?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  verificationStatus?: string | null;
  verificationDocumentName?: string | null;
  verificationDocumentDataUrl?: string | null;
  verificationUpdatedAt?: string | null;
  updatedAt?: string | null;
}

export interface UpsertDrugCatalogItemData {
  drugCatalogItem_upsert: DrugCatalogItem_Key;
}

export interface UpsertDrugCatalogItemVariables {
  id: string;
  name: string;
  description: string;
  activeIngredient?: string | null;
  unit: string;
  price: number;
  category: string;
  searchKeywords?: string | null;
  isAvailable: boolean;
}

export interface UpsertFamilyLinkData {
  familyLink_upsert: FamilyLink_Key;
}

export interface UpsertFamilyLinkVariables {
  id: UUIDString;
  accountOwnerUid: string;
  relativeName: string;
  relationship: string;
}

export interface UpsertLandingArticleData {
  landingArticle_upsert: LandingArticle_Key;
}

export interface UpsertLandingArticleVariables {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link?: string | null;
  imagePath: string;
  iconKey: string;
  displayOrder: number;
}

export interface UpsertLandingFeatureData {
  landingFeature_upsert: LandingFeature_Key;
}

export interface UpsertLandingFeatureVariables {
  id: string;
  section: string;
  iconKey: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface UpsertLandingHeroContentData {
  landingHeroContent_upsert: LandingHeroContent_Key;
}

export interface UpsertLandingHeroContentVariables {
  id: string;
  badgeText: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix: string;
  body: string;
  primaryButtonLabel: string;
  primaryButtonTarget: string;
  secondaryButtonLabel: string;
  secondaryButtonTarget: string;
  patientCodeLabel: string;
  accuracyLabel: string;
  imagePath: string;
}

export interface UpsertNotificationPreferenceData {
  notificationPreference_upsert: NotificationPreference_Key;
}

export interface UpsertNotificationPreferenceVariables {
  id: string;
  doctorUid: string;
  language: string;
  newApptEmail: boolean;
  newApptApp: boolean;
  reminderEmail: boolean;
  reminderApp: boolean;
  reportEmail: boolean;
  reportApp: boolean;
  twoFactorEnabled: boolean;
  updatedAt?: string | null;
}

export interface UpsertPatientProfileData {
  patientProfile_upsert: PatientProfile_Key;
}

export interface UpsertPatientProfileVariables {
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
}

export interface UpsertPrescriptionDraftData {
  prescriptionDraft_upsert: PrescriptionDraft_Key;
}

export interface UpsertPrescriptionDraftItemData {
  prescriptionDraftItem_upsert: PrescriptionDraftItem_Key;
}

export interface UpsertPrescriptionDraftItemVariables {
  id: string;
  draftId: string;
  drugName: string;
  note?: string | null;
  quantity: string;
  unit: string;
  dosage: string;
  timing: string;
  duration: string;
  price: number;
  sourceType?: string | null;
  sourceId?: string | null;
  displayOrder: number;
}

export interface UpsertPrescriptionDraftVariables {
  id: string;
  doctorUid: string;
  patientUid: string;
  activeTemplateId?: string | null;
  note?: string | null;
  status: string;
  updatedAt?: string | null;
}

export interface UpsertPrescriptionTemplateData {
  prescriptionTemplate_upsert: PrescriptionTemplate_Key;
}

export interface UpsertPrescriptionTemplateDrugData {
  prescriptionTemplateDrug_upsert: PrescriptionTemplateDrug_Key;
}

export interface UpsertPrescriptionTemplateDrugVariables {
  id: string;
  templateId: string;
  name: string;
  description: string;
  dosage: string;
  quantity: string;
  unit: string;
  timing: string;
  duration: string;
  price: number;
  displayOrder: number;
}

export interface UpsertPrescriptionTemplateVariables {
  id: string;
  title: string;
  subtitle: string;
  specialty: string;
  badge: string;
  summary: string;
  iconKey: string;
  displayOrder: number;
}

export interface UpsertReportAlertCaseData {
  reportAlertCase_upsert: ReportAlertCase_Key;
}

export interface UpsertReportAlertCaseVariables {
  id: string;
  patientUid?: string | null;
  initials: string;
  name: string;
  recordId: string;
  conclusion: string;
  phone: string;
  displayOrder: number;
}

export interface UpsertReportStageDistributionData {
  reportStageDistribution_upsert: ReportStageDistribution_Key;
}

export interface UpsertReportStageDistributionVariables {
  id: string;
  label: string;
  value: number;
  displayOrder: number;
}

export interface UpsertReportSummaryMetricData {
  reportSummaryMetric_upsert: ReportSummaryMetric_Key;
}

export interface UpsertReportSummaryMetricVariables {
  id: string;
  title: string;
  valueText: string;
  helper: string;
  delta: string;
  deltaTone: string;
  iconKey: string;
  displayOrder: number;
}

export interface UpsertReportTrendPointData {
  reportTrendPoint_upsert: ReportTrendPoint_Key;
}

export interface UpsertReportTrendPointVariables {
  id: string;
  label: string;
  x: number;
  y: number;
  series: string;
  displayOrder: number;
}

export interface UpsertScheduleAttachmentData {
  scheduleAttachment_upsert: ScheduleAttachment_Key;
}

export interface UpsertScheduleAttachmentVariables {
  id: string;
  eventId: string;
  fileName: string;
  fileType: string;
  fileUrl?: string | null;
  displayOrder: number;
}

export interface UpsertScheduleEventData {
  scheduleEvent_upsert: ScheduleEvent_Key;
}

export interface UpsertScheduleEventVariables {
  id: string;
  doctorUid: string;
  patientUid?: string | null;
  title: string;
  eventType: string;
  department?: string | null;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: string;
  colorTone?: string | null;
  roomName?: string | null;
  insuranceNumber?: string | null;
  patientNameOverride?: string | null;
  timeString?: string | null;
  priority?: string | null;
  meetingLink?: string | null;
  notes?: string | null;
  attachmentsCount: number;
  displayOrder: number;
  isCompleted: boolean;
  isDeleted: boolean;
}

export interface UpsertServiceRecordData {
  serviceRecord_upsert: ServiceRecord_Key;
}

export interface UpsertServiceRecordVariables {
  id: string;
  spotlightCaseId?: string | null;
  patientName: string;
  patientCode: string;
  serviceName: string;
  specialty: string;
  doctorName: string;
  dateTimeLabel: string;
  diagnosis: string;
  quantity: number;
  unitPrice: number;
  insuranceCoveragePercent: number;
  displayOrder: number;
}

export interface UpsertSupportContactInfoData {
  supportContactInfo_upsert: SupportContactInfo_Key;
}

export interface UpsertSupportContactInfoVariables {
  id: string;
  centerBadge: string;
  headlinePrefix: string;
  headlineAccent: string;
  headlineBrand: string;
  description: string;
  email: string;
  phone: string;
  location: string;
}

export interface UpsertWorkingScheduleSlotData {
  workingScheduleSlot_upsert: WorkingScheduleSlot_Key;
}

export interface UpsertWorkingScheduleSlotVariables {
  id: string;
  doctorUid: string;
  dayIndex: number;
  hour: number;
  isActive: boolean;
  updatedAt?: string | null;
}

export interface UpsertZaloContactData {
  zaloContact_upsert: ZaloContact_Key;
}

export interface UpsertZaloContactVariables {
  id: string;
  name: string;
  initials: string;
  phone: string;
  zaloLink: string;
  colorToken: string;
  displayOrder: number;
}

export interface User_Key {
  uid: string;
  __typename?: 'User_Key';
}

export interface WorkingScheduleSlot_Key {
  id: string;
  __typename?: 'WorkingScheduleSlot_Key';
}

export interface ZaloContact_Key {
  id: string;
  __typename?: 'ZaloContact_Key';
}

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

interface GetLandingWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLandingWorkspaceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLandingWorkspaceData, undefined>;
  operationName: string;
}
export const getLandingWorkspaceRef: GetLandingWorkspaceRef;

export function getLandingWorkspace(): QueryPromise<GetLandingWorkspaceData, undefined>;
export function getLandingWorkspace(dc: DataConnect): QueryPromise<GetLandingWorkspaceData, undefined>;

interface GetZaloContactsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetZaloContactsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetZaloContactsData, undefined>;
  operationName: string;
}
export const getZaloContactsRef: GetZaloContactsRef;

export function getZaloContacts(): QueryPromise<GetZaloContactsData, undefined>;
export function getZaloContacts(dc: DataConnect): QueryPromise<GetZaloContactsData, undefined>;

interface GetDashboardHomeWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDashboardHomeWorkspaceVariables): QueryRef<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDashboardHomeWorkspaceVariables): QueryRef<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;
  operationName: string;
}
export const getDashboardHomeWorkspaceRef: GetDashboardHomeWorkspaceRef;

export function getDashboardHomeWorkspace(vars: GetDashboardHomeWorkspaceVariables): QueryPromise<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;
export function getDashboardHomeWorkspace(dc: DataConnect, vars: GetDashboardHomeWorkspaceVariables): QueryPromise<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;

interface GetPatientWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPatientWorkspaceVariables): QueryRef<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPatientWorkspaceVariables): QueryRef<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;
  operationName: string;
}
export const getPatientWorkspaceRef: GetPatientWorkspaceRef;

export function getPatientWorkspace(vars: GetPatientWorkspaceVariables): QueryPromise<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;
export function getPatientWorkspace(dc: DataConnect, vars: GetPatientWorkspaceVariables): QueryPromise<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;

interface GetScheduleWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetScheduleWorkspaceVariables): QueryRef<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetScheduleWorkspaceVariables): QueryRef<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;
  operationName: string;
}
export const getScheduleWorkspaceRef: GetScheduleWorkspaceRef;

export function getScheduleWorkspace(vars: GetScheduleWorkspaceVariables): QueryPromise<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;
export function getScheduleWorkspace(dc: DataConnect, vars: GetScheduleWorkspaceVariables): QueryPromise<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;

interface GetConsultationWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConsultationWorkspaceVariables): QueryRef<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConsultationWorkspaceVariables): QueryRef<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;
  operationName: string;
}
export const getConsultationWorkspaceRef: GetConsultationWorkspaceRef;

export function getConsultationWorkspace(vars: GetConsultationWorkspaceVariables): QueryPromise<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;
export function getConsultationWorkspace(dc: DataConnect, vars: GetConsultationWorkspaceVariables): QueryPromise<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;

interface GetAiDiagnosisWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAiDiagnosisWorkspaceVariables): QueryRef<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAiDiagnosisWorkspaceVariables): QueryRef<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;
  operationName: string;
}
export const getAiDiagnosisWorkspaceRef: GetAiDiagnosisWorkspaceRef;

export function getAiDiagnosisWorkspace(vars: GetAiDiagnosisWorkspaceVariables): QueryPromise<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;
export function getAiDiagnosisWorkspace(dc: DataConnect, vars: GetAiDiagnosisWorkspaceVariables): QueryPromise<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;

interface GetPharmacyWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPharmacyWorkspaceVariables): QueryRef<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPharmacyWorkspaceVariables): QueryRef<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;
  operationName: string;
}
export const getPharmacyWorkspaceRef: GetPharmacyWorkspaceRef;

export function getPharmacyWorkspace(vars: GetPharmacyWorkspaceVariables): QueryPromise<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;
export function getPharmacyWorkspace(dc: DataConnect, vars: GetPharmacyWorkspaceVariables): QueryPromise<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;

interface GetReportsWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetReportsWorkspaceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetReportsWorkspaceData, undefined>;
  operationName: string;
}
export const getReportsWorkspaceRef: GetReportsWorkspaceRef;

export function getReportsWorkspace(): QueryPromise<GetReportsWorkspaceData, undefined>;
export function getReportsWorkspace(dc: DataConnect): QueryPromise<GetReportsWorkspaceData, undefined>;

interface GetDoctorProfileWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDoctorProfileWorkspaceVariables): QueryRef<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDoctorProfileWorkspaceVariables): QueryRef<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;
  operationName: string;
}
export const getDoctorProfileWorkspaceRef: GetDoctorProfileWorkspaceRef;

export function getDoctorProfileWorkspace(vars: GetDoctorProfileWorkspaceVariables): QueryPromise<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;
export function getDoctorProfileWorkspace(dc: DataConnect, vars: GetDoctorProfileWorkspaceVariables): QueryPromise<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;

interface GetSettingsWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSettingsWorkspaceVariables): QueryRef<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSettingsWorkspaceVariables): QueryRef<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;
  operationName: string;
}
export const getSettingsWorkspaceRef: GetSettingsWorkspaceRef;

export function getSettingsWorkspace(vars: GetSettingsWorkspaceVariables): QueryPromise<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;
export function getSettingsWorkspace(dc: DataConnect, vars: GetSettingsWorkspaceVariables): QueryPromise<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;

interface GetRecordDigitizationWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRecordDigitizationWorkspaceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetRecordDigitizationWorkspaceData, undefined>;
  operationName: string;
}
export const getRecordDigitizationWorkspaceRef: GetRecordDigitizationWorkspaceRef;

export function getRecordDigitizationWorkspace(): QueryPromise<GetRecordDigitizationWorkspaceData, undefined>;
export function getRecordDigitizationWorkspace(dc: DataConnect): QueryPromise<GetRecordDigitizationWorkspaceData, undefined>;

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

interface CreateContactLeadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateContactLeadVariables): MutationRef<CreateContactLeadData, CreateContactLeadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateContactLeadVariables): MutationRef<CreateContactLeadData, CreateContactLeadVariables>;
  operationName: string;
}
export const createContactLeadRef: CreateContactLeadRef;

export function createContactLead(vars: CreateContactLeadVariables): MutationPromise<CreateContactLeadData, CreateContactLeadVariables>;
export function createContactLead(dc: DataConnect, vars: CreateContactLeadVariables): MutationPromise<CreateContactLeadData, CreateContactLeadVariables>;

interface UpsertZaloContactRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertZaloContactVariables): MutationRef<UpsertZaloContactData, UpsertZaloContactVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertZaloContactVariables): MutationRef<UpsertZaloContactData, UpsertZaloContactVariables>;
  operationName: string;
}
export const upsertZaloContactRef: UpsertZaloContactRef;

export function upsertZaloContact(vars: UpsertZaloContactVariables): MutationPromise<UpsertZaloContactData, UpsertZaloContactVariables>;
export function upsertZaloContact(dc: DataConnect, vars: UpsertZaloContactVariables): MutationPromise<UpsertZaloContactData, UpsertZaloContactVariables>;

interface UpsertDoctorProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDoctorProfileVariables): MutationRef<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDoctorProfileVariables): MutationRef<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;
  operationName: string;
}
export const upsertDoctorProfileRef: UpsertDoctorProfileRef;

export function upsertDoctorProfile(vars: UpsertDoctorProfileVariables): MutationPromise<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;
export function upsertDoctorProfile(dc: DataConnect, vars: UpsertDoctorProfileVariables): MutationPromise<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;

interface UpsertNotificationPreferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertNotificationPreferenceVariables): MutationRef<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertNotificationPreferenceVariables): MutationRef<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;
  operationName: string;
}
export const upsertNotificationPreferenceRef: UpsertNotificationPreferenceRef;

export function upsertNotificationPreference(vars: UpsertNotificationPreferenceVariables): MutationPromise<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;
export function upsertNotificationPreference(dc: DataConnect, vars: UpsertNotificationPreferenceVariables): MutationPromise<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;

interface UpsertWorkingScheduleSlotRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertWorkingScheduleSlotVariables): MutationRef<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertWorkingScheduleSlotVariables): MutationRef<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;
  operationName: string;
}
export const upsertWorkingScheduleSlotRef: UpsertWorkingScheduleSlotRef;

export function upsertWorkingScheduleSlot(vars: UpsertWorkingScheduleSlotVariables): MutationPromise<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;
export function upsertWorkingScheduleSlot(dc: DataConnect, vars: UpsertWorkingScheduleSlotVariables): MutationPromise<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;

interface UpsertDigitalSignatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDigitalSignatureVariables): MutationRef<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDigitalSignatureVariables): MutationRef<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;
  operationName: string;
}
export const upsertDigitalSignatureRef: UpsertDigitalSignatureRef;

export function upsertDigitalSignature(vars: UpsertDigitalSignatureVariables): MutationPromise<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;
export function upsertDigitalSignature(dc: DataConnect, vars: UpsertDigitalSignatureVariables): MutationPromise<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;

interface CreateSupportRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSupportRequestVariables): MutationRef<CreateSupportRequestData, CreateSupportRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSupportRequestVariables): MutationRef<CreateSupportRequestData, CreateSupportRequestVariables>;
  operationName: string;
}
export const createSupportRequestRef: CreateSupportRequestRef;

export function createSupportRequest(vars: CreateSupportRequestVariables): MutationPromise<CreateSupportRequestData, CreateSupportRequestVariables>;
export function createSupportRequest(dc: DataConnect, vars: CreateSupportRequestVariables): MutationPromise<CreateSupportRequestData, CreateSupportRequestVariables>;

interface UpsertAssistantMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAssistantMessageVariables): MutationRef<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertAssistantMessageVariables): MutationRef<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;
  operationName: string;
}
export const upsertAssistantMessageRef: UpsertAssistantMessageRef;

export function upsertAssistantMessage(vars: UpsertAssistantMessageVariables): MutationPromise<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;
export function upsertAssistantMessage(dc: DataConnect, vars: UpsertAssistantMessageVariables): MutationPromise<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;

interface UpsertScheduleEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertScheduleEventVariables): MutationRef<UpsertScheduleEventData, UpsertScheduleEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertScheduleEventVariables): MutationRef<UpsertScheduleEventData, UpsertScheduleEventVariables>;
  operationName: string;
}
export const upsertScheduleEventRef: UpsertScheduleEventRef;

export function upsertScheduleEvent(vars: UpsertScheduleEventVariables): MutationPromise<UpsertScheduleEventData, UpsertScheduleEventVariables>;
export function upsertScheduleEvent(dc: DataConnect, vars: UpsertScheduleEventVariables): MutationPromise<UpsertScheduleEventData, UpsertScheduleEventVariables>;

interface UpsertScheduleAttachmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertScheduleAttachmentVariables): MutationRef<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertScheduleAttachmentVariables): MutationRef<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;
  operationName: string;
}
export const upsertScheduleAttachmentRef: UpsertScheduleAttachmentRef;

export function upsertScheduleAttachment(vars: UpsertScheduleAttachmentVariables): MutationPromise<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;
export function upsertScheduleAttachment(dc: DataConnect, vars: UpsertScheduleAttachmentVariables): MutationPromise<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;

interface CreateShiftSwapRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateShiftSwapRequestVariables): MutationRef<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateShiftSwapRequestVariables): MutationRef<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;
  operationName: string;
}
export const createShiftSwapRequestRef: CreateShiftSwapRequestRef;

export function createShiftSwapRequest(vars: CreateShiftSwapRequestVariables): MutationPromise<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;
export function createShiftSwapRequest(dc: DataConnect, vars: CreateShiftSwapRequestVariables): MutationPromise<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;

interface UpsertPrescriptionDraftRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionDraftVariables): MutationRef<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPrescriptionDraftVariables): MutationRef<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;
  operationName: string;
}
export const upsertPrescriptionDraftRef: UpsertPrescriptionDraftRef;

export function upsertPrescriptionDraft(vars: UpsertPrescriptionDraftVariables): MutationPromise<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;
export function upsertPrescriptionDraft(dc: DataConnect, vars: UpsertPrescriptionDraftVariables): MutationPromise<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;

interface UpsertPrescriptionDraftItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionDraftItemVariables): MutationRef<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPrescriptionDraftItemVariables): MutationRef<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;
  operationName: string;
}
export const upsertPrescriptionDraftItemRef: UpsertPrescriptionDraftItemRef;

export function upsertPrescriptionDraftItem(vars: UpsertPrescriptionDraftItemVariables): MutationPromise<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;
export function upsertPrescriptionDraftItem(dc: DataConnect, vars: UpsertPrescriptionDraftItemVariables): MutationPromise<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;

interface DeletePrescriptionDraftItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrescriptionDraftItemVariables): MutationRef<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePrescriptionDraftItemVariables): MutationRef<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;
  operationName: string;
}
export const deletePrescriptionDraftItemRef: DeletePrescriptionDraftItemRef;

export function deletePrescriptionDraftItem(vars: DeletePrescriptionDraftItemVariables): MutationPromise<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;
export function deletePrescriptionDraftItem(dc: DataConnect, vars: DeletePrescriptionDraftItemVariables): MutationPromise<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;

interface UpdateAiDiagnosisReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAiDiagnosisReviewVariables): MutationRef<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAiDiagnosisReviewVariables): MutationRef<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;
  operationName: string;
}
export const updateAiDiagnosisReviewRef: UpdateAiDiagnosisReviewRef;

export function updateAiDiagnosisReview(vars: UpdateAiDiagnosisReviewVariables): MutationPromise<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;
export function updateAiDiagnosisReview(dc: DataConnect, vars: UpdateAiDiagnosisReviewVariables): MutationPromise<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;

interface UpsertAiDiagnosisReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAiDiagnosisReferenceVariables): MutationRef<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertAiDiagnosisReferenceVariables): MutationRef<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;
  operationName: string;
}
export const upsertAiDiagnosisReferenceRef: UpsertAiDiagnosisReferenceRef;

export function upsertAiDiagnosisReference(vars: UpsertAiDiagnosisReferenceVariables): MutationPromise<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;
export function upsertAiDiagnosisReference(dc: DataConnect, vars: UpsertAiDiagnosisReferenceVariables): MutationPromise<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;

interface UpsertAppointmentAttachmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAppointmentAttachmentVariables): MutationRef<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertAppointmentAttachmentVariables): MutationRef<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;
  operationName: string;
}
export const upsertAppointmentAttachmentRef: UpsertAppointmentAttachmentRef;

export function upsertAppointmentAttachment(vars: UpsertAppointmentAttachmentVariables): MutationPromise<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;
export function upsertAppointmentAttachment(dc: DataConnect, vars: UpsertAppointmentAttachmentVariables): MutationPromise<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;

interface UpsertPatientProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPatientProfileVariables): MutationRef<UpsertPatientProfileData, UpsertPatientProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPatientProfileVariables): MutationRef<UpsertPatientProfileData, UpsertPatientProfileVariables>;
  operationName: string;
}
export const upsertPatientProfileRef: UpsertPatientProfileRef;

export function upsertPatientProfile(vars: UpsertPatientProfileVariables): MutationPromise<UpsertPatientProfileData, UpsertPatientProfileVariables>;
export function upsertPatientProfile(dc: DataConnect, vars: UpsertPatientProfileVariables): MutationPromise<UpsertPatientProfileData, UpsertPatientProfileVariables>;

interface UpsertFamilyLinkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertFamilyLinkVariables): MutationRef<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertFamilyLinkVariables): MutationRef<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;
  operationName: string;
}
export const upsertFamilyLinkRef: UpsertFamilyLinkRef;

export function upsertFamilyLink(vars: UpsertFamilyLinkVariables): MutationPromise<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;
export function upsertFamilyLink(dc: DataConnect, vars: UpsertFamilyLinkVariables): MutationPromise<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;

interface UpsertAppointmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAppointmentVariables): MutationRef<UpsertAppointmentData, UpsertAppointmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertAppointmentVariables): MutationRef<UpsertAppointmentData, UpsertAppointmentVariables>;
  operationName: string;
}
export const upsertAppointmentRef: UpsertAppointmentRef;

export function upsertAppointment(vars: UpsertAppointmentVariables): MutationPromise<UpsertAppointmentData, UpsertAppointmentVariables>;
export function upsertAppointment(dc: DataConnect, vars: UpsertAppointmentVariables): MutationPromise<UpsertAppointmentData, UpsertAppointmentVariables>;

interface UpsertAiDiagnosisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAiDiagnosisVariables): MutationRef<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertAiDiagnosisVariables): MutationRef<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;
  operationName: string;
}
export const upsertAiDiagnosisRef: UpsertAiDiagnosisRef;

export function upsertAiDiagnosis(vars: UpsertAiDiagnosisVariables): MutationPromise<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;
export function upsertAiDiagnosis(dc: DataConnect, vars: UpsertAiDiagnosisVariables): MutationPromise<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;

interface UpsertConsultationRoomRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertConsultationRoomVariables): MutationRef<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertConsultationRoomVariables): MutationRef<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;
  operationName: string;
}
export const upsertConsultationRoomRef: UpsertConsultationRoomRef;

export function upsertConsultationRoom(vars: UpsertConsultationRoomVariables): MutationPromise<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;
export function upsertConsultationRoom(dc: DataConnect, vars: UpsertConsultationRoomVariables): MutationPromise<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;

interface UpsertLandingHeroContentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLandingHeroContentVariables): MutationRef<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertLandingHeroContentVariables): MutationRef<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;
  operationName: string;
}
export const upsertLandingHeroContentRef: UpsertLandingHeroContentRef;

export function upsertLandingHeroContent(vars: UpsertLandingHeroContentVariables): MutationPromise<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;
export function upsertLandingHeroContent(dc: DataConnect, vars: UpsertLandingHeroContentVariables): MutationPromise<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;

interface UpsertLandingFeatureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLandingFeatureVariables): MutationRef<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertLandingFeatureVariables): MutationRef<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;
  operationName: string;
}
export const upsertLandingFeatureRef: UpsertLandingFeatureRef;

export function upsertLandingFeature(vars: UpsertLandingFeatureVariables): MutationPromise<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;
export function upsertLandingFeature(dc: DataConnect, vars: UpsertLandingFeatureVariables): MutationPromise<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;

interface UpsertLandingArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLandingArticleVariables): MutationRef<UpsertLandingArticleData, UpsertLandingArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertLandingArticleVariables): MutationRef<UpsertLandingArticleData, UpsertLandingArticleVariables>;
  operationName: string;
}
export const upsertLandingArticleRef: UpsertLandingArticleRef;

export function upsertLandingArticle(vars: UpsertLandingArticleVariables): MutationPromise<UpsertLandingArticleData, UpsertLandingArticleVariables>;
export function upsertLandingArticle(dc: DataConnect, vars: UpsertLandingArticleVariables): MutationPromise<UpsertLandingArticleData, UpsertLandingArticleVariables>;

interface UpsertSupportContactInfoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSupportContactInfoVariables): MutationRef<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertSupportContactInfoVariables): MutationRef<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;
  operationName: string;
}
export const upsertSupportContactInfoRef: UpsertSupportContactInfoRef;

export function upsertSupportContactInfo(vars: UpsertSupportContactInfoVariables): MutationPromise<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;
export function upsertSupportContactInfo(dc: DataConnect, vars: UpsertSupportContactInfoVariables): MutationPromise<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;

interface UpsertDoctorProfileMetricRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDoctorProfileMetricVariables): MutationRef<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDoctorProfileMetricVariables): MutationRef<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;
  operationName: string;
}
export const upsertDoctorProfileMetricRef: UpsertDoctorProfileMetricRef;

export function upsertDoctorProfileMetric(vars: UpsertDoctorProfileMetricVariables): MutationPromise<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;
export function upsertDoctorProfileMetric(dc: DataConnect, vars: UpsertDoctorProfileMetricVariables): MutationPromise<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;

interface UpsertDashboardSpotlightCaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDashboardSpotlightCaseVariables): MutationRef<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDashboardSpotlightCaseVariables): MutationRef<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;
  operationName: string;
}
export const upsertDashboardSpotlightCaseRef: UpsertDashboardSpotlightCaseRef;

export function upsertDashboardSpotlightCase(vars: UpsertDashboardSpotlightCaseVariables): MutationPromise<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;
export function upsertDashboardSpotlightCase(dc: DataConnect, vars: UpsertDashboardSpotlightCaseVariables): MutationPromise<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;

interface UpsertServiceRecordRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertServiceRecordVariables): MutationRef<UpsertServiceRecordData, UpsertServiceRecordVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertServiceRecordVariables): MutationRef<UpsertServiceRecordData, UpsertServiceRecordVariables>;
  operationName: string;
}
export const upsertServiceRecordRef: UpsertServiceRecordRef;

export function upsertServiceRecord(vars: UpsertServiceRecordVariables): MutationPromise<UpsertServiceRecordData, UpsertServiceRecordVariables>;
export function upsertServiceRecord(dc: DataConnect, vars: UpsertServiceRecordVariables): MutationPromise<UpsertServiceRecordData, UpsertServiceRecordVariables>;

interface UpsertDoctorAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDoctorAvailabilityVariables): MutationRef<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDoctorAvailabilityVariables): MutationRef<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;
  operationName: string;
}
export const upsertDoctorAvailabilityRef: UpsertDoctorAvailabilityRef;

export function upsertDoctorAvailability(vars: UpsertDoctorAvailabilityVariables): MutationPromise<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;
export function upsertDoctorAvailability(dc: DataConnect, vars: UpsertDoctorAvailabilityVariables): MutationPromise<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;

interface UpsertPrescriptionTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionTemplateVariables): MutationRef<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPrescriptionTemplateVariables): MutationRef<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;
  operationName: string;
}
export const upsertPrescriptionTemplateRef: UpsertPrescriptionTemplateRef;

export function upsertPrescriptionTemplate(vars: UpsertPrescriptionTemplateVariables): MutationPromise<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;
export function upsertPrescriptionTemplate(dc: DataConnect, vars: UpsertPrescriptionTemplateVariables): MutationPromise<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;

interface UpsertPrescriptionTemplateDrugRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionTemplateDrugVariables): MutationRef<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPrescriptionTemplateDrugVariables): MutationRef<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;
  operationName: string;
}
export const upsertPrescriptionTemplateDrugRef: UpsertPrescriptionTemplateDrugRef;

export function upsertPrescriptionTemplateDrug(vars: UpsertPrescriptionTemplateDrugVariables): MutationPromise<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;
export function upsertPrescriptionTemplateDrug(dc: DataConnect, vars: UpsertPrescriptionTemplateDrugVariables): MutationPromise<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;

interface UpsertDrugCatalogItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDrugCatalogItemVariables): MutationRef<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDrugCatalogItemVariables): MutationRef<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;
  operationName: string;
}
export const upsertDrugCatalogItemRef: UpsertDrugCatalogItemRef;

export function upsertDrugCatalogItem(vars: UpsertDrugCatalogItemVariables): MutationPromise<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;
export function upsertDrugCatalogItem(dc: DataConnect, vars: UpsertDrugCatalogItemVariables): MutationPromise<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;

interface UpsertReportSummaryMetricRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportSummaryMetricVariables): MutationRef<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertReportSummaryMetricVariables): MutationRef<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;
  operationName: string;
}
export const upsertReportSummaryMetricRef: UpsertReportSummaryMetricRef;

export function upsertReportSummaryMetric(vars: UpsertReportSummaryMetricVariables): MutationPromise<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;
export function upsertReportSummaryMetric(dc: DataConnect, vars: UpsertReportSummaryMetricVariables): MutationPromise<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;

interface UpsertReportStageDistributionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportStageDistributionVariables): MutationRef<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertReportStageDistributionVariables): MutationRef<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;
  operationName: string;
}
export const upsertReportStageDistributionRef: UpsertReportStageDistributionRef;

export function upsertReportStageDistribution(vars: UpsertReportStageDistributionVariables): MutationPromise<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;
export function upsertReportStageDistribution(dc: DataConnect, vars: UpsertReportStageDistributionVariables): MutationPromise<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;

interface UpsertReportTrendPointRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportTrendPointVariables): MutationRef<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertReportTrendPointVariables): MutationRef<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;
  operationName: string;
}
export const upsertReportTrendPointRef: UpsertReportTrendPointRef;

export function upsertReportTrendPoint(vars: UpsertReportTrendPointVariables): MutationPromise<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;
export function upsertReportTrendPoint(dc: DataConnect, vars: UpsertReportTrendPointVariables): MutationPromise<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;

interface UpsertReportAlertCaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportAlertCaseVariables): MutationRef<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertReportAlertCaseVariables): MutationRef<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;
  operationName: string;
}
export const upsertReportAlertCaseRef: UpsertReportAlertCaseRef;

export function upsertReportAlertCase(vars: UpsertReportAlertCaseVariables): MutationPromise<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;
export function upsertReportAlertCase(dc: DataConnect, vars: UpsertReportAlertCaseVariables): MutationPromise<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;

interface UpsertDigitizationJobRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDigitizationJobVariables): MutationRef<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDigitizationJobVariables): MutationRef<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;
  operationName: string;
}
export const upsertDigitizationJobRef: UpsertDigitizationJobRef;

export function upsertDigitizationJob(vars: UpsertDigitizationJobVariables): MutationPromise<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;
export function upsertDigitizationJob(dc: DataConnect, vars: UpsertDigitizationJobVariables): MutationPromise<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;

interface UpsertDigitizationMetricRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDigitizationMetricVariables): MutationRef<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDigitizationMetricVariables): MutationRef<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;
  operationName: string;
}
export const upsertDigitizationMetricRef: UpsertDigitizationMetricRef;

export function upsertDigitizationMetric(vars: UpsertDigitizationMetricVariables): MutationPromise<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;
export function upsertDigitizationMetric(dc: DataConnect, vars: UpsertDigitizationMetricVariables): MutationPromise<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;

