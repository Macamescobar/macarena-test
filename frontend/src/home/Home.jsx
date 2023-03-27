import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import API from "../api/Api";
import ModalUpdateUser from "../components/ModalUpdateUser";
import { useAuthStore } from "../hooks/useAuthStore";

export const Home = () => {
  const [dataApi, setDataApi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToUpdate, setUserToUpdatet] = useState();

  const { startLogout} = useAuthStore();
  
  const getUserInformation = async () => {
    try {
      const resp = await API.get("/users");
      setDataApi(resp.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInformation();
  }, []);

  const updateUserWithModal = (usr) => {
    setShowModal(true);
    setUserToUpdatet(usr);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Button style={{ backgroundColor: "#6c63ff" }} onClick={startLogout}>
          {" "}
          Logout{" "}
        </Button>
      </div>
      <ModalUpdateUser
        show={showModal}
        setShow={setShowModal}
        usrToUpdate={userToUpdate}
      />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Accesses</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataApi?.map((usr) => (
            <tr key={usr._id}>
              <td>{usr.name}</td>
              <td>{usr.email}</td>
              <td>
                {new Date(usr.accesses[0]?.createdAt).toLocaleDateString(
                  "es-CL",
                  {
                    hour: "numeric",
                    hour12: false,
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "America/Santiago",
                  }
                )}
              </td>
              <td>
                {usr?.permissions.length > 0
                  ? usr.permissions.map((perm) => perm?.permission).join(",")
                  : "User doesn't have permissions"}
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => updateUserWithModal(usr)}
                >
                  Edit
                </Button>{" "}
                <Button variant="secondary">Delete</Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
