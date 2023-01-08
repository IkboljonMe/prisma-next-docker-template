import Head from "next/head";
import axios from "axios";
import pkg from "semantic-ui-react/package.json";
import { Prisma } from "@prisma/client";
// import { fetcher } from "../utils/fetcher";
import prisma from "../lib/prisma";
import { useState } from "react";
import classes from "../styles/Home.module.scss";
import { Button, Container, Divider, Form, Header, Icon, Image, Table } from "semantic-ui-react";

export async function getServerSideProps() {
  const users: Prisma.UserUncheckedCreateInput[] = await prisma.user.findMany();
  return {
    props: { initialUsers: users },
  };
}

const options = [
  { key: "d", text: "DEVELOPER", value: "DEVELOPER" },
  { key: "u", text: "USER", value: "USER" },
  { key: "a", text: "ADMIN", value: "ADMIN" },
];
interface HomeI {
  initialUsers: Prisma.UserUncheckedCreateInput[];
}
const Home: React.FC<HomeI> = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState<any>(null);

  const handleChange = (e, { value }) => {
    setRole(value);
  };

  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <Container style={{ margin: 20 }}>
        <Header className={classes.topBarText} as="h3">
          This app is powered by NextJS, Semantic UI {pkg.version}
        </Header>
        <Form
          onSubmit={async () => {
            const body: Prisma.UserCreateInput = {
              firstName,
              lastName,
              role,
              email,
              avatar,
            };

            // await fetcher("/api/create", { user: body });
            await axios.post(`api/create`, { user: body });
            await setUsers([...users, body]);
            setFirstName("");
            setAvatar("");
            setLastName("");
            setRole(null);
            setEmail("");
          }}
        >
          <Form.Group widths="equal">
            <Form.Input fluid label="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <br />
            <Form.Input fluid label="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Form.Input fluid label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Input fluid label="Avatar" placeholder="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <Form.Select fluid label="Role" placeholder="Role" options={options} value={role} onChange={handleChange} />
          </Form.Group>
          {/* <Form.Button attached="bottom">Submit</Form.Button> */}
          <Button.Group attached="bottom">
            <Button
              onClick={() => {
                setFirstName("");
                setAvatar("");
                setLastName("");
                setRole(null);
                setEmail("");
              }}
              color="red"
            >
              Cancel
            </Button>
            <Button.Or />
            <Button type="submit" positive>
              Submit
            </Button>
          </Button.Group>
        </Form>

        <Divider horizontal>Users</Divider>

        <Table inverted celled>
          <Table.Header>
            <Table.Row className={classes.headerTop}>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className={classes.headerBottom}>
            {users.map((u: any, index: any) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Image circular src={u.avatar} size="mini"></Image>
                    <Header.Content className={classes.headerContent}>
                      {u.firstName + " " + u.lastName}
                      <Header.Subheader className={classes.headerSubheader}>{capitalize(u.role)}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{u.email}</Table.Cell>
                <Table.Cell center>
                  <Button
                    animated="fade"
                    color="red"
                    onClick={async () => {
                      // await fetcher("/api/delete", { id: u.id });
                      await axios.post(`api/delete`, { id: u.id });
                      await setUsers(users.filter((usr) => usr !== u));
                    }}
                  >
                    <Button.Content visible>Delete</Button.Content>
                    <Button.Content hidden>
                      <Icon name="user delete" />
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};
export default Home;
