# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetAllUsers*](#getallusers)
  - [*GetDoctors*](#getdoctors)
  - [*GetPatientsByDoctor*](#getpatientsbydoctor)
  - [*GetAppointments*](#getappointments)
  - [*GetAiDiagnoses*](#getaidiagnoses)
  - [*GetLandingWorkspace*](#getlandingworkspace)
  - [*GetZaloContacts*](#getzalocontacts)
  - [*GetDashboardHomeWorkspace*](#getdashboardhomeworkspace)
  - [*GetPatientWorkspace*](#getpatientworkspace)
  - [*GetScheduleWorkspace*](#getscheduleworkspace)
  - [*GetConsultationWorkspace*](#getconsultationworkspace)
  - [*GetAiDiagnosisWorkspace*](#getaidiagnosisworkspace)
  - [*GetPharmacyWorkspace*](#getpharmacyworkspace)
  - [*GetReportsWorkspace*](#getreportsworkspace)
  - [*GetDoctorProfileWorkspace*](#getdoctorprofileworkspace)
  - [*GetSettingsWorkspace*](#getsettingsworkspace)
  - [*GetRecordDigitizationWorkspace*](#getrecorddigitizationworkspace)
- [**Mutations**](#mutations)
  - [*SeedAdminUser*](#seedadminuser)
  - [*SeedDoctorNguyenHoangMinh*](#seeddoctornguyenhoangminh)
  - [*SeedDoctorTranLanAnh*](#seeddoctortranlananh)
  - [*SeedPatientLeMinh*](#seedpatientleminh)
  - [*SeedPatientPhamThuHa*](#seedpatientphamthuha)
  - [*SeedPatientNguyenGiaBao*](#seedpatientnguyengiabao)
  - [*SeedPatientVoThanhTruc*](#seedpatientvothanhtruc)
  - [*SeedProfileLeMinh*](#seedprofileleminh)
  - [*SeedProfilePhamThuHa*](#seedprofilephamthuha)
  - [*SeedProfileNguyenGiaBao*](#seedprofilenguyengiabao)
  - [*SeedProfileVoThanhTruc*](#seedprofilevothanhtruc)
  - [*SeedFamilyLinkLeMinh*](#seedfamilylinkleminh)
  - [*SeedFamilyLinkPhamThuHa*](#seedfamilylinkphamthuha)
  - [*SeedFamilyLinkNguyenGiaBao*](#seedfamilylinknguyengiabao)
  - [*SeedFamilyLinkVoThanhTruc*](#seedfamilylinkvothanhtruc)
  - [*SeedAppointmentLeMinh1*](#seedappointmentleminh1)
  - [*SeedAppointmentLeMinh2*](#seedappointmentleminh2)
  - [*SeedAppointmentPhamThuHa*](#seedappointmentphamthuha)
  - [*SeedAppointmentNguyenGiaBao*](#seedappointmentnguyengiabao)
  - [*SeedAppointmentVoThanhTruc*](#seedappointmentvothanhtruc)
  - [*SeedAiDiagnosisLeMinh*](#seedaidiagnosisleminh)
  - [*SeedAiDiagnosisPhamThuHa*](#seedaidiagnosisphamthuha)
  - [*SeedAiDiagnosisNguyenGiaBao*](#seedaidiagnosisnguyengiabao)
  - [*SeedAiDiagnosisVoThanhTruc*](#seedaidiagnosisvothanhtruc)
  - [*AddTestPatient*](#addtestpatient)
  - [*CreateUser*](#createuser)
  - [*CreatePatientProfile*](#createpatientprofile)
  - [*CreateFamilyLink*](#createfamilylink)
  - [*CreateAppointment*](#createappointment)
  - [*CreateAiDiagnosis*](#createaidiagnosis)
  - [*CreateContactLead*](#createcontactlead)
  - [*UpsertZaloContact*](#upsertzalocontact)
  - [*UpsertDoctorProfile*](#upsertdoctorprofile)
  - [*UpsertNotificationPreference*](#upsertnotificationpreference)
  - [*UpsertWorkingScheduleSlot*](#upsertworkingscheduleslot)
  - [*UpsertDigitalSignature*](#upsertdigitalsignature)
  - [*CreateSupportRequest*](#createsupportrequest)
  - [*UpsertAssistantMessage*](#upsertassistantmessage)
  - [*UpsertScheduleEvent*](#upsertscheduleevent)
  - [*UpsertScheduleAttachment*](#upsertscheduleattachment)
  - [*CreateShiftSwapRequest*](#createshiftswaprequest)
  - [*UpsertPrescriptionDraft*](#upsertprescriptiondraft)
  - [*UpsertPrescriptionDraftItem*](#upsertprescriptiondraftitem)
  - [*DeletePrescriptionDraftItem*](#deleteprescriptiondraftitem)
  - [*UpdateAiDiagnosisReview*](#updateaidiagnosisreview)
  - [*UpsertAiDiagnosisReference*](#upsertaidiagnosisreference)
  - [*UpsertAppointmentAttachment*](#upsertappointmentattachment)
  - [*UpsertPatientProfile*](#upsertpatientprofile)
  - [*UpsertFamilyLink*](#upsertfamilylink)
  - [*UpsertAppointment*](#upsertappointment)
  - [*UpsertAiDiagnosis*](#upsertaidiagnosis)
  - [*UpsertConsultationRoom*](#upsertconsultationroom)
  - [*UpsertLandingHeroContent*](#upsertlandingherocontent)
  - [*UpsertLandingFeature*](#upsertlandingfeature)
  - [*UpsertLandingArticle*](#upsertlandingarticle)
  - [*UpsertSupportContactInfo*](#upsertsupportcontactinfo)
  - [*UpsertDoctorProfileMetric*](#upsertdoctorprofilemetric)
  - [*UpsertDashboardSpotlightCase*](#upsertdashboardspotlightcase)
  - [*UpsertServiceRecord*](#upsertservicerecord)
  - [*UpsertDoctorAvailability*](#upsertdoctoravailability)
  - [*UpsertPrescriptionTemplate*](#upsertprescriptiontemplate)
  - [*UpsertPrescriptionTemplateDrug*](#upsertprescriptiontemplatedrug)
  - [*UpsertDrugCatalogItem*](#upsertdrugcatalogitem)
  - [*UpsertReportSummaryMetric*](#upsertreportsummarymetric)
  - [*UpsertReportStageDistribution*](#upsertreportstagedistribution)
  - [*UpsertReportTrendPoint*](#upsertreporttrendpoint)
  - [*UpsertReportAlertCase*](#upsertreportalertcase)
  - [*UpsertDigitizationJob*](#upsertdigitizationjob)
  - [*UpsertDigitizationMetric*](#upsertdigitizationmetric)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetAllUsers
You can execute the `GetAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getAllUsers(): QueryPromise<GetAllUsersData, undefined>;

interface GetAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllUsersData, undefined>;
}
export const getAllUsersRef: GetAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllUsers(dc: DataConnect): QueryPromise<GetAllUsersData, undefined>;

interface GetAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<GetAllUsersData, undefined>;
}
export const getAllUsersRef: GetAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllUsersRef:
```typescript
const name = getAllUsersRef.operationName;
console.log(name);
```

### Variables
The `GetAllUsers` query has no variables.
### Return Type
Recall that executing the `GetAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllUsersData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllUsers } from '@firebasegen/default-connector';


// Call the `getAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllUsersRef } from '@firebasegen/default-connector';


// Call the `getAllUsersRef()` function to get a reference to the query.
const ref = getAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetDoctors
You can execute the `GetDoctors` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getDoctors(): QueryPromise<GetDoctorsData, undefined>;

interface GetDoctorsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDoctorsData, undefined>;
}
export const getDoctorsRef: GetDoctorsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDoctors(dc: DataConnect): QueryPromise<GetDoctorsData, undefined>;

interface GetDoctorsRef {
  ...
  (dc: DataConnect): QueryRef<GetDoctorsData, undefined>;
}
export const getDoctorsRef: GetDoctorsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDoctorsRef:
```typescript
const name = getDoctorsRef.operationName;
console.log(name);
```

### Variables
The `GetDoctors` query has no variables.
### Return Type
Recall that executing the `GetDoctors` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDoctorsData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDoctors`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDoctors } from '@firebasegen/default-connector';


// Call the `getDoctors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDoctors();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDoctors(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getDoctors().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetDoctors`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDoctorsRef } from '@firebasegen/default-connector';


// Call the `getDoctorsRef()` function to get a reference to the query.
const ref = getDoctorsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDoctorsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetPatientsByDoctor
You can execute the `GetPatientsByDoctor` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getPatientsByDoctor(vars: GetPatientsByDoctorVariables): QueryPromise<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;

interface GetPatientsByDoctorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPatientsByDoctorVariables): QueryRef<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;
}
export const getPatientsByDoctorRef: GetPatientsByDoctorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPatientsByDoctor(dc: DataConnect, vars: GetPatientsByDoctorVariables): QueryPromise<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;

interface GetPatientsByDoctorRef {
  ...
  (dc: DataConnect, vars: GetPatientsByDoctorVariables): QueryRef<GetPatientsByDoctorData, GetPatientsByDoctorVariables>;
}
export const getPatientsByDoctorRef: GetPatientsByDoctorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPatientsByDoctorRef:
```typescript
const name = getPatientsByDoctorRef.operationName;
console.log(name);
```

### Variables
The `GetPatientsByDoctor` query requires an argument of type `GetPatientsByDoctorVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPatientsByDoctorVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetPatientsByDoctor` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPatientsByDoctorData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPatientsByDoctor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPatientsByDoctor, GetPatientsByDoctorVariables } from '@firebasegen/default-connector';

// The `GetPatientsByDoctor` query requires an argument of type `GetPatientsByDoctorVariables`:
const getPatientsByDoctorVars: GetPatientsByDoctorVariables = {
  doctorUid: ..., 
};

// Call the `getPatientsByDoctor()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPatientsByDoctor(getPatientsByDoctorVars);
// Variables can be defined inline as well.
const { data } = await getPatientsByDoctor({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPatientsByDoctor(dataConnect, getPatientsByDoctorVars);

console.log(data.patientProfiles);

// Or, you can use the `Promise` API.
getPatientsByDoctor(getPatientsByDoctorVars).then((response) => {
  const data = response.data;
  console.log(data.patientProfiles);
});
```

### Using `GetPatientsByDoctor`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPatientsByDoctorRef, GetPatientsByDoctorVariables } from '@firebasegen/default-connector';

// The `GetPatientsByDoctor` query requires an argument of type `GetPatientsByDoctorVariables`:
const getPatientsByDoctorVars: GetPatientsByDoctorVariables = {
  doctorUid: ..., 
};

// Call the `getPatientsByDoctorRef()` function to get a reference to the query.
const ref = getPatientsByDoctorRef(getPatientsByDoctorVars);
// Variables can be defined inline as well.
const ref = getPatientsByDoctorRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPatientsByDoctorRef(dataConnect, getPatientsByDoctorVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.patientProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfiles);
});
```

## GetAppointments
You can execute the `GetAppointments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getAppointments(): QueryPromise<GetAppointmentsData, undefined>;

interface GetAppointmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAppointmentsData, undefined>;
}
export const getAppointmentsRef: GetAppointmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAppointments(dc: DataConnect): QueryPromise<GetAppointmentsData, undefined>;

interface GetAppointmentsRef {
  ...
  (dc: DataConnect): QueryRef<GetAppointmentsData, undefined>;
}
export const getAppointmentsRef: GetAppointmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAppointmentsRef:
```typescript
const name = getAppointmentsRef.operationName;
console.log(name);
```

### Variables
The `GetAppointments` query has no variables.
### Return Type
Recall that executing the `GetAppointments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAppointmentsData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAppointments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAppointments } from '@firebasegen/default-connector';


// Call the `getAppointments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAppointments();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAppointments(dataConnect);

console.log(data.appointments);

// Or, you can use the `Promise` API.
getAppointments().then((response) => {
  const data = response.data;
  console.log(data.appointments);
});
```

### Using `GetAppointments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAppointmentsRef } from '@firebasegen/default-connector';


// Call the `getAppointmentsRef()` function to get a reference to the query.
const ref = getAppointmentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAppointmentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointments);
});
```

## GetAiDiagnoses
You can execute the `GetAiDiagnoses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getAiDiagnoses(): QueryPromise<GetAiDiagnosesData, undefined>;

interface GetAiDiagnosesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAiDiagnosesData, undefined>;
}
export const getAiDiagnosesRef: GetAiDiagnosesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAiDiagnoses(dc: DataConnect): QueryPromise<GetAiDiagnosesData, undefined>;

interface GetAiDiagnosesRef {
  ...
  (dc: DataConnect): QueryRef<GetAiDiagnosesData, undefined>;
}
export const getAiDiagnosesRef: GetAiDiagnosesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAiDiagnosesRef:
```typescript
const name = getAiDiagnosesRef.operationName;
console.log(name);
```

### Variables
The `GetAiDiagnoses` query has no variables.
### Return Type
Recall that executing the `GetAiDiagnoses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAiDiagnosesData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAiDiagnoses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAiDiagnoses } from '@firebasegen/default-connector';


// Call the `getAiDiagnoses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAiDiagnoses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAiDiagnoses(dataConnect);

console.log(data.aiDiagnoses);

// Or, you can use the `Promise` API.
getAiDiagnoses().then((response) => {
  const data = response.data;
  console.log(data.aiDiagnoses);
});
```

### Using `GetAiDiagnoses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAiDiagnosesRef } from '@firebasegen/default-connector';


// Call the `getAiDiagnosesRef()` function to get a reference to the query.
const ref = getAiDiagnosesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAiDiagnosesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.aiDiagnoses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnoses);
});
```

## GetLandingWorkspace
You can execute the `GetLandingWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getLandingWorkspace(): QueryPromise<GetLandingWorkspaceData, undefined>;

interface GetLandingWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLandingWorkspaceData, undefined>;
}
export const getLandingWorkspaceRef: GetLandingWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLandingWorkspace(dc: DataConnect): QueryPromise<GetLandingWorkspaceData, undefined>;

interface GetLandingWorkspaceRef {
  ...
  (dc: DataConnect): QueryRef<GetLandingWorkspaceData, undefined>;
}
export const getLandingWorkspaceRef: GetLandingWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLandingWorkspaceRef:
```typescript
const name = getLandingWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetLandingWorkspace` query has no variables.
### Return Type
Recall that executing the `GetLandingWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLandingWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLandingWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLandingWorkspace } from '@firebasegen/default-connector';


// Call the `getLandingWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLandingWorkspace();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLandingWorkspace(dataConnect);

console.log(data.landingHeroContents);
console.log(data.landingFeatures);
console.log(data.landingArticles);
console.log(data.supportContactInfos);

// Or, you can use the `Promise` API.
getLandingWorkspace().then((response) => {
  const data = response.data;
  console.log(data.landingHeroContents);
  console.log(data.landingFeatures);
  console.log(data.landingArticles);
  console.log(data.supportContactInfos);
});
```

### Using `GetLandingWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLandingWorkspaceRef } from '@firebasegen/default-connector';


// Call the `getLandingWorkspaceRef()` function to get a reference to the query.
const ref = getLandingWorkspaceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLandingWorkspaceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.landingHeroContents);
console.log(data.landingFeatures);
console.log(data.landingArticles);
console.log(data.supportContactInfos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.landingHeroContents);
  console.log(data.landingFeatures);
  console.log(data.landingArticles);
  console.log(data.supportContactInfos);
});
```

## GetZaloContacts
You can execute the `GetZaloContacts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getZaloContacts(): QueryPromise<GetZaloContactsData, undefined>;

interface GetZaloContactsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetZaloContactsData, undefined>;
}
export const getZaloContactsRef: GetZaloContactsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getZaloContacts(dc: DataConnect): QueryPromise<GetZaloContactsData, undefined>;

interface GetZaloContactsRef {
  ...
  (dc: DataConnect): QueryRef<GetZaloContactsData, undefined>;
}
export const getZaloContactsRef: GetZaloContactsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getZaloContactsRef:
```typescript
const name = getZaloContactsRef.operationName;
console.log(name);
```

### Variables
The `GetZaloContacts` query has no variables.
### Return Type
Recall that executing the `GetZaloContacts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetZaloContactsData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetZaloContacts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getZaloContacts } from '@firebasegen/default-connector';


// Call the `getZaloContacts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getZaloContacts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getZaloContacts(dataConnect);

console.log(data.zaloContacts);

// Or, you can use the `Promise` API.
getZaloContacts().then((response) => {
  const data = response.data;
  console.log(data.zaloContacts);
});
```

### Using `GetZaloContacts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getZaloContactsRef } from '@firebasegen/default-connector';


// Call the `getZaloContactsRef()` function to get a reference to the query.
const ref = getZaloContactsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getZaloContactsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.zaloContacts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.zaloContacts);
});
```

## GetDashboardHomeWorkspace
You can execute the `GetDashboardHomeWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getDashboardHomeWorkspace(vars: GetDashboardHomeWorkspaceVariables): QueryPromise<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;

interface GetDashboardHomeWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDashboardHomeWorkspaceVariables): QueryRef<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;
}
export const getDashboardHomeWorkspaceRef: GetDashboardHomeWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDashboardHomeWorkspace(dc: DataConnect, vars: GetDashboardHomeWorkspaceVariables): QueryPromise<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;

interface GetDashboardHomeWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetDashboardHomeWorkspaceVariables): QueryRef<GetDashboardHomeWorkspaceData, GetDashboardHomeWorkspaceVariables>;
}
export const getDashboardHomeWorkspaceRef: GetDashboardHomeWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDashboardHomeWorkspaceRef:
```typescript
const name = getDashboardHomeWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetDashboardHomeWorkspace` query requires an argument of type `GetDashboardHomeWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDashboardHomeWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetDashboardHomeWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDashboardHomeWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDashboardHomeWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDashboardHomeWorkspace, GetDashboardHomeWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetDashboardHomeWorkspace` query requires an argument of type `GetDashboardHomeWorkspaceVariables`:
const getDashboardHomeWorkspaceVars: GetDashboardHomeWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getDashboardHomeWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDashboardHomeWorkspace(getDashboardHomeWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getDashboardHomeWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDashboardHomeWorkspace(dataConnect, getDashboardHomeWorkspaceVars);

console.log(data.doctorProfiles);
console.log(data.users);
console.log(data.patientProfiles);
console.log(data.aiDiagnoses);
console.log(data.appointments);
console.log(data.dashboardSpotlightCases);
console.log(data.serviceRecords);
console.log(data.assistantMessages);
console.log(data.scheduleEvents);

// Or, you can use the `Promise` API.
getDashboardHomeWorkspace(getDashboardHomeWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.doctorProfiles);
  console.log(data.users);
  console.log(data.patientProfiles);
  console.log(data.aiDiagnoses);
  console.log(data.appointments);
  console.log(data.dashboardSpotlightCases);
  console.log(data.serviceRecords);
  console.log(data.assistantMessages);
  console.log(data.scheduleEvents);
});
```

### Using `GetDashboardHomeWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDashboardHomeWorkspaceRef, GetDashboardHomeWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetDashboardHomeWorkspace` query requires an argument of type `GetDashboardHomeWorkspaceVariables`:
const getDashboardHomeWorkspaceVars: GetDashboardHomeWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getDashboardHomeWorkspaceRef()` function to get a reference to the query.
const ref = getDashboardHomeWorkspaceRef(getDashboardHomeWorkspaceVars);
// Variables can be defined inline as well.
const ref = getDashboardHomeWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDashboardHomeWorkspaceRef(dataConnect, getDashboardHomeWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.doctorProfiles);
console.log(data.users);
console.log(data.patientProfiles);
console.log(data.aiDiagnoses);
console.log(data.appointments);
console.log(data.dashboardSpotlightCases);
console.log(data.serviceRecords);
console.log(data.assistantMessages);
console.log(data.scheduleEvents);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.doctorProfiles);
  console.log(data.users);
  console.log(data.patientProfiles);
  console.log(data.aiDiagnoses);
  console.log(data.appointments);
  console.log(data.dashboardSpotlightCases);
  console.log(data.serviceRecords);
  console.log(data.assistantMessages);
  console.log(data.scheduleEvents);
});
```

## GetPatientWorkspace
You can execute the `GetPatientWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getPatientWorkspace(vars: GetPatientWorkspaceVariables): QueryPromise<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;

interface GetPatientWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPatientWorkspaceVariables): QueryRef<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;
}
export const getPatientWorkspaceRef: GetPatientWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPatientWorkspace(dc: DataConnect, vars: GetPatientWorkspaceVariables): QueryPromise<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;

interface GetPatientWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetPatientWorkspaceVariables): QueryRef<GetPatientWorkspaceData, GetPatientWorkspaceVariables>;
}
export const getPatientWorkspaceRef: GetPatientWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPatientWorkspaceRef:
```typescript
const name = getPatientWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetPatientWorkspace` query requires an argument of type `GetPatientWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPatientWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetPatientWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPatientWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPatientWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPatientWorkspace, GetPatientWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetPatientWorkspace` query requires an argument of type `GetPatientWorkspaceVariables`:
const getPatientWorkspaceVars: GetPatientWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getPatientWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPatientWorkspace(getPatientWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getPatientWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPatientWorkspace(dataConnect, getPatientWorkspaceVars);

console.log(data.patientProfiles);
console.log(data.aiDiagnoses);
console.log(data.appointments);

// Or, you can use the `Promise` API.
getPatientWorkspace(getPatientWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.patientProfiles);
  console.log(data.aiDiagnoses);
  console.log(data.appointments);
});
```

### Using `GetPatientWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPatientWorkspaceRef, GetPatientWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetPatientWorkspace` query requires an argument of type `GetPatientWorkspaceVariables`:
const getPatientWorkspaceVars: GetPatientWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getPatientWorkspaceRef()` function to get a reference to the query.
const ref = getPatientWorkspaceRef(getPatientWorkspaceVars);
// Variables can be defined inline as well.
const ref = getPatientWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPatientWorkspaceRef(dataConnect, getPatientWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.patientProfiles);
console.log(data.aiDiagnoses);
console.log(data.appointments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfiles);
  console.log(data.aiDiagnoses);
  console.log(data.appointments);
});
```

## GetScheduleWorkspace
You can execute the `GetScheduleWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getScheduleWorkspace(vars: GetScheduleWorkspaceVariables): QueryPromise<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;

interface GetScheduleWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetScheduleWorkspaceVariables): QueryRef<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;
}
export const getScheduleWorkspaceRef: GetScheduleWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getScheduleWorkspace(dc: DataConnect, vars: GetScheduleWorkspaceVariables): QueryPromise<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;

interface GetScheduleWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetScheduleWorkspaceVariables): QueryRef<GetScheduleWorkspaceData, GetScheduleWorkspaceVariables>;
}
export const getScheduleWorkspaceRef: GetScheduleWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getScheduleWorkspaceRef:
```typescript
const name = getScheduleWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetScheduleWorkspace` query requires an argument of type `GetScheduleWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetScheduleWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetScheduleWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetScheduleWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetScheduleWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getScheduleWorkspace, GetScheduleWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetScheduleWorkspace` query requires an argument of type `GetScheduleWorkspaceVariables`:
const getScheduleWorkspaceVars: GetScheduleWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getScheduleWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getScheduleWorkspace(getScheduleWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getScheduleWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getScheduleWorkspace(dataConnect, getScheduleWorkspaceVars);

console.log(data.scheduleEvents);
console.log(data.scheduleAttachments);
console.log(data.doctorAvailabilities);
console.log(data.patientProfiles);

// Or, you can use the `Promise` API.
getScheduleWorkspace(getScheduleWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.scheduleEvents);
  console.log(data.scheduleAttachments);
  console.log(data.doctorAvailabilities);
  console.log(data.patientProfiles);
});
```

### Using `GetScheduleWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getScheduleWorkspaceRef, GetScheduleWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetScheduleWorkspace` query requires an argument of type `GetScheduleWorkspaceVariables`:
const getScheduleWorkspaceVars: GetScheduleWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getScheduleWorkspaceRef()` function to get a reference to the query.
const ref = getScheduleWorkspaceRef(getScheduleWorkspaceVars);
// Variables can be defined inline as well.
const ref = getScheduleWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getScheduleWorkspaceRef(dataConnect, getScheduleWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.scheduleEvents);
console.log(data.scheduleAttachments);
console.log(data.doctorAvailabilities);
console.log(data.patientProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.scheduleEvents);
  console.log(data.scheduleAttachments);
  console.log(data.doctorAvailabilities);
  console.log(data.patientProfiles);
});
```

## GetConsultationWorkspace
You can execute the `GetConsultationWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getConsultationWorkspace(vars: GetConsultationWorkspaceVariables): QueryPromise<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;

interface GetConsultationWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConsultationWorkspaceVariables): QueryRef<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;
}
export const getConsultationWorkspaceRef: GetConsultationWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getConsultationWorkspace(dc: DataConnect, vars: GetConsultationWorkspaceVariables): QueryPromise<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;

interface GetConsultationWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetConsultationWorkspaceVariables): QueryRef<GetConsultationWorkspaceData, GetConsultationWorkspaceVariables>;
}
export const getConsultationWorkspaceRef: GetConsultationWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getConsultationWorkspaceRef:
```typescript
const name = getConsultationWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetConsultationWorkspace` query requires an argument of type `GetConsultationWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetConsultationWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetConsultationWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetConsultationWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetConsultationWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getConsultationWorkspace, GetConsultationWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetConsultationWorkspace` query requires an argument of type `GetConsultationWorkspaceVariables`:
const getConsultationWorkspaceVars: GetConsultationWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getConsultationWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getConsultationWorkspace(getConsultationWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getConsultationWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getConsultationWorkspace(dataConnect, getConsultationWorkspaceVars);

console.log(data.appointments);
console.log(data.appointmentAttachments);
console.log(data.consultationRooms);

// Or, you can use the `Promise` API.
getConsultationWorkspace(getConsultationWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.appointments);
  console.log(data.appointmentAttachments);
  console.log(data.consultationRooms);
});
```

### Using `GetConsultationWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getConsultationWorkspaceRef, GetConsultationWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetConsultationWorkspace` query requires an argument of type `GetConsultationWorkspaceVariables`:
const getConsultationWorkspaceVars: GetConsultationWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getConsultationWorkspaceRef()` function to get a reference to the query.
const ref = getConsultationWorkspaceRef(getConsultationWorkspaceVars);
// Variables can be defined inline as well.
const ref = getConsultationWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getConsultationWorkspaceRef(dataConnect, getConsultationWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appointments);
console.log(data.appointmentAttachments);
console.log(data.consultationRooms);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appointments);
  console.log(data.appointmentAttachments);
  console.log(data.consultationRooms);
});
```

## GetAiDiagnosisWorkspace
You can execute the `GetAiDiagnosisWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getAiDiagnosisWorkspace(vars: GetAiDiagnosisWorkspaceVariables): QueryPromise<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;

interface GetAiDiagnosisWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAiDiagnosisWorkspaceVariables): QueryRef<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;
}
export const getAiDiagnosisWorkspaceRef: GetAiDiagnosisWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAiDiagnosisWorkspace(dc: DataConnect, vars: GetAiDiagnosisWorkspaceVariables): QueryPromise<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;

interface GetAiDiagnosisWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetAiDiagnosisWorkspaceVariables): QueryRef<GetAiDiagnosisWorkspaceData, GetAiDiagnosisWorkspaceVariables>;
}
export const getAiDiagnosisWorkspaceRef: GetAiDiagnosisWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAiDiagnosisWorkspaceRef:
```typescript
const name = getAiDiagnosisWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetAiDiagnosisWorkspace` query requires an argument of type `GetAiDiagnosisWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAiDiagnosisWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetAiDiagnosisWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAiDiagnosisWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAiDiagnosisWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAiDiagnosisWorkspace, GetAiDiagnosisWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetAiDiagnosisWorkspace` query requires an argument of type `GetAiDiagnosisWorkspaceVariables`:
const getAiDiagnosisWorkspaceVars: GetAiDiagnosisWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getAiDiagnosisWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAiDiagnosisWorkspace(getAiDiagnosisWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getAiDiagnosisWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAiDiagnosisWorkspace(dataConnect, getAiDiagnosisWorkspaceVars);

console.log(data.aiDiagnoses);
console.log(data.aiDiagnosisReferences);

// Or, you can use the `Promise` API.
getAiDiagnosisWorkspace(getAiDiagnosisWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnoses);
  console.log(data.aiDiagnosisReferences);
});
```

### Using `GetAiDiagnosisWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAiDiagnosisWorkspaceRef, GetAiDiagnosisWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetAiDiagnosisWorkspace` query requires an argument of type `GetAiDiagnosisWorkspaceVariables`:
const getAiDiagnosisWorkspaceVars: GetAiDiagnosisWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getAiDiagnosisWorkspaceRef()` function to get a reference to the query.
const ref = getAiDiagnosisWorkspaceRef(getAiDiagnosisWorkspaceVars);
// Variables can be defined inline as well.
const ref = getAiDiagnosisWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAiDiagnosisWorkspaceRef(dataConnect, getAiDiagnosisWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.aiDiagnoses);
console.log(data.aiDiagnosisReferences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnoses);
  console.log(data.aiDiagnosisReferences);
});
```

## GetPharmacyWorkspace
You can execute the `GetPharmacyWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getPharmacyWorkspace(vars: GetPharmacyWorkspaceVariables): QueryPromise<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;

interface GetPharmacyWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPharmacyWorkspaceVariables): QueryRef<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;
}
export const getPharmacyWorkspaceRef: GetPharmacyWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPharmacyWorkspace(dc: DataConnect, vars: GetPharmacyWorkspaceVariables): QueryPromise<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;

interface GetPharmacyWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetPharmacyWorkspaceVariables): QueryRef<GetPharmacyWorkspaceData, GetPharmacyWorkspaceVariables>;
}
export const getPharmacyWorkspaceRef: GetPharmacyWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPharmacyWorkspaceRef:
```typescript
const name = getPharmacyWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetPharmacyWorkspace` query requires an argument of type `GetPharmacyWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPharmacyWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetPharmacyWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPharmacyWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPharmacyWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPharmacyWorkspace, GetPharmacyWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetPharmacyWorkspace` query requires an argument of type `GetPharmacyWorkspaceVariables`:
const getPharmacyWorkspaceVars: GetPharmacyWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getPharmacyWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPharmacyWorkspace(getPharmacyWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getPharmacyWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPharmacyWorkspace(dataConnect, getPharmacyWorkspaceVars);

console.log(data.prescriptionTemplates);
console.log(data.prescriptionTemplateDrugs);
console.log(data.drugCatalogItems);
console.log(data.prescriptionDrafts);
console.log(data.prescriptionDraftItems);
console.log(data.patientProfiles);

// Or, you can use the `Promise` API.
getPharmacyWorkspace(getPharmacyWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionTemplates);
  console.log(data.prescriptionTemplateDrugs);
  console.log(data.drugCatalogItems);
  console.log(data.prescriptionDrafts);
  console.log(data.prescriptionDraftItems);
  console.log(data.patientProfiles);
});
```

### Using `GetPharmacyWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPharmacyWorkspaceRef, GetPharmacyWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetPharmacyWorkspace` query requires an argument of type `GetPharmacyWorkspaceVariables`:
const getPharmacyWorkspaceVars: GetPharmacyWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getPharmacyWorkspaceRef()` function to get a reference to the query.
const ref = getPharmacyWorkspaceRef(getPharmacyWorkspaceVars);
// Variables can be defined inline as well.
const ref = getPharmacyWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPharmacyWorkspaceRef(dataConnect, getPharmacyWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.prescriptionTemplates);
console.log(data.prescriptionTemplateDrugs);
console.log(data.drugCatalogItems);
console.log(data.prescriptionDrafts);
console.log(data.prescriptionDraftItems);
console.log(data.patientProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionTemplates);
  console.log(data.prescriptionTemplateDrugs);
  console.log(data.drugCatalogItems);
  console.log(data.prescriptionDrafts);
  console.log(data.prescriptionDraftItems);
  console.log(data.patientProfiles);
});
```

## GetReportsWorkspace
You can execute the `GetReportsWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getReportsWorkspace(): QueryPromise<GetReportsWorkspaceData, undefined>;

interface GetReportsWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetReportsWorkspaceData, undefined>;
}
export const getReportsWorkspaceRef: GetReportsWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReportsWorkspace(dc: DataConnect): QueryPromise<GetReportsWorkspaceData, undefined>;

interface GetReportsWorkspaceRef {
  ...
  (dc: DataConnect): QueryRef<GetReportsWorkspaceData, undefined>;
}
export const getReportsWorkspaceRef: GetReportsWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReportsWorkspaceRef:
```typescript
const name = getReportsWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetReportsWorkspace` query has no variables.
### Return Type
Recall that executing the `GetReportsWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReportsWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetReportsWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReportsWorkspace } from '@firebasegen/default-connector';


// Call the `getReportsWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReportsWorkspace();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReportsWorkspace(dataConnect);

console.log(data.reportSummaryMetrics);
console.log(data.reportStageDistributions);
console.log(data.reportTrendPoints);
console.log(data.reportAlertCases);

// Or, you can use the `Promise` API.
getReportsWorkspace().then((response) => {
  const data = response.data;
  console.log(data.reportSummaryMetrics);
  console.log(data.reportStageDistributions);
  console.log(data.reportTrendPoints);
  console.log(data.reportAlertCases);
});
```

### Using `GetReportsWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReportsWorkspaceRef } from '@firebasegen/default-connector';


// Call the `getReportsWorkspaceRef()` function to get a reference to the query.
const ref = getReportsWorkspaceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReportsWorkspaceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reportSummaryMetrics);
console.log(data.reportStageDistributions);
console.log(data.reportTrendPoints);
console.log(data.reportAlertCases);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reportSummaryMetrics);
  console.log(data.reportStageDistributions);
  console.log(data.reportTrendPoints);
  console.log(data.reportAlertCases);
});
```

## GetDoctorProfileWorkspace
You can execute the `GetDoctorProfileWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getDoctorProfileWorkspace(vars: GetDoctorProfileWorkspaceVariables): QueryPromise<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;

interface GetDoctorProfileWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDoctorProfileWorkspaceVariables): QueryRef<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;
}
export const getDoctorProfileWorkspaceRef: GetDoctorProfileWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDoctorProfileWorkspace(dc: DataConnect, vars: GetDoctorProfileWorkspaceVariables): QueryPromise<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;

interface GetDoctorProfileWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetDoctorProfileWorkspaceVariables): QueryRef<GetDoctorProfileWorkspaceData, GetDoctorProfileWorkspaceVariables>;
}
export const getDoctorProfileWorkspaceRef: GetDoctorProfileWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDoctorProfileWorkspaceRef:
```typescript
const name = getDoctorProfileWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetDoctorProfileWorkspace` query requires an argument of type `GetDoctorProfileWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDoctorProfileWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetDoctorProfileWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDoctorProfileWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDoctorProfileWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDoctorProfileWorkspace, GetDoctorProfileWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetDoctorProfileWorkspace` query requires an argument of type `GetDoctorProfileWorkspaceVariables`:
const getDoctorProfileWorkspaceVars: GetDoctorProfileWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getDoctorProfileWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDoctorProfileWorkspace(getDoctorProfileWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getDoctorProfileWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDoctorProfileWorkspace(dataConnect, getDoctorProfileWorkspaceVars);

console.log(data.doctorProfiles);
console.log(data.doctorProfileMetrics);

// Or, you can use the `Promise` API.
getDoctorProfileWorkspace(getDoctorProfileWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.doctorProfiles);
  console.log(data.doctorProfileMetrics);
});
```

### Using `GetDoctorProfileWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDoctorProfileWorkspaceRef, GetDoctorProfileWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetDoctorProfileWorkspace` query requires an argument of type `GetDoctorProfileWorkspaceVariables`:
const getDoctorProfileWorkspaceVars: GetDoctorProfileWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getDoctorProfileWorkspaceRef()` function to get a reference to the query.
const ref = getDoctorProfileWorkspaceRef(getDoctorProfileWorkspaceVars);
// Variables can be defined inline as well.
const ref = getDoctorProfileWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDoctorProfileWorkspaceRef(dataConnect, getDoctorProfileWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.doctorProfiles);
console.log(data.doctorProfileMetrics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.doctorProfiles);
  console.log(data.doctorProfileMetrics);
});
```

## GetSettingsWorkspace
You can execute the `GetSettingsWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getSettingsWorkspace(vars: GetSettingsWorkspaceVariables): QueryPromise<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;

interface GetSettingsWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSettingsWorkspaceVariables): QueryRef<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;
}
export const getSettingsWorkspaceRef: GetSettingsWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSettingsWorkspace(dc: DataConnect, vars: GetSettingsWorkspaceVariables): QueryPromise<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;

interface GetSettingsWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetSettingsWorkspaceVariables): QueryRef<GetSettingsWorkspaceData, GetSettingsWorkspaceVariables>;
}
export const getSettingsWorkspaceRef: GetSettingsWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSettingsWorkspaceRef:
```typescript
const name = getSettingsWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetSettingsWorkspace` query requires an argument of type `GetSettingsWorkspaceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSettingsWorkspaceVariables {
  doctorUid: string;
}
```
### Return Type
Recall that executing the `GetSettingsWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSettingsWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSettingsWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSettingsWorkspace, GetSettingsWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetSettingsWorkspace` query requires an argument of type `GetSettingsWorkspaceVariables`:
const getSettingsWorkspaceVars: GetSettingsWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getSettingsWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSettingsWorkspace(getSettingsWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getSettingsWorkspace({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSettingsWorkspace(dataConnect, getSettingsWorkspaceVars);

console.log(data.notificationPreferences);
console.log(data.workingScheduleSlots);
console.log(data.digitalSignatures);
console.log(data.users);

// Or, you can use the `Promise` API.
getSettingsWorkspace(getSettingsWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.notificationPreferences);
  console.log(data.workingScheduleSlots);
  console.log(data.digitalSignatures);
  console.log(data.users);
});
```

### Using `GetSettingsWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSettingsWorkspaceRef, GetSettingsWorkspaceVariables } from '@firebasegen/default-connector';

// The `GetSettingsWorkspace` query requires an argument of type `GetSettingsWorkspaceVariables`:
const getSettingsWorkspaceVars: GetSettingsWorkspaceVariables = {
  doctorUid: ..., 
};

// Call the `getSettingsWorkspaceRef()` function to get a reference to the query.
const ref = getSettingsWorkspaceRef(getSettingsWorkspaceVars);
// Variables can be defined inline as well.
const ref = getSettingsWorkspaceRef({ doctorUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSettingsWorkspaceRef(dataConnect, getSettingsWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notificationPreferences);
console.log(data.workingScheduleSlots);
console.log(data.digitalSignatures);
console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notificationPreferences);
  console.log(data.workingScheduleSlots);
  console.log(data.digitalSignatures);
  console.log(data.users);
});
```

## GetRecordDigitizationWorkspace
You can execute the `GetRecordDigitizationWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
getRecordDigitizationWorkspace(): QueryPromise<GetRecordDigitizationWorkspaceData, undefined>;

interface GetRecordDigitizationWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRecordDigitizationWorkspaceData, undefined>;
}
export const getRecordDigitizationWorkspaceRef: GetRecordDigitizationWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRecordDigitizationWorkspace(dc: DataConnect): QueryPromise<GetRecordDigitizationWorkspaceData, undefined>;

interface GetRecordDigitizationWorkspaceRef {
  ...
  (dc: DataConnect): QueryRef<GetRecordDigitizationWorkspaceData, undefined>;
}
export const getRecordDigitizationWorkspaceRef: GetRecordDigitizationWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRecordDigitizationWorkspaceRef:
```typescript
const name = getRecordDigitizationWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetRecordDigitizationWorkspace` query has no variables.
### Return Type
Recall that executing the `GetRecordDigitizationWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRecordDigitizationWorkspaceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetRecordDigitizationWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRecordDigitizationWorkspace } from '@firebasegen/default-connector';


// Call the `getRecordDigitizationWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRecordDigitizationWorkspace();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRecordDigitizationWorkspace(dataConnect);

console.log(data.digitizationJobs);
console.log(data.digitizationMetrics);

// Or, you can use the `Promise` API.
getRecordDigitizationWorkspace().then((response) => {
  const data = response.data;
  console.log(data.digitizationJobs);
  console.log(data.digitizationMetrics);
});
```

### Using `GetRecordDigitizationWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRecordDigitizationWorkspaceRef } from '@firebasegen/default-connector';


// Call the `getRecordDigitizationWorkspaceRef()` function to get a reference to the query.
const ref = getRecordDigitizationWorkspaceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRecordDigitizationWorkspaceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.digitizationJobs);
console.log(data.digitizationMetrics);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.digitizationJobs);
  console.log(data.digitizationMetrics);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## SeedAdminUser
You can execute the `SeedAdminUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAdminUser(): MutationPromise<SeedAdminUserData, undefined>;

interface SeedAdminUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAdminUserData, undefined>;
}
export const seedAdminUserRef: SeedAdminUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAdminUser(dc: DataConnect): MutationPromise<SeedAdminUserData, undefined>;

interface SeedAdminUserRef {
  ...
  (dc: DataConnect): MutationRef<SeedAdminUserData, undefined>;
}
export const seedAdminUserRef: SeedAdminUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAdminUserRef:
```typescript
const name = seedAdminUserRef.operationName;
console.log(name);
```

### Variables
The `SeedAdminUser` mutation has no variables.
### Return Type
Recall that executing the `SeedAdminUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAdminUserData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAdminUserData {
  user_insert: User_Key;
}
```
### Using `SeedAdminUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAdminUser } from '@firebasegen/default-connector';


