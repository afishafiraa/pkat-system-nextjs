import { sheets, spreadsheetId } from '../sheets';

export const RANGE = '1_Registration!A2:W'; // A1 = header, up to column U

// Interface for the complete registration data
export interface RegistrationData {
  id?: string; // A - auto-generated
  nama_anak: string; // B
  jenis_kelamin: string; // C
  tanggal_lahir: string; // D
  usia_gestasi: string; // E
  usia_saat_ini: string; // F - optional
  usia_koreksi?: string; // G - optional
  no_kohort_bayi: string; // H
  nik_ibu: string; // I
  nik_anak: string; // J
  nama_ibu: string; // K
  nama_bapak: string; // L
  pekerjaan_ibu?: string; // M - optional
  pekerjaan_bapak?: string; // N - optional
  no_hp_ibu?: string; // O - optional
  no_hp_bapak?: string; // P - optional
  pendamping?: string; // Q - optional
  alamat: string; // R
  catatan?: string; // S - optional
  nama_petugas?: string; // T - optional
  created_at: string; // U
  updated_at: string; // V
  tanggal_kunjungan: string; // W
}

// Interface for new patient registration (POST data)
export interface NewPatientData {
  nama_anak: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  usia_gestasi: string;
  no_kohort_bayi: string;
  nik_ibu: string;
  nik_anak: string;
  nama_ibu: string;
  nama_bapak: string;
  alamat: string;
  tanggal_kunjungan: Date;
}

export async function createRegistration(data: NewPatientData) {
  const now = new Date().toISOString();
  const id = `ID${Date.now()}`; // Generate unique ID
  
  const values = [
    id, // A
    data.nama_anak, // B
    data.jenis_kelamin, // C
    data.tanggal_lahir, // D
    data.usia_gestasi, // E
    '', // F - usia saat ini (empty for new registration)
    '', // G - usia koreksi (empty for new registration)
    data.no_kohort_bayi, // H
    data.nik_ibu, // I
    data.nik_anak, // J
    data.nama_ibu, // K
    data.nama_bapak, // L
    '', // M - pekerjaan_ibu (empty for new registration)
    '', // N - pekerjaan_bapak (empty for new registration)
    '', // O - no_hp_ibu (empty for new registration)
    '', // P - no_hp_bapak (empty for new registration)
    '', // Q - pendamping (empty for new registration)
    data.alamat, // R
    '', // S - catatan (empty for new registration)
    '', // T - nama petugas (empty for new registration)
    now, // U - created_at
    now, // V - updated_at
    data.tanggal_kunjungan, // W
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values],
    },
  });
  
  return { id, ...data, created_at: now, updated_at: now };
}

export const getAllPersonal = async () => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });
  
  const rows = res.data.values || [];
  if (rows.length === 0) return [];
  
  // Convert rows to objects with proper field names
  return rows.map(row => ({
    id: row[0] || '',
    nama_anak: row[1] || '',
    jenis_kelamin: row[2] || '',
    tanggal_lahir: row[3] || '',
    usia_gestasi: row[4] || '',
    usia_saat_ini: row[5] || '',
    usia_koreksi: row[6] || '',
    no_kohort_bayi: row[7] || '',
    nik_ibu: row[8] || '',
    nik_anak: row[9] || '',
    nama_ibu: row[10] || '',
    nama_bapak: row[11] || '',
    pekerjaan_ibu: row[12] || '',
    pekerjaan_bapak: row[13] || '',
    no_hp_ibu: row[14] || '',
    no_hp_bapak: row[15] || '',
    pendamping: row[16] || '',
    alamat: row[17] || '',
    catatan: row[18] || '',
    nama_petugas: row[19] || '',
    created_at: row[20] || '',
    updated_at: row[21] || '',
    tanggal_kunjungan: row[22] || '',
  }));
};

export async function getRegistrationById(id: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values ?? [];
  const data = rows.find(row => row[0] === id);
  
  if (!data) return null;
  
  return {
    id: data[0] || '',
    nama_anak: data[1] || '',
    jenis_kelamin: data[2] || '',
    tanggal_lahir: data[3] || '',
    usia_gestasi: data[4] || '',
    usia_saat_ini: data[5] || '',
    usia_koreksi: data[6] || '',
    no_kohort_bayi: data[7] || '',
    nik_ibu: data[8] || '',
    nik_anak: data[9] || '',
    nama_ibu: data[10] || '',
    nama_bapak: data[11] || '',
    pekerjaan_ibu: data[12] || '',
    pekerjaan_bapak: data[13] || '',
    no_hp_ibu: data[14] || '',
    no_hp_bapak: data[15] || '',
    pendamping: data[16] || '',
    alamat: data[17] || '',
    catatan: data[18] || '',
    nama_petugas: data[19] || '',
    created_at: data[20] || '',
    updated_at: data[21] || '',
    tanggal_kunjungan: data[22] || '',
  };
}

export async function updateRegistrationById(id: string, newData: Partial<RegistrationData>) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values ?? [];
  const rowIndex = rows.findIndex(row => row[0] === id);
  if (rowIndex < 0) throw new Error('ID not found');

  const existingData = rows[rowIndex];
  const now = new Date().toISOString();
  
  const updatedValues = [
    id, // A
    newData.nama_anak ?? existingData[1], // B
    newData.jenis_kelamin ?? existingData[2], // C
    newData.tanggal_lahir ?? existingData[3], // D
    newData.usia_gestasi ?? existingData[4], // E
    newData.usia_saat_ini ?? existingData[5], // F
    newData.usia_koreksi ?? existingData[6], // G
    newData.no_kohort_bayi ?? existingData[7], // H
    newData.nik_ibu ?? existingData[8], // I
    newData.nik_anak ?? existingData[9], // J
    newData.nama_ibu ?? existingData[10], // K
    newData.nama_bapak ?? existingData[11], // L
    newData.pekerjaan_ibu ?? existingData[12], // M
    newData.pekerjaan_bapak ?? existingData[13], // N
    newData.no_hp_ibu ?? existingData[14], // O
    newData.no_hp_bapak ?? existingData[15], // P
    newData.pendamping ?? existingData[16], // Q
    newData.alamat ?? existingData[17], // R
    newData.catatan ?? existingData[18], // S
    newData.nama_petugas ?? existingData[19], // T
    existingData[20], // U - keep original created_at
    now, // V - update updated_at
    newData.tanggal_kunjungan ?? existingData[22], // W
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `1_Registration!A${rowIndex + 2}:U${rowIndex + 2}`, // Changed from S to U
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [updatedValues],
    },
  });
}

export async function deleteRegistrationById(id: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: RANGE,
  });

  const rows = res.data.values ?? [];
  const rowIndex = rows.findIndex(row => row[0] === id);
  if (rowIndex < 0) throw new Error('ID not found');

  // Calculate the actual row number in the sheet (add 2 because: +1 for header row, +1 for 0-based to 1-based indexing)
  const actualRowNumber = rowIndex + 2;

  // Clear the row content instead of deleting the row physically
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `1_Registration!A${actualRowNumber}:U${actualRowNumber}`,
  });

  return { success: true, message: 'Registration deleted successfully' };
}