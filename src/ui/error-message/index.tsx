/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { isApolloError } from "@apollo/client";
import SectionMessage from "@atlaskit/section-message";

interface Props {
  title: string;
  error: Error;
}

export const ErrorMessage = ({ title, error }: Props) => {
  const { networkError, graphQLErrors } = isApolloError(error)
    ? error
    : { networkError: undefined, graphQLErrors: undefined };
  return (
    <SectionMessage appearance="error">
      <div
        css={css`
          font-weight: bold;
          padding-bottom: 8px;
        `}
      >
        {title}
      </div>
      {networkError?.message ?? error.message}
      {graphQLErrors && (
        <ul>
          {graphQLErrors.map(({ message }) => (
            <li>{message}</li>
          ))}
        </ul>
      )}
    </SectionMessage>
  );
};