// Call the `seedAdminUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAdminUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAdminUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedAdminUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedAdminUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAdminUserRef } from '@firebasegen/default-connector';


// Call the `seedAdminUserRef()` function to get a reference to the mutation.
const ref = seedAdminUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAdminUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedDoctorNguyenHoangMinh
You can execute the `SeedDoctorNguyenHoangMinh` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedDoctorNguyenHoangMinh(): MutationPromise<SeedDoctorNguyenHoangMinhData, undefined>;

interface SeedDoctorNguyenHoangMinhRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedDoctorNguyenHoangMinhData, undefined>;
}
export const seedDoctorNguyenHoangMinhRef: SeedDoctorNguyenHoangMinhRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedDoctorNguyenHoangMinh(dc: DataConnect): MutationPromise<SeedDoctorNguyenHoangMinhData, undefined>;

interface SeedDoctorNguyenHoangMinhRef {
  ...
  (dc: DataConnect): MutationRef<SeedDoctorNguyenHoangMinhData, undefined>;
}
export const seedDoctorNguyenHoangMinhRef: SeedDoctorNguyenHoangMinhRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedDoctorNguyenHoangMinhRef:
```typescript
const name = seedDoctorNguyenHoangMinhRef.operationName;
console.log(name);
```

### Variables
The `SeedDoctorNguyenHoangMinh` mutation has no variables.
### Return Type
Recall that executing the `SeedDoctorNguyenHoangMinh` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedDoctorNguyenHoangMinhData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedDoctorNguyenHoangMinhData {
  user_insert: User_Key;
}
```
### Using `SeedDoctorNguyenHoangMinh`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedDoctorNguyenHoangMinh } from '@firebasegen/default-connector';


// Call the `seedDoctorNguyenHoangMinh()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedDoctorNguyenHoangMinh();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedDoctorNguyenHoangMinh(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedDoctorNguyenHoangMinh().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedDoctorNguyenHoangMinh`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedDoctorNguyenHoangMinhRef } from '@firebasegen/default-connector';


// Call the `seedDoctorNguyenHoangMinhRef()` function to get a reference to the mutation.
const ref = seedDoctorNguyenHoangMinhRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedDoctorNguyenHoangMinhRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedDoctorTranLanAnh
You can execute the `SeedDoctorTranLanAnh` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedDoctorTranLanAnh(): MutationPromise<SeedDoctorTranLanAnhData, undefined>;

interface SeedDoctorTranLanAnhRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedDoctorTranLanAnhData, undefined>;
}
export const seedDoctorTranLanAnhRef: SeedDoctorTranLanAnhRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedDoctorTranLanAnh(dc: DataConnect): MutationPromise<SeedDoctorTranLanAnhData, undefined>;

interface SeedDoctorTranLanAnhRef {
  ...
  (dc: DataConnect): MutationRef<SeedDoctorTranLanAnhData, undefined>;
}
export const seedDoctorTranLanAnhRef: SeedDoctorTranLanAnhRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedDoctorTranLanAnhRef:
```typescript
const name = seedDoctorTranLanAnhRef.operationName;
console.log(name);
```

### Variables
The `SeedDoctorTranLanAnh` mutation has no variables.
### Return Type
Recall that executing the `SeedDoctorTranLanAnh` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedDoctorTranLanAnhData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedDoctorTranLanAnhData {
  user_insert: User_Key;
}
```
### Using `SeedDoctorTranLanAnh`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedDoctorTranLanAnh } from '@firebasegen/default-connector';


// Call the `seedDoctorTranLanAnh()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedDoctorTranLanAnh();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedDoctorTranLanAnh(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedDoctorTranLanAnh().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedDoctorTranLanAnh`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedDoctorTranLanAnhRef } from '@firebasegen/default-connector';


// Call the `seedDoctorTranLanAnhRef()` function to get a reference to the mutation.
const ref = seedDoctorTranLanAnhRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedDoctorTranLanAnhRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedPatientLeMinh
You can execute the `SeedPatientLeMinh` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedPatientLeMinh(): MutationPromise<SeedPatientLeMinhData, undefined>;

interface SeedPatientLeMinhRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientLeMinhData, undefined>;
}
export const seedPatientLeMinhRef: SeedPatientLeMinhRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedPatientLeMinh(dc: DataConnect): MutationPromise<SeedPatientLeMinhData, undefined>;

interface SeedPatientLeMinhRef {
  ...
  (dc: DataConnect): MutationRef<SeedPatientLeMinhData, undefined>;
}
export const seedPatientLeMinhRef: SeedPatientLeMinhRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedPatientLeMinhRef:
```typescript
const name = seedPatientLeMinhRef.operationName;
console.log(name);
```

### Variables
The `SeedPatientLeMinh` mutation has no variables.
### Return Type
Recall that executing the `SeedPatientLeMinh` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedPatientLeMinhData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedPatientLeMinhData {
  user_insert: User_Key;
}
```
### Using `SeedPatientLeMinh`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedPatientLeMinh } from '@firebasegen/default-connector';


// Call the `seedPatientLeMinh()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedPatientLeMinh();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedPatientLeMinh(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedPatientLeMinh().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedPatientLeMinh`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedPatientLeMinhRef } from '@firebasegen/default-connector';


// Call the `seedPatientLeMinhRef()` function to get a reference to the mutation.
const ref = seedPatientLeMinhRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedPatientLeMinhRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedPatientPhamThuHa
You can execute the `SeedPatientPhamThuHa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedPatientPhamThuHa(): MutationPromise<SeedPatientPhamThuHaData, undefined>;

interface SeedPatientPhamThuHaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientPhamThuHaData, undefined>;
}
export const seedPatientPhamThuHaRef: SeedPatientPhamThuHaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedPatientPhamThuHa(dc: DataConnect): MutationPromise<SeedPatientPhamThuHaData, undefined>;

interface SeedPatientPhamThuHaRef {
  ...
  (dc: DataConnect): MutationRef<SeedPatientPhamThuHaData, undefined>;
}
export const seedPatientPhamThuHaRef: SeedPatientPhamThuHaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedPatientPhamThuHaRef:
```typescript
const name = seedPatientPhamThuHaRef.operationName;
console.log(name);
```

### Variables
The `SeedPatientPhamThuHa` mutation has no variables.
### Return Type
Recall that executing the `SeedPatientPhamThuHa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedPatientPhamThuHaData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedPatientPhamThuHaData {
  user_insert: User_Key;
}
```
### Using `SeedPatientPhamThuHa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedPatientPhamThuHa } from '@firebasegen/default-connector';


// Call the `seedPatientPhamThuHa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedPatientPhamThuHa();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedPatientPhamThuHa(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedPatientPhamThuHa().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedPatientPhamThuHa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedPatientPhamThuHaRef } from '@firebasegen/default-connector';


// Call the `seedPatientPhamThuHaRef()` function to get a reference to the mutation.
const ref = seedPatientPhamThuHaRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedPatientPhamThuHaRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedPatientNguyenGiaBao
You can execute the `SeedPatientNguyenGiaBao` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedPatientNguyenGiaBao(): MutationPromise<SeedPatientNguyenGiaBaoData, undefined>;

interface SeedPatientNguyenGiaBaoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientNguyenGiaBaoData, undefined>;
}
export const seedPatientNguyenGiaBaoRef: SeedPatientNguyenGiaBaoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedPatientNguyenGiaBao(dc: DataConnect): MutationPromise<SeedPatientNguyenGiaBaoData, undefined>;

interface SeedPatientNguyenGiaBaoRef {
  ...
  (dc: DataConnect): MutationRef<SeedPatientNguyenGiaBaoData, undefined>;
}
export const seedPatientNguyenGiaBaoRef: SeedPatientNguyenGiaBaoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedPatientNguyenGiaBaoRef:
```typescript
const name = seedPatientNguyenGiaBaoRef.operationName;
console.log(name);
```

### Variables
The `SeedPatientNguyenGiaBao` mutation has no variables.
### Return Type
Recall that executing the `SeedPatientNguyenGiaBao` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedPatientNguyenGiaBaoData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedPatientNguyenGiaBaoData {
  user_insert: User_Key;
}
```
### Using `SeedPatientNguyenGiaBao`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedPatientNguyenGiaBao } from '@firebasegen/default-connector';


// Call the `seedPatientNguyenGiaBao()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedPatientNguyenGiaBao();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedPatientNguyenGiaBao(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedPatientNguyenGiaBao().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedPatientNguyenGiaBao`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedPatientNguyenGiaBaoRef } from '@firebasegen/default-connector';


// Call the `seedPatientNguyenGiaBaoRef()` function to get a reference to the mutation.
const ref = seedPatientNguyenGiaBaoRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedPatientNguyenGiaBaoRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedPatientVoThanhTruc
You can execute the `SeedPatientVoThanhTruc` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedPatientVoThanhTruc(): MutationPromise<SeedPatientVoThanhTrucData, undefined>;

interface SeedPatientVoThanhTrucRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedPatientVoThanhTrucData, undefined>;
}
export const seedPatientVoThanhTrucRef: SeedPatientVoThanhTrucRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedPatientVoThanhTruc(dc: DataConnect): MutationPromise<SeedPatientVoThanhTrucData, undefined>;

interface SeedPatientVoThanhTrucRef {
  ...
  (dc: DataConnect): MutationRef<SeedPatientVoThanhTrucData, undefined>;
}
export const seedPatientVoThanhTrucRef: SeedPatientVoThanhTrucRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedPatientVoThanhTrucRef:
```typescript
const name = seedPatientVoThanhTrucRef.operationName;
console.log(name);
```

### Variables
The `SeedPatientVoThanhTruc` mutation has no variables.
### Return Type
Recall that executing the `SeedPatientVoThanhTruc` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedPatientVoThanhTrucData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedPatientVoThanhTrucData {
  user_insert: User_Key;
}
```
### Using `SeedPatientVoThanhTruc`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedPatientVoThanhTruc } from '@firebasegen/default-connector';


// Call the `seedPatientVoThanhTruc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedPatientVoThanhTruc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedPatientVoThanhTruc(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
seedPatientVoThanhTruc().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `SeedPatientVoThanhTruc`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedPatientVoThanhTrucRef } from '@firebasegen/default-connector';


// Call the `seedPatientVoThanhTrucRef()` function to get a reference to the mutation.
const ref = seedPatientVoThanhTrucRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedPatientVoThanhTrucRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SeedProfileLeMinh
You can execute the `SeedProfileLeMinh` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedProfileLeMinh(): MutationPromise<SeedProfileLeMinhData, undefined>;

interface SeedProfileLeMinhRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfileLeMinhData, undefined>;
}
export const seedProfileLeMinhRef: SeedProfileLeMinhRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedProfileLeMinh(dc: DataConnect): MutationPromise<SeedProfileLeMinhData, undefined>;

interface SeedProfileLeMinhRef {
  ...
  (dc: DataConnect): MutationRef<SeedProfileLeMinhData, undefined>;
}
export const seedProfileLeMinhRef: SeedProfileLeMinhRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedProfileLeMinhRef:
```typescript
const name = seedProfileLeMinhRef.operationName;
console.log(name);
```

### Variables
The `SeedProfileLeMinh` mutation has no variables.
### Return Type
Recall that executing the `SeedProfileLeMinh` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedProfileLeMinhData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedProfileLeMinhData {
  patientProfile_insert: PatientProfile_Key;
}
```
### Using `SeedProfileLeMinh`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedProfileLeMinh } from '@firebasegen/default-connector';


// Call the `seedProfileLeMinh()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedProfileLeMinh();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedProfileLeMinh(dataConnect);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
seedProfileLeMinh().then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

### Using `SeedProfileLeMinh`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedProfileLeMinhRef } from '@firebasegen/default-connector';


// Call the `seedProfileLeMinhRef()` function to get a reference to the mutation.
const ref = seedProfileLeMinhRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedProfileLeMinhRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

## SeedProfilePhamThuHa
You can execute the `SeedProfilePhamThuHa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedProfilePhamThuHa(): MutationPromise<SeedProfilePhamThuHaData, undefined>;

interface SeedProfilePhamThuHaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfilePhamThuHaData, undefined>;
}
export const seedProfilePhamThuHaRef: SeedProfilePhamThuHaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedProfilePhamThuHa(dc: DataConnect): MutationPromise<SeedProfilePhamThuHaData, undefined>;

interface SeedProfilePhamThuHaRef {
  ...
  (dc: DataConnect): MutationRef<SeedProfilePhamThuHaData, undefined>;
}
export const seedProfilePhamThuHaRef: SeedProfilePhamThuHaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedProfilePhamThuHaRef:
```typescript
const name = seedProfilePhamThuHaRef.operationName;
console.log(name);
```

### Variables
The `SeedProfilePhamThuHa` mutation has no variables.
### Return Type
Recall that executing the `SeedProfilePhamThuHa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedProfilePhamThuHaData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedProfilePhamThuHaData {
  patientProfile_insert: PatientProfile_Key;
}
```
### Using `SeedProfilePhamThuHa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedProfilePhamThuHa } from '@firebasegen/default-connector';


// Call the `seedProfilePhamThuHa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedProfilePhamThuHa();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedProfilePhamThuHa(dataConnect);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
seedProfilePhamThuHa().then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

### Using `SeedProfilePhamThuHa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedProfilePhamThuHaRef } from '@firebasegen/default-connector';


// Call the `seedProfilePhamThuHaRef()` function to get a reference to the mutation.
const ref = seedProfilePhamThuHaRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedProfilePhamThuHaRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

## SeedProfileNguyenGiaBao
You can execute the `SeedProfileNguyenGiaBao` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedProfileNguyenGiaBao(): MutationPromise<SeedProfileNguyenGiaBaoData, undefined>;

interface SeedProfileNguyenGiaBaoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfileNguyenGiaBaoData, undefined>;
}
export const seedProfileNguyenGiaBaoRef: SeedProfileNguyenGiaBaoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedProfileNguyenGiaBao(dc: DataConnect): MutationPromise<SeedProfileNguyenGiaBaoData, undefined>;

interface SeedProfileNguyenGiaBaoRef {
  ...
  (dc: DataConnect): MutationRef<SeedProfileNguyenGiaBaoData, undefined>;
}
export const seedProfileNguyenGiaBaoRef: SeedProfileNguyenGiaBaoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedProfileNguyenGiaBaoRef:
```typescript
const name = seedProfileNguyenGiaBaoRef.operationName;
console.log(name);
```

### Variables
The `SeedProfileNguyenGiaBao` mutation has no variables.
### Return Type
Recall that executing the `SeedProfileNguyenGiaBao` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedProfileNguyenGiaBaoData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedProfileNguyenGiaBaoData {
  patientProfile_insert: PatientProfile_Key;
}
```
### Using `SeedProfileNguyenGiaBao`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedProfileNguyenGiaBao } from '@firebasegen/default-connector';


// Call the `seedProfileNguyenGiaBao()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedProfileNguyenGiaBao();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedProfileNguyenGiaBao(dataConnect);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
seedProfileNguyenGiaBao().then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

### Using `SeedProfileNguyenGiaBao`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedProfileNguyenGiaBaoRef } from '@firebasegen/default-connector';


// Call the `seedProfileNguyenGiaBaoRef()` function to get a reference to the mutation.
const ref = seedProfileNguyenGiaBaoRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedProfileNguyenGiaBaoRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

## SeedProfileVoThanhTruc
You can execute the `SeedProfileVoThanhTruc` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedProfileVoThanhTruc(): MutationPromise<SeedProfileVoThanhTrucData, undefined>;

interface SeedProfileVoThanhTrucRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedProfileVoThanhTrucData, undefined>;
}
export const seedProfileVoThanhTrucRef: SeedProfileVoThanhTrucRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedProfileVoThanhTruc(dc: DataConnect): MutationPromise<SeedProfileVoThanhTrucData, undefined>;

interface SeedProfileVoThanhTrucRef {
  ...
  (dc: DataConnect): MutationRef<SeedProfileVoThanhTrucData, undefined>;
}
export const seedProfileVoThanhTrucRef: SeedProfileVoThanhTrucRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedProfileVoThanhTrucRef:
```typescript
const name = seedProfileVoThanhTrucRef.operationName;
console.log(name);
```

### Variables
The `SeedProfileVoThanhTruc` mutation has no variables.
### Return Type
Recall that executing the `SeedProfileVoThanhTruc` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedProfileVoThanhTrucData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedProfileVoThanhTrucData {
  patientProfile_insert: PatientProfile_Key;
}
```
### Using `SeedProfileVoThanhTruc`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedProfileVoThanhTruc } from '@firebasegen/default-connector';


// Call the `seedProfileVoThanhTruc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedProfileVoThanhTruc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedProfileVoThanhTruc(dataConnect);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
seedProfileVoThanhTruc().then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

### Using `SeedProfileVoThanhTruc`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedProfileVoThanhTrucRef } from '@firebasegen/default-connector';


// Call the `seedProfileVoThanhTrucRef()` function to get a reference to the mutation.
const ref = seedProfileVoThanhTrucRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedProfileVoThanhTrucRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

## SeedFamilyLinkLeMinh
You can execute the `SeedFamilyLinkLeMinh` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedFamilyLinkLeMinh(): MutationPromise<SeedFamilyLinkLeMinhData, undefined>;

interface SeedFamilyLinkLeMinhRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkLeMinhData, undefined>;
}
export const seedFamilyLinkLeMinhRef: SeedFamilyLinkLeMinhRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedFamilyLinkLeMinh(dc: DataConnect): MutationPromise<SeedFamilyLinkLeMinhData, undefined>;

interface SeedFamilyLinkLeMinhRef {
  ...
  (dc: DataConnect): MutationRef<SeedFamilyLinkLeMinhData, undefined>;
}
export const seedFamilyLinkLeMinhRef: SeedFamilyLinkLeMinhRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedFamilyLinkLeMinhRef:
```typescript
const name = seedFamilyLinkLeMinhRef.operationName;
console.log(name);
```

### Variables
The `SeedFamilyLinkLeMinh` mutation has no variables.
### Return Type
Recall that executing the `SeedFamilyLinkLeMinh` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedFamilyLinkLeMinhData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedFamilyLinkLeMinhData {
  familyLink_insert: FamilyLink_Key;
}
```
### Using `SeedFamilyLinkLeMinh`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkLeMinh } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkLeMinh()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedFamilyLinkLeMinh();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedFamilyLinkLeMinh(dataConnect);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
seedFamilyLinkLeMinh().then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

### Using `SeedFamilyLinkLeMinh`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkLeMinhRef } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkLeMinhRef()` function to get a reference to the mutation.
const ref = seedFamilyLinkLeMinhRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedFamilyLinkLeMinhRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

## SeedFamilyLinkPhamThuHa
You can execute the `SeedFamilyLinkPhamThuHa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedFamilyLinkPhamThuHa(): MutationPromise<SeedFamilyLinkPhamThuHaData, undefined>;

interface SeedFamilyLinkPhamThuHaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkPhamThuHaData, undefined>;
}
export const seedFamilyLinkPhamThuHaRef: SeedFamilyLinkPhamThuHaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedFamilyLinkPhamThuHa(dc: DataConnect): MutationPromise<SeedFamilyLinkPhamThuHaData, undefined>;

interface SeedFamilyLinkPhamThuHaRef {
  ...
  (dc: DataConnect): MutationRef<SeedFamilyLinkPhamThuHaData, undefined>;
}
export const seedFamilyLinkPhamThuHaRef: SeedFamilyLinkPhamThuHaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedFamilyLinkPhamThuHaRef:
```typescript
const name = seedFamilyLinkPhamThuHaRef.operationName;
console.log(name);
```

### Variables
The `SeedFamilyLinkPhamThuHa` mutation has no variables.
### Return Type
Recall that executing the `SeedFamilyLinkPhamThuHa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedFamilyLinkPhamThuHaData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedFamilyLinkPhamThuHaData {
  familyLink_insert: FamilyLink_Key;
}
```
### Using `SeedFamilyLinkPhamThuHa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkPhamThuHa } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkPhamThuHa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedFamilyLinkPhamThuHa();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedFamilyLinkPhamThuHa(dataConnect);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
seedFamilyLinkPhamThuHa().then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

### Using `SeedFamilyLinkPhamThuHa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkPhamThuHaRef } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkPhamThuHaRef()` function to get a reference to the mutation.
const ref = seedFamilyLinkPhamThuHaRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedFamilyLinkPhamThuHaRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

## SeedFamilyLinkNguyenGiaBao
You can execute the `SeedFamilyLinkNguyenGiaBao` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedFamilyLinkNguyenGiaBao(): MutationPromise<SeedFamilyLinkNguyenGiaBaoData, undefined>;

interface SeedFamilyLinkNguyenGiaBaoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkNguyenGiaBaoData, undefined>;
}
export const seedFamilyLinkNguyenGiaBaoRef: SeedFamilyLinkNguyenGiaBaoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedFamilyLinkNguyenGiaBao(dc: DataConnect): MutationPromise<SeedFamilyLinkNguyenGiaBaoData, undefined>;

interface SeedFamilyLinkNguyenGiaBaoRef {
  ...
  (dc: DataConnect): MutationRef<SeedFamilyLinkNguyenGiaBaoData, undefined>;
}
export const seedFamilyLinkNguyenGiaBaoRef: SeedFamilyLinkNguyenGiaBaoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedFamilyLinkNguyenGiaBaoRef:
```typescript
const name = seedFamilyLinkNguyenGiaBaoRef.operationName;
console.log(name);
```

### Variables
The `SeedFamilyLinkNguyenGiaBao` mutation has no variables.
### Return Type
Recall that executing the `SeedFamilyLinkNguyenGiaBao` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedFamilyLinkNguyenGiaBaoData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedFamilyLinkNguyenGiaBaoData {
  familyLink_insert: FamilyLink_Key;
}
```
### Using `SeedFamilyLinkNguyenGiaBao`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkNguyenGiaBao } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkNguyenGiaBao()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedFamilyLinkNguyenGiaBao();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedFamilyLinkNguyenGiaBao(dataConnect);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
seedFamilyLinkNguyenGiaBao().then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

### Using `SeedFamilyLinkNguyenGiaBao`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkNguyenGiaBaoRef } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkNguyenGiaBaoRef()` function to get a reference to the mutation.
const ref = seedFamilyLinkNguyenGiaBaoRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedFamilyLinkNguyenGiaBaoRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

## SeedFamilyLinkVoThanhTruc
You can execute the `SeedFamilyLinkVoThanhTruc` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedFamilyLinkVoThanhTruc(): MutationPromise<SeedFamilyLinkVoThanhTrucData, undefined>;

interface SeedFamilyLinkVoThanhTrucRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedFamilyLinkVoThanhTrucData, undefined>;
}
export const seedFamilyLinkVoThanhTrucRef: SeedFamilyLinkVoThanhTrucRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedFamilyLinkVoThanhTruc(dc: DataConnect): MutationPromise<SeedFamilyLinkVoThanhTrucData, undefined>;

interface SeedFamilyLinkVoThanhTrucRef {
  ...
  (dc: DataConnect): MutationRef<SeedFamilyLinkVoThanhTrucData, undefined>;
}
export const seedFamilyLinkVoThanhTrucRef: SeedFamilyLinkVoThanhTrucRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedFamilyLinkVoThanhTrucRef:
```typescript
const name = seedFamilyLinkVoThanhTrucRef.operationName;
console.log(name);
```

### Variables
The `SeedFamilyLinkVoThanhTruc` mutation has no variables.
### Return Type
Recall that executing the `SeedFamilyLinkVoThanhTruc` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedFamilyLinkVoThanhTrucData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedFamilyLinkVoThanhTrucData {
  familyLink_insert: FamilyLink_Key;
}
```
### Using `SeedFamilyLinkVoThanhTruc`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkVoThanhTruc } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkVoThanhTruc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedFamilyLinkVoThanhTruc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedFamilyLinkVoThanhTruc(dataConnect);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
seedFamilyLinkVoThanhTruc().then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

### Using `SeedFamilyLinkVoThanhTruc`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedFamilyLinkVoThanhTrucRef } from '@firebasegen/default-connector';


// Call the `seedFamilyLinkVoThanhTrucRef()` function to get a reference to the mutation.
const ref = seedFamilyLinkVoThanhTrucRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedFamilyLinkVoThanhTrucRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

## SeedAppointmentLeMinh1
You can execute the `SeedAppointmentLeMinh1` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAppointmentLeMinh1(): MutationPromise<SeedAppointmentLeMinh1Data, undefined>;

interface SeedAppointmentLeMinh1Ref {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentLeMinh1Data, undefined>;
}
export const seedAppointmentLeMinh1Ref: SeedAppointmentLeMinh1Ref;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAppointmentLeMinh1(dc: DataConnect): MutationPromise<SeedAppointmentLeMinh1Data, undefined>;

interface SeedAppointmentLeMinh1Ref {
  ...
  (dc: DataConnect): MutationRef<SeedAppointmentLeMinh1Data, undefined>;
}
export const seedAppointmentLeMinh1Ref: SeedAppointmentLeMinh1Ref;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAppointmentLeMinh1Ref:
```typescript
const name = seedAppointmentLeMinh1Ref.operationName;
console.log(name);
```

### Variables
The `SeedAppointmentLeMinh1` mutation has no variables.
### Return Type
Recall that executing the `SeedAppointmentLeMinh1` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAppointmentLeMinh1Data`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAppointmentLeMinh1Data {
  appointment_insert: Appointment_Key;
}
```
### Using `SeedAppointmentLeMinh1`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentLeMinh1 } from '@firebasegen/default-connector';


// Call the `seedAppointmentLeMinh1()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAppointmentLeMinh1();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAppointmentLeMinh1(dataConnect);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
seedAppointmentLeMinh1().then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `SeedAppointmentLeMinh1`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentLeMinh1Ref } from '@firebasegen/default-connector';


// Call the `seedAppointmentLeMinh1Ref()` function to get a reference to the mutation.
const ref = seedAppointmentLeMinh1Ref();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAppointmentLeMinh1Ref(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## SeedAppointmentLeMinh2
You can execute the `SeedAppointmentLeMinh2` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAppointmentLeMinh2(): MutationPromise<SeedAppointmentLeMinh2Data, undefined>;

interface SeedAppointmentLeMinh2Ref {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentLeMinh2Data, undefined>;
}
export const seedAppointmentLeMinh2Ref: SeedAppointmentLeMinh2Ref;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAppointmentLeMinh2(dc: DataConnect): MutationPromise<SeedAppointmentLeMinh2Data, undefined>;

interface SeedAppointmentLeMinh2Ref {
  ...
  (dc: DataConnect): MutationRef<SeedAppointmentLeMinh2Data, undefined>;
}
export const seedAppointmentLeMinh2Ref: SeedAppointmentLeMinh2Ref;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAppointmentLeMinh2Ref:
```typescript
const name = seedAppointmentLeMinh2Ref.operationName;
console.log(name);
```

### Variables
The `SeedAppointmentLeMinh2` mutation has no variables.
### Return Type
Recall that executing the `SeedAppointmentLeMinh2` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAppointmentLeMinh2Data`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAppointmentLeMinh2Data {
  appointment_insert: Appointment_Key;
}
```
### Using `SeedAppointmentLeMinh2`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentLeMinh2 } from '@firebasegen/default-connector';


// Call the `seedAppointmentLeMinh2()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAppointmentLeMinh2();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAppointmentLeMinh2(dataConnect);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
seedAppointmentLeMinh2().then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `SeedAppointmentLeMinh2`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentLeMinh2Ref } from '@firebasegen/default-connector';


// Call the `seedAppointmentLeMinh2Ref()` function to get a reference to the mutation.
const ref = seedAppointmentLeMinh2Ref();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAppointmentLeMinh2Ref(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## SeedAppointmentPhamThuHa
You can execute the `SeedAppointmentPhamThuHa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAppointmentPhamThuHa(): MutationPromise<SeedAppointmentPhamThuHaData, undefined>;

interface SeedAppointmentPhamThuHaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentPhamThuHaData, undefined>;
}
export const seedAppointmentPhamThuHaRef: SeedAppointmentPhamThuHaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAppointmentPhamThuHa(dc: DataConnect): MutationPromise<SeedAppointmentPhamThuHaData, undefined>;

interface SeedAppointmentPhamThuHaRef {
  ...
  (dc: DataConnect): MutationRef<SeedAppointmentPhamThuHaData, undefined>;
}
export const seedAppointmentPhamThuHaRef: SeedAppointmentPhamThuHaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAppointmentPhamThuHaRef:
```typescript
const name = seedAppointmentPhamThuHaRef.operationName;
console.log(name);
```

### Variables
The `SeedAppointmentPhamThuHa` mutation has no variables.
### Return Type
Recall that executing the `SeedAppointmentPhamThuHa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAppointmentPhamThuHaData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAppointmentPhamThuHaData {
  appointment_insert: Appointment_Key;
}
```
### Using `SeedAppointmentPhamThuHa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentPhamThuHa } from '@firebasegen/default-connector';


// Call the `seedAppointmentPhamThuHa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAppointmentPhamThuHa();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAppointmentPhamThuHa(dataConnect);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
seedAppointmentPhamThuHa().then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `SeedAppointmentPhamThuHa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentPhamThuHaRef } from '@firebasegen/default-connector';


// Call the `seedAppointmentPhamThuHaRef()` function to get a reference to the mutation.
const ref = seedAppointmentPhamThuHaRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAppointmentPhamThuHaRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## SeedAppointmentNguyenGiaBao
You can execute the `SeedAppointmentNguyenGiaBao` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAppointmentNguyenGiaBao(): MutationPromise<SeedAppointmentNguyenGiaBaoData, undefined>;

interface SeedAppointmentNguyenGiaBaoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentNguyenGiaBaoData, undefined>;
}
export const seedAppointmentNguyenGiaBaoRef: SeedAppointmentNguyenGiaBaoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAppointmentNguyenGiaBao(dc: DataConnect): MutationPromise<SeedAppointmentNguyenGiaBaoData, undefined>;

interface SeedAppointmentNguyenGiaBaoRef {
  ...
  (dc: DataConnect): MutationRef<SeedAppointmentNguyenGiaBaoData, undefined>;
}
export const seedAppointmentNguyenGiaBaoRef: SeedAppointmentNguyenGiaBaoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAppointmentNguyenGiaBaoRef:
```typescript
const name = seedAppointmentNguyenGiaBaoRef.operationName;
console.log(name);
```

### Variables
The `SeedAppointmentNguyenGiaBao` mutation has no variables.
### Return Type
Recall that executing the `SeedAppointmentNguyenGiaBao` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAppointmentNguyenGiaBaoData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAppointmentNguyenGiaBaoData {
  appointment_insert: Appointment_Key;
}
```
### Using `SeedAppointmentNguyenGiaBao`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentNguyenGiaBao } from '@firebasegen/default-connector';


// Call the `seedAppointmentNguyenGiaBao()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAppointmentNguyenGiaBao();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAppointmentNguyenGiaBao(dataConnect);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
seedAppointmentNguyenGiaBao().then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `SeedAppointmentNguyenGiaBao`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentNguyenGiaBaoRef } from '@firebasegen/default-connector';


// Call the `seedAppointmentNguyenGiaBaoRef()` function to get a reference to the mutation.
const ref = seedAppointmentNguyenGiaBaoRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAppointmentNguyenGiaBaoRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## SeedAppointmentVoThanhTruc
You can execute the `SeedAppointmentVoThanhTruc` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAppointmentVoThanhTruc(): MutationPromise<SeedAppointmentVoThanhTrucData, undefined>;

interface SeedAppointmentVoThanhTrucRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAppointmentVoThanhTrucData, undefined>;
}
export const seedAppointmentVoThanhTrucRef: SeedAppointmentVoThanhTrucRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAppointmentVoThanhTruc(dc: DataConnect): MutationPromise<SeedAppointmentVoThanhTrucData, undefined>;

interface SeedAppointmentVoThanhTrucRef {
  ...
  (dc: DataConnect): MutationRef<SeedAppointmentVoThanhTrucData, undefined>;
}
export const seedAppointmentVoThanhTrucRef: SeedAppointmentVoThanhTrucRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAppointmentVoThanhTrucRef:
```typescript
const name = seedAppointmentVoThanhTrucRef.operationName;
console.log(name);
```

### Variables
The `SeedAppointmentVoThanhTruc` mutation has no variables.
### Return Type
Recall that executing the `SeedAppointmentVoThanhTruc` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAppointmentVoThanhTrucData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAppointmentVoThanhTrucData {
  appointment_insert: Appointment_Key;
}
```
### Using `SeedAppointmentVoThanhTruc`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentVoThanhTruc } from '@firebasegen/default-connector';


// Call the `seedAppointmentVoThanhTruc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAppointmentVoThanhTruc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAppointmentVoThanhTruc(dataConnect);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
seedAppointmentVoThanhTruc().then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `SeedAppointmentVoThanhTruc`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAppointmentVoThanhTrucRef } from '@firebasegen/default-connector';


// Call the `seedAppointmentVoThanhTrucRef()` function to get a reference to the mutation.
const ref = seedAppointmentVoThanhTrucRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAppointmentVoThanhTrucRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## SeedAiDiagnosisLeMinh
You can execute the `SeedAiDiagnosisLeMinh` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAiDiagnosisLeMinh(): MutationPromise<SeedAiDiagnosisLeMinhData, undefined>;

interface SeedAiDiagnosisLeMinhRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisLeMinhData, undefined>;
}
export const seedAiDiagnosisLeMinhRef: SeedAiDiagnosisLeMinhRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAiDiagnosisLeMinh(dc: DataConnect): MutationPromise<SeedAiDiagnosisLeMinhData, undefined>;

interface SeedAiDiagnosisLeMinhRef {
  ...
  (dc: DataConnect): MutationRef<SeedAiDiagnosisLeMinhData, undefined>;
}
export const seedAiDiagnosisLeMinhRef: SeedAiDiagnosisLeMinhRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAiDiagnosisLeMinhRef:
```typescript
const name = seedAiDiagnosisLeMinhRef.operationName;
console.log(name);
```

### Variables
The `SeedAiDiagnosisLeMinh` mutation has no variables.
### Return Type
Recall that executing the `SeedAiDiagnosisLeMinh` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAiDiagnosisLeMinhData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAiDiagnosisLeMinhData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}
```
### Using `SeedAiDiagnosisLeMinh`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisLeMinh } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisLeMinh()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAiDiagnosisLeMinh();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAiDiagnosisLeMinh(dataConnect);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
seedAiDiagnosisLeMinh().then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

### Using `SeedAiDiagnosisLeMinh`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisLeMinhRef } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisLeMinhRef()` function to get a reference to the mutation.
const ref = seedAiDiagnosisLeMinhRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAiDiagnosisLeMinhRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

## SeedAiDiagnosisPhamThuHa
You can execute the `SeedAiDiagnosisPhamThuHa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAiDiagnosisPhamThuHa(): MutationPromise<SeedAiDiagnosisPhamThuHaData, undefined>;

interface SeedAiDiagnosisPhamThuHaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisPhamThuHaData, undefined>;
}
export const seedAiDiagnosisPhamThuHaRef: SeedAiDiagnosisPhamThuHaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAiDiagnosisPhamThuHa(dc: DataConnect): MutationPromise<SeedAiDiagnosisPhamThuHaData, undefined>;

interface SeedAiDiagnosisPhamThuHaRef {
  ...
  (dc: DataConnect): MutationRef<SeedAiDiagnosisPhamThuHaData, undefined>;
}
export const seedAiDiagnosisPhamThuHaRef: SeedAiDiagnosisPhamThuHaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAiDiagnosisPhamThuHaRef:
```typescript
const name = seedAiDiagnosisPhamThuHaRef.operationName;
console.log(name);
```

### Variables
The `SeedAiDiagnosisPhamThuHa` mutation has no variables.
### Return Type
Recall that executing the `SeedAiDiagnosisPhamThuHa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAiDiagnosisPhamThuHaData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAiDiagnosisPhamThuHaData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}
```
### Using `SeedAiDiagnosisPhamThuHa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisPhamThuHa } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisPhamThuHa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAiDiagnosisPhamThuHa();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAiDiagnosisPhamThuHa(dataConnect);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
seedAiDiagnosisPhamThuHa().then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

### Using `SeedAiDiagnosisPhamThuHa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisPhamThuHaRef } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisPhamThuHaRef()` function to get a reference to the mutation.
const ref = seedAiDiagnosisPhamThuHaRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAiDiagnosisPhamThuHaRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

## SeedAiDiagnosisNguyenGiaBao
You can execute the `SeedAiDiagnosisNguyenGiaBao` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAiDiagnosisNguyenGiaBao(): MutationPromise<SeedAiDiagnosisNguyenGiaBaoData, undefined>;

interface SeedAiDiagnosisNguyenGiaBaoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisNguyenGiaBaoData, undefined>;
}
export const seedAiDiagnosisNguyenGiaBaoRef: SeedAiDiagnosisNguyenGiaBaoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAiDiagnosisNguyenGiaBao(dc: DataConnect): MutationPromise<SeedAiDiagnosisNguyenGiaBaoData, undefined>;

interface SeedAiDiagnosisNguyenGiaBaoRef {
  ...
  (dc: DataConnect): MutationRef<SeedAiDiagnosisNguyenGiaBaoData, undefined>;
}
export const seedAiDiagnosisNguyenGiaBaoRef: SeedAiDiagnosisNguyenGiaBaoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAiDiagnosisNguyenGiaBaoRef:
```typescript
const name = seedAiDiagnosisNguyenGiaBaoRef.operationName;
console.log(name);
```

### Variables
The `SeedAiDiagnosisNguyenGiaBao` mutation has no variables.
### Return Type
Recall that executing the `SeedAiDiagnosisNguyenGiaBao` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAiDiagnosisNguyenGiaBaoData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAiDiagnosisNguyenGiaBaoData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}
```
### Using `SeedAiDiagnosisNguyenGiaBao`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisNguyenGiaBao } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisNguyenGiaBao()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAiDiagnosisNguyenGiaBao();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAiDiagnosisNguyenGiaBao(dataConnect);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
seedAiDiagnosisNguyenGiaBao().then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

### Using `SeedAiDiagnosisNguyenGiaBao`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisNguyenGiaBaoRef } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisNguyenGiaBaoRef()` function to get a reference to the mutation.
const ref = seedAiDiagnosisNguyenGiaBaoRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAiDiagnosisNguyenGiaBaoRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

## SeedAiDiagnosisVoThanhTruc
You can execute the `SeedAiDiagnosisVoThanhTruc` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
seedAiDiagnosisVoThanhTruc(): MutationPromise<SeedAiDiagnosisVoThanhTrucData, undefined>;

interface SeedAiDiagnosisVoThanhTrucRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<SeedAiDiagnosisVoThanhTrucData, undefined>;
}
export const seedAiDiagnosisVoThanhTrucRef: SeedAiDiagnosisVoThanhTrucRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
seedAiDiagnosisVoThanhTruc(dc: DataConnect): MutationPromise<SeedAiDiagnosisVoThanhTrucData, undefined>;

interface SeedAiDiagnosisVoThanhTrucRef {
  ...
  (dc: DataConnect): MutationRef<SeedAiDiagnosisVoThanhTrucData, undefined>;
}
export const seedAiDiagnosisVoThanhTrucRef: SeedAiDiagnosisVoThanhTrucRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the seedAiDiagnosisVoThanhTrucRef:
```typescript
const name = seedAiDiagnosisVoThanhTrucRef.operationName;
console.log(name);
```

### Variables
The `SeedAiDiagnosisVoThanhTruc` mutation has no variables.
### Return Type
Recall that executing the `SeedAiDiagnosisVoThanhTruc` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SeedAiDiagnosisVoThanhTrucData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SeedAiDiagnosisVoThanhTrucData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}
```
### Using `SeedAiDiagnosisVoThanhTruc`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisVoThanhTruc } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisVoThanhTruc()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await seedAiDiagnosisVoThanhTruc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await seedAiDiagnosisVoThanhTruc(dataConnect);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
seedAiDiagnosisVoThanhTruc().then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

### Using `SeedAiDiagnosisVoThanhTruc`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, seedAiDiagnosisVoThanhTrucRef } from '@firebasegen/default-connector';


// Call the `seedAiDiagnosisVoThanhTrucRef()` function to get a reference to the mutation.
const ref = seedAiDiagnosisVoThanhTrucRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = seedAiDiagnosisVoThanhTrucRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

## AddTestPatient
You can execute the `AddTestPatient` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
addTestPatient(): MutationPromise<AddTestPatientData, undefined>;

interface AddTestPatientRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddTestPatientData, undefined>;
}
export const addTestPatientRef: AddTestPatientRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTestPatient(dc: DataConnect): MutationPromise<AddTestPatientData, undefined>;

interface AddTestPatientRef {
  ...
  (dc: DataConnect): MutationRef<AddTestPatientData, undefined>;
}
export const addTestPatientRef: AddTestPatientRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTestPatientRef:
```typescript
const name = addTestPatientRef.operationName;
console.log(name);
```

### Variables
The `AddTestPatient` mutation has no variables.
### Return Type
Recall that executing the `AddTestPatient` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTestPatientData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTestPatientData {
  user_upsert: User_Key;
}
```
### Using `AddTestPatient`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTestPatient } from '@firebasegen/default-connector';


// Call the `addTestPatient()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTestPatient();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTestPatient(dataConnect);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
addTestPatient().then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `AddTestPatient`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTestPatientRef } from '@firebasegen/default-connector';


// Call the `addTestPatientRef()` function to get a reference to the mutation.
const ref = addTestPatientRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTestPatientRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_upsert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@firebasegen/default-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  uid: ..., 
  email: ..., 
  role: ..., 
  displayName: ..., 
  userCode: ..., // optional
  status: ..., // optional
  phone: ..., // optional
  photoURL: ..., // optional
  createdAt: ..., // optional
  createdBy: ..., // optional
  updatedAt: ..., // optional
  updatedBy: ..., // optional
  authProvider: ..., // optional
  passwordSet: ..., // optional
  passwordLastChangedAt: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ uid: ..., email: ..., role: ..., displayName: ..., userCode: ..., status: ..., phone: ..., photoURL: ..., createdAt: ..., createdBy: ..., updatedAt: ..., updatedBy: ..., authProvider: ..., passwordSet: ..., passwordLastChangedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@firebasegen/default-connector';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  uid: ..., 
  email: ..., 
  role: ..., 
  displayName: ..., 
  userCode: ..., // optional
  status: ..., // optional
  phone: ..., // optional
  photoURL: ..., // optional
  createdAt: ..., // optional
  createdBy: ..., // optional
  updatedAt: ..., // optional
  updatedBy: ..., // optional
  authProvider: ..., // optional
  passwordSet: ..., // optional
  passwordLastChangedAt: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ uid: ..., email: ..., role: ..., displayName: ..., userCode: ..., status: ..., phone: ..., photoURL: ..., createdAt: ..., createdBy: ..., updatedAt: ..., updatedBy: ..., authProvider: ..., passwordSet: ..., passwordLastChangedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreatePatientProfile
You can execute the `CreatePatientProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createPatientProfile(vars: CreatePatientProfileVariables): MutationPromise<CreatePatientProfileData, CreatePatientProfileVariables>;

interface CreatePatientProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePatientProfileVariables): MutationRef<CreatePatientProfileData, CreatePatientProfileVariables>;
}
export const createPatientProfileRef: CreatePatientProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPatientProfile(dc: DataConnect, vars: CreatePatientProfileVariables): MutationPromise<CreatePatientProfileData, CreatePatientProfileVariables>;

interface CreatePatientProfileRef {
  ...
  (dc: DataConnect, vars: CreatePatientProfileVariables): MutationRef<CreatePatientProfileData, CreatePatientProfileVariables>;
}
export const createPatientProfileRef: CreatePatientProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPatientProfileRef:
```typescript
const name = createPatientProfileRef.operationName;
console.log(name);
```

### Variables
The `CreatePatientProfile` mutation requires an argument of type `CreatePatientProfileVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreatePatientProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePatientProfileData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePatientProfileData {
  patientProfile_insert: PatientProfile_Key;
}
```
### Using `CreatePatientProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPatientProfile, CreatePatientProfileVariables } from '@firebasegen/default-connector';

// The `CreatePatientProfile` mutation requires an argument of type `CreatePatientProfileVariables`:
const createPatientProfileVars: CreatePatientProfileVariables = {
  userUid: ..., 
  assignedDoctorUid: ..., // optional
  dob: ..., // optional
  gender: ..., // optional
  cccd: ..., // optional
  occupation: ..., // optional
  insuranceNumber: ..., // optional
  address: ..., // optional
  height: ..., // optional
  weight: ..., // optional
  bloodType: ..., // optional
  allergies: ..., // optional
  insuranceQRCode: ..., // optional
};

