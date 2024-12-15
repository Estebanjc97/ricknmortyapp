export default () => ({
  version: '0.0.1(Alpha)',
  port: 3000,
  firestore: {
    projectId: process.env.GCP_PROJECT_ID || '',
    databaseId: process.env.FIRESTORE_DATABASE_ID || '',
    credentials: {
      client_email: process.env.GCP_SA_CLIENT_EMAIL,
      private_key: (process.env.GCP_SA_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
  },
});
