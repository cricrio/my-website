import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import styled from 'styled-components';
import { Header } from './Header';

const Container = styled.div`
  height: calc(100vh - 6rem);
  margin: auto;
  width: min(100%, 40rem);
`;

export const Page = ({ children }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  return (
    <div>
      <Header />
      {user && (
        <>
          {JSON.stringify(user, null, 2)}
          <button
            onClick={async () => {
              const aa = await supabase.auth.signOut();
              console.log(aa);
            }}
          >
            LOG OUT !!
          </button>
        </>
      )}
      <Container>{children}</Container>
    </div>
  );
};
