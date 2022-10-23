import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Center } from '../components/Center';
import { Header } from '../components/Text';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  width: 100%;
  font-size: 1rem;
  border-radius: var(--border-radius);
  border: solid 1px black;
  transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;
`;

const Text = styled.div`
  color: ${(props) => {
    if (props.success) return 'green';
    if (props.error) return 'red';
    return 'black';
  }};
`;

export default function Auth() {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setMessage({ error: true, content: error.message });
      } else {
        setMessage({
          success: true,
          content: 'Check your email for the login link!',
        });
      }
    } catch (error) {
      setMessage({
        error: true,
        content: error.error_description || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <Box aria-live='polite'>
        <Header>Enter your email address to login</Header>
        {loading ? (
          'Sending magic link...'
        ) : (
          <>
            <Form onSubmit={handleLogin}>
              <Input
                id='email'
                type='email'
                placeholder='John.Doh@me.me'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button aria-live='polite'>Login</Button>
            </Form>
            <Text {...message}>{message?.content}</Text>
          </>
        )}
      </Box>
    </Center>
  );
}
