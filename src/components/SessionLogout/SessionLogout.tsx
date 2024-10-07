'use client';

import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useAPIClient from '@/hooks/useAPIClient';

const UNAUTHORIZED_STATUS_CODE = 401;

const SessionLogout: FC = () => {
  const { data: session } = useSession();
  const APIClient = useAPIClient();

  useEffect(() => {
    const unauthorizedErrorInterceptor = APIClient.interceptors.response.use(
      (request) => request,
      async (error) => {
        const requestConfig = error.config;

        if (error.response.data.error.code === UNAUTHORIZED_STATUS_CODE && !requestConfig.sent) {
          requestConfig.sent = true;

          const refresh = session?.user.refresh;

          if (!refresh) {
            throw error;
          }

          const { data: refreshResponse } = await APIClient.post('/users/refresh/', { refresh });

          if (session) {
            session.user.access = refreshResponse.access;
            session.user.refresh = refreshResponse.refresh;
          }

          return APIClient(requestConfig);
        }

        return Promise.reject(error);
      },
    );

    return () => APIClient.interceptors.response.eject(unauthorizedErrorInterceptor);
  });

  return null;
};

export default SessionLogout;