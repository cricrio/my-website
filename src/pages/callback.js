import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SigningCallback() {
  const router = useRouter();
  useEffect(() => {
    router.push(router.query.redirectedFrom || '/');
  }, []);

  return '...';
}
