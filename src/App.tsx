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
import BusinessCard from "./widgets/BusinessCard";
import ErrorBoundary from "./components/ErrorBoundary";

const css = mergeStyleSets({
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

          setLoading(false);
        } else {
          console.log(result);

          setLoading(false);

          throw new Error(result.Description);
        }
      }
    );

    setEmail("");
    console.log("user", user);
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
        {/* {error && (
        <MessageBar messageBarType={MessageBarType.error} isMultiline>
          {error}
        </MessageBar>
      )} */}

        {user ? (
          <>
            <BusinessCard user={user} />

            <PrimaryButton
              onClick={() =>
                (window.location.href = "https://www.eway-crm.com")
              }
              text="OK"
            />
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(
                e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setEmail((e.target as HTMLInputElement).value)}
            />
            <DefaultButton type="submit">Submit</DefaultButton>
          </form>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
