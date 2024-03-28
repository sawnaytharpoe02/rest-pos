interface IConfig {
  googleClientId: string;
  googleClientSecret: string;
  backofficeApiBaseUrl: string;
  backofficeBaseUrl: string;
}

export const config: IConfig = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  backofficeBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_BASE_URL || "",
};
