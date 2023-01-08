import React from "react";
import classes from "./styles.module.scss";
import { Table, Image, Header, Button, Icon } from "semantic-ui-react";
import { AlegreyaFont } from "../../components/FontWrapper";

interface MoboTableIProps {
  users: any;
  onDeleteFormById: any;
}
const MoboTable: React.FC<MoboTableIProps> = (props) => {
  const { users, onDeleteFormById } = props;
  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };
  return (
    <div>
      {users.map((u: any, index: number) => (
        <Table key={index} className={classes.tableMobileVersion} inverted celled>
          <Table.Header className={classes.tr}>
            <Table.Row>
              <Table.HeaderCell className={classes.mobileTableHeadLabel}>User</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <div className={classes.centerImg}>
                  <Image circular src={u.avatar} size="mini"></Image>
                </div>
              </Table.Cell>

              <Table.Cell className={classes.centeredTableCell}>
                <Header className={classes.centerCell} as="h4" image>
                  <Header.Content className={classes.headerContent}>
                    <AlegreyaFont>{u.firstName + " " + u.lastName}</AlegreyaFont>
                    <Header.Subheader className={classes.headerSubheader}>
                      <AlegreyaFont> {capitalize(u.role)}</AlegreyaFont>
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell className={classes.centeredTableCell}>{u.email}</Table.Cell>
              <Table.Cell className={classes.centeredTableCell}>
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
    </div>
  );
};

export default MoboTable;
