'use server';

import { createServerSupabaseClient } from 'utils/supabase/server';

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies(search = '') {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('movie').select('*').like('title', `%${search}%`);

  handleError(error);

  return data;
}

export async function getMovie(id: number) {
  const supabase = await createServerSupabaseClient();

  // maybeSingle : 하나라서 리스트로 받지 않고 하나를 받아오지만, 하지만 null일 수 있다는 것
  const { data, error } = await supabase.from('movie').select('*').eq('id', id).maybeSingle();

  handleError(error);

  return data;
}
