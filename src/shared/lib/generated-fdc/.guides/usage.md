# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addTestPatient, getAllUsers, createUser, createPatientProfile, createFamilyLink, createAppointment, createAiDiagnosis, getDoctors, getPatientsByDoctor, getAppointments } from '@firebasegen/default-connector';


// Operation AddTestPatient: 
const { data } = await AddTestPatient(dataConnect);

// Operation GetAllUsers: 
const { data } = await GetAllUsers(dataConnect);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreatePatientProfile:  For variables, look at type CreatePatientProfileVars in ../index.d.ts
const { data } = await CreatePatientProfile(dataConnect, createPatientProfileVars);

// Operation CreateFamilyLink:  For variables, look at type CreateFamilyLinkVars in ../index.d.ts
const { data } = await CreateFamilyLink(dataConnect, createFamilyLinkVars);

// Operation CreateAppointment:  For variables, look at type CreateAppointmentVars in ../index.d.ts
const { data } = await CreateAppointment(dataConnect, createAppointmentVars);

// Operation CreateAiDiagnosis:  For variables, look at type CreateAiDiagnosisVars in ../index.d.ts
const { data } = await CreateAiDiagnosis(dataConnect, createAiDiagnosisVars);

// Operation GetDoctors: 
const { data } = await GetDoctors(dataConnect);

// Operation GetPatientsByDoctor:  For variables, look at type GetPatientsByDoctorVars in ../index.d.ts
const { data } = await GetPatientsByDoctor(dataConnect, getPatientsByDoctorVars);

// Operation GetAppointments: 
const { data } = await GetAppointments(dataConnect);


```