const userSchema = {
  uid: 'string', // Firebase Auth UID
  email: 'string',
  displayName: 'string',
  role: 'string', // 'admin' | 'dosen' | 'mahasiswa'
  createdAt: 'timestamp',
  updatedAt: 'timestamp',
  lastLogin: 'timestamp',
  status: 'string', // 'active' | 'inactive' | 'suspended'
};

export default userSchema;