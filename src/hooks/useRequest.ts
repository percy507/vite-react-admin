import { useRef, useState } from 'react';

interface Options {
  params?: any;
  onSuccess?: () => void;
  onFail?: (errResponse?: any) => void;
}

export default function useRequest<T>(
  service: (params?: any) => Promise<any>,
  options: Options = {},
) {
  const { params, onSuccess = () => {}, onFail = () => {} } = options;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [response, setResponse] = useState<T>();
  const isCancelRef = useRef(false);

  const run = () => {
    setLoading(true);
    service(params)
      .then((response) => {
        if (isCancelRef.current) return;
        if (response.data) setData(response.data);
        setResponse(response);
        onSuccess();
      })
      .catch((errResponse) => {
        onFail(errResponse);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cancel = () => {
    isCancelRef.current = true;
    setLoading(false);
  };

  return { loading, data, response, run, cancel };
}
