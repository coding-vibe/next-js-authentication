'use client';

import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useAPIClient from '@/hooks/useAPIClient';

const UNAUTHORIZED_STATUS_CODE = 401;

const SessionLogout: FC = () => {
  const { data: session, update } = useSession();
  const APIClient = useAPIClient();

  useEffect(() => {
    const unauthorizedErrorInterceptor = APIClient.interceptors.response.use(
      (request) => request,
      async (error) => {
        const requestConfig = error.config;

        if (
          error.response.status === UNAUTHORIZED_STATUS_CODE &&
          !requestConfig.sent &&
          requestConfig.url !== '/users/refresh/'
        ) {
          requestConfig.sent = true;

          const refresh = session?.user.refresh;

          if (!refresh) {
            throw error;
          }

          const { data: refreshResponse } = await APIClient.post('/users/refresh/', { refresh });

          if (session) {
            await update({
              user: {
                access: refreshResponse.access,
                refresh: refreshResponse.refresh,
              },
            });
          }

          return APIClient({
            ...requestConfig,
            headers: {
              ...requestConfig.headers,
              Authorization: `Bearer ${refreshResponse.access}`,
            },
          });
        }

        return Promise.reject(error);
      },
    );

    return () => APIClient.interceptors.response.eject(unauthorizedErrorInterceptor);
  });

  return null;
};

export default SessionLogout;
