import Link from "next/link";

import { Box } from "./Box";
import { Center } from "./Center";
import { Header } from "./Text";

export const NotAuthorizedPage = () => (
  <Center>
    <Box>
      <Header>You are not allowed to access this page.</Header>
      <Center>
        <Link href="/login">
          <a>Go to login</a>
        </Link>
      </Center>
    </Box>
  </Center>
);
