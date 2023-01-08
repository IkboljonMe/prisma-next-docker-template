import React from "react";
import { Header, Form, Button } from "semantic-ui-react";
import pkg from "semantic-ui-react/package.json";
import classes from "./styles.module.scss";
import { AlegreyaFont } from "../../components/FontWrapper";

interface FormInputsIProps {
  onSubmitForm: () => void;
  onChangeFirstName: (e: any) => void;
  onChangeLastName: (e: any) => void;
  onChangeEmail: (e: any) => void;
  onChangeAvatar: (e: any) => void;
  onCancelForm: (e: any) => void;
  onChangeRole: (value: any) => void;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: any;
}
const FormInputs: React.FC<FormInputsIProps> = (props) => {
  const { onSubmitForm, onChangeFirstName, onChangeEmail, onChangeAvatar, onCancelForm, onChangeRole, firstName, lastName, email, avatar, role } = props;
  const options = [
    { key: "d", text: "DEVELOPER", value: "DEVELOPER" },
    { key: "u", text: "USER", value: "USER" },
    { key: "a", text: "ADMIN", value: "ADMIN" },
  ];
  return (
    <>
      <Header className={classes.topBarText} as="h3">
        <AlegreyaFont> This app is powered by NextJS, Semantic UI {pkg.version}</AlegreyaFont>
      </Header>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className={classes.formTextsTop} widths="equal">
          <Form.Input fluid label="First Name" placeholder="First Name" value={firstName} onChange={onChangeFirstName} />
          <Form.Input fluid label="Last Name" placeholder="Last Name" value={lastName} onChange={onChangeFirstName} />
          <Form.Input fluid label="Email" placeholder="Email" value={email} onChange={onChangeEmail} />
          <Form.Input fluid label="Avatar URL" placeholder="Avatar" value={avatar} onChange={onChangeAvatar} />
          <Form.Select fluid label="Role" placeholder="Role" options={options} value={role} onChange={onChangeRole} />
        </Form.Group>
        <Button.Group attached="bottom">
          <Button onClick={onCancelForm} color="red">
            Cancel
          </Button>
          <Button.Or />
          <Button type="submit" positive>
            Submit
          </Button>
        </Button.Group>
      </Form>
    </>
  );
};

export default FormInputs;
