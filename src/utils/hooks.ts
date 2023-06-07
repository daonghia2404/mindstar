import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { TSelectOption } from '@/components/Select';
import { getTotalPage } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';

type TScroll = {
  x: number;
  y: number;
  direction: string;
};

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(handleDebounce);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useScroll = (): TScroll => {
  const [scroll, setScroll] = useState<TScroll>({
    x: document.body.getBoundingClientRect().left,
    y: document.body.getBoundingClientRect().top,
    direction: '',
  });

  const listener = (): void => {
    setScroll((prev: TScroll) => ({
      x: document.body.getBoundingClientRect().left,
      y: -document.body.getBoundingClientRect().top,
      direction: prev.y > -document.body.getBoundingClientRect().top ? 'up' : 'down',
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return (): void => window.removeEventListener('scroll', listener);
  }, []);

  return scroll;
};

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const useOptionsPaginate = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  actions: any,
  reducer: string,
  response: string,
  loadingAction: string,
  keySearch = 'name',
  params?: { [key: string]: any },
  headers?: { [key: string]: any },
): {
  options: TSelectOption[];
  handleReset: () => void;
  handleLoadMore: () => void;
  handleSearch: (keyword?: string) => void;
} => {
  const dispatch = useDispatch();

  const total = useSelector((state: any) => state?.[reducer]?.[response])?.data?.total_elements;
  const loading = useSelector((state: TRootState) => state.loadingReducer[loadingAction]);
  const [options, setOptions] = useState<TSelectOption[]>([]);
  const [paramsRequest, setParamsRequest] = useState({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    ...params,
  });

  const handleSearch = (keyword?: string): void => {
    setParamsRequest({
      ...paramsRequest,
      page: DEFAULT_PAGE,
      [keySearch]: keyword || undefined,
    });
  };

  const handleLoadMore = (): void => {
    const isLoadMore = paramsRequest.page < getTotalPage(total, paramsRequest.size);
    if (!loading && isLoadMore) {
      setParamsRequest({
        ...paramsRequest,
        page: paramsRequest.page + 1,
      });
    }
  };

  const handleReset = (): void => {
    setParamsRequest({
      page: DEFAULT_PAGE,
      size: DEFAULT_PAGE_SIZE,
      ...params,
    });
  };

  const getData = useCallback(() => {
    dispatch(
      actions?.request({ params: paramsRequest, headers }, (fetchingResponse: any): void => {
        const isFirstFetching = paramsRequest.page === DEFAULT_PAGE;
        const dataFetching = fetchingResponse?.data?.content?.map((item: any) => ({
          value: String(item.id),
          label: item.name,
          data: item,
        }));

        setOptions(isFirstFetching ? dataFetching : [...options, ...dataFetching]);
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, paramsRequest]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    options,
    handleReset,
    handleLoadMore,
    handleSearch,
  };
};