// Call the `createPatientProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPatientProfile(createPatientProfileVars);
// Variables can be defined inline as well.
const { data } = await createPatientProfile({ userUid: ..., assignedDoctorUid: ..., dob: ..., gender: ..., cccd: ..., occupation: ..., insuranceNumber: ..., address: ..., height: ..., weight: ..., bloodType: ..., allergies: ..., insuranceQRCode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPatientProfile(dataConnect, createPatientProfileVars);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
createPatientProfile(createPatientProfileVars).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

### Using `CreatePatientProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPatientProfileRef, CreatePatientProfileVariables } from '@firebasegen/default-connector';

// The `CreatePatientProfile` mutation requires an argument of type `CreatePatientProfileVariables`:
const createPatientProfileVars: CreatePatientProfileVariables = {
  userUid: ..., 
  assignedDoctorUid: ..., // optional
  dob: ..., // optional
  gender: ..., // optional
  cccd: ..., // optional
  occupation: ..., // optional
  insuranceNumber: ..., // optional
  address: ..., // optional
  height: ..., // optional
  weight: ..., // optional
  bloodType: ..., // optional
  allergies: ..., // optional
  insuranceQRCode: ..., // optional
};

// Call the `createPatientProfileRef()` function to get a reference to the mutation.
const ref = createPatientProfileRef(createPatientProfileVars);
// Variables can be defined inline as well.
const ref = createPatientProfileRef({ userUid: ..., assignedDoctorUid: ..., dob: ..., gender: ..., cccd: ..., occupation: ..., insuranceNumber: ..., address: ..., height: ..., weight: ..., bloodType: ..., allergies: ..., insuranceQRCode: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPatientProfileRef(dataConnect, createPatientProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patientProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_insert);
});
```

## CreateFamilyLink
You can execute the `CreateFamilyLink` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createFamilyLink(vars: CreateFamilyLinkVariables): MutationPromise<CreateFamilyLinkData, CreateFamilyLinkVariables>;

interface CreateFamilyLinkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFamilyLinkVariables): MutationRef<CreateFamilyLinkData, CreateFamilyLinkVariables>;
}
export const createFamilyLinkRef: CreateFamilyLinkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFamilyLink(dc: DataConnect, vars: CreateFamilyLinkVariables): MutationPromise<CreateFamilyLinkData, CreateFamilyLinkVariables>;

interface CreateFamilyLinkRef {
  ...
  (dc: DataConnect, vars: CreateFamilyLinkVariables): MutationRef<CreateFamilyLinkData, CreateFamilyLinkVariables>;
}
export const createFamilyLinkRef: CreateFamilyLinkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFamilyLinkRef:
```typescript
const name = createFamilyLinkRef.operationName;
console.log(name);
```

### Variables
The `CreateFamilyLink` mutation requires an argument of type `CreateFamilyLinkVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFamilyLinkVariables {
  accountOwnerUid: string;
  relativeName: string;
  relationship: string;
}
```
### Return Type
Recall that executing the `CreateFamilyLink` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFamilyLinkData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFamilyLinkData {
  familyLink_insert: FamilyLink_Key;
}
```
### Using `CreateFamilyLink`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFamilyLink, CreateFamilyLinkVariables } from '@firebasegen/default-connector';

// The `CreateFamilyLink` mutation requires an argument of type `CreateFamilyLinkVariables`:
const createFamilyLinkVars: CreateFamilyLinkVariables = {
  accountOwnerUid: ..., 
  relativeName: ..., 
  relationship: ..., 
};

// Call the `createFamilyLink()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFamilyLink(createFamilyLinkVars);
// Variables can be defined inline as well.
const { data } = await createFamilyLink({ accountOwnerUid: ..., relativeName: ..., relationship: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFamilyLink(dataConnect, createFamilyLinkVars);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
createFamilyLink(createFamilyLinkVars).then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

### Using `CreateFamilyLink`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFamilyLinkRef, CreateFamilyLinkVariables } from '@firebasegen/default-connector';

// The `CreateFamilyLink` mutation requires an argument of type `CreateFamilyLinkVariables`:
const createFamilyLinkVars: CreateFamilyLinkVariables = {
  accountOwnerUid: ..., 
  relativeName: ..., 
  relationship: ..., 
};

// Call the `createFamilyLinkRef()` function to get a reference to the mutation.
const ref = createFamilyLinkRef(createFamilyLinkVars);
// Variables can be defined inline as well.
const ref = createFamilyLinkRef({ accountOwnerUid: ..., relativeName: ..., relationship: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFamilyLinkRef(dataConnect, createFamilyLinkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.familyLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.familyLink_insert);
});
```

## CreateAppointment
You can execute the `CreateAppointment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createAppointment(vars: CreateAppointmentVariables): MutationPromise<CreateAppointmentData, CreateAppointmentVariables>;

interface CreateAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAppointmentVariables): MutationRef<CreateAppointmentData, CreateAppointmentVariables>;
}
export const createAppointmentRef: CreateAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAppointment(dc: DataConnect, vars: CreateAppointmentVariables): MutationPromise<CreateAppointmentData, CreateAppointmentVariables>;

interface CreateAppointmentRef {
  ...
  (dc: DataConnect, vars: CreateAppointmentVariables): MutationRef<CreateAppointmentData, CreateAppointmentVariables>;
}
export const createAppointmentRef: CreateAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAppointmentRef:
```typescript
const name = createAppointmentRef.operationName;
console.log(name);
```

### Variables
The `CreateAppointment` mutation requires an argument of type `CreateAppointmentVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAppointment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAppointmentData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAppointmentData {
  appointment_insert: Appointment_Key;
}
```
### Using `CreateAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAppointment, CreateAppointmentVariables } from '@firebasegen/default-connector';

// The `CreateAppointment` mutation requires an argument of type `CreateAppointmentVariables`:
const createAppointmentVars: CreateAppointmentVariables = {
  patientUid: ..., 
  doctorUid: ..., // optional
  doctorName: ..., 
  scheduledAt: ..., 
  endAt: ..., // optional
  status: ..., // optional
  meetingLink: ..., // optional
  symptoms: ..., // optional
  specialty: ..., // optional
  appointmentType: ..., // optional
  queueLabel: ..., // optional
  currentDoctorNote: ..., // optional
  countdownLabel: ..., // optional
};

// Call the `createAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAppointment(createAppointmentVars);
// Variables can be defined inline as well.
const { data } = await createAppointment({ patientUid: ..., doctorUid: ..., doctorName: ..., scheduledAt: ..., endAt: ..., status: ..., meetingLink: ..., symptoms: ..., specialty: ..., appointmentType: ..., queueLabel: ..., currentDoctorNote: ..., countdownLabel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAppointment(dataConnect, createAppointmentVars);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
createAppointment(createAppointmentVars).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

### Using `CreateAppointment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAppointmentRef, CreateAppointmentVariables } from '@firebasegen/default-connector';

// The `CreateAppointment` mutation requires an argument of type `CreateAppointmentVariables`:
const createAppointmentVars: CreateAppointmentVariables = {
  patientUid: ..., 
  doctorUid: ..., // optional
  doctorName: ..., 
  scheduledAt: ..., 
  endAt: ..., // optional
  status: ..., // optional
  meetingLink: ..., // optional
  symptoms: ..., // optional
  specialty: ..., // optional
  appointmentType: ..., // optional
  queueLabel: ..., // optional
  currentDoctorNote: ..., // optional
  countdownLabel: ..., // optional
};

// Call the `createAppointmentRef()` function to get a reference to the mutation.
const ref = createAppointmentRef(createAppointmentVars);
// Variables can be defined inline as well.
const ref = createAppointmentRef({ patientUid: ..., doctorUid: ..., doctorName: ..., scheduledAt: ..., endAt: ..., status: ..., meetingLink: ..., symptoms: ..., specialty: ..., appointmentType: ..., queueLabel: ..., currentDoctorNote: ..., countdownLabel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAppointmentRef(dataConnect, createAppointmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_insert);
});
```

## CreateAiDiagnosis
You can execute the `CreateAiDiagnosis` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createAiDiagnosis(vars: CreateAiDiagnosisVariables): MutationPromise<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;

interface CreateAiDiagnosisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAiDiagnosisVariables): MutationRef<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;
}
export const createAiDiagnosisRef: CreateAiDiagnosisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAiDiagnosis(dc: DataConnect, vars: CreateAiDiagnosisVariables): MutationPromise<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;

interface CreateAiDiagnosisRef {
  ...
  (dc: DataConnect, vars: CreateAiDiagnosisVariables): MutationRef<CreateAiDiagnosisData, CreateAiDiagnosisVariables>;
}
export const createAiDiagnosisRef: CreateAiDiagnosisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAiDiagnosisRef:
```typescript
const name = createAiDiagnosisRef.operationName;
console.log(name);
```

### Variables
The `CreateAiDiagnosis` mutation requires an argument of type `CreateAiDiagnosisVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAiDiagnosis` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAiDiagnosisData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAiDiagnosisData {
  aiDiagnosis_insert: AiDiagnosis_Key;
}
```
### Using `CreateAiDiagnosis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAiDiagnosis, CreateAiDiagnosisVariables } from '@firebasegen/default-connector';

// The `CreateAiDiagnosis` mutation requires an argument of type `CreateAiDiagnosisVariables`:
const createAiDiagnosisVars: CreateAiDiagnosisVariables = {
  patientUid: ..., 
  doctorUid: ..., // optional
  fundusImageUrl: ..., 
  riskLevel: ..., 
  confidenceScore: ..., 
  aiAnalysis: ..., // optional
  doctorAdvice: ..., // optional
  stageLabel: ..., // optional
  aiScore: ..., // optional
  examDate: ..., // optional
  deviceName: ..., // optional
  technicianName: ..., // optional
  archiveImagePath: ..., // optional
  doctorApproved: ..., // optional
  reportSummary: ..., // optional
};

// Call the `createAiDiagnosis()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAiDiagnosis(createAiDiagnosisVars);
// Variables can be defined inline as well.
const { data } = await createAiDiagnosis({ patientUid: ..., doctorUid: ..., fundusImageUrl: ..., riskLevel: ..., confidenceScore: ..., aiAnalysis: ..., doctorAdvice: ..., stageLabel: ..., aiScore: ..., examDate: ..., deviceName: ..., technicianName: ..., archiveImagePath: ..., doctorApproved: ..., reportSummary: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAiDiagnosis(dataConnect, createAiDiagnosisVars);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
createAiDiagnosis(createAiDiagnosisVars).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

### Using `CreateAiDiagnosis`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAiDiagnosisRef, CreateAiDiagnosisVariables } from '@firebasegen/default-connector';

// The `CreateAiDiagnosis` mutation requires an argument of type `CreateAiDiagnosisVariables`:
const createAiDiagnosisVars: CreateAiDiagnosisVariables = {
  patientUid: ..., 
  doctorUid: ..., // optional
  fundusImageUrl: ..., 
  riskLevel: ..., 
  confidenceScore: ..., 
  aiAnalysis: ..., // optional
  doctorAdvice: ..., // optional
  stageLabel: ..., // optional
  aiScore: ..., // optional
  examDate: ..., // optional
  deviceName: ..., // optional
  technicianName: ..., // optional
  archiveImagePath: ..., // optional
  doctorApproved: ..., // optional
  reportSummary: ..., // optional
};

// Call the `createAiDiagnosisRef()` function to get a reference to the mutation.
const ref = createAiDiagnosisRef(createAiDiagnosisVars);
// Variables can be defined inline as well.
const ref = createAiDiagnosisRef({ patientUid: ..., doctorUid: ..., fundusImageUrl: ..., riskLevel: ..., confidenceScore: ..., aiAnalysis: ..., doctorAdvice: ..., stageLabel: ..., aiScore: ..., examDate: ..., deviceName: ..., technicianName: ..., archiveImagePath: ..., doctorApproved: ..., reportSummary: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAiDiagnosisRef(dataConnect, createAiDiagnosisVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_insert);
});
```

## CreateContactLead
You can execute the `CreateContactLead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createContactLead(vars: CreateContactLeadVariables): MutationPromise<CreateContactLeadData, CreateContactLeadVariables>;

interface CreateContactLeadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateContactLeadVariables): MutationRef<CreateContactLeadData, CreateContactLeadVariables>;
}
export const createContactLeadRef: CreateContactLeadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createContactLead(dc: DataConnect, vars: CreateContactLeadVariables): MutationPromise<CreateContactLeadData, CreateContactLeadVariables>;

interface CreateContactLeadRef {
  ...
  (dc: DataConnect, vars: CreateContactLeadVariables): MutationRef<CreateContactLeadData, CreateContactLeadVariables>;
}
export const createContactLeadRef: CreateContactLeadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createContactLeadRef:
```typescript
const name = createContactLeadRef.operationName;
console.log(name);
```

### Variables
The `CreateContactLead` mutation requires an argument of type `CreateContactLeadVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateContactLeadVariables {
  name: string;
  email: string;
  role: string;
  message: string;
  createdAt: string;
}
```
### Return Type
Recall that executing the `CreateContactLead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateContactLeadData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateContactLeadData {
  contactLead_insert: ContactLead_Key;
}
```
### Using `CreateContactLead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createContactLead, CreateContactLeadVariables } from '@firebasegen/default-connector';

// The `CreateContactLead` mutation requires an argument of type `CreateContactLeadVariables`:
const createContactLeadVars: CreateContactLeadVariables = {
  name: ..., 
  email: ..., 
  role: ..., 
  message: ..., 
  createdAt: ..., 
};

// Call the `createContactLead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createContactLead(createContactLeadVars);
// Variables can be defined inline as well.
const { data } = await createContactLead({ name: ..., email: ..., role: ..., message: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createContactLead(dataConnect, createContactLeadVars);

console.log(data.contactLead_insert);

// Or, you can use the `Promise` API.
createContactLead(createContactLeadVars).then((response) => {
  const data = response.data;
  console.log(data.contactLead_insert);
});
```

### Using `CreateContactLead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createContactLeadRef, CreateContactLeadVariables } from '@firebasegen/default-connector';

// The `CreateContactLead` mutation requires an argument of type `CreateContactLeadVariables`:
const createContactLeadVars: CreateContactLeadVariables = {
  name: ..., 
  email: ..., 
  role: ..., 
  message: ..., 
  createdAt: ..., 
};

// Call the `createContactLeadRef()` function to get a reference to the mutation.
const ref = createContactLeadRef(createContactLeadVars);
// Variables can be defined inline as well.
const ref = createContactLeadRef({ name: ..., email: ..., role: ..., message: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createContactLeadRef(dataConnect, createContactLeadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.contactLead_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.contactLead_insert);
});
```

## UpsertZaloContact
You can execute the `UpsertZaloContact` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertZaloContact(vars: UpsertZaloContactVariables): MutationPromise<UpsertZaloContactData, UpsertZaloContactVariables>;

interface UpsertZaloContactRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertZaloContactVariables): MutationRef<UpsertZaloContactData, UpsertZaloContactVariables>;
}
export const upsertZaloContactRef: UpsertZaloContactRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertZaloContact(dc: DataConnect, vars: UpsertZaloContactVariables): MutationPromise<UpsertZaloContactData, UpsertZaloContactVariables>;

interface UpsertZaloContactRef {
  ...
  (dc: DataConnect, vars: UpsertZaloContactVariables): MutationRef<UpsertZaloContactData, UpsertZaloContactVariables>;
}
export const upsertZaloContactRef: UpsertZaloContactRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertZaloContactRef:
```typescript
const name = upsertZaloContactRef.operationName;
console.log(name);
```

### Variables
The `UpsertZaloContact` mutation requires an argument of type `UpsertZaloContactVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertZaloContactVariables {
  id: string;
  name: string;
  initials: string;
  phone: string;
  zaloLink: string;
  colorToken: string;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertZaloContact` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertZaloContactData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertZaloContactData {
  zaloContact_upsert: ZaloContact_Key;
}
```
### Using `UpsertZaloContact`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertZaloContact, UpsertZaloContactVariables } from '@firebasegen/default-connector';

// The `UpsertZaloContact` mutation requires an argument of type `UpsertZaloContactVariables`:
const upsertZaloContactVars: UpsertZaloContactVariables = {
  id: ..., 
  name: ..., 
  initials: ..., 
  phone: ..., 
  zaloLink: ..., 
  colorToken: ..., 
  displayOrder: ..., 
};

// Call the `upsertZaloContact()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertZaloContact(upsertZaloContactVars);
// Variables can be defined inline as well.
const { data } = await upsertZaloContact({ id: ..., name: ..., initials: ..., phone: ..., zaloLink: ..., colorToken: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertZaloContact(dataConnect, upsertZaloContactVars);

console.log(data.zaloContact_upsert);

// Or, you can use the `Promise` API.
upsertZaloContact(upsertZaloContactVars).then((response) => {
  const data = response.data;
  console.log(data.zaloContact_upsert);
});
```

### Using `UpsertZaloContact`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertZaloContactRef, UpsertZaloContactVariables } from '@firebasegen/default-connector';

// The `UpsertZaloContact` mutation requires an argument of type `UpsertZaloContactVariables`:
const upsertZaloContactVars: UpsertZaloContactVariables = {
  id: ..., 
  name: ..., 
  initials: ..., 
  phone: ..., 
  zaloLink: ..., 
  colorToken: ..., 
  displayOrder: ..., 
};

// Call the `upsertZaloContactRef()` function to get a reference to the mutation.
const ref = upsertZaloContactRef(upsertZaloContactVars);
// Variables can be defined inline as well.
const ref = upsertZaloContactRef({ id: ..., name: ..., initials: ..., phone: ..., zaloLink: ..., colorToken: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertZaloContactRef(dataConnect, upsertZaloContactVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.zaloContact_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.zaloContact_upsert);
});
```

## UpsertDoctorProfile
You can execute the `UpsertDoctorProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDoctorProfile(vars: UpsertDoctorProfileVariables): MutationPromise<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;

interface UpsertDoctorProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDoctorProfileVariables): MutationRef<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;
}
export const upsertDoctorProfileRef: UpsertDoctorProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDoctorProfile(dc: DataConnect, vars: UpsertDoctorProfileVariables): MutationPromise<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;

interface UpsertDoctorProfileRef {
  ...
  (dc: DataConnect, vars: UpsertDoctorProfileVariables): MutationRef<UpsertDoctorProfileData, UpsertDoctorProfileVariables>;
}
export const upsertDoctorProfileRef: UpsertDoctorProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDoctorProfileRef:
```typescript
const name = upsertDoctorProfileRef.operationName;
console.log(name);
```

### Variables
The `UpsertDoctorProfile` mutation requires an argument of type `UpsertDoctorProfileVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertDoctorProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDoctorProfileData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDoctorProfileData {
  doctorProfile_upsert: DoctorProfile_Key;
}
```
### Using `UpsertDoctorProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDoctorProfile, UpsertDoctorProfileVariables } from '@firebasegen/default-connector';

// The `UpsertDoctorProfile` mutation requires an argument of type `UpsertDoctorProfileVariables`:
const upsertDoctorProfileVars: UpsertDoctorProfileVariables = {
  id: ..., 
  doctorUid: ..., 
  fullName: ..., 
  dob: ..., // optional
  gender: ..., // optional
  phone: ..., // optional
  specialty: ..., // optional
  certNumber: ..., // optional
  bio: ..., // optional
  avatarUrl: ..., // optional
  verificationStatus: ..., // optional
  verificationDocumentName: ..., // optional
  verificationDocumentDataUrl: ..., // optional
  verificationUpdatedAt: ..., // optional
  updatedAt: ..., // optional
};

// Call the `upsertDoctorProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDoctorProfile(upsertDoctorProfileVars);
// Variables can be defined inline as well.
const { data } = await upsertDoctorProfile({ id: ..., doctorUid: ..., fullName: ..., dob: ..., gender: ..., phone: ..., specialty: ..., certNumber: ..., bio: ..., avatarUrl: ..., verificationStatus: ..., verificationDocumentName: ..., verificationDocumentDataUrl: ..., verificationUpdatedAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDoctorProfile(dataConnect, upsertDoctorProfileVars);

console.log(data.doctorProfile_upsert);

// Or, you can use the `Promise` API.
upsertDoctorProfile(upsertDoctorProfileVars).then((response) => {
  const data = response.data;
  console.log(data.doctorProfile_upsert);
});
```

### Using `UpsertDoctorProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDoctorProfileRef, UpsertDoctorProfileVariables } from '@firebasegen/default-connector';

// The `UpsertDoctorProfile` mutation requires an argument of type `UpsertDoctorProfileVariables`:
const upsertDoctorProfileVars: UpsertDoctorProfileVariables = {
  id: ..., 
  doctorUid: ..., 
  fullName: ..., 
  dob: ..., // optional
  gender: ..., // optional
  phone: ..., // optional
  specialty: ..., // optional
  certNumber: ..., // optional
  bio: ..., // optional
  avatarUrl: ..., // optional
  verificationStatus: ..., // optional
  verificationDocumentName: ..., // optional
  verificationDocumentDataUrl: ..., // optional
  verificationUpdatedAt: ..., // optional
  updatedAt: ..., // optional
};

// Call the `upsertDoctorProfileRef()` function to get a reference to the mutation.
const ref = upsertDoctorProfileRef(upsertDoctorProfileVars);
// Variables can be defined inline as well.
const ref = upsertDoctorProfileRef({ id: ..., doctorUid: ..., fullName: ..., dob: ..., gender: ..., phone: ..., specialty: ..., certNumber: ..., bio: ..., avatarUrl: ..., verificationStatus: ..., verificationDocumentName: ..., verificationDocumentDataUrl: ..., verificationUpdatedAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDoctorProfileRef(dataConnect, upsertDoctorProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.doctorProfile_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.doctorProfile_upsert);
});
```

## UpsertNotificationPreference
You can execute the `UpsertNotificationPreference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertNotificationPreference(vars: UpsertNotificationPreferenceVariables): MutationPromise<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;

interface UpsertNotificationPreferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertNotificationPreferenceVariables): MutationRef<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;
}
export const upsertNotificationPreferenceRef: UpsertNotificationPreferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertNotificationPreference(dc: DataConnect, vars: UpsertNotificationPreferenceVariables): MutationPromise<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;

interface UpsertNotificationPreferenceRef {
  ...
  (dc: DataConnect, vars: UpsertNotificationPreferenceVariables): MutationRef<UpsertNotificationPreferenceData, UpsertNotificationPreferenceVariables>;
}
export const upsertNotificationPreferenceRef: UpsertNotificationPreferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertNotificationPreferenceRef:
```typescript
const name = upsertNotificationPreferenceRef.operationName;
console.log(name);
```

### Variables
The `UpsertNotificationPreference` mutation requires an argument of type `UpsertNotificationPreferenceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertNotificationPreference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertNotificationPreferenceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertNotificationPreferenceData {
  notificationPreference_upsert: NotificationPreference_Key;
}
```
### Using `UpsertNotificationPreference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertNotificationPreference, UpsertNotificationPreferenceVariables } from '@firebasegen/default-connector';

// The `UpsertNotificationPreference` mutation requires an argument of type `UpsertNotificationPreferenceVariables`:
const upsertNotificationPreferenceVars: UpsertNotificationPreferenceVariables = {
  id: ..., 
  doctorUid: ..., 
  language: ..., 
  newApptEmail: ..., 
  newApptApp: ..., 
  reminderEmail: ..., 
  reminderApp: ..., 
  reportEmail: ..., 
  reportApp: ..., 
  twoFactorEnabled: ..., 
  updatedAt: ..., // optional
};

// Call the `upsertNotificationPreference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertNotificationPreference(upsertNotificationPreferenceVars);
// Variables can be defined inline as well.
const { data } = await upsertNotificationPreference({ id: ..., doctorUid: ..., language: ..., newApptEmail: ..., newApptApp: ..., reminderEmail: ..., reminderApp: ..., reportEmail: ..., reportApp: ..., twoFactorEnabled: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertNotificationPreference(dataConnect, upsertNotificationPreferenceVars);

console.log(data.notificationPreference_upsert);

// Or, you can use the `Promise` API.
upsertNotificationPreference(upsertNotificationPreferenceVars).then((response) => {
  const data = response.data;
  console.log(data.notificationPreference_upsert);
});
```

### Using `UpsertNotificationPreference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertNotificationPreferenceRef, UpsertNotificationPreferenceVariables } from '@firebasegen/default-connector';

// The `UpsertNotificationPreference` mutation requires an argument of type `UpsertNotificationPreferenceVariables`:
const upsertNotificationPreferenceVars: UpsertNotificationPreferenceVariables = {
  id: ..., 
  doctorUid: ..., 
  language: ..., 
  newApptEmail: ..., 
  newApptApp: ..., 
  reminderEmail: ..., 
  reminderApp: ..., 
  reportEmail: ..., 
  reportApp: ..., 
  twoFactorEnabled: ..., 
  updatedAt: ..., // optional
};

// Call the `upsertNotificationPreferenceRef()` function to get a reference to the mutation.
const ref = upsertNotificationPreferenceRef(upsertNotificationPreferenceVars);
// Variables can be defined inline as well.
const ref = upsertNotificationPreferenceRef({ id: ..., doctorUid: ..., language: ..., newApptEmail: ..., newApptApp: ..., reminderEmail: ..., reminderApp: ..., reportEmail: ..., reportApp: ..., twoFactorEnabled: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertNotificationPreferenceRef(dataConnect, upsertNotificationPreferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notificationPreference_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notificationPreference_upsert);
});
```

## UpsertWorkingScheduleSlot
You can execute the `UpsertWorkingScheduleSlot` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertWorkingScheduleSlot(vars: UpsertWorkingScheduleSlotVariables): MutationPromise<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;

interface UpsertWorkingScheduleSlotRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertWorkingScheduleSlotVariables): MutationRef<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;
}
export const upsertWorkingScheduleSlotRef: UpsertWorkingScheduleSlotRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertWorkingScheduleSlot(dc: DataConnect, vars: UpsertWorkingScheduleSlotVariables): MutationPromise<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;

interface UpsertWorkingScheduleSlotRef {
  ...
  (dc: DataConnect, vars: UpsertWorkingScheduleSlotVariables): MutationRef<UpsertWorkingScheduleSlotData, UpsertWorkingScheduleSlotVariables>;
}
export const upsertWorkingScheduleSlotRef: UpsertWorkingScheduleSlotRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertWorkingScheduleSlotRef:
```typescript
const name = upsertWorkingScheduleSlotRef.operationName;
console.log(name);
```

### Variables
The `UpsertWorkingScheduleSlot` mutation requires an argument of type `UpsertWorkingScheduleSlotVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertWorkingScheduleSlotVariables {
  id: string;
  doctorUid: string;
  dayIndex: number;
  hour: number;
  isActive: boolean;
  updatedAt?: string | null;
}
```
### Return Type
Recall that executing the `UpsertWorkingScheduleSlot` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertWorkingScheduleSlotData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertWorkingScheduleSlotData {
  workingScheduleSlot_upsert: WorkingScheduleSlot_Key;
}
```
### Using `UpsertWorkingScheduleSlot`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertWorkingScheduleSlot, UpsertWorkingScheduleSlotVariables } from '@firebasegen/default-connector';

// The `UpsertWorkingScheduleSlot` mutation requires an argument of type `UpsertWorkingScheduleSlotVariables`:
const upsertWorkingScheduleSlotVars: UpsertWorkingScheduleSlotVariables = {
  id: ..., 
  doctorUid: ..., 
  dayIndex: ..., 
  hour: ..., 
  isActive: ..., 
  updatedAt: ..., // optional
};

// Call the `upsertWorkingScheduleSlot()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertWorkingScheduleSlot(upsertWorkingScheduleSlotVars);
// Variables can be defined inline as well.
const { data } = await upsertWorkingScheduleSlot({ id: ..., doctorUid: ..., dayIndex: ..., hour: ..., isActive: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertWorkingScheduleSlot(dataConnect, upsertWorkingScheduleSlotVars);

console.log(data.workingScheduleSlot_upsert);

// Or, you can use the `Promise` API.
upsertWorkingScheduleSlot(upsertWorkingScheduleSlotVars).then((response) => {
  const data = response.data;
  console.log(data.workingScheduleSlot_upsert);
});
```

### Using `UpsertWorkingScheduleSlot`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertWorkingScheduleSlotRef, UpsertWorkingScheduleSlotVariables } from '@firebasegen/default-connector';

// The `UpsertWorkingScheduleSlot` mutation requires an argument of type `UpsertWorkingScheduleSlotVariables`:
const upsertWorkingScheduleSlotVars: UpsertWorkingScheduleSlotVariables = {
  id: ..., 
  doctorUid: ..., 
  dayIndex: ..., 
  hour: ..., 
  isActive: ..., 
  updatedAt: ..., // optional
};

// Call the `upsertWorkingScheduleSlotRef()` function to get a reference to the mutation.
const ref = upsertWorkingScheduleSlotRef(upsertWorkingScheduleSlotVars);
// Variables can be defined inline as well.
const ref = upsertWorkingScheduleSlotRef({ id: ..., doctorUid: ..., dayIndex: ..., hour: ..., isActive: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertWorkingScheduleSlotRef(dataConnect, upsertWorkingScheduleSlotVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workingScheduleSlot_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workingScheduleSlot_upsert);
});
```

## UpsertDigitalSignature
You can execute the `UpsertDigitalSignature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDigitalSignature(vars: UpsertDigitalSignatureVariables): MutationPromise<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;

interface UpsertDigitalSignatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDigitalSignatureVariables): MutationRef<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;
}
export const upsertDigitalSignatureRef: UpsertDigitalSignatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDigitalSignature(dc: DataConnect, vars: UpsertDigitalSignatureVariables): MutationPromise<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;

interface UpsertDigitalSignatureRef {
  ...
  (dc: DataConnect, vars: UpsertDigitalSignatureVariables): MutationRef<UpsertDigitalSignatureData, UpsertDigitalSignatureVariables>;
}
export const upsertDigitalSignatureRef: UpsertDigitalSignatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDigitalSignatureRef:
```typescript
const name = upsertDigitalSignatureRef.operationName;
console.log(name);
```

### Variables
The `UpsertDigitalSignature` mutation requires an argument of type `UpsertDigitalSignatureVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertDigitalSignatureVariables {
  id: string;
  doctorUid: string;
  imageDataUrl?: string | null;
  uploadedAt?: string | null;
}
```
### Return Type
Recall that executing the `UpsertDigitalSignature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDigitalSignatureData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDigitalSignatureData {
  digitalSignature_upsert: DigitalSignature_Key;
}
```
### Using `UpsertDigitalSignature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDigitalSignature, UpsertDigitalSignatureVariables } from '@firebasegen/default-connector';

// The `UpsertDigitalSignature` mutation requires an argument of type `UpsertDigitalSignatureVariables`:
const upsertDigitalSignatureVars: UpsertDigitalSignatureVariables = {
  id: ..., 
  doctorUid: ..., 
  imageDataUrl: ..., // optional
  uploadedAt: ..., // optional
};

// Call the `upsertDigitalSignature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDigitalSignature(upsertDigitalSignatureVars);
// Variables can be defined inline as well.
const { data } = await upsertDigitalSignature({ id: ..., doctorUid: ..., imageDataUrl: ..., uploadedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDigitalSignature(dataConnect, upsertDigitalSignatureVars);

console.log(data.digitalSignature_upsert);

// Or, you can use the `Promise` API.
upsertDigitalSignature(upsertDigitalSignatureVars).then((response) => {
  const data = response.data;
  console.log(data.digitalSignature_upsert);
});
```

### Using `UpsertDigitalSignature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDigitalSignatureRef, UpsertDigitalSignatureVariables } from '@firebasegen/default-connector';

// The `UpsertDigitalSignature` mutation requires an argument of type `UpsertDigitalSignatureVariables`:
const upsertDigitalSignatureVars: UpsertDigitalSignatureVariables = {
  id: ..., 
  doctorUid: ..., 
  imageDataUrl: ..., // optional
  uploadedAt: ..., // optional
};

// Call the `upsertDigitalSignatureRef()` function to get a reference to the mutation.
const ref = upsertDigitalSignatureRef(upsertDigitalSignatureVars);
// Variables can be defined inline as well.
const ref = upsertDigitalSignatureRef({ id: ..., doctorUid: ..., imageDataUrl: ..., uploadedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDigitalSignatureRef(dataConnect, upsertDigitalSignatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.digitalSignature_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.digitalSignature_upsert);
});
```

## CreateSupportRequest
You can execute the `CreateSupportRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createSupportRequest(vars: CreateSupportRequestVariables): MutationPromise<CreateSupportRequestData, CreateSupportRequestVariables>;

interface CreateSupportRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSupportRequestVariables): MutationRef<CreateSupportRequestData, CreateSupportRequestVariables>;
}
export const createSupportRequestRef: CreateSupportRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSupportRequest(dc: DataConnect, vars: CreateSupportRequestVariables): MutationPromise<CreateSupportRequestData, CreateSupportRequestVariables>;

interface CreateSupportRequestRef {
  ...
  (dc: DataConnect, vars: CreateSupportRequestVariables): MutationRef<CreateSupportRequestData, CreateSupportRequestVariables>;
}
export const createSupportRequestRef: CreateSupportRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSupportRequestRef:
```typescript
const name = createSupportRequestRef.operationName;
console.log(name);
```

### Variables
The `CreateSupportRequest` mutation requires an argument of type `CreateSupportRequestVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSupportRequestVariables {
  doctorUid?: string | null;
  source: string;
  message: string;
  createdAt: string;
}
```
### Return Type
Recall that executing the `CreateSupportRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSupportRequestData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSupportRequestData {
  supportRequest_insert: SupportRequest_Key;
}
```
### Using `CreateSupportRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSupportRequest, CreateSupportRequestVariables } from '@firebasegen/default-connector';

// The `CreateSupportRequest` mutation requires an argument of type `CreateSupportRequestVariables`:
const createSupportRequestVars: CreateSupportRequestVariables = {
  doctorUid: ..., // optional
  source: ..., 
  message: ..., 
  createdAt: ..., 
};

// Call the `createSupportRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSupportRequest(createSupportRequestVars);
// Variables can be defined inline as well.
const { data } = await createSupportRequest({ doctorUid: ..., source: ..., message: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSupportRequest(dataConnect, createSupportRequestVars);

console.log(data.supportRequest_insert);

// Or, you can use the `Promise` API.
createSupportRequest(createSupportRequestVars).then((response) => {
  const data = response.data;
  console.log(data.supportRequest_insert);
});
```

### Using `CreateSupportRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSupportRequestRef, CreateSupportRequestVariables } from '@firebasegen/default-connector';

// The `CreateSupportRequest` mutation requires an argument of type `CreateSupportRequestVariables`:
const createSupportRequestVars: CreateSupportRequestVariables = {
  doctorUid: ..., // optional
  source: ..., 
  message: ..., 
  createdAt: ..., 
};

// Call the `createSupportRequestRef()` function to get a reference to the mutation.
const ref = createSupportRequestRef(createSupportRequestVars);
// Variables can be defined inline as well.
const ref = createSupportRequestRef({ doctorUid: ..., source: ..., message: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSupportRequestRef(dataConnect, createSupportRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supportRequest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supportRequest_insert);
});
```

## UpsertAssistantMessage
You can execute the `UpsertAssistantMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertAssistantMessage(vars: UpsertAssistantMessageVariables): MutationPromise<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;

interface UpsertAssistantMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAssistantMessageVariables): MutationRef<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;
}
export const upsertAssistantMessageRef: UpsertAssistantMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertAssistantMessage(dc: DataConnect, vars: UpsertAssistantMessageVariables): MutationPromise<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;

interface UpsertAssistantMessageRef {
  ...
  (dc: DataConnect, vars: UpsertAssistantMessageVariables): MutationRef<UpsertAssistantMessageData, UpsertAssistantMessageVariables>;
}
export const upsertAssistantMessageRef: UpsertAssistantMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertAssistantMessageRef:
```typescript
const name = upsertAssistantMessageRef.operationName;
console.log(name);
```

### Variables
The `UpsertAssistantMessage` mutation requires an argument of type `UpsertAssistantMessageVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertAssistantMessageVariables {
  id: string;
  threadKey: string;
  role: string;
  content: string;
  timestampLabel: string;
  createdAt: string;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertAssistantMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertAssistantMessageData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertAssistantMessageData {
  assistantMessage_upsert: AssistantMessage_Key;
}
```
### Using `UpsertAssistantMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertAssistantMessage, UpsertAssistantMessageVariables } from '@firebasegen/default-connector';

// The `UpsertAssistantMessage` mutation requires an argument of type `UpsertAssistantMessageVariables`:
const upsertAssistantMessageVars: UpsertAssistantMessageVariables = {
  id: ..., 
  threadKey: ..., 
  role: ..., 
  content: ..., 
  timestampLabel: ..., 
  createdAt: ..., 
  displayOrder: ..., 
};

// Call the `upsertAssistantMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertAssistantMessage(upsertAssistantMessageVars);
// Variables can be defined inline as well.
const { data } = await upsertAssistantMessage({ id: ..., threadKey: ..., role: ..., content: ..., timestampLabel: ..., createdAt: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertAssistantMessage(dataConnect, upsertAssistantMessageVars);

console.log(data.assistantMessage_upsert);

// Or, you can use the `Promise` API.
upsertAssistantMessage(upsertAssistantMessageVars).then((response) => {
  const data = response.data;
  console.log(data.assistantMessage_upsert);
});
```

### Using `UpsertAssistantMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertAssistantMessageRef, UpsertAssistantMessageVariables } from '@firebasegen/default-connector';

// The `UpsertAssistantMessage` mutation requires an argument of type `UpsertAssistantMessageVariables`:
const upsertAssistantMessageVars: UpsertAssistantMessageVariables = {
  id: ..., 
  threadKey: ..., 
  role: ..., 
  content: ..., 
  timestampLabel: ..., 
  createdAt: ..., 
  displayOrder: ..., 
};

// Call the `upsertAssistantMessageRef()` function to get a reference to the mutation.
const ref = upsertAssistantMessageRef(upsertAssistantMessageVars);
// Variables can be defined inline as well.
const ref = upsertAssistantMessageRef({ id: ..., threadKey: ..., role: ..., content: ..., timestampLabel: ..., createdAt: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertAssistantMessageRef(dataConnect, upsertAssistantMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.assistantMessage_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.assistantMessage_upsert);
});
```

## UpsertScheduleEvent
You can execute the `UpsertScheduleEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertScheduleEvent(vars: UpsertScheduleEventVariables): MutationPromise<UpsertScheduleEventData, UpsertScheduleEventVariables>;

interface UpsertScheduleEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertScheduleEventVariables): MutationRef<UpsertScheduleEventData, UpsertScheduleEventVariables>;
}
export const upsertScheduleEventRef: UpsertScheduleEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertScheduleEvent(dc: DataConnect, vars: UpsertScheduleEventVariables): MutationPromise<UpsertScheduleEventData, UpsertScheduleEventVariables>;

interface UpsertScheduleEventRef {
  ...
  (dc: DataConnect, vars: UpsertScheduleEventVariables): MutationRef<UpsertScheduleEventData, UpsertScheduleEventVariables>;
}
export const upsertScheduleEventRef: UpsertScheduleEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertScheduleEventRef:
```typescript
const name = upsertScheduleEventRef.operationName;
console.log(name);
```

### Variables
The `UpsertScheduleEvent` mutation requires an argument of type `UpsertScheduleEventVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertScheduleEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertScheduleEventData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertScheduleEventData {
  scheduleEvent_upsert: ScheduleEvent_Key;
}
```
### Using `UpsertScheduleEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertScheduleEvent, UpsertScheduleEventVariables } from '@firebasegen/default-connector';

// The `UpsertScheduleEvent` mutation requires an argument of type `UpsertScheduleEventVariables`:
const upsertScheduleEventVars: UpsertScheduleEventVariables = {
  id: ..., 
  doctorUid: ..., 
  patientUid: ..., // optional
  title: ..., 
  eventType: ..., 
  department: ..., // optional
  scheduledDate: ..., 
  startTime: ..., 
  endTime: ..., 
  status: ..., 
  colorTone: ..., // optional
  roomName: ..., // optional
  insuranceNumber: ..., // optional
  patientNameOverride: ..., // optional
  timeString: ..., // optional
  priority: ..., // optional
  meetingLink: ..., // optional
  notes: ..., // optional
  attachmentsCount: ..., 
  displayOrder: ..., 
  isCompleted: ..., 
  isDeleted: ..., 
};

// Call the `upsertScheduleEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertScheduleEvent(upsertScheduleEventVars);
// Variables can be defined inline as well.
const { data } = await upsertScheduleEvent({ id: ..., doctorUid: ..., patientUid: ..., title: ..., eventType: ..., department: ..., scheduledDate: ..., startTime: ..., endTime: ..., status: ..., colorTone: ..., roomName: ..., insuranceNumber: ..., patientNameOverride: ..., timeString: ..., priority: ..., meetingLink: ..., notes: ..., attachmentsCount: ..., displayOrder: ..., isCompleted: ..., isDeleted: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertScheduleEvent(dataConnect, upsertScheduleEventVars);

console.log(data.scheduleEvent_upsert);

// Or, you can use the `Promise` API.
upsertScheduleEvent(upsertScheduleEventVars).then((response) => {
  const data = response.data;
  console.log(data.scheduleEvent_upsert);
});
```

### Using `UpsertScheduleEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertScheduleEventRef, UpsertScheduleEventVariables } from '@firebasegen/default-connector';

// The `UpsertScheduleEvent` mutation requires an argument of type `UpsertScheduleEventVariables`:
const upsertScheduleEventVars: UpsertScheduleEventVariables = {
  id: ..., 
  doctorUid: ..., 
  patientUid: ..., // optional
  title: ..., 
  eventType: ..., 
  department: ..., // optional
  scheduledDate: ..., 
  startTime: ..., 
  endTime: ..., 
  status: ..., 
  colorTone: ..., // optional
  roomName: ..., // optional
  insuranceNumber: ..., // optional
  patientNameOverride: ..., // optional
  timeString: ..., // optional
  priority: ..., // optional
  meetingLink: ..., // optional
  notes: ..., // optional
  attachmentsCount: ..., 
  displayOrder: ..., 
  isCompleted: ..., 
  isDeleted: ..., 
};

// Call the `upsertScheduleEventRef()` function to get a reference to the mutation.
const ref = upsertScheduleEventRef(upsertScheduleEventVars);
// Variables can be defined inline as well.
const ref = upsertScheduleEventRef({ id: ..., doctorUid: ..., patientUid: ..., title: ..., eventType: ..., department: ..., scheduledDate: ..., startTime: ..., endTime: ..., status: ..., colorTone: ..., roomName: ..., insuranceNumber: ..., patientNameOverride: ..., timeString: ..., priority: ..., meetingLink: ..., notes: ..., attachmentsCount: ..., displayOrder: ..., isCompleted: ..., isDeleted: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertScheduleEventRef(dataConnect, upsertScheduleEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.scheduleEvent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.scheduleEvent_upsert);
});
```

## UpsertScheduleAttachment
You can execute the `UpsertScheduleAttachment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertScheduleAttachment(vars: UpsertScheduleAttachmentVariables): MutationPromise<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;

interface UpsertScheduleAttachmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertScheduleAttachmentVariables): MutationRef<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;
}
export const upsertScheduleAttachmentRef: UpsertScheduleAttachmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertScheduleAttachment(dc: DataConnect, vars: UpsertScheduleAttachmentVariables): MutationPromise<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;

interface UpsertScheduleAttachmentRef {
  ...
  (dc: DataConnect, vars: UpsertScheduleAttachmentVariables): MutationRef<UpsertScheduleAttachmentData, UpsertScheduleAttachmentVariables>;
}
export const upsertScheduleAttachmentRef: UpsertScheduleAttachmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertScheduleAttachmentRef:
```typescript
const name = upsertScheduleAttachmentRef.operationName;
console.log(name);
```

### Variables
The `UpsertScheduleAttachment` mutation requires an argument of type `UpsertScheduleAttachmentVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertScheduleAttachmentVariables {
  id: string;
  eventId: string;
  fileName: string;
  fileType: string;
  fileUrl?: string | null;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertScheduleAttachment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertScheduleAttachmentData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertScheduleAttachmentData {
  scheduleAttachment_upsert: ScheduleAttachment_Key;
}
```
### Using `UpsertScheduleAttachment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertScheduleAttachment, UpsertScheduleAttachmentVariables } from '@firebasegen/default-connector';

// The `UpsertScheduleAttachment` mutation requires an argument of type `UpsertScheduleAttachmentVariables`:
const upsertScheduleAttachmentVars: UpsertScheduleAttachmentVariables = {
  id: ..., 
  eventId: ..., 
  fileName: ..., 
  fileType: ..., 
  fileUrl: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertScheduleAttachment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertScheduleAttachment(upsertScheduleAttachmentVars);
// Variables can be defined inline as well.
const { data } = await upsertScheduleAttachment({ id: ..., eventId: ..., fileName: ..., fileType: ..., fileUrl: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertScheduleAttachment(dataConnect, upsertScheduleAttachmentVars);

console.log(data.scheduleAttachment_upsert);

// Or, you can use the `Promise` API.
upsertScheduleAttachment(upsertScheduleAttachmentVars).then((response) => {
  const data = response.data;
  console.log(data.scheduleAttachment_upsert);
});
```

### Using `UpsertScheduleAttachment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertScheduleAttachmentRef, UpsertScheduleAttachmentVariables } from '@firebasegen/default-connector';

// The `UpsertScheduleAttachment` mutation requires an argument of type `UpsertScheduleAttachmentVariables`:
const upsertScheduleAttachmentVars: UpsertScheduleAttachmentVariables = {
  id: ..., 
  eventId: ..., 
  fileName: ..., 
  fileType: ..., 
  fileUrl: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertScheduleAttachmentRef()` function to get a reference to the mutation.
const ref = upsertScheduleAttachmentRef(upsertScheduleAttachmentVars);
// Variables can be defined inline as well.
const ref = upsertScheduleAttachmentRef({ id: ..., eventId: ..., fileName: ..., fileType: ..., fileUrl: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertScheduleAttachmentRef(dataConnect, upsertScheduleAttachmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.scheduleAttachment_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.scheduleAttachment_upsert);
});
```

## CreateShiftSwapRequest
You can execute the `CreateShiftSwapRequest` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
createShiftSwapRequest(vars: CreateShiftSwapRequestVariables): MutationPromise<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;

interface CreateShiftSwapRequestRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateShiftSwapRequestVariables): MutationRef<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;
}
export const createShiftSwapRequestRef: CreateShiftSwapRequestRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createShiftSwapRequest(dc: DataConnect, vars: CreateShiftSwapRequestVariables): MutationPromise<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;

interface CreateShiftSwapRequestRef {
  ...
  (dc: DataConnect, vars: CreateShiftSwapRequestVariables): MutationRef<CreateShiftSwapRequestData, CreateShiftSwapRequestVariables>;
}
export const createShiftSwapRequestRef: CreateShiftSwapRequestRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createShiftSwapRequestRef:
```typescript
const name = createShiftSwapRequestRef.operationName;
console.log(name);
```

### Variables
The `CreateShiftSwapRequest` mutation requires an argument of type `CreateShiftSwapRequestVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateShiftSwapRequestVariables {
  requesterUid: string;
  targetDoctorUid: string;
  department: string;
  shiftKey: string;
  createdAt: string;
}
```
### Return Type
Recall that executing the `CreateShiftSwapRequest` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateShiftSwapRequestData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateShiftSwapRequestData {
  shiftSwapRequest_insert: ShiftSwapRequest_Key;
}
```
### Using `CreateShiftSwapRequest`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createShiftSwapRequest, CreateShiftSwapRequestVariables } from '@firebasegen/default-connector';

// The `CreateShiftSwapRequest` mutation requires an argument of type `CreateShiftSwapRequestVariables`:
const createShiftSwapRequestVars: CreateShiftSwapRequestVariables = {
  requesterUid: ..., 
  targetDoctorUid: ..., 
  department: ..., 
  shiftKey: ..., 
  createdAt: ..., 
};

// Call the `createShiftSwapRequest()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createShiftSwapRequest(createShiftSwapRequestVars);
// Variables can be defined inline as well.
const { data } = await createShiftSwapRequest({ requesterUid: ..., targetDoctorUid: ..., department: ..., shiftKey: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createShiftSwapRequest(dataConnect, createShiftSwapRequestVars);

console.log(data.shiftSwapRequest_insert);

// Or, you can use the `Promise` API.
createShiftSwapRequest(createShiftSwapRequestVars).then((response) => {
  const data = response.data;
  console.log(data.shiftSwapRequest_insert);
});
```

### Using `CreateShiftSwapRequest`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createShiftSwapRequestRef, CreateShiftSwapRequestVariables } from '@firebasegen/default-connector';

// The `CreateShiftSwapRequest` mutation requires an argument of type `CreateShiftSwapRequestVariables`:
const createShiftSwapRequestVars: CreateShiftSwapRequestVariables = {
  requesterUid: ..., 
  targetDoctorUid: ..., 
  department: ..., 
  shiftKey: ..., 
  createdAt: ..., 
};

// Call the `createShiftSwapRequestRef()` function to get a reference to the mutation.
const ref = createShiftSwapRequestRef(createShiftSwapRequestVars);
// Variables can be defined inline as well.
const ref = createShiftSwapRequestRef({ requesterUid: ..., targetDoctorUid: ..., department: ..., shiftKey: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createShiftSwapRequestRef(dataConnect, createShiftSwapRequestVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.shiftSwapRequest_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.shiftSwapRequest_insert);
});
```

## UpsertPrescriptionDraft
You can execute the `UpsertPrescriptionDraft` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertPrescriptionDraft(vars: UpsertPrescriptionDraftVariables): MutationPromise<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;

interface UpsertPrescriptionDraftRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionDraftVariables): MutationRef<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;
}
export const upsertPrescriptionDraftRef: UpsertPrescriptionDraftRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPrescriptionDraft(dc: DataConnect, vars: UpsertPrescriptionDraftVariables): MutationPromise<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;

interface UpsertPrescriptionDraftRef {
  ...
  (dc: DataConnect, vars: UpsertPrescriptionDraftVariables): MutationRef<UpsertPrescriptionDraftData, UpsertPrescriptionDraftVariables>;
}
export const upsertPrescriptionDraftRef: UpsertPrescriptionDraftRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPrescriptionDraftRef:
```typescript
const name = upsertPrescriptionDraftRef.operationName;
console.log(name);
```

### Variables
The `UpsertPrescriptionDraft` mutation requires an argument of type `UpsertPrescriptionDraftVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertPrescriptionDraftVariables {
  id: string;
  doctorUid: string;
  patientUid: string;
  activeTemplateId?: string | null;
  note?: string | null;
  status: string;
  updatedAt?: string | null;
}
```
### Return Type
Recall that executing the `UpsertPrescriptionDraft` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPrescriptionDraftData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPrescriptionDraftData {
  prescriptionDraft_upsert: PrescriptionDraft_Key;
}
```
### Using `UpsertPrescriptionDraft`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionDraft, UpsertPrescriptionDraftVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionDraft` mutation requires an argument of type `UpsertPrescriptionDraftVariables`:
const upsertPrescriptionDraftVars: UpsertPrescriptionDraftVariables = {
  id: ..., 
  doctorUid: ..., 
  patientUid: ..., 
  activeTemplateId: ..., // optional
  note: ..., // optional
  status: ..., 
  updatedAt: ..., // optional
};

// Call the `upsertPrescriptionDraft()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPrescriptionDraft(upsertPrescriptionDraftVars);
// Variables can be defined inline as well.
const { data } = await upsertPrescriptionDraft({ id: ..., doctorUid: ..., patientUid: ..., activeTemplateId: ..., note: ..., status: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPrescriptionDraft(dataConnect, upsertPrescriptionDraftVars);

console.log(data.prescriptionDraft_upsert);

// Or, you can use the `Promise` API.
upsertPrescriptionDraft(upsertPrescriptionDraftVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionDraft_upsert);
});
```

### Using `UpsertPrescriptionDraft`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionDraftRef, UpsertPrescriptionDraftVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionDraft` mutation requires an argument of type `UpsertPrescriptionDraftVariables`:
const upsertPrescriptionDraftVars: UpsertPrescriptionDraftVariables = {
  id: ..., 
  doctorUid: ..., 
  patientUid: ..., 
  activeTemplateId: ..., // optional
  note: ..., // optional
  status: ..., 
  updatedAt: ..., // optional
};

// Call the `upsertPrescriptionDraftRef()` function to get a reference to the mutation.
const ref = upsertPrescriptionDraftRef(upsertPrescriptionDraftVars);
// Variables can be defined inline as well.
const ref = upsertPrescriptionDraftRef({ id: ..., doctorUid: ..., patientUid: ..., activeTemplateId: ..., note: ..., status: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPrescriptionDraftRef(dataConnect, upsertPrescriptionDraftVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionDraft_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionDraft_upsert);
});
```

## UpsertPrescriptionDraftItem
You can execute the `UpsertPrescriptionDraftItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertPrescriptionDraftItem(vars: UpsertPrescriptionDraftItemVariables): MutationPromise<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;

interface UpsertPrescriptionDraftItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionDraftItemVariables): MutationRef<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;
}
export const upsertPrescriptionDraftItemRef: UpsertPrescriptionDraftItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPrescriptionDraftItem(dc: DataConnect, vars: UpsertPrescriptionDraftItemVariables): MutationPromise<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;

interface UpsertPrescriptionDraftItemRef {
  ...
  (dc: DataConnect, vars: UpsertPrescriptionDraftItemVariables): MutationRef<UpsertPrescriptionDraftItemData, UpsertPrescriptionDraftItemVariables>;
}
export const upsertPrescriptionDraftItemRef: UpsertPrescriptionDraftItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPrescriptionDraftItemRef:
```typescript
const name = upsertPrescriptionDraftItemRef.operationName;
console.log(name);
```

### Variables
The `UpsertPrescriptionDraftItem` mutation requires an argument of type `UpsertPrescriptionDraftItemVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertPrescriptionDraftItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPrescriptionDraftItemData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPrescriptionDraftItemData {
  prescriptionDraftItem_upsert: PrescriptionDraftItem_Key;
}
```
### Using `UpsertPrescriptionDraftItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionDraftItem, UpsertPrescriptionDraftItemVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionDraftItem` mutation requires an argument of type `UpsertPrescriptionDraftItemVariables`:
const upsertPrescriptionDraftItemVars: UpsertPrescriptionDraftItemVariables = {
  id: ..., 
  draftId: ..., 
  drugName: ..., 
  note: ..., // optional
  quantity: ..., 
  unit: ..., 
  dosage: ..., 
  timing: ..., 
  duration: ..., 
  price: ..., 
  sourceType: ..., // optional
  sourceId: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertPrescriptionDraftItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPrescriptionDraftItem(upsertPrescriptionDraftItemVars);
// Variables can be defined inline as well.
const { data } = await upsertPrescriptionDraftItem({ id: ..., draftId: ..., drugName: ..., note: ..., quantity: ..., unit: ..., dosage: ..., timing: ..., duration: ..., price: ..., sourceType: ..., sourceId: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPrescriptionDraftItem(dataConnect, upsertPrescriptionDraftItemVars);

console.log(data.prescriptionDraftItem_upsert);

// Or, you can use the `Promise` API.
upsertPrescriptionDraftItem(upsertPrescriptionDraftItemVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionDraftItem_upsert);
});
```

### Using `UpsertPrescriptionDraftItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionDraftItemRef, UpsertPrescriptionDraftItemVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionDraftItem` mutation requires an argument of type `UpsertPrescriptionDraftItemVariables`:
const upsertPrescriptionDraftItemVars: UpsertPrescriptionDraftItemVariables = {
  id: ..., 
  draftId: ..., 
  drugName: ..., 
  note: ..., // optional
  quantity: ..., 
  unit: ..., 
  dosage: ..., 
  timing: ..., 
  duration: ..., 
  price: ..., 
  sourceType: ..., // optional
  sourceId: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertPrescriptionDraftItemRef()` function to get a reference to the mutation.
const ref = upsertPrescriptionDraftItemRef(upsertPrescriptionDraftItemVars);
// Variables can be defined inline as well.
const ref = upsertPrescriptionDraftItemRef({ id: ..., draftId: ..., drugName: ..., note: ..., quantity: ..., unit: ..., dosage: ..., timing: ..., duration: ..., price: ..., sourceType: ..., sourceId: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPrescriptionDraftItemRef(dataConnect, upsertPrescriptionDraftItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionDraftItem_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionDraftItem_upsert);
});
```

## DeletePrescriptionDraftItem
You can execute the `DeletePrescriptionDraftItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
deletePrescriptionDraftItem(vars: DeletePrescriptionDraftItemVariables): MutationPromise<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;

interface DeletePrescriptionDraftItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePrescriptionDraftItemVariables): MutationRef<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;
}
export const deletePrescriptionDraftItemRef: DeletePrescriptionDraftItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePrescriptionDraftItem(dc: DataConnect, vars: DeletePrescriptionDraftItemVariables): MutationPromise<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;

interface DeletePrescriptionDraftItemRef {
  ...
  (dc: DataConnect, vars: DeletePrescriptionDraftItemVariables): MutationRef<DeletePrescriptionDraftItemData, DeletePrescriptionDraftItemVariables>;
}
export const deletePrescriptionDraftItemRef: DeletePrescriptionDraftItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePrescriptionDraftItemRef:
```typescript
const name = deletePrescriptionDraftItemRef.operationName;
console.log(name);
```

### Variables
The `DeletePrescriptionDraftItem` mutation requires an argument of type `DeletePrescriptionDraftItemVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePrescriptionDraftItemVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeletePrescriptionDraftItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePrescriptionDraftItemData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePrescriptionDraftItemData {
  prescriptionDraftItem_delete?: PrescriptionDraftItem_Key | null;
}
```
### Using `DeletePrescriptionDraftItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePrescriptionDraftItem, DeletePrescriptionDraftItemVariables } from '@firebasegen/default-connector';

// The `DeletePrescriptionDraftItem` mutation requires an argument of type `DeletePrescriptionDraftItemVariables`:
const deletePrescriptionDraftItemVars: DeletePrescriptionDraftItemVariables = {
  id: ..., 
};

// Call the `deletePrescriptionDraftItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePrescriptionDraftItem(deletePrescriptionDraftItemVars);
// Variables can be defined inline as well.
const { data } = await deletePrescriptionDraftItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePrescriptionDraftItem(dataConnect, deletePrescriptionDraftItemVars);

console.log(data.prescriptionDraftItem_delete);

// Or, you can use the `Promise` API.
deletePrescriptionDraftItem(deletePrescriptionDraftItemVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionDraftItem_delete);
});
```

### Using `DeletePrescriptionDraftItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePrescriptionDraftItemRef, DeletePrescriptionDraftItemVariables } from '@firebasegen/default-connector';

