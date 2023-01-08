import React from "react";
import classes from "./styles.module.scss";
import { Table, Header, Button, Image, Icon } from "semantic-ui-react";
import { AlegreyaFont } from "../../components/FontWrapper";

interface LargeScreenIProps {
  users: any;
  onDeleteFormById: any;
}


const LargeScreen: React.FC<LargeScreenIProps> = (props) => {
    const capitalize = (s: string) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
      };
  const { users, onDeleteFormById } = props;
  return (
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
                    <AlegreyaFont> {u.firstName + " " + u.lastName}</AlegreyaFont>
                    <Header.Subheader className={classes.headerSubheader}>
                      <AlegreyaFont>{capitalize(u.role)} </AlegreyaFont>
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
  );
};

export default LargeScreen;
