import { useInfiniteQuery } from '@tanstack/react-query';
import MovieCard from './MovieCard';
import { Loader } from 'lucide-react';
import { searchMovies } from 'actions/movieActions';
import { useSearchStore } from 'store/useSearchStore';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function MovieCardList() {
  const { search } = useSearchStore();

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movie', search],
    queryFn: ({ pageParam }) => searchMovies({ search, page: pageParam, pageSize: 12 }),
    getNextPageParam: (lastPage) => (lastPage.page ? lastPage.page + 1 : null),
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // TODO
  useEffect(() => {}, []);

  useEffect(() => {
    console.log(inView);
  }, [inView]);

  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {(isFetching || isFetchingNextPage) && <Loader />}
      {data && (
        <>
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div ref={ref}></div>
        </>
      )}
    </div>
  );
}