// The `DeletePrescriptionDraftItem` mutation requires an argument of type `DeletePrescriptionDraftItemVariables`:
const deletePrescriptionDraftItemVars: DeletePrescriptionDraftItemVariables = {
  id: ..., 
};

// Call the `deletePrescriptionDraftItemRef()` function to get a reference to the mutation.
const ref = deletePrescriptionDraftItemRef(deletePrescriptionDraftItemVars);
// Variables can be defined inline as well.
const ref = deletePrescriptionDraftItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePrescriptionDraftItemRef(dataConnect, deletePrescriptionDraftItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionDraftItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionDraftItem_delete);
});
```

## UpdateAiDiagnosisReview
You can execute the `UpdateAiDiagnosisReview` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
updateAiDiagnosisReview(vars: UpdateAiDiagnosisReviewVariables): MutationPromise<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;

interface UpdateAiDiagnosisReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAiDiagnosisReviewVariables): MutationRef<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;
}
export const updateAiDiagnosisReviewRef: UpdateAiDiagnosisReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAiDiagnosisReview(dc: DataConnect, vars: UpdateAiDiagnosisReviewVariables): MutationPromise<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;

interface UpdateAiDiagnosisReviewRef {
  ...
  (dc: DataConnect, vars: UpdateAiDiagnosisReviewVariables): MutationRef<UpdateAiDiagnosisReviewData, UpdateAiDiagnosisReviewVariables>;
}
export const updateAiDiagnosisReviewRef: UpdateAiDiagnosisReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAiDiagnosisReviewRef:
```typescript
const name = updateAiDiagnosisReviewRef.operationName;
console.log(name);
```

### Variables
The `UpdateAiDiagnosisReview` mutation requires an argument of type `UpdateAiDiagnosisReviewVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAiDiagnosisReviewVariables {
  id: UUIDString;
  doctorAdvice?: string | null;
  doctorApproved?: boolean | null;
  reportSummary?: string | null;
  aiScore?: string | null;
  confidenceScore?: number | null;
}
```
### Return Type
Recall that executing the `UpdateAiDiagnosisReview` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAiDiagnosisReviewData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAiDiagnosisReviewData {
  aiDiagnosis_update?: AiDiagnosis_Key | null;
}
```
### Using `UpdateAiDiagnosisReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAiDiagnosisReview, UpdateAiDiagnosisReviewVariables } from '@firebasegen/default-connector';

