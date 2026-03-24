# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getAllUsers, getDoctors, getPatientsByDoctor, getAppointments, getAiDiagnoses, seedAdminUser, seedDoctorNguyenHoangMinh, seedDoctorTranLanAnh, seedPatientLeMinh, seedPatientPhamThuHa } from '@firebasegen/default-connector';


// Operation GetAllUsers: 
const { data } = await GetAllUsers(dataConnect);

// Operation GetDoctors: 
const { data } = await GetDoctors(dataConnect);

// Operation GetPatientsByDoctor:  For variables, look at type GetPatientsByDoctorVars in ../index.d.ts
const { data } = await GetPatientsByDoctor(dataConnect, getPatientsByDoctorVars);

// Operation GetAppointments: 
const { data } = await GetAppointments(dataConnect);

// Operation GetAiDiagnoses: 
const { data } = await GetAiDiagnoses(dataConnect);

// Operation SeedAdminUser: 
const { data } = await SeedAdminUser(dataConnect);

// Operation SeedDoctorNguyenHoangMinh: 
const { data } = await SeedDoctorNguyenHoangMinh(dataConnect);

// Operation SeedDoctorTranLanAnh: 
const { data } = await SeedDoctorTranLanAnh(dataConnect);

// Operation SeedPatientLeMinh: 
const { data } = await SeedPatientLeMinh(dataConnect);

// Operation SeedPatientPhamThuHa: 
const { data } = await SeedPatientPhamThuHa(dataConnect);


```