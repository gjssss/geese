import { useState } from 'react';
import useSWR from 'swr';

import Message from '@/components/message';

import { fetcher } from '@/services/base';
import { makeUrl } from '@/utils/api';

import { Page } from '@/types/help';
import { VoteItemData } from '@/types/reppsitory';

export default function useRepoHistory(uid: string) {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR<Page<VoteItemData>>(
    uid ? makeUrl(`/user/${uid}/repository/?page=${page}`) : null,
    fetcher
  );

  if (error) {
    Message.error(error.message || '获取项目数据失败');
  }

  return {
    data,
    setPage,
  };
}
