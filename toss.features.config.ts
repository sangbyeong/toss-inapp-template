export type TossFeatureConfig = {
  permissions: {
    clipboardRead: boolean;
    clipboardWrite: boolean;
    camera: boolean;
    photosRead: boolean;
  };
  externalApi: {
    enabled: boolean;
    /** 공개 가능한 API base URL만 입력하세요. 토큰/키 같은 secret은 .env.local 또는 GitHub Secrets만 사용하세요. */
    baseUrl: string;
  };
};

const featuresConfig = {
  permissions: {
    clipboardRead: false,
    clipboardWrite: false,
    camera: false,
    photosRead: false,
  },
  externalApi: {
    enabled: false,
    baseUrl: '',
  },
} satisfies TossFeatureConfig;

export default featuresConfig;
