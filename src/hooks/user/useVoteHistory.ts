import { useState } from 'react';
import useSWR from 'swr';

import Message from '@/components/message';

import { fetcher } from '@/services/base';
import { makeUrl } from '@/utils/api';

import { Page } from '@/types/help';
import { VoteItemData } from '@/types/reppsitory';

export default function useVoteHistory(uid: string) {
  const [page, setPage] = useState(1);
  const { data, error } = useSWR<Page<VoteItemData>>(
    uid ? makeUrl(`/user/${uid}/vote/?page=${page}`) : null,
    fetcher
  );

  if (error) {
    Message.error(error.message || '获取点赞数据失败');
  }

  return {
    data,
    setPage,
  };
}
