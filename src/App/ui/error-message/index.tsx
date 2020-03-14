/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ApolloError } from "apollo-boost";
import SectionMessage from "@atlaskit/section-message";

interface Props {
  title: string;
  error: ApolloError;
}

export const ErrorMessage = ({
  title,
  error: { networkError, graphQLErrors }
}: Props) => (
  <SectionMessage appearance="error">
    <div
      css={css`
        font-weight: bold;
        padding-bottom: 8px;
      `}
    >
      {title}
    </div>
    {networkError && networkError.message}
    {graphQLErrors && (
      <ul>
        {graphQLErrors.map(({ message }) => (
          <li>{message}</li>
        ))}
      </ul>
    )}
  </SectionMessage>
);
