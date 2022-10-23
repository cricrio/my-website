import { useRouter } from 'next/router';

const SigningCallback = () => {
  const router = useRouter();
  router.push(router.query.redirectedFrom || '/');
  return '...';
};

export default SigningCallback;
