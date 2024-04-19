interface IConfig {
  googleClientId: string;
  googleClientSecret: string;
  backofficeApiBaseUrl: string;
  backofficeBaseUrl: string;
  spaceEndpoint: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  orderAppUrl: string;
}

export const config: IConfig = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

  backofficeApiBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_BASE_URL || "",
  backofficeBaseUrl: process.env.NEXT_PUBLIC_BACKOFFICE_BASE_URL || "",

  spaceEndpoint: process.env.NEXT_PUBLIC_SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.NEXT_PUBLIC_SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.NEXT_PUBLIC_SPACE_SECRET_ACCESS_KEY || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
};
