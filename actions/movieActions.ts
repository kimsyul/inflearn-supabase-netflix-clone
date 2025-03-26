'use server';

import { createServerSupabaseClient } from 'utils/supabase/server';

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();

  // range(시작값, 끝나는 값) : 페이지 처리
  const { data, count, error } = await supabase
    .from('movie')
    .select('*')
    .like('title', `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count > page * pageSize;

  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return { data, page, pageSize, hasNextPage };
}

export async function getMovie(id: number) {
  const supabase = await createServerSupabaseClient();

  // maybeSingle : 하나라서 리스트로 받지 않고 하나를 받아오지만, 하지만 null일 수 있다는 것
  const { data, error } = await supabase.from('movie').select('*').eq('id', id).maybeSingle();

  handleError(error);

  return data;
}
