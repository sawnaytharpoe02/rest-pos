interface IConfig {
  googleClientId: string;
  googleClientSecret: string;
  backofficeApiBaseUrl: string;
}

export const config: IConfig = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
};