// The `UpdateAiDiagnosisReview` mutation requires an argument of type `UpdateAiDiagnosisReviewVariables`:
const updateAiDiagnosisReviewVars: UpdateAiDiagnosisReviewVariables = {
  id: ..., 
  doctorAdvice: ..., // optional
  doctorApproved: ..., // optional
  reportSummary: ..., // optional
  aiScore: ..., // optional
  confidenceScore: ..., // optional
};

// Call the `updateAiDiagnosisReview()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAiDiagnosisReview(updateAiDiagnosisReviewVars);
// Variables can be defined inline as well.
const { data } = await updateAiDiagnosisReview({ id: ..., doctorAdvice: ..., doctorApproved: ..., reportSummary: ..., aiScore: ..., confidenceScore: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAiDiagnosisReview(dataConnect, updateAiDiagnosisReviewVars);

console.log(data.aiDiagnosis_update);

// Or, you can use the `Promise` API.
updateAiDiagnosisReview(updateAiDiagnosisReviewVars).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_update);
});
```

### Using `UpdateAiDiagnosisReview`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAiDiagnosisReviewRef, UpdateAiDiagnosisReviewVariables } from '@firebasegen/default-connector';

// The `UpdateAiDiagnosisReview` mutation requires an argument of type `UpdateAiDiagnosisReviewVariables`:
const updateAiDiagnosisReviewVars: UpdateAiDiagnosisReviewVariables = {
  id: ..., 
  doctorAdvice: ..., // optional
  doctorApproved: ..., // optional
  reportSummary: ..., // optional
  aiScore: ..., // optional
  confidenceScore: ..., // optional
};

// Call the `updateAiDiagnosisReviewRef()` function to get a reference to the mutation.
const ref = updateAiDiagnosisReviewRef(updateAiDiagnosisReviewVars);
// Variables can be defined inline as well.
const ref = updateAiDiagnosisReviewRef({ id: ..., doctorAdvice: ..., doctorApproved: ..., reportSummary: ..., aiScore: ..., confidenceScore: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAiDiagnosisReviewRef(dataConnect, updateAiDiagnosisReviewVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_update);
});
```

## UpsertAiDiagnosisReference
You can execute the `UpsertAiDiagnosisReference` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertAiDiagnosisReference(vars: UpsertAiDiagnosisReferenceVariables): MutationPromise<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;

interface UpsertAiDiagnosisReferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAiDiagnosisReferenceVariables): MutationRef<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;
}
export const upsertAiDiagnosisReferenceRef: UpsertAiDiagnosisReferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertAiDiagnosisReference(dc: DataConnect, vars: UpsertAiDiagnosisReferenceVariables): MutationPromise<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;

interface UpsertAiDiagnosisReferenceRef {
  ...
  (dc: DataConnect, vars: UpsertAiDiagnosisReferenceVariables): MutationRef<UpsertAiDiagnosisReferenceData, UpsertAiDiagnosisReferenceVariables>;
}
export const upsertAiDiagnosisReferenceRef: UpsertAiDiagnosisReferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertAiDiagnosisReferenceRef:
```typescript
const name = upsertAiDiagnosisReferenceRef.operationName;
console.log(name);
```

### Variables
The `UpsertAiDiagnosisReference` mutation requires an argument of type `UpsertAiDiagnosisReferenceVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertAiDiagnosisReference` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertAiDiagnosisReferenceData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertAiDiagnosisReferenceData {
  aiDiagnosisReference_upsert: AiDiagnosisReference_Key;
}
```
### Using `UpsertAiDiagnosisReference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertAiDiagnosisReference, UpsertAiDiagnosisReferenceVariables } from '@firebasegen/default-connector';

// The `UpsertAiDiagnosisReference` mutation requires an argument of type `UpsertAiDiagnosisReferenceVariables`:
const upsertAiDiagnosisReferenceVars: UpsertAiDiagnosisReferenceVariables = {
  id: ..., 
  diagnosisId: ..., 
  label: ..., 
  diseaseLevel: ..., 
  aiScore: ..., 
  confidence: ..., 
  doctorNote: ..., 
  archiveLabel: ..., 
  displayOrder: ..., 
};

// Call the `upsertAiDiagnosisReference()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertAiDiagnosisReference(upsertAiDiagnosisReferenceVars);
// Variables can be defined inline as well.
const { data } = await upsertAiDiagnosisReference({ id: ..., diagnosisId: ..., label: ..., diseaseLevel: ..., aiScore: ..., confidence: ..., doctorNote: ..., archiveLabel: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertAiDiagnosisReference(dataConnect, upsertAiDiagnosisReferenceVars);

console.log(data.aiDiagnosisReference_upsert);

// Or, you can use the `Promise` API.
upsertAiDiagnosisReference(upsertAiDiagnosisReferenceVars).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosisReference_upsert);
});
```

### Using `UpsertAiDiagnosisReference`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertAiDiagnosisReferenceRef, UpsertAiDiagnosisReferenceVariables } from '@firebasegen/default-connector';

// The `UpsertAiDiagnosisReference` mutation requires an argument of type `UpsertAiDiagnosisReferenceVariables`:
const upsertAiDiagnosisReferenceVars: UpsertAiDiagnosisReferenceVariables = {
  id: ..., 
  diagnosisId: ..., 
  label: ..., 
  diseaseLevel: ..., 
  aiScore: ..., 
  confidence: ..., 
  doctorNote: ..., 
  archiveLabel: ..., 
  displayOrder: ..., 
};

// Call the `upsertAiDiagnosisReferenceRef()` function to get a reference to the mutation.
const ref = upsertAiDiagnosisReferenceRef(upsertAiDiagnosisReferenceVars);
// Variables can be defined inline as well.
const ref = upsertAiDiagnosisReferenceRef({ id: ..., diagnosisId: ..., label: ..., diseaseLevel: ..., aiScore: ..., confidence: ..., doctorNote: ..., archiveLabel: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertAiDiagnosisReferenceRef(dataConnect, upsertAiDiagnosisReferenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosisReference_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosisReference_upsert);
});
```

## UpsertAppointmentAttachment
You can execute the `UpsertAppointmentAttachment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertAppointmentAttachment(vars: UpsertAppointmentAttachmentVariables): MutationPromise<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;

interface UpsertAppointmentAttachmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAppointmentAttachmentVariables): MutationRef<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;
}
export const upsertAppointmentAttachmentRef: UpsertAppointmentAttachmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertAppointmentAttachment(dc: DataConnect, vars: UpsertAppointmentAttachmentVariables): MutationPromise<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;

interface UpsertAppointmentAttachmentRef {
  ...
  (dc: DataConnect, vars: UpsertAppointmentAttachmentVariables): MutationRef<UpsertAppointmentAttachmentData, UpsertAppointmentAttachmentVariables>;
}
export const upsertAppointmentAttachmentRef: UpsertAppointmentAttachmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertAppointmentAttachmentRef:
```typescript
const name = upsertAppointmentAttachmentRef.operationName;
console.log(name);
```

### Variables
The `UpsertAppointmentAttachment` mutation requires an argument of type `UpsertAppointmentAttachmentVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertAppointmentAttachmentVariables {
  id: string;
  appointmentId: UUIDString;
  fileName: string;
  fileType: string;
  fileUrl?: string | null;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertAppointmentAttachment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertAppointmentAttachmentData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertAppointmentAttachmentData {
  appointmentAttachment_upsert: AppointmentAttachment_Key;
}
```
### Using `UpsertAppointmentAttachment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertAppointmentAttachment, UpsertAppointmentAttachmentVariables } from '@firebasegen/default-connector';

// The `UpsertAppointmentAttachment` mutation requires an argument of type `UpsertAppointmentAttachmentVariables`:
const upsertAppointmentAttachmentVars: UpsertAppointmentAttachmentVariables = {
  id: ..., 
  appointmentId: ..., 
  fileName: ..., 
  fileType: ..., 
  fileUrl: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertAppointmentAttachment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertAppointmentAttachment(upsertAppointmentAttachmentVars);
// Variables can be defined inline as well.
const { data } = await upsertAppointmentAttachment({ id: ..., appointmentId: ..., fileName: ..., fileType: ..., fileUrl: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertAppointmentAttachment(dataConnect, upsertAppointmentAttachmentVars);

console.log(data.appointmentAttachment_upsert);

// Or, you can use the `Promise` API.
upsertAppointmentAttachment(upsertAppointmentAttachmentVars).then((response) => {
  const data = response.data;
  console.log(data.appointmentAttachment_upsert);
});
```

### Using `UpsertAppointmentAttachment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertAppointmentAttachmentRef, UpsertAppointmentAttachmentVariables } from '@firebasegen/default-connector';

// The `UpsertAppointmentAttachment` mutation requires an argument of type `UpsertAppointmentAttachmentVariables`:
const upsertAppointmentAttachmentVars: UpsertAppointmentAttachmentVariables = {
  id: ..., 
  appointmentId: ..., 
  fileName: ..., 
  fileType: ..., 
  fileUrl: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertAppointmentAttachmentRef()` function to get a reference to the mutation.
const ref = upsertAppointmentAttachmentRef(upsertAppointmentAttachmentVars);
// Variables can be defined inline as well.
const ref = upsertAppointmentAttachmentRef({ id: ..., appointmentId: ..., fileName: ..., fileType: ..., fileUrl: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertAppointmentAttachmentRef(dataConnect, upsertAppointmentAttachmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointmentAttachment_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointmentAttachment_upsert);
});
```

## UpsertPatientProfile
You can execute the `UpsertPatientProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertPatientProfile(vars: UpsertPatientProfileVariables): MutationPromise<UpsertPatientProfileData, UpsertPatientProfileVariables>;

interface UpsertPatientProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPatientProfileVariables): MutationRef<UpsertPatientProfileData, UpsertPatientProfileVariables>;
}
export const upsertPatientProfileRef: UpsertPatientProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPatientProfile(dc: DataConnect, vars: UpsertPatientProfileVariables): MutationPromise<UpsertPatientProfileData, UpsertPatientProfileVariables>;

interface UpsertPatientProfileRef {
  ...
  (dc: DataConnect, vars: UpsertPatientProfileVariables): MutationRef<UpsertPatientProfileData, UpsertPatientProfileVariables>;
}
export const upsertPatientProfileRef: UpsertPatientProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPatientProfileRef:
```typescript
const name = upsertPatientProfileRef.operationName;
console.log(name);
```

### Variables
The `UpsertPatientProfile` mutation requires an argument of type `UpsertPatientProfileVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertPatientProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPatientProfileData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPatientProfileData {
  patientProfile_upsert: PatientProfile_Key;
}
```
### Using `UpsertPatientProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPatientProfile, UpsertPatientProfileVariables } from '@firebasegen/default-connector';

// The `UpsertPatientProfile` mutation requires an argument of type `UpsertPatientProfileVariables`:
const upsertPatientProfileVars: UpsertPatientProfileVariables = {
  id: ..., 
  userUid: ..., 
  assignedDoctorUid: ..., // optional
  dob: ..., // optional
  gender: ..., // optional
  cccd: ..., // optional
  occupation: ..., // optional
  insuranceNumber: ..., // optional
  address: ..., // optional
  height: ..., // optional
  weight: ..., // optional
  bloodType: ..., // optional
  allergies: ..., // optional
  insuranceQRCode: ..., // optional
};

// Call the `upsertPatientProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPatientProfile(upsertPatientProfileVars);
// Variables can be defined inline as well.
const { data } = await upsertPatientProfile({ id: ..., userUid: ..., assignedDoctorUid: ..., dob: ..., gender: ..., cccd: ..., occupation: ..., insuranceNumber: ..., address: ..., height: ..., weight: ..., bloodType: ..., allergies: ..., insuranceQRCode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPatientProfile(dataConnect, upsertPatientProfileVars);

console.log(data.patientProfile_upsert);

// Or, you can use the `Promise` API.
upsertPatientProfile(upsertPatientProfileVars).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_upsert);
});
```

### Using `UpsertPatientProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPatientProfileRef, UpsertPatientProfileVariables } from '@firebasegen/default-connector';

// The `UpsertPatientProfile` mutation requires an argument of type `UpsertPatientProfileVariables`:
const upsertPatientProfileVars: UpsertPatientProfileVariables = {
  id: ..., 
  userUid: ..., 
  assignedDoctorUid: ..., // optional
  dob: ..., // optional
  gender: ..., // optional
  cccd: ..., // optional
  occupation: ..., // optional
  insuranceNumber: ..., // optional
  address: ..., // optional
  height: ..., // optional
  weight: ..., // optional
  bloodType: ..., // optional
  allergies: ..., // optional
  insuranceQRCode: ..., // optional
};

// Call the `upsertPatientProfileRef()` function to get a reference to the mutation.
const ref = upsertPatientProfileRef(upsertPatientProfileVars);
// Variables can be defined inline as well.
const ref = upsertPatientProfileRef({ id: ..., userUid: ..., assignedDoctorUid: ..., dob: ..., gender: ..., cccd: ..., occupation: ..., insuranceNumber: ..., address: ..., height: ..., weight: ..., bloodType: ..., allergies: ..., insuranceQRCode: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPatientProfileRef(dataConnect, upsertPatientProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.patientProfile_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.patientProfile_upsert);
});
```

## UpsertFamilyLink
You can execute the `UpsertFamilyLink` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertFamilyLink(vars: UpsertFamilyLinkVariables): MutationPromise<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;

interface UpsertFamilyLinkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertFamilyLinkVariables): MutationRef<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;
}
export const upsertFamilyLinkRef: UpsertFamilyLinkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertFamilyLink(dc: DataConnect, vars: UpsertFamilyLinkVariables): MutationPromise<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;

interface UpsertFamilyLinkRef {
  ...
  (dc: DataConnect, vars: UpsertFamilyLinkVariables): MutationRef<UpsertFamilyLinkData, UpsertFamilyLinkVariables>;
}
export const upsertFamilyLinkRef: UpsertFamilyLinkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertFamilyLinkRef:
```typescript
const name = upsertFamilyLinkRef.operationName;
console.log(name);
```

### Variables
The `UpsertFamilyLink` mutation requires an argument of type `UpsertFamilyLinkVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertFamilyLinkVariables {
  id: UUIDString;
  accountOwnerUid: string;
  relativeName: string;
  relationship: string;
}
```
### Return Type
Recall that executing the `UpsertFamilyLink` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertFamilyLinkData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertFamilyLinkData {
  familyLink_upsert: FamilyLink_Key;
}
```
### Using `UpsertFamilyLink`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertFamilyLink, UpsertFamilyLinkVariables } from '@firebasegen/default-connector';

// The `UpsertFamilyLink` mutation requires an argument of type `UpsertFamilyLinkVariables`:
const upsertFamilyLinkVars: UpsertFamilyLinkVariables = {
  id: ..., 
  accountOwnerUid: ..., 
  relativeName: ..., 
  relationship: ..., 
};

// Call the `upsertFamilyLink()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertFamilyLink(upsertFamilyLinkVars);
// Variables can be defined inline as well.
const { data } = await upsertFamilyLink({ id: ..., accountOwnerUid: ..., relativeName: ..., relationship: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertFamilyLink(dataConnect, upsertFamilyLinkVars);

console.log(data.familyLink_upsert);

// Or, you can use the `Promise` API.
upsertFamilyLink(upsertFamilyLinkVars).then((response) => {
  const data = response.data;
  console.log(data.familyLink_upsert);
});
```

### Using `UpsertFamilyLink`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertFamilyLinkRef, UpsertFamilyLinkVariables } from '@firebasegen/default-connector';

// The `UpsertFamilyLink` mutation requires an argument of type `UpsertFamilyLinkVariables`:
const upsertFamilyLinkVars: UpsertFamilyLinkVariables = {
  id: ..., 
  accountOwnerUid: ..., 
  relativeName: ..., 
  relationship: ..., 
};

// Call the `upsertFamilyLinkRef()` function to get a reference to the mutation.
const ref = upsertFamilyLinkRef(upsertFamilyLinkVars);
// Variables can be defined inline as well.
const ref = upsertFamilyLinkRef({ id: ..., accountOwnerUid: ..., relativeName: ..., relationship: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertFamilyLinkRef(dataConnect, upsertFamilyLinkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.familyLink_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.familyLink_upsert);
});
```

## UpsertAppointment
You can execute the `UpsertAppointment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertAppointment(vars: UpsertAppointmentVariables): MutationPromise<UpsertAppointmentData, UpsertAppointmentVariables>;

interface UpsertAppointmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAppointmentVariables): MutationRef<UpsertAppointmentData, UpsertAppointmentVariables>;
}
export const upsertAppointmentRef: UpsertAppointmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertAppointment(dc: DataConnect, vars: UpsertAppointmentVariables): MutationPromise<UpsertAppointmentData, UpsertAppointmentVariables>;

interface UpsertAppointmentRef {
  ...
  (dc: DataConnect, vars: UpsertAppointmentVariables): MutationRef<UpsertAppointmentData, UpsertAppointmentVariables>;
}
export const upsertAppointmentRef: UpsertAppointmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertAppointmentRef:
```typescript
const name = upsertAppointmentRef.operationName;
console.log(name);
```

### Variables
The `UpsertAppointment` mutation requires an argument of type `UpsertAppointmentVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertAppointment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertAppointmentData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertAppointmentData {
  appointment_upsert: Appointment_Key;
}
```
### Using `UpsertAppointment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertAppointment, UpsertAppointmentVariables } from '@firebasegen/default-connector';

// The `UpsertAppointment` mutation requires an argument of type `UpsertAppointmentVariables`:
const upsertAppointmentVars: UpsertAppointmentVariables = {
  id: ..., 
  patientUid: ..., 
  doctorUid: ..., // optional
  doctorName: ..., 
  scheduledAt: ..., 
  endAt: ..., // optional
  status: ..., 
  meetingLink: ..., // optional
  symptoms: ..., // optional
  specialty: ..., // optional
  appointmentType: ..., // optional
  queueLabel: ..., // optional
  currentDoctorNote: ..., // optional
  countdownLabel: ..., // optional
};

// Call the `upsertAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertAppointment(upsertAppointmentVars);
// Variables can be defined inline as well.
const { data } = await upsertAppointment({ id: ..., patientUid: ..., doctorUid: ..., doctorName: ..., scheduledAt: ..., endAt: ..., status: ..., meetingLink: ..., symptoms: ..., specialty: ..., appointmentType: ..., queueLabel: ..., currentDoctorNote: ..., countdownLabel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertAppointment(dataConnect, upsertAppointmentVars);

console.log(data.appointment_upsert);

// Or, you can use the `Promise` API.
upsertAppointment(upsertAppointmentVars).then((response) => {
  const data = response.data;
  console.log(data.appointment_upsert);
});
```

### Using `UpsertAppointment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertAppointmentRef, UpsertAppointmentVariables } from '@firebasegen/default-connector';

// The `UpsertAppointment` mutation requires an argument of type `UpsertAppointmentVariables`:
const upsertAppointmentVars: UpsertAppointmentVariables = {
  id: ..., 
  patientUid: ..., 
  doctorUid: ..., // optional
  doctorName: ..., 
  scheduledAt: ..., 
  endAt: ..., // optional
  status: ..., 
  meetingLink: ..., // optional
  symptoms: ..., // optional
  specialty: ..., // optional
  appointmentType: ..., // optional
  queueLabel: ..., // optional
  currentDoctorNote: ..., // optional
  countdownLabel: ..., // optional
};

// Call the `upsertAppointmentRef()` function to get a reference to the mutation.
const ref = upsertAppointmentRef(upsertAppointmentVars);
// Variables can be defined inline as well.
const ref = upsertAppointmentRef({ id: ..., patientUid: ..., doctorUid: ..., doctorName: ..., scheduledAt: ..., endAt: ..., status: ..., meetingLink: ..., symptoms: ..., specialty: ..., appointmentType: ..., queueLabel: ..., currentDoctorNote: ..., countdownLabel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertAppointmentRef(dataConnect, upsertAppointmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.appointment_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.appointment_upsert);
});
```

## UpsertAiDiagnosis
You can execute the `UpsertAiDiagnosis` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertAiDiagnosis(vars: UpsertAiDiagnosisVariables): MutationPromise<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;

interface UpsertAiDiagnosisRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertAiDiagnosisVariables): MutationRef<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;
}
export const upsertAiDiagnosisRef: UpsertAiDiagnosisRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertAiDiagnosis(dc: DataConnect, vars: UpsertAiDiagnosisVariables): MutationPromise<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;

interface UpsertAiDiagnosisRef {
  ...
  (dc: DataConnect, vars: UpsertAiDiagnosisVariables): MutationRef<UpsertAiDiagnosisData, UpsertAiDiagnosisVariables>;
}
export const upsertAiDiagnosisRef: UpsertAiDiagnosisRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertAiDiagnosisRef:
```typescript
const name = upsertAiDiagnosisRef.operationName;
console.log(name);
```

### Variables
The `UpsertAiDiagnosis` mutation requires an argument of type `UpsertAiDiagnosisVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertAiDiagnosis` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertAiDiagnosisData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertAiDiagnosisData {
  aiDiagnosis_upsert: AiDiagnosis_Key;
}
```
### Using `UpsertAiDiagnosis`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertAiDiagnosis, UpsertAiDiagnosisVariables } from '@firebasegen/default-connector';

// The `UpsertAiDiagnosis` mutation requires an argument of type `UpsertAiDiagnosisVariables`:
const upsertAiDiagnosisVars: UpsertAiDiagnosisVariables = {
  id: ..., 
  patientUid: ..., 
  doctorUid: ..., // optional
  fundusImageUrl: ..., 
  riskLevel: ..., 
  confidenceScore: ..., 
  aiAnalysis: ..., // optional
  doctorAdvice: ..., // optional
  stageLabel: ..., // optional
  aiScore: ..., // optional
  examDate: ..., // optional
  deviceName: ..., // optional
  technicianName: ..., // optional
  archiveImagePath: ..., // optional
  doctorApproved: ..., // optional
  reportSummary: ..., // optional
};

// Call the `upsertAiDiagnosis()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertAiDiagnosis(upsertAiDiagnosisVars);
// Variables can be defined inline as well.
const { data } = await upsertAiDiagnosis({ id: ..., patientUid: ..., doctorUid: ..., fundusImageUrl: ..., riskLevel: ..., confidenceScore: ..., aiAnalysis: ..., doctorAdvice: ..., stageLabel: ..., aiScore: ..., examDate: ..., deviceName: ..., technicianName: ..., archiveImagePath: ..., doctorApproved: ..., reportSummary: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertAiDiagnosis(dataConnect, upsertAiDiagnosisVars);

console.log(data.aiDiagnosis_upsert);

// Or, you can use the `Promise` API.
upsertAiDiagnosis(upsertAiDiagnosisVars).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_upsert);
});
```

### Using `UpsertAiDiagnosis`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertAiDiagnosisRef, UpsertAiDiagnosisVariables } from '@firebasegen/default-connector';

// The `UpsertAiDiagnosis` mutation requires an argument of type `UpsertAiDiagnosisVariables`:
const upsertAiDiagnosisVars: UpsertAiDiagnosisVariables = {
  id: ..., 
  patientUid: ..., 
  doctorUid: ..., // optional
  fundusImageUrl: ..., 
  riskLevel: ..., 
  confidenceScore: ..., 
  aiAnalysis: ..., // optional
  doctorAdvice: ..., // optional
  stageLabel: ..., // optional
  aiScore: ..., // optional
  examDate: ..., // optional
  deviceName: ..., // optional
  technicianName: ..., // optional
  archiveImagePath: ..., // optional
  doctorApproved: ..., // optional
  reportSummary: ..., // optional
};

// Call the `upsertAiDiagnosisRef()` function to get a reference to the mutation.
const ref = upsertAiDiagnosisRef(upsertAiDiagnosisVars);
// Variables can be defined inline as well.
const ref = upsertAiDiagnosisRef({ id: ..., patientUid: ..., doctorUid: ..., fundusImageUrl: ..., riskLevel: ..., confidenceScore: ..., aiAnalysis: ..., doctorAdvice: ..., stageLabel: ..., aiScore: ..., examDate: ..., deviceName: ..., technicianName: ..., archiveImagePath: ..., doctorApproved: ..., reportSummary: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertAiDiagnosisRef(dataConnect, upsertAiDiagnosisVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.aiDiagnosis_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.aiDiagnosis_upsert);
});
```

## UpsertConsultationRoom
You can execute the `UpsertConsultationRoom` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertConsultationRoom(vars: UpsertConsultationRoomVariables): MutationPromise<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;

interface UpsertConsultationRoomRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertConsultationRoomVariables): MutationRef<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;
}
export const upsertConsultationRoomRef: UpsertConsultationRoomRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertConsultationRoom(dc: DataConnect, vars: UpsertConsultationRoomVariables): MutationPromise<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;

interface UpsertConsultationRoomRef {
  ...
  (dc: DataConnect, vars: UpsertConsultationRoomVariables): MutationRef<UpsertConsultationRoomData, UpsertConsultationRoomVariables>;
}
export const upsertConsultationRoomRef: UpsertConsultationRoomRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertConsultationRoomRef:
```typescript
const name = upsertConsultationRoomRef.operationName;
console.log(name);
```

### Variables
The `UpsertConsultationRoom` mutation requires an argument of type `UpsertConsultationRoomVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertConsultationRoom` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertConsultationRoomData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertConsultationRoomData {
  consultationRoom_upsert: ConsultationRoom_Key;
}
```
### Using `UpsertConsultationRoom`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertConsultationRoom, UpsertConsultationRoomVariables } from '@firebasegen/default-connector';

// The `UpsertConsultationRoom` mutation requires an argument of type `UpsertConsultationRoomVariables`:
const upsertConsultationRoomVars: UpsertConsultationRoomVariables = {
  id: ..., 
  displayDate: ..., 
  status: ..., 
  badge: ..., 
  timeLabel: ..., 
  title: ..., 
  description: ..., 
  membersLabel: ..., 
  actionLabel: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertConsultationRoom()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertConsultationRoom(upsertConsultationRoomVars);
// Variables can be defined inline as well.
const { data } = await upsertConsultationRoom({ id: ..., displayDate: ..., status: ..., badge: ..., timeLabel: ..., title: ..., description: ..., membersLabel: ..., actionLabel: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertConsultationRoom(dataConnect, upsertConsultationRoomVars);

console.log(data.consultationRoom_upsert);

// Or, you can use the `Promise` API.
upsertConsultationRoom(upsertConsultationRoomVars).then((response) => {
  const data = response.data;
  console.log(data.consultationRoom_upsert);
});
```

### Using `UpsertConsultationRoom`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertConsultationRoomRef, UpsertConsultationRoomVariables } from '@firebasegen/default-connector';

// The `UpsertConsultationRoom` mutation requires an argument of type `UpsertConsultationRoomVariables`:
const upsertConsultationRoomVars: UpsertConsultationRoomVariables = {
  id: ..., 
  displayDate: ..., 
  status: ..., 
  badge: ..., 
  timeLabel: ..., 
  title: ..., 
  description: ..., 
  membersLabel: ..., 
  actionLabel: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertConsultationRoomRef()` function to get a reference to the mutation.
const ref = upsertConsultationRoomRef(upsertConsultationRoomVars);
// Variables can be defined inline as well.
const ref = upsertConsultationRoomRef({ id: ..., displayDate: ..., status: ..., badge: ..., timeLabel: ..., title: ..., description: ..., membersLabel: ..., actionLabel: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertConsultationRoomRef(dataConnect, upsertConsultationRoomVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.consultationRoom_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.consultationRoom_upsert);
});
```

## UpsertLandingHeroContent
You can execute the `UpsertLandingHeroContent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertLandingHeroContent(vars: UpsertLandingHeroContentVariables): MutationPromise<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;

interface UpsertLandingHeroContentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLandingHeroContentVariables): MutationRef<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;
}
export const upsertLandingHeroContentRef: UpsertLandingHeroContentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertLandingHeroContent(dc: DataConnect, vars: UpsertLandingHeroContentVariables): MutationPromise<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;

interface UpsertLandingHeroContentRef {
  ...
  (dc: DataConnect, vars: UpsertLandingHeroContentVariables): MutationRef<UpsertLandingHeroContentData, UpsertLandingHeroContentVariables>;
}
export const upsertLandingHeroContentRef: UpsertLandingHeroContentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertLandingHeroContentRef:
```typescript
const name = upsertLandingHeroContentRef.operationName;
console.log(name);
```

### Variables
The `UpsertLandingHeroContent` mutation requires an argument of type `UpsertLandingHeroContentVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertLandingHeroContent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertLandingHeroContentData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertLandingHeroContentData {
  landingHeroContent_upsert: LandingHeroContent_Key;
}
```
### Using `UpsertLandingHeroContent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertLandingHeroContent, UpsertLandingHeroContentVariables } from '@firebasegen/default-connector';

