import React from "react";
import Card from "react-bootstrap/Card";

const UserCard = ({ user }) => {
  console.log(user.country);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={user.images[0] && user.images[0].url} />
      <Card.Body>
        <Card.Title>{user.display_name}</Card.Title>
        <Card.Text>{user.country}</Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default UserCard;
