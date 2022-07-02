import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Status from '@/components/layout/Status';
import User from '@/components/layout/User';

import { CurrentUser } from '@/pages/api/login';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const checkLogin = useCallback(async () => {
    try {
      const token = localStorage.getItem('Authorization');
      const user = await CurrentUser({ Authorization: `Bearer ${token}` });
      if (user == undefined) {
        localStorage.clear();
        setLoginStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    checkLogin();
    const token = localStorage.getItem('Authorization');
    if (token != undefined) {
      setLoginStatus(true);
    }
  }, [checkLogin]);

  const updateLoginStatus = (value: boolean) => {
    setLoginStatus(value);
  };
  return (
    <>
      <Header
        loginStatus={loginStatus}
        updateLoginStatus={updateLoginStatus}
      ></Header>
      <main className='container mx-auto px-5 md:px-0 xl:px-40'>
        <div className='flex shrink grow flex-row sm:border-l sm:dark:border-slate-600 md:border-none'>
          {children}
          <div className='relative hidden w-3/12 shrink-0 md:block md:grow-0'>
            <div className='relative flex h-full flex-col items-stretch'>
              <div className='mt-2 ml-3'>
                <div className='space-y-2'>
                  <User isLogin={true}></User>
                  <Status></Status>
                </div>
                <Footer></Footer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
