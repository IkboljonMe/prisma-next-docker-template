import Head from "next/head";
import axios from "axios";
import pkg from "semantic-ui-react/package.json";
import { Prisma } from "@prisma/client";
// import { fetcher } from "../utils/fetcher";
import prisma from "../lib/prisma";
import { useState } from "react";
import classes from "../styles/Home.module.scss";
import { Button, Container, Divider, Form, Header, Icon, Image, Tab, Table } from "semantic-ui-react";
import { Alegreya } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const alegreya = Alegreya({
  weight: "600",
  subsets: ["latin"],
});

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

  const onSubmitForm = async () => {
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
  };
  const onDeleteFormById = async (u: any) => {
    await axios.post(`api/delete`, { id: u.id });
    await setUsers(users.filter((usr) => usr !== u));
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <Container className={alegreya.className} style={{ margin: 20 }}>
        <Header className={classes.topBarText} as="h3">
          <div className={alegreya.className}> This app is powered by NextJS, Semantic UI {pkg.version}</div>
        </Header>
        <Form onSubmit={onSubmitForm}>
          <Form.Group className={classes.formTextsTop} widths="equal">
            <Form.Input fluid label="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Form.Input fluid label="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <Form.Input fluid label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Input fluid label="Avatar" placeholder="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <Form.Select fluid label="Role" placeholder="Role" options={options} value={role} onChange={handleChange} />
          </Form.Group>
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

        <div className={classes.tableLaptopVersion}>
          <Table inverted celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((u: any, index: any) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image circular src={u.avatar} size="mini"></Image>
                      <Header.Content className={classes.headerContent}>
                        <div className={alegreya.className}> {u.firstName + " " + u.lastName}</div>
                        <Header.Subheader className={classes.headerSubheader}>
                          <div className={alegreya.className}> {capitalize(u.role)}</div>
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{u.email}</Table.Cell>
                  <Table.Cell>
                    <Button.Group size="large">
                      <Button animated="fade" color="green">
                        <Button.Content visible>Edit</Button.Content>
                        <Button.Content hidden>
                          <Icon name="edit outline" />
                        </Button.Content>
                      </Button>
                      <Button.Or />
                      <Button animated="fade" color="red" onClick={() => onDeleteFormById(u)}>
                        <Button.Content visible>Delete</Button.Content>
                        <Button.Content hidden>
                          <Icon name="user delete" />
                        </Button.Content>
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        {users.map((u: any, index: any) => (
          <Table className={classes.tableMobileVersion} inverted celled>
            <Table.Header className={classes.tr}>
              <Table.Row>
                <Table.HeaderCell className={classes.mobileTableHeadLabel}>User</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell className={classes.centerCell}>
                  <span>
                    <Image circular src={u.avatar} size="mini"></Image>
                  </span>
                </Table.Cell>
                <Table.Cell className={classes.centerCell}>
                  <Header as="h4" image>
                    <Header.Content className={classes.headerContent}>
                      <div className={alegreya.className}> {u.firstName + " " + u.lastName}</div>
                      <Header.Subheader className={classes.headerSubheader}>
                        <div className={alegreya.className}> {capitalize(u.role)}</div>
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell className={classes.centerCell}>{u.email}</Table.Cell>
                <Table.Cell className={classes.centerCell}>
                  <Button.Group size="large">
                    <Button animated="fade" color="green">
                      <Button.Content visible>Edit</Button.Content>
                      <Button.Content hidden>
                        <Icon name="edit outline" />
                      </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button animated="fade" color="red" onClick={() => onDeleteFormById(u)}>
                      <Button.Content visible>Delete</Button.Content>
                      <Button.Content hidden>
                        <Icon name="user delete" />
                      </Button.Content>
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ))}
      </Container>
    </>
  );
};
export default Home;

export async function getServerSideProps() {
  const users: Prisma.UserUncheckedCreateInput[] = await prisma.user.findMany();
  return {
    props: { initialUsers: users },
  };
}
