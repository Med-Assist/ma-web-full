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
- [**Mutations**](#mutations)
  - [*AddTestPatient*](#addtestpatient)
  - [*CreateUser*](#createuser)
  - [*CreatePatientProfile*](#createpatientprofile)
  - [*CreateFamilyLink*](#createfamilylink)
  - [*CreateAppointment*](#createappointment)
  - [*CreateAiDiagnosis*](#createaidiagnosis)
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
  user_insert: User_Key;
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

console.log(data.user_insert);

// Or, you can use the `Promise` API.
addTestPatient().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
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

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
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
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [generated-fdc/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
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
  displayName: ..., // optional
  userCode: ..., // optional
  status: ..., // optional
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
const { data } = await createUser({ uid: ..., email: ..., role: ..., displayName: ..., userCode: ..., status: ..., createdAt: ..., createdBy: ..., updatedAt: ..., updatedBy: ..., authProvider: ..., passwordSet: ..., passwordLastChangedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
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
  displayName: ..., // optional
  userCode: ..., // optional
  status: ..., // optional
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
const ref = createUserRef({ uid: ..., email: ..., role: ..., displayName: ..., userCode: ..., status: ..., createdAt: ..., createdBy: ..., updatedAt: ..., updatedBy: ..., authProvider: ..., passwordSet: ..., passwordLastChangedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

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
  doctorName: string;
  scheduledAt: TimestampString;
  status?: string | null;
  meetingLink?: string | null;
  symptoms?: string | null;
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
  doctorName: ..., 
  scheduledAt: ..., 
  status: ..., // optional
  meetingLink: ..., // optional
  symptoms: ..., // optional
};

// Call the `createAppointment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAppointment(createAppointmentVars);
// Variables can be defined inline as well.
const { data } = await createAppointment({ patientUid: ..., doctorName: ..., scheduledAt: ..., status: ..., meetingLink: ..., symptoms: ..., });

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
  doctorName: ..., 
  scheduledAt: ..., 
  status: ..., // optional
  meetingLink: ..., // optional
  symptoms: ..., // optional
};

// Call the `createAppointmentRef()` function to get a reference to the mutation.
const ref = createAppointmentRef(createAppointmentVars);
// Variables can be defined inline as well.
const ref = createAppointmentRef({ patientUid: ..., doctorName: ..., scheduledAt: ..., status: ..., meetingLink: ..., symptoms: ..., });

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
  fundusImageUrl: string;
  riskLevel: string;
  confidenceScore: number;
  aiAnalysis?: string | null;
  doctorAdvice?: string | null;
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
  fundusImageUrl: ..., 
  riskLevel: ..., 
  confidenceScore: ..., 
  aiAnalysis: ..., // optional
  doctorAdvice: ..., // optional
};

// Call the `createAiDiagnosis()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAiDiagnosis(createAiDiagnosisVars);
// Variables can be defined inline as well.
const { data } = await createAiDiagnosis({ patientUid: ..., fundusImageUrl: ..., riskLevel: ..., confidenceScore: ..., aiAnalysis: ..., doctorAdvice: ..., });

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
  fundusImageUrl: ..., 
  riskLevel: ..., 
  confidenceScore: ..., 
  aiAnalysis: ..., // optional
  doctorAdvice: ..., // optional
};

// Call the `createAiDiagnosisRef()` function to get a reference to the mutation.
const ref = createAiDiagnosisRef(createAiDiagnosisVars);
// Variables can be defined inline as well.
const ref = createAiDiagnosisRef({ patientUid: ..., fundusImageUrl: ..., riskLevel: ..., confidenceScore: ..., aiAnalysis: ..., doctorAdvice: ..., });

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

