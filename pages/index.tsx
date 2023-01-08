import Head from "next/head";
import React, { useCallback } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { useState } from "react";
import classes from "../styles/Home.module.scss";
import { Button, Container, Divider, Form, Header, Icon, Image, Table } from "semantic-ui-react";
import FormInputs from "../MainPage/FormInputs";
import { AlegreyaFont } from "../components/FontWrapper";
import MoboTable from "../MainPage/MoboTable";
import LargeScreen from "../MainPage/LargeScreen";

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

  const onCancelForm = () => {
    firstName && setFirstName("");
    avatar && setAvatar("");
    lastName && setLastName("");
    setRole(null);
    email && setEmail("");
  };
  const onSubmitForm = useCallback(async () => {
    const body: Prisma.UserCreateInput = {
      firstName,
      lastName,
      role,
      email,
      avatar,
    };
    await axios.post(`api/create`, { user: body });
    await setUsers([...users, body]);
    onCancelForm();
  }, [firstName, lastName, role, email, avatar, users]);
  const onDeleteFormById = async (u: any) => {
    await axios.post(`api/delete`, { id: u.id });
    await setUsers(users.filter((usr) => usr !== u));
  };
  const onChangeFirstName = (e: any) => setFirstName(e.target.value);
  const onChangeLastName = (e: any) => setLastName(e.target.value);
  const onChangeEmail = (e: any) => setEmail(e.target.value);
  const onChangeAvatar = (e: any) => setAvatar(e.target.value);
  const onChangeRole = (value: any) => {
    setRole(value.value);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <AlegreyaFont>
        <Container style={{ margin: 20 }}>
          <FormInputs
            onSubmitForm={onSubmitForm}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeEmail={onChangeEmail}
            onChangeAvatar={onChangeAvatar}
            onCancelForm={onCancelForm}
            onChangeRole={onChangeRole}
            firstName={firstName}
            lastName={lastName}
            email={email}
            avatar={avatar}
            role={role}
          />
          <Divider horizontal>Users</Divider>
          <LargeScreen users={users} onDeleteFormById={onDeleteFormById} />
          <MoboTable users={users} onDeleteFormById={onDeleteFormById} />
        </Container>
      </AlegreyaFont>
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
