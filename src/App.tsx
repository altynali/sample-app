import { FC, FormEvent, useState } from "react";
import {
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  ProgressIndicator,
  mergeStyleSets,
} from "@fluentui/react";
import { TContact, TContactsResopnse } from "./eWayAPI/ContactsResponse";
import connection from "./eWayAPI/Connector";
import BusinessCard from "./features/BusinessCard";
import ErrorBoundary from "./components/ErrorBoundary";
import Form from "./features/Form";

const css = mergeStyleSets({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingDiv: {
    width: "50vw",
    position: "absolute",
    left: "25vw",
    top: "40vh",
  },
});

const App: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<TContact | undefined>();
  const [error, setError] = useState<string>();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    connection.callMethod(
      "SearchContacts",
      {
        transmitObject: {
          Email1Address: email,
          // 'mroyster@royster.com'
        },
        includeProfilePictures: true,
      },
      (result: TContactsResopnse) => {
        if (result.Data.length !== 0 && !!result.Data[0].FileAs) {
          setUser(result.Data[0]);
          setError("");
        } else {
          setError(result.Description);
        }
        setLoading(false);
      },
      undefined,
      undefined,
      // I've noticed, that you handle errors this way, but i add ErrorBoundary either way
      (err) => {
        setError(err.message);
      }
    );

    setEmail("");
    setError("");
  };

  if (loading) {
    return (
      <div className={css.loadingDiv}>
        <ProgressIndicator
          label="Loading Agent Name"
          description="This tape will be destroyed after watching."
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div>
        {error && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline>
            {error}
          </MessageBar>
        )}
      </div>

      <div className={css.root}>
        {user ? (
          <BusinessCard user={user} />
        ) : (
          <Form
            handleFormSubmit={handleFormSubmit}
            email={email}
            setEmail={setEmail}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