// The `UpsertLandingHeroContent` mutation requires an argument of type `UpsertLandingHeroContentVariables`:
const upsertLandingHeroContentVars: UpsertLandingHeroContentVariables = {
  id: ..., 
  badgeText: ..., 
  titlePrefix: ..., 
  titleAccent: ..., 
  titleSuffix: ..., 
  body: ..., 
  primaryButtonLabel: ..., 
  primaryButtonTarget: ..., 
  secondaryButtonLabel: ..., 
  secondaryButtonTarget: ..., 
  patientCodeLabel: ..., 
  accuracyLabel: ..., 
  imagePath: ..., 
};

// Call the `upsertLandingHeroContent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertLandingHeroContent(upsertLandingHeroContentVars);
// Variables can be defined inline as well.
const { data } = await upsertLandingHeroContent({ id: ..., badgeText: ..., titlePrefix: ..., titleAccent: ..., titleSuffix: ..., body: ..., primaryButtonLabel: ..., primaryButtonTarget: ..., secondaryButtonLabel: ..., secondaryButtonTarget: ..., patientCodeLabel: ..., accuracyLabel: ..., imagePath: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertLandingHeroContent(dataConnect, upsertLandingHeroContentVars);

console.log(data.landingHeroContent_upsert);

// Or, you can use the `Promise` API.
upsertLandingHeroContent(upsertLandingHeroContentVars).then((response) => {
  const data = response.data;
  console.log(data.landingHeroContent_upsert);
});
```

### Using `UpsertLandingHeroContent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertLandingHeroContentRef, UpsertLandingHeroContentVariables } from '@firebasegen/default-connector';

// The `UpsertLandingHeroContent` mutation requires an argument of type `UpsertLandingHeroContentVariables`:
const upsertLandingHeroContentVars: UpsertLandingHeroContentVariables = {
  id: ..., 
  badgeText: ..., 
  titlePrefix: ..., 
  titleAccent: ..., 
  titleSuffix: ..., 
  body: ..., 
  primaryButtonLabel: ..., 
  primaryButtonTarget: ..., 
  secondaryButtonLabel: ..., 
  secondaryButtonTarget: ..., 
  patientCodeLabel: ..., 
  accuracyLabel: ..., 
  imagePath: ..., 
};

// Call the `upsertLandingHeroContentRef()` function to get a reference to the mutation.
const ref = upsertLandingHeroContentRef(upsertLandingHeroContentVars);
// Variables can be defined inline as well.
const ref = upsertLandingHeroContentRef({ id: ..., badgeText: ..., titlePrefix: ..., titleAccent: ..., titleSuffix: ..., body: ..., primaryButtonLabel: ..., primaryButtonTarget: ..., secondaryButtonLabel: ..., secondaryButtonTarget: ..., patientCodeLabel: ..., accuracyLabel: ..., imagePath: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertLandingHeroContentRef(dataConnect, upsertLandingHeroContentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.landingHeroContent_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.landingHeroContent_upsert);
});
```

## UpsertLandingFeature
You can execute the `UpsertLandingFeature` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertLandingFeature(vars: UpsertLandingFeatureVariables): MutationPromise<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;

interface UpsertLandingFeatureRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLandingFeatureVariables): MutationRef<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;
}
export const upsertLandingFeatureRef: UpsertLandingFeatureRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertLandingFeature(dc: DataConnect, vars: UpsertLandingFeatureVariables): MutationPromise<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;

interface UpsertLandingFeatureRef {
  ...
  (dc: DataConnect, vars: UpsertLandingFeatureVariables): MutationRef<UpsertLandingFeatureData, UpsertLandingFeatureVariables>;
}
export const upsertLandingFeatureRef: UpsertLandingFeatureRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertLandingFeatureRef:
```typescript
const name = upsertLandingFeatureRef.operationName;
console.log(name);
```

### Variables
The `UpsertLandingFeature` mutation requires an argument of type `UpsertLandingFeatureVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertLandingFeatureVariables {
  id: string;
  section: string;
  iconKey: string;
  title: string;
  description: string;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertLandingFeature` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertLandingFeatureData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertLandingFeatureData {
  landingFeature_upsert: LandingFeature_Key;
}
```
### Using `UpsertLandingFeature`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertLandingFeature, UpsertLandingFeatureVariables } from '@firebasegen/default-connector';

// The `UpsertLandingFeature` mutation requires an argument of type `UpsertLandingFeatureVariables`:
const upsertLandingFeatureVars: UpsertLandingFeatureVariables = {
  id: ..., 
  section: ..., 
  iconKey: ..., 
  title: ..., 
  description: ..., 
  displayOrder: ..., 
};

// Call the `upsertLandingFeature()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertLandingFeature(upsertLandingFeatureVars);
// Variables can be defined inline as well.
const { data } = await upsertLandingFeature({ id: ..., section: ..., iconKey: ..., title: ..., description: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertLandingFeature(dataConnect, upsertLandingFeatureVars);

console.log(data.landingFeature_upsert);

// Or, you can use the `Promise` API.
upsertLandingFeature(upsertLandingFeatureVars).then((response) => {
  const data = response.data;
  console.log(data.landingFeature_upsert);
});
```

### Using `UpsertLandingFeature`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertLandingFeatureRef, UpsertLandingFeatureVariables } from '@firebasegen/default-connector';

// The `UpsertLandingFeature` mutation requires an argument of type `UpsertLandingFeatureVariables`:
const upsertLandingFeatureVars: UpsertLandingFeatureVariables = {
  id: ..., 
  section: ..., 
  iconKey: ..., 
  title: ..., 
  description: ..., 
  displayOrder: ..., 
};

// Call the `upsertLandingFeatureRef()` function to get a reference to the mutation.
const ref = upsertLandingFeatureRef(upsertLandingFeatureVars);
// Variables can be defined inline as well.
const ref = upsertLandingFeatureRef({ id: ..., section: ..., iconKey: ..., title: ..., description: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertLandingFeatureRef(dataConnect, upsertLandingFeatureVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.landingFeature_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.landingFeature_upsert);
});
```

## UpsertLandingArticle
You can execute the `UpsertLandingArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertLandingArticle(vars: UpsertLandingArticleVariables): MutationPromise<UpsertLandingArticleData, UpsertLandingArticleVariables>;

interface UpsertLandingArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertLandingArticleVariables): MutationRef<UpsertLandingArticleData, UpsertLandingArticleVariables>;
}
export const upsertLandingArticleRef: UpsertLandingArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertLandingArticle(dc: DataConnect, vars: UpsertLandingArticleVariables): MutationPromise<UpsertLandingArticleData, UpsertLandingArticleVariables>;

interface UpsertLandingArticleRef {
  ...
  (dc: DataConnect, vars: UpsertLandingArticleVariables): MutationRef<UpsertLandingArticleData, UpsertLandingArticleVariables>;
}
export const upsertLandingArticleRef: UpsertLandingArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertLandingArticleRef:
```typescript
const name = upsertLandingArticleRef.operationName;
console.log(name);
```

### Variables
The `UpsertLandingArticle` mutation requires an argument of type `UpsertLandingArticleVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertLandingArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertLandingArticleData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertLandingArticleData {
  landingArticle_upsert: LandingArticle_Key;
}
```
### Using `UpsertLandingArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertLandingArticle, UpsertLandingArticleVariables } from '@firebasegen/default-connector';

// The `UpsertLandingArticle` mutation requires an argument of type `UpsertLandingArticleVariables`:
const upsertLandingArticleVars: UpsertLandingArticleVariables = {
  id: ..., 
  title: ..., 
  excerpt: ..., 
  content: ..., 
  link: ..., // optional
  imagePath: ..., 
  iconKey: ..., 
  displayOrder: ..., 
};

// Call the `upsertLandingArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertLandingArticle(upsertLandingArticleVars);
// Variables can be defined inline as well.
const { data } = await upsertLandingArticle({ id: ..., title: ..., excerpt: ..., content: ..., link: ..., imagePath: ..., iconKey: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertLandingArticle(dataConnect, upsertLandingArticleVars);

console.log(data.landingArticle_upsert);

// Or, you can use the `Promise` API.
upsertLandingArticle(upsertLandingArticleVars).then((response) => {
  const data = response.data;
  console.log(data.landingArticle_upsert);
});
```

### Using `UpsertLandingArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertLandingArticleRef, UpsertLandingArticleVariables } from '@firebasegen/default-connector';

// The `UpsertLandingArticle` mutation requires an argument of type `UpsertLandingArticleVariables`:
const upsertLandingArticleVars: UpsertLandingArticleVariables = {
  id: ..., 
  title: ..., 
  excerpt: ..., 
  content: ..., 
  link: ..., // optional
  imagePath: ..., 
  iconKey: ..., 
  displayOrder: ..., 
};

// Call the `upsertLandingArticleRef()` function to get a reference to the mutation.
const ref = upsertLandingArticleRef(upsertLandingArticleVars);
// Variables can be defined inline as well.
const ref = upsertLandingArticleRef({ id: ..., title: ..., excerpt: ..., content: ..., link: ..., imagePath: ..., iconKey: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertLandingArticleRef(dataConnect, upsertLandingArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.landingArticle_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.landingArticle_upsert);
});
```

## UpsertSupportContactInfo
You can execute the `UpsertSupportContactInfo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertSupportContactInfo(vars: UpsertSupportContactInfoVariables): MutationPromise<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;

interface UpsertSupportContactInfoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSupportContactInfoVariables): MutationRef<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;
}
export const upsertSupportContactInfoRef: UpsertSupportContactInfoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertSupportContactInfo(dc: DataConnect, vars: UpsertSupportContactInfoVariables): MutationPromise<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;

interface UpsertSupportContactInfoRef {
  ...
  (dc: DataConnect, vars: UpsertSupportContactInfoVariables): MutationRef<UpsertSupportContactInfoData, UpsertSupportContactInfoVariables>;
}
export const upsertSupportContactInfoRef: UpsertSupportContactInfoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertSupportContactInfoRef:
```typescript
const name = upsertSupportContactInfoRef.operationName;
console.log(name);
```

### Variables
The `UpsertSupportContactInfo` mutation requires an argument of type `UpsertSupportContactInfoVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertSupportContactInfo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertSupportContactInfoData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertSupportContactInfoData {
  supportContactInfo_upsert: SupportContactInfo_Key;
}
```
### Using `UpsertSupportContactInfo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertSupportContactInfo, UpsertSupportContactInfoVariables } from '@firebasegen/default-connector';

// The `UpsertSupportContactInfo` mutation requires an argument of type `UpsertSupportContactInfoVariables`:
const upsertSupportContactInfoVars: UpsertSupportContactInfoVariables = {
  id: ..., 
  centerBadge: ..., 
  headlinePrefix: ..., 
  headlineAccent: ..., 
  headlineBrand: ..., 
  description: ..., 
  email: ..., 
  phone: ..., 
  location: ..., 
};

// Call the `upsertSupportContactInfo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertSupportContactInfo(upsertSupportContactInfoVars);
// Variables can be defined inline as well.
const { data } = await upsertSupportContactInfo({ id: ..., centerBadge: ..., headlinePrefix: ..., headlineAccent: ..., headlineBrand: ..., description: ..., email: ..., phone: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertSupportContactInfo(dataConnect, upsertSupportContactInfoVars);

console.log(data.supportContactInfo_upsert);

// Or, you can use the `Promise` API.
upsertSupportContactInfo(upsertSupportContactInfoVars).then((response) => {
  const data = response.data;
  console.log(data.supportContactInfo_upsert);
});
```

### Using `UpsertSupportContactInfo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertSupportContactInfoRef, UpsertSupportContactInfoVariables } from '@firebasegen/default-connector';

// The `UpsertSupportContactInfo` mutation requires an argument of type `UpsertSupportContactInfoVariables`:
const upsertSupportContactInfoVars: UpsertSupportContactInfoVariables = {
  id: ..., 
  centerBadge: ..., 
  headlinePrefix: ..., 
  headlineAccent: ..., 
  headlineBrand: ..., 
  description: ..., 
  email: ..., 
  phone: ..., 
  location: ..., 
};

// Call the `upsertSupportContactInfoRef()` function to get a reference to the mutation.
const ref = upsertSupportContactInfoRef(upsertSupportContactInfoVars);
// Variables can be defined inline as well.
const ref = upsertSupportContactInfoRef({ id: ..., centerBadge: ..., headlinePrefix: ..., headlineAccent: ..., headlineBrand: ..., description: ..., email: ..., phone: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertSupportContactInfoRef(dataConnect, upsertSupportContactInfoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supportContactInfo_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supportContactInfo_upsert);
});
```

## UpsertDoctorProfileMetric
You can execute the `UpsertDoctorProfileMetric` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDoctorProfileMetric(vars: UpsertDoctorProfileMetricVariables): MutationPromise<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;

interface UpsertDoctorProfileMetricRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDoctorProfileMetricVariables): MutationRef<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;
}
export const upsertDoctorProfileMetricRef: UpsertDoctorProfileMetricRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDoctorProfileMetric(dc: DataConnect, vars: UpsertDoctorProfileMetricVariables): MutationPromise<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;

interface UpsertDoctorProfileMetricRef {
  ...
  (dc: DataConnect, vars: UpsertDoctorProfileMetricVariables): MutationRef<UpsertDoctorProfileMetricData, UpsertDoctorProfileMetricVariables>;
}
export const upsertDoctorProfileMetricRef: UpsertDoctorProfileMetricRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDoctorProfileMetricRef:
```typescript
const name = upsertDoctorProfileMetricRef.operationName;
console.log(name);
```

### Variables
The `UpsertDoctorProfileMetric` mutation requires an argument of type `UpsertDoctorProfileMetricVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertDoctorProfileMetric` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDoctorProfileMetricData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDoctorProfileMetricData {
  doctorProfileMetric_upsert: DoctorProfileMetric_Key;
}
```
### Using `UpsertDoctorProfileMetric`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDoctorProfileMetric, UpsertDoctorProfileMetricVariables } from '@firebasegen/default-connector';

// The `UpsertDoctorProfileMetric` mutation requires an argument of type `UpsertDoctorProfileMetricVariables`:
const upsertDoctorProfileMetricVars: UpsertDoctorProfileMetricVariables = {
  id: ..., 
  doctorProfileId: ..., 
  section: ..., 
  label: ..., 
  valueNumber: ..., // optional
  valueText: ..., // optional
  helper: ..., // optional
  countLabel: ..., // optional
  accent: ..., // optional
  isActive: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertDoctorProfileMetric()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDoctorProfileMetric(upsertDoctorProfileMetricVars);
// Variables can be defined inline as well.
const { data } = await upsertDoctorProfileMetric({ id: ..., doctorProfileId: ..., section: ..., label: ..., valueNumber: ..., valueText: ..., helper: ..., countLabel: ..., accent: ..., isActive: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDoctorProfileMetric(dataConnect, upsertDoctorProfileMetricVars);

console.log(data.doctorProfileMetric_upsert);

// Or, you can use the `Promise` API.
upsertDoctorProfileMetric(upsertDoctorProfileMetricVars).then((response) => {
  const data = response.data;
  console.log(data.doctorProfileMetric_upsert);
});
```

### Using `UpsertDoctorProfileMetric`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDoctorProfileMetricRef, UpsertDoctorProfileMetricVariables } from '@firebasegen/default-connector';

// The `UpsertDoctorProfileMetric` mutation requires an argument of type `UpsertDoctorProfileMetricVariables`:
const upsertDoctorProfileMetricVars: UpsertDoctorProfileMetricVariables = {
  id: ..., 
  doctorProfileId: ..., 
  section: ..., 
  label: ..., 
  valueNumber: ..., // optional
  valueText: ..., // optional
  helper: ..., // optional
  countLabel: ..., // optional
  accent: ..., // optional
  isActive: ..., // optional
  displayOrder: ..., 
};

// Call the `upsertDoctorProfileMetricRef()` function to get a reference to the mutation.
const ref = upsertDoctorProfileMetricRef(upsertDoctorProfileMetricVars);
// Variables can be defined inline as well.
const ref = upsertDoctorProfileMetricRef({ id: ..., doctorProfileId: ..., section: ..., label: ..., valueNumber: ..., valueText: ..., helper: ..., countLabel: ..., accent: ..., isActive: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDoctorProfileMetricRef(dataConnect, upsertDoctorProfileMetricVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.doctorProfileMetric_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.doctorProfileMetric_upsert);
});
```

## UpsertDashboardSpotlightCase
You can execute the `UpsertDashboardSpotlightCase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDashboardSpotlightCase(vars: UpsertDashboardSpotlightCaseVariables): MutationPromise<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;

interface UpsertDashboardSpotlightCaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDashboardSpotlightCaseVariables): MutationRef<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;
}
export const upsertDashboardSpotlightCaseRef: UpsertDashboardSpotlightCaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDashboardSpotlightCase(dc: DataConnect, vars: UpsertDashboardSpotlightCaseVariables): MutationPromise<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;

interface UpsertDashboardSpotlightCaseRef {
  ...
  (dc: DataConnect, vars: UpsertDashboardSpotlightCaseVariables): MutationRef<UpsertDashboardSpotlightCaseData, UpsertDashboardSpotlightCaseVariables>;
}
export const upsertDashboardSpotlightCaseRef: UpsertDashboardSpotlightCaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDashboardSpotlightCaseRef:
```typescript
const name = upsertDashboardSpotlightCaseRef.operationName;
console.log(name);
```

### Variables
The `UpsertDashboardSpotlightCase` mutation requires an argument of type `UpsertDashboardSpotlightCaseVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertDashboardSpotlightCase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDashboardSpotlightCaseData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDashboardSpotlightCaseData {
  dashboardSpotlightCase_upsert: DashboardSpotlightCase_Key;
}
```
### Using `UpsertDashboardSpotlightCase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDashboardSpotlightCase, UpsertDashboardSpotlightCaseVariables } from '@firebasegen/default-connector';

// The `UpsertDashboardSpotlightCase` mutation requires an argument of type `UpsertDashboardSpotlightCaseVariables`:
const upsertDashboardSpotlightCaseVars: UpsertDashboardSpotlightCaseVariables = {
  id: ..., 
  patientName: ..., 
  patientCode: ..., 
  dob: ..., 
  age: ..., 
  gender: ..., 
  symptoms: ..., 
  externalRecordNote: ..., 
  primaryServiceTitle: ..., 
  primaryServiceSubtitle: ..., 
  secondaryServiceTitle: ..., 
  secondaryServiceSubtitle: ..., 
  avatarUrl: ..., 
};

// Call the `upsertDashboardSpotlightCase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDashboardSpotlightCase(upsertDashboardSpotlightCaseVars);
// Variables can be defined inline as well.
const { data } = await upsertDashboardSpotlightCase({ id: ..., patientName: ..., patientCode: ..., dob: ..., age: ..., gender: ..., symptoms: ..., externalRecordNote: ..., primaryServiceTitle: ..., primaryServiceSubtitle: ..., secondaryServiceTitle: ..., secondaryServiceSubtitle: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDashboardSpotlightCase(dataConnect, upsertDashboardSpotlightCaseVars);

console.log(data.dashboardSpotlightCase_upsert);

// Or, you can use the `Promise` API.
upsertDashboardSpotlightCase(upsertDashboardSpotlightCaseVars).then((response) => {
  const data = response.data;
  console.log(data.dashboardSpotlightCase_upsert);
});
```

### Using `UpsertDashboardSpotlightCase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDashboardSpotlightCaseRef, UpsertDashboardSpotlightCaseVariables } from '@firebasegen/default-connector';

// The `UpsertDashboardSpotlightCase` mutation requires an argument of type `UpsertDashboardSpotlightCaseVariables`:
const upsertDashboardSpotlightCaseVars: UpsertDashboardSpotlightCaseVariables = {
  id: ..., 
  patientName: ..., 
  patientCode: ..., 
  dob: ..., 
  age: ..., 
  gender: ..., 
  symptoms: ..., 
  externalRecordNote: ..., 
  primaryServiceTitle: ..., 
  primaryServiceSubtitle: ..., 
  secondaryServiceTitle: ..., 
  secondaryServiceSubtitle: ..., 
  avatarUrl: ..., 
};

// Call the `upsertDashboardSpotlightCaseRef()` function to get a reference to the mutation.
const ref = upsertDashboardSpotlightCaseRef(upsertDashboardSpotlightCaseVars);
// Variables can be defined inline as well.
const ref = upsertDashboardSpotlightCaseRef({ id: ..., patientName: ..., patientCode: ..., dob: ..., age: ..., gender: ..., symptoms: ..., externalRecordNote: ..., primaryServiceTitle: ..., primaryServiceSubtitle: ..., secondaryServiceTitle: ..., secondaryServiceSubtitle: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDashboardSpotlightCaseRef(dataConnect, upsertDashboardSpotlightCaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.dashboardSpotlightCase_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.dashboardSpotlightCase_upsert);
});
```

## UpsertServiceRecord
You can execute the `UpsertServiceRecord` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertServiceRecord(vars: UpsertServiceRecordVariables): MutationPromise<UpsertServiceRecordData, UpsertServiceRecordVariables>;

interface UpsertServiceRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertServiceRecordVariables): MutationRef<UpsertServiceRecordData, UpsertServiceRecordVariables>;
}
export const upsertServiceRecordRef: UpsertServiceRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertServiceRecord(dc: DataConnect, vars: UpsertServiceRecordVariables): MutationPromise<UpsertServiceRecordData, UpsertServiceRecordVariables>;

interface UpsertServiceRecordRef {
  ...
  (dc: DataConnect, vars: UpsertServiceRecordVariables): MutationRef<UpsertServiceRecordData, UpsertServiceRecordVariables>;
}
export const upsertServiceRecordRef: UpsertServiceRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertServiceRecordRef:
```typescript
const name = upsertServiceRecordRef.operationName;
console.log(name);
```

### Variables
The `UpsertServiceRecord` mutation requires an argument of type `UpsertServiceRecordVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertServiceRecord` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertServiceRecordData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertServiceRecordData {
  serviceRecord_upsert: ServiceRecord_Key;
}
```
### Using `UpsertServiceRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertServiceRecord, UpsertServiceRecordVariables } from '@firebasegen/default-connector';

// The `UpsertServiceRecord` mutation requires an argument of type `UpsertServiceRecordVariables`:
const upsertServiceRecordVars: UpsertServiceRecordVariables = {
  id: ..., 
  spotlightCaseId: ..., // optional
  patientName: ..., 
  patientCode: ..., 
  serviceName: ..., 
  specialty: ..., 
  doctorName: ..., 
  dateTimeLabel: ..., 
  diagnosis: ..., 
  quantity: ..., 
  unitPrice: ..., 
  insuranceCoveragePercent: ..., 
  displayOrder: ..., 
};

// Call the `upsertServiceRecord()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertServiceRecord(upsertServiceRecordVars);
// Variables can be defined inline as well.
const { data } = await upsertServiceRecord({ id: ..., spotlightCaseId: ..., patientName: ..., patientCode: ..., serviceName: ..., specialty: ..., doctorName: ..., dateTimeLabel: ..., diagnosis: ..., quantity: ..., unitPrice: ..., insuranceCoveragePercent: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertServiceRecord(dataConnect, upsertServiceRecordVars);

console.log(data.serviceRecord_upsert);

// Or, you can use the `Promise` API.
upsertServiceRecord(upsertServiceRecordVars).then((response) => {
  const data = response.data;
  console.log(data.serviceRecord_upsert);
});
```

### Using `UpsertServiceRecord`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertServiceRecordRef, UpsertServiceRecordVariables } from '@firebasegen/default-connector';

// The `UpsertServiceRecord` mutation requires an argument of type `UpsertServiceRecordVariables`:
const upsertServiceRecordVars: UpsertServiceRecordVariables = {
  id: ..., 
  spotlightCaseId: ..., // optional
  patientName: ..., 
  patientCode: ..., 
  serviceName: ..., 
  specialty: ..., 
  doctorName: ..., 
  dateTimeLabel: ..., 
  diagnosis: ..., 
  quantity: ..., 
  unitPrice: ..., 
  insuranceCoveragePercent: ..., 
  displayOrder: ..., 
};

// Call the `upsertServiceRecordRef()` function to get a reference to the mutation.
const ref = upsertServiceRecordRef(upsertServiceRecordVars);
// Variables can be defined inline as well.
const ref = upsertServiceRecordRef({ id: ..., spotlightCaseId: ..., patientName: ..., patientCode: ..., serviceName: ..., specialty: ..., doctorName: ..., dateTimeLabel: ..., diagnosis: ..., quantity: ..., unitPrice: ..., insuranceCoveragePercent: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertServiceRecordRef(dataConnect, upsertServiceRecordVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.serviceRecord_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.serviceRecord_upsert);
});
```

## UpsertDoctorAvailability
You can execute the `UpsertDoctorAvailability` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDoctorAvailability(vars: UpsertDoctorAvailabilityVariables): MutationPromise<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;

interface UpsertDoctorAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDoctorAvailabilityVariables): MutationRef<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;
}
export const upsertDoctorAvailabilityRef: UpsertDoctorAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDoctorAvailability(dc: DataConnect, vars: UpsertDoctorAvailabilityVariables): MutationPromise<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;

interface UpsertDoctorAvailabilityRef {
  ...
  (dc: DataConnect, vars: UpsertDoctorAvailabilityVariables): MutationRef<UpsertDoctorAvailabilityData, UpsertDoctorAvailabilityVariables>;
}
export const upsertDoctorAvailabilityRef: UpsertDoctorAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDoctorAvailabilityRef:
```typescript
const name = upsertDoctorAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `UpsertDoctorAvailability` mutation requires an argument of type `UpsertDoctorAvailabilityVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertDoctorAvailabilityVariables {
  id: string;
  doctorUid: string;
  department: string;
  shiftKey: string;
  status: string;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertDoctorAvailability` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDoctorAvailabilityData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDoctorAvailabilityData {
  doctorAvailability_upsert: DoctorAvailability_Key;
}
```
### Using `UpsertDoctorAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDoctorAvailability, UpsertDoctorAvailabilityVariables } from '@firebasegen/default-connector';

// The `UpsertDoctorAvailability` mutation requires an argument of type `UpsertDoctorAvailabilityVariables`:
const upsertDoctorAvailabilityVars: UpsertDoctorAvailabilityVariables = {
  id: ..., 
  doctorUid: ..., 
  department: ..., 
  shiftKey: ..., 
  status: ..., 
  displayOrder: ..., 
};

// Call the `upsertDoctorAvailability()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDoctorAvailability(upsertDoctorAvailabilityVars);
// Variables can be defined inline as well.
const { data } = await upsertDoctorAvailability({ id: ..., doctorUid: ..., department: ..., shiftKey: ..., status: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDoctorAvailability(dataConnect, upsertDoctorAvailabilityVars);

console.log(data.doctorAvailability_upsert);

// Or, you can use the `Promise` API.
upsertDoctorAvailability(upsertDoctorAvailabilityVars).then((response) => {
  const data = response.data;
  console.log(data.doctorAvailability_upsert);
});
```

### Using `UpsertDoctorAvailability`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDoctorAvailabilityRef, UpsertDoctorAvailabilityVariables } from '@firebasegen/default-connector';

// The `UpsertDoctorAvailability` mutation requires an argument of type `UpsertDoctorAvailabilityVariables`:
const upsertDoctorAvailabilityVars: UpsertDoctorAvailabilityVariables = {
  id: ..., 
  doctorUid: ..., 
  department: ..., 
  shiftKey: ..., 
  status: ..., 
  displayOrder: ..., 
};

// Call the `upsertDoctorAvailabilityRef()` function to get a reference to the mutation.
const ref = upsertDoctorAvailabilityRef(upsertDoctorAvailabilityVars);
// Variables can be defined inline as well.
const ref = upsertDoctorAvailabilityRef({ id: ..., doctorUid: ..., department: ..., shiftKey: ..., status: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDoctorAvailabilityRef(dataConnect, upsertDoctorAvailabilityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.doctorAvailability_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.doctorAvailability_upsert);
});
```

## UpsertPrescriptionTemplate
You can execute the `UpsertPrescriptionTemplate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertPrescriptionTemplate(vars: UpsertPrescriptionTemplateVariables): MutationPromise<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;

interface UpsertPrescriptionTemplateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionTemplateVariables): MutationRef<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;
}
export const upsertPrescriptionTemplateRef: UpsertPrescriptionTemplateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPrescriptionTemplate(dc: DataConnect, vars: UpsertPrescriptionTemplateVariables): MutationPromise<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;

interface UpsertPrescriptionTemplateRef {
  ...
  (dc: DataConnect, vars: UpsertPrescriptionTemplateVariables): MutationRef<UpsertPrescriptionTemplateData, UpsertPrescriptionTemplateVariables>;
}
export const upsertPrescriptionTemplateRef: UpsertPrescriptionTemplateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPrescriptionTemplateRef:
```typescript
const name = upsertPrescriptionTemplateRef.operationName;
console.log(name);
```

### Variables
The `UpsertPrescriptionTemplate` mutation requires an argument of type `UpsertPrescriptionTemplateVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertPrescriptionTemplate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPrescriptionTemplateData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPrescriptionTemplateData {
  prescriptionTemplate_upsert: PrescriptionTemplate_Key;
}
```
### Using `UpsertPrescriptionTemplate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionTemplate, UpsertPrescriptionTemplateVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionTemplate` mutation requires an argument of type `UpsertPrescriptionTemplateVariables`:
const upsertPrescriptionTemplateVars: UpsertPrescriptionTemplateVariables = {
  id: ..., 
  title: ..., 
  subtitle: ..., 
  specialty: ..., 
  badge: ..., 
  summary: ..., 
  iconKey: ..., 
  displayOrder: ..., 
};

// Call the `upsertPrescriptionTemplate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPrescriptionTemplate(upsertPrescriptionTemplateVars);
// Variables can be defined inline as well.
const { data } = await upsertPrescriptionTemplate({ id: ..., title: ..., subtitle: ..., specialty: ..., badge: ..., summary: ..., iconKey: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPrescriptionTemplate(dataConnect, upsertPrescriptionTemplateVars);

console.log(data.prescriptionTemplate_upsert);

// Or, you can use the `Promise` API.
upsertPrescriptionTemplate(upsertPrescriptionTemplateVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionTemplate_upsert);
});
```

### Using `UpsertPrescriptionTemplate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionTemplateRef, UpsertPrescriptionTemplateVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionTemplate` mutation requires an argument of type `UpsertPrescriptionTemplateVariables`:
const upsertPrescriptionTemplateVars: UpsertPrescriptionTemplateVariables = {
  id: ..., 
  title: ..., 
  subtitle: ..., 
  specialty: ..., 
  badge: ..., 
  summary: ..., 
  iconKey: ..., 
  displayOrder: ..., 
};

// Call the `upsertPrescriptionTemplateRef()` function to get a reference to the mutation.
const ref = upsertPrescriptionTemplateRef(upsertPrescriptionTemplateVars);
// Variables can be defined inline as well.
const ref = upsertPrescriptionTemplateRef({ id: ..., title: ..., subtitle: ..., specialty: ..., badge: ..., summary: ..., iconKey: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPrescriptionTemplateRef(dataConnect, upsertPrescriptionTemplateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionTemplate_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionTemplate_upsert);
});
```

## UpsertPrescriptionTemplateDrug
You can execute the `UpsertPrescriptionTemplateDrug` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertPrescriptionTemplateDrug(vars: UpsertPrescriptionTemplateDrugVariables): MutationPromise<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;

interface UpsertPrescriptionTemplateDrugRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPrescriptionTemplateDrugVariables): MutationRef<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;
}
export const upsertPrescriptionTemplateDrugRef: UpsertPrescriptionTemplateDrugRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPrescriptionTemplateDrug(dc: DataConnect, vars: UpsertPrescriptionTemplateDrugVariables): MutationPromise<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;

interface UpsertPrescriptionTemplateDrugRef {
  ...
  (dc: DataConnect, vars: UpsertPrescriptionTemplateDrugVariables): MutationRef<UpsertPrescriptionTemplateDrugData, UpsertPrescriptionTemplateDrugVariables>;
}
export const upsertPrescriptionTemplateDrugRef: UpsertPrescriptionTemplateDrugRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPrescriptionTemplateDrugRef:
```typescript
const name = upsertPrescriptionTemplateDrugRef.operationName;
console.log(name);
```

### Variables
The `UpsertPrescriptionTemplateDrug` mutation requires an argument of type `UpsertPrescriptionTemplateDrugVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertPrescriptionTemplateDrug` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPrescriptionTemplateDrugData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPrescriptionTemplateDrugData {
  prescriptionTemplateDrug_upsert: PrescriptionTemplateDrug_Key;
}
```
### Using `UpsertPrescriptionTemplateDrug`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionTemplateDrug, UpsertPrescriptionTemplateDrugVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionTemplateDrug` mutation requires an argument of type `UpsertPrescriptionTemplateDrugVariables`:
const upsertPrescriptionTemplateDrugVars: UpsertPrescriptionTemplateDrugVariables = {
  id: ..., 
  templateId: ..., 
  name: ..., 
  description: ..., 
  dosage: ..., 
  quantity: ..., 
  unit: ..., 
  timing: ..., 
  duration: ..., 
  price: ..., 
  displayOrder: ..., 
};

// Call the `upsertPrescriptionTemplateDrug()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPrescriptionTemplateDrug(upsertPrescriptionTemplateDrugVars);
// Variables can be defined inline as well.
const { data } = await upsertPrescriptionTemplateDrug({ id: ..., templateId: ..., name: ..., description: ..., dosage: ..., quantity: ..., unit: ..., timing: ..., duration: ..., price: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPrescriptionTemplateDrug(dataConnect, upsertPrescriptionTemplateDrugVars);

console.log(data.prescriptionTemplateDrug_upsert);

// Or, you can use the `Promise` API.
upsertPrescriptionTemplateDrug(upsertPrescriptionTemplateDrugVars).then((response) => {
  const data = response.data;
  console.log(data.prescriptionTemplateDrug_upsert);
});
```

### Using `UpsertPrescriptionTemplateDrug`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPrescriptionTemplateDrugRef, UpsertPrescriptionTemplateDrugVariables } from '@firebasegen/default-connector';

// The `UpsertPrescriptionTemplateDrug` mutation requires an argument of type `UpsertPrescriptionTemplateDrugVariables`:
const upsertPrescriptionTemplateDrugVars: UpsertPrescriptionTemplateDrugVariables = {
  id: ..., 
  templateId: ..., 
  name: ..., 
  description: ..., 
  dosage: ..., 
  quantity: ..., 
  unit: ..., 
  timing: ..., 
  duration: ..., 
  price: ..., 
  displayOrder: ..., 
};

// Call the `upsertPrescriptionTemplateDrugRef()` function to get a reference to the mutation.
const ref = upsertPrescriptionTemplateDrugRef(upsertPrescriptionTemplateDrugVars);
// Variables can be defined inline as well.
const ref = upsertPrescriptionTemplateDrugRef({ id: ..., templateId: ..., name: ..., description: ..., dosage: ..., quantity: ..., unit: ..., timing: ..., duration: ..., price: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPrescriptionTemplateDrugRef(dataConnect, upsertPrescriptionTemplateDrugVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.prescriptionTemplateDrug_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.prescriptionTemplateDrug_upsert);
});
```

## UpsertDrugCatalogItem
You can execute the `UpsertDrugCatalogItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDrugCatalogItem(vars: UpsertDrugCatalogItemVariables): MutationPromise<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;

interface UpsertDrugCatalogItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDrugCatalogItemVariables): MutationRef<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;
}
export const upsertDrugCatalogItemRef: UpsertDrugCatalogItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDrugCatalogItem(dc: DataConnect, vars: UpsertDrugCatalogItemVariables): MutationPromise<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;

interface UpsertDrugCatalogItemRef {
  ...
  (dc: DataConnect, vars: UpsertDrugCatalogItemVariables): MutationRef<UpsertDrugCatalogItemData, UpsertDrugCatalogItemVariables>;
}
export const upsertDrugCatalogItemRef: UpsertDrugCatalogItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDrugCatalogItemRef:
```typescript
const name = upsertDrugCatalogItemRef.operationName;
console.log(name);
```

### Variables
The `UpsertDrugCatalogItem` mutation requires an argument of type `UpsertDrugCatalogItemVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertDrugCatalogItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDrugCatalogItemData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDrugCatalogItemData {
  drugCatalogItem_upsert: DrugCatalogItem_Key;
}
```
### Using `UpsertDrugCatalogItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDrugCatalogItem, UpsertDrugCatalogItemVariables } from '@firebasegen/default-connector';

// The `UpsertDrugCatalogItem` mutation requires an argument of type `UpsertDrugCatalogItemVariables`:
const upsertDrugCatalogItemVars: UpsertDrugCatalogItemVariables = {
  id: ..., 
  name: ..., 
  description: ..., 
  activeIngredient: ..., // optional
  unit: ..., 
  price: ..., 
  category: ..., 
  searchKeywords: ..., // optional
  isAvailable: ..., 
};

// Call the `upsertDrugCatalogItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDrugCatalogItem(upsertDrugCatalogItemVars);
// Variables can be defined inline as well.
const { data } = await upsertDrugCatalogItem({ id: ..., name: ..., description: ..., activeIngredient: ..., unit: ..., price: ..., category: ..., searchKeywords: ..., isAvailable: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDrugCatalogItem(dataConnect, upsertDrugCatalogItemVars);

console.log(data.drugCatalogItem_upsert);

// Or, you can use the `Promise` API.
upsertDrugCatalogItem(upsertDrugCatalogItemVars).then((response) => {
  const data = response.data;
  console.log(data.drugCatalogItem_upsert);
});
```

### Using `UpsertDrugCatalogItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDrugCatalogItemRef, UpsertDrugCatalogItemVariables } from '@firebasegen/default-connector';

// The `UpsertDrugCatalogItem` mutation requires an argument of type `UpsertDrugCatalogItemVariables`:
const upsertDrugCatalogItemVars: UpsertDrugCatalogItemVariables = {
  id: ..., 
  name: ..., 
  description: ..., 
  activeIngredient: ..., // optional
  unit: ..., 
  price: ..., 
  category: ..., 
  searchKeywords: ..., // optional
  isAvailable: ..., 
};

// Call the `upsertDrugCatalogItemRef()` function to get a reference to the mutation.
const ref = upsertDrugCatalogItemRef(upsertDrugCatalogItemVars);
// Variables can be defined inline as well.
const ref = upsertDrugCatalogItemRef({ id: ..., name: ..., description: ..., activeIngredient: ..., unit: ..., price: ..., category: ..., searchKeywords: ..., isAvailable: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDrugCatalogItemRef(dataConnect, upsertDrugCatalogItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.drugCatalogItem_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.drugCatalogItem_upsert);
});
```

## UpsertReportSummaryMetric
You can execute the `UpsertReportSummaryMetric` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertReportSummaryMetric(vars: UpsertReportSummaryMetricVariables): MutationPromise<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;

interface UpsertReportSummaryMetricRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportSummaryMetricVariables): MutationRef<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;
}
export const upsertReportSummaryMetricRef: UpsertReportSummaryMetricRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertReportSummaryMetric(dc: DataConnect, vars: UpsertReportSummaryMetricVariables): MutationPromise<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;

interface UpsertReportSummaryMetricRef {
  ...
  (dc: DataConnect, vars: UpsertReportSummaryMetricVariables): MutationRef<UpsertReportSummaryMetricData, UpsertReportSummaryMetricVariables>;
}
export const upsertReportSummaryMetricRef: UpsertReportSummaryMetricRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertReportSummaryMetricRef:
```typescript
const name = upsertReportSummaryMetricRef.operationName;
console.log(name);
```

### Variables
The `UpsertReportSummaryMetric` mutation requires an argument of type `UpsertReportSummaryMetricVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertReportSummaryMetric` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertReportSummaryMetricData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertReportSummaryMetricData {
  reportSummaryMetric_upsert: ReportSummaryMetric_Key;
}
```
### Using `UpsertReportSummaryMetric`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertReportSummaryMetric, UpsertReportSummaryMetricVariables } from '@firebasegen/default-connector';

// The `UpsertReportSummaryMetric` mutation requires an argument of type `UpsertReportSummaryMetricVariables`:
const upsertReportSummaryMetricVars: UpsertReportSummaryMetricVariables = {
  id: ..., 
  title: ..., 
  valueText: ..., 
  helper: ..., 
  delta: ..., 
  deltaTone: ..., 
  iconKey: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportSummaryMetric()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertReportSummaryMetric(upsertReportSummaryMetricVars);
// Variables can be defined inline as well.
const { data } = await upsertReportSummaryMetric({ id: ..., title: ..., valueText: ..., helper: ..., delta: ..., deltaTone: ..., iconKey: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertReportSummaryMetric(dataConnect, upsertReportSummaryMetricVars);

console.log(data.reportSummaryMetric_upsert);

// Or, you can use the `Promise` API.
upsertReportSummaryMetric(upsertReportSummaryMetricVars).then((response) => {
  const data = response.data;
  console.log(data.reportSummaryMetric_upsert);
});
```

### Using `UpsertReportSummaryMetric`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertReportSummaryMetricRef, UpsertReportSummaryMetricVariables } from '@firebasegen/default-connector';

// The `UpsertReportSummaryMetric` mutation requires an argument of type `UpsertReportSummaryMetricVariables`:
const upsertReportSummaryMetricVars: UpsertReportSummaryMetricVariables = {
  id: ..., 
  title: ..., 
  valueText: ..., 
  helper: ..., 
  delta: ..., 
  deltaTone: ..., 
  iconKey: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportSummaryMetricRef()` function to get a reference to the mutation.
const ref = upsertReportSummaryMetricRef(upsertReportSummaryMetricVars);
// Variables can be defined inline as well.
const ref = upsertReportSummaryMetricRef({ id: ..., title: ..., valueText: ..., helper: ..., delta: ..., deltaTone: ..., iconKey: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertReportSummaryMetricRef(dataConnect, upsertReportSummaryMetricVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reportSummaryMetric_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reportSummaryMetric_upsert);
});
```

## UpsertReportStageDistribution
You can execute the `UpsertReportStageDistribution` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertReportStageDistribution(vars: UpsertReportStageDistributionVariables): MutationPromise<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;

interface UpsertReportStageDistributionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportStageDistributionVariables): MutationRef<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;
}
export const upsertReportStageDistributionRef: UpsertReportStageDistributionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertReportStageDistribution(dc: DataConnect, vars: UpsertReportStageDistributionVariables): MutationPromise<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;

interface UpsertReportStageDistributionRef {
  ...
  (dc: DataConnect, vars: UpsertReportStageDistributionVariables): MutationRef<UpsertReportStageDistributionData, UpsertReportStageDistributionVariables>;
}
export const upsertReportStageDistributionRef: UpsertReportStageDistributionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertReportStageDistributionRef:
```typescript
const name = upsertReportStageDistributionRef.operationName;
console.log(name);
```

### Variables
The `UpsertReportStageDistribution` mutation requires an argument of type `UpsertReportStageDistributionVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertReportStageDistributionVariables {
  id: string;
  label: string;
  value: number;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertReportStageDistribution` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertReportStageDistributionData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertReportStageDistributionData {
  reportStageDistribution_upsert: ReportStageDistribution_Key;
}
```
### Using `UpsertReportStageDistribution`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertReportStageDistribution, UpsertReportStageDistributionVariables } from '@firebasegen/default-connector';

// The `UpsertReportStageDistribution` mutation requires an argument of type `UpsertReportStageDistributionVariables`:
const upsertReportStageDistributionVars: UpsertReportStageDistributionVariables = {
  id: ..., 
  label: ..., 
  value: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportStageDistribution()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertReportStageDistribution(upsertReportStageDistributionVars);
// Variables can be defined inline as well.
const { data } = await upsertReportStageDistribution({ id: ..., label: ..., value: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertReportStageDistribution(dataConnect, upsertReportStageDistributionVars);

console.log(data.reportStageDistribution_upsert);

// Or, you can use the `Promise` API.
upsertReportStageDistribution(upsertReportStageDistributionVars).then((response) => {
  const data = response.data;
  console.log(data.reportStageDistribution_upsert);
});
```

### Using `UpsertReportStageDistribution`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertReportStageDistributionRef, UpsertReportStageDistributionVariables } from '@firebasegen/default-connector';

// The `UpsertReportStageDistribution` mutation requires an argument of type `UpsertReportStageDistributionVariables`:
const upsertReportStageDistributionVars: UpsertReportStageDistributionVariables = {
  id: ..., 
  label: ..., 
  value: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportStageDistributionRef()` function to get a reference to the mutation.
const ref = upsertReportStageDistributionRef(upsertReportStageDistributionVars);
// Variables can be defined inline as well.
const ref = upsertReportStageDistributionRef({ id: ..., label: ..., value: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertReportStageDistributionRef(dataConnect, upsertReportStageDistributionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reportStageDistribution_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reportStageDistribution_upsert);
});
```

## UpsertReportTrendPoint
You can execute the `UpsertReportTrendPoint` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertReportTrendPoint(vars: UpsertReportTrendPointVariables): MutationPromise<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;

interface UpsertReportTrendPointRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportTrendPointVariables): MutationRef<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;
}
export const upsertReportTrendPointRef: UpsertReportTrendPointRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertReportTrendPoint(dc: DataConnect, vars: UpsertReportTrendPointVariables): MutationPromise<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;

interface UpsertReportTrendPointRef {
  ...
  (dc: DataConnect, vars: UpsertReportTrendPointVariables): MutationRef<UpsertReportTrendPointData, UpsertReportTrendPointVariables>;
}
export const upsertReportTrendPointRef: UpsertReportTrendPointRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertReportTrendPointRef:
```typescript
const name = upsertReportTrendPointRef.operationName;
console.log(name);
```

### Variables
The `UpsertReportTrendPoint` mutation requires an argument of type `UpsertReportTrendPointVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertReportTrendPointVariables {
  id: string;
  label: string;
  x: number;
  y: number;
  series: string;
  displayOrder: number;
}
```
### Return Type
Recall that executing the `UpsertReportTrendPoint` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertReportTrendPointData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertReportTrendPointData {
  reportTrendPoint_upsert: ReportTrendPoint_Key;
}
```
### Using `UpsertReportTrendPoint`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertReportTrendPoint, UpsertReportTrendPointVariables } from '@firebasegen/default-connector';

// The `UpsertReportTrendPoint` mutation requires an argument of type `UpsertReportTrendPointVariables`:
const upsertReportTrendPointVars: UpsertReportTrendPointVariables = {
  id: ..., 
  label: ..., 
  x: ..., 
  y: ..., 
  series: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportTrendPoint()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertReportTrendPoint(upsertReportTrendPointVars);
// Variables can be defined inline as well.
const { data } = await upsertReportTrendPoint({ id: ..., label: ..., x: ..., y: ..., series: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertReportTrendPoint(dataConnect, upsertReportTrendPointVars);

console.log(data.reportTrendPoint_upsert);

// Or, you can use the `Promise` API.
upsertReportTrendPoint(upsertReportTrendPointVars).then((response) => {
  const data = response.data;
  console.log(data.reportTrendPoint_upsert);
});
```

### Using `UpsertReportTrendPoint`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertReportTrendPointRef, UpsertReportTrendPointVariables } from '@firebasegen/default-connector';

// The `UpsertReportTrendPoint` mutation requires an argument of type `UpsertReportTrendPointVariables`:
const upsertReportTrendPointVars: UpsertReportTrendPointVariables = {
  id: ..., 
  label: ..., 
  x: ..., 
  y: ..., 
  series: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportTrendPointRef()` function to get a reference to the mutation.
const ref = upsertReportTrendPointRef(upsertReportTrendPointVars);
// Variables can be defined inline as well.
const ref = upsertReportTrendPointRef({ id: ..., label: ..., x: ..., y: ..., series: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertReportTrendPointRef(dataConnect, upsertReportTrendPointVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reportTrendPoint_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reportTrendPoint_upsert);
});
```

## UpsertReportAlertCase
You can execute the `UpsertReportAlertCase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertReportAlertCase(vars: UpsertReportAlertCaseVariables): MutationPromise<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;

interface UpsertReportAlertCaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertReportAlertCaseVariables): MutationRef<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;
}
export const upsertReportAlertCaseRef: UpsertReportAlertCaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertReportAlertCase(dc: DataConnect, vars: UpsertReportAlertCaseVariables): MutationPromise<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;

interface UpsertReportAlertCaseRef {
  ...
  (dc: DataConnect, vars: UpsertReportAlertCaseVariables): MutationRef<UpsertReportAlertCaseData, UpsertReportAlertCaseVariables>;
}
export const upsertReportAlertCaseRef: UpsertReportAlertCaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertReportAlertCaseRef:
```typescript
const name = upsertReportAlertCaseRef.operationName;
console.log(name);
```

### Variables
The `UpsertReportAlertCase` mutation requires an argument of type `UpsertReportAlertCaseVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertReportAlertCase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertReportAlertCaseData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertReportAlertCaseData {
  reportAlertCase_upsert: ReportAlertCase_Key;
}
```
### Using `UpsertReportAlertCase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertReportAlertCase, UpsertReportAlertCaseVariables } from '@firebasegen/default-connector';

// The `UpsertReportAlertCase` mutation requires an argument of type `UpsertReportAlertCaseVariables`:
const upsertReportAlertCaseVars: UpsertReportAlertCaseVariables = {
  id: ..., 
  patientUid: ..., // optional
  initials: ..., 
  name: ..., 
  recordId: ..., 
  conclusion: ..., 
  phone: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportAlertCase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertReportAlertCase(upsertReportAlertCaseVars);
// Variables can be defined inline as well.
const { data } = await upsertReportAlertCase({ id: ..., patientUid: ..., initials: ..., name: ..., recordId: ..., conclusion: ..., phone: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertReportAlertCase(dataConnect, upsertReportAlertCaseVars);

console.log(data.reportAlertCase_upsert);

// Or, you can use the `Promise` API.
upsertReportAlertCase(upsertReportAlertCaseVars).then((response) => {
  const data = response.data;
  console.log(data.reportAlertCase_upsert);
});
```

### Using `UpsertReportAlertCase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertReportAlertCaseRef, UpsertReportAlertCaseVariables } from '@firebasegen/default-connector';

// The `UpsertReportAlertCase` mutation requires an argument of type `UpsertReportAlertCaseVariables`:
const upsertReportAlertCaseVars: UpsertReportAlertCaseVariables = {
  id: ..., 
  patientUid: ..., // optional
  initials: ..., 
  name: ..., 
  recordId: ..., 
  conclusion: ..., 
  phone: ..., 
  displayOrder: ..., 
};

// Call the `upsertReportAlertCaseRef()` function to get a reference to the mutation.
const ref = upsertReportAlertCaseRef(upsertReportAlertCaseVars);
// Variables can be defined inline as well.
const ref = upsertReportAlertCaseRef({ id: ..., patientUid: ..., initials: ..., name: ..., recordId: ..., conclusion: ..., phone: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertReportAlertCaseRef(dataConnect, upsertReportAlertCaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reportAlertCase_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reportAlertCase_upsert);
});
```

## UpsertDigitizationJob
You can execute the `UpsertDigitizationJob` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDigitizationJob(vars: UpsertDigitizationJobVariables): MutationPromise<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;

interface UpsertDigitizationJobRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDigitizationJobVariables): MutationRef<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;
}
export const upsertDigitizationJobRef: UpsertDigitizationJobRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDigitizationJob(dc: DataConnect, vars: UpsertDigitizationJobVariables): MutationPromise<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;

interface UpsertDigitizationJobRef {
  ...
  (dc: DataConnect, vars: UpsertDigitizationJobVariables): MutationRef<UpsertDigitizationJobData, UpsertDigitizationJobVariables>;
}
export const upsertDigitizationJobRef: UpsertDigitizationJobRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDigitizationJobRef:
```typescript
const name = upsertDigitizationJobRef.operationName;
console.log(name);
```

### Variables
The `UpsertDigitizationJob` mutation requires an argument of type `UpsertDigitizationJobVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertDigitizationJob` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDigitizationJobData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDigitizationJobData {
  digitizationJob_upsert: DigitizationJob_Key;
}
```
### Using `UpsertDigitizationJob`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDigitizationJob, UpsertDigitizationJobVariables } from '@firebasegen/default-connector';

// The `UpsertDigitizationJob` mutation requires an argument of type `UpsertDigitizationJobVariables`:
const upsertDigitizationJobVars: UpsertDigitizationJobVariables = {
  id: ..., 
  title: ..., 
  subtitle: ..., 
  progressPercent: ..., 
  facilityName: ..., 
  patientName: ..., 
  examDate: ..., 
  doctorName: ..., 
  sourceDocumentTitle: ..., 
  sourceDocumentBody: ..., 
  historyLabel: ..., 
};

// Call the `upsertDigitizationJob()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDigitizationJob(upsertDigitizationJobVars);
// Variables can be defined inline as well.
const { data } = await upsertDigitizationJob({ id: ..., title: ..., subtitle: ..., progressPercent: ..., facilityName: ..., patientName: ..., examDate: ..., doctorName: ..., sourceDocumentTitle: ..., sourceDocumentBody: ..., historyLabel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDigitizationJob(dataConnect, upsertDigitizationJobVars);

console.log(data.digitizationJob_upsert);

// Or, you can use the `Promise` API.
upsertDigitizationJob(upsertDigitizationJobVars).then((response) => {
  const data = response.data;
  console.log(data.digitizationJob_upsert);
});
```

### Using `UpsertDigitizationJob`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDigitizationJobRef, UpsertDigitizationJobVariables } from '@firebasegen/default-connector';

// The `UpsertDigitizationJob` mutation requires an argument of type `UpsertDigitizationJobVariables`:
const upsertDigitizationJobVars: UpsertDigitizationJobVariables = {
  id: ..., 
  title: ..., 
  subtitle: ..., 
  progressPercent: ..., 
  facilityName: ..., 
  patientName: ..., 
  examDate: ..., 
  doctorName: ..., 
  sourceDocumentTitle: ..., 
  sourceDocumentBody: ..., 
  historyLabel: ..., 
};

// Call the `upsertDigitizationJobRef()` function to get a reference to the mutation.
const ref = upsertDigitizationJobRef(upsertDigitizationJobVars);
// Variables can be defined inline as well.
const ref = upsertDigitizationJobRef({ id: ..., title: ..., subtitle: ..., progressPercent: ..., facilityName: ..., patientName: ..., examDate: ..., doctorName: ..., sourceDocumentTitle: ..., sourceDocumentBody: ..., historyLabel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDigitizationJobRef(dataConnect, upsertDigitizationJobVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.digitizationJob_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.digitizationJob_upsert);
});
```

## UpsertDigitizationMetric
You can execute the `UpsertDigitizationMetric` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated-fdc/index.d.ts](./index.d.ts):
```typescript
upsertDigitizationMetric(vars: UpsertDigitizationMetricVariables): MutationPromise<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;

interface UpsertDigitizationMetricRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDigitizationMetricVariables): MutationRef<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;
}
export const upsertDigitizationMetricRef: UpsertDigitizationMetricRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDigitizationMetric(dc: DataConnect, vars: UpsertDigitizationMetricVariables): MutationPromise<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;

interface UpsertDigitizationMetricRef {
  ...
  (dc: DataConnect, vars: UpsertDigitizationMetricVariables): MutationRef<UpsertDigitizationMetricData, UpsertDigitizationMetricVariables>;
}
export const upsertDigitizationMetricRef: UpsertDigitizationMetricRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDigitizationMetricRef:
```typescript
const name = upsertDigitizationMetricRef.operationName;
console.log(name);
```

### Variables
The `UpsertDigitizationMetric` mutation requires an argument of type `UpsertDigitizationMetricVariables`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpsertDigitizationMetric` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDigitizationMetricData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDigitizationMetricData {
  digitizationMetric_upsert: DigitizationMetric_Key;
}
```
### Using `UpsertDigitizationMetric`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDigitizationMetric, UpsertDigitizationMetricVariables } from '@firebasegen/default-connector';

// The `UpsertDigitizationMetric` mutation requires an argument of type `UpsertDigitizationMetricVariables`:
const upsertDigitizationMetricVars: UpsertDigitizationMetricVariables = {
  id: ..., 
  jobId: ..., 
  code: ..., 
  label: ..., 
  value: ..., 
  status: ..., 
  reference: ..., // optional
  tone: ..., 
  displayOrder: ..., 
};

// Call the `upsertDigitizationMetric()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDigitizationMetric(upsertDigitizationMetricVars);
// Variables can be defined inline as well.
const { data } = await upsertDigitizationMetric({ id: ..., jobId: ..., code: ..., label: ..., value: ..., status: ..., reference: ..., tone: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDigitizationMetric(dataConnect, upsertDigitizationMetricVars);

console.log(data.digitizationMetric_upsert);

// Or, you can use the `Promise` API.
upsertDigitizationMetric(upsertDigitizationMetricVars).then((response) => {
  const data = response.data;
  console.log(data.digitizationMetric_upsert);
});
```

### Using `UpsertDigitizationMetric`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDigitizationMetricRef, UpsertDigitizationMetricVariables } from '@firebasegen/default-connector';

// The `UpsertDigitizationMetric` mutation requires an argument of type `UpsertDigitizationMetricVariables`:
const upsertDigitizationMetricVars: UpsertDigitizationMetricVariables = {
  id: ..., 
  jobId: ..., 
  code: ..., 
  label: ..., 
  value: ..., 
  status: ..., 
  reference: ..., // optional
  tone: ..., 
  displayOrder: ..., 
};

// Call the `upsertDigitizationMetricRef()` function to get a reference to the mutation.
const ref = upsertDigitizationMetricRef(upsertDigitizationMetricVars);
// Variables can be defined inline as well.
const ref = upsertDigitizationMetricRef({ id: ..., jobId: ..., code: ..., label: ..., value: ..., status: ..., reference: ..., tone: ..., displayOrder: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDigitizationMetricRef(dataConnect, upsertDigitizationMetricVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.digitizationMetric_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.digitizationMetric_upsert);
});
```

