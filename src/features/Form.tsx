import { DefaultButton, TextField, mergeStyleSets } from "@fluentui/react";
import { ChangeEvent, FC, FormEvent, useState } from "react";

type FormProps = {
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  email: string;
};

const css = mergeStyleSets({
  root: {
    width: "50%",
  },
  textField: {
    padding: "10px 0",
  },
});

const Form: FC<FormProps> = ({ handleFormSubmit, email, setEmail }) => {
  const [error, setError] = useState<string>("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    if (!isValidEmail(email)) {
      setError("Email is invalid");
    } else {
      setError("");
    }

    handleFormSubmit(event);
  };

  return (
    <form onSubmit={submitHandler} className={css.root}>
      <TextField
        className={css.textField}
        label="Email"
        placeholder="Enter an email"
        name="email"
        type="email" //here is the authomatic validation, but i made my own either way
        required
        value={email}
        onChange={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          setEmail((e.target as HTMLInputElement).value)
        }
      />
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
      <DefaultButton type="submit">Submit</DefaultButton>
    </form>
  );
};

export default Form;
