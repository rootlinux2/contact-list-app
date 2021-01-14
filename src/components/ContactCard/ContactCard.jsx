import React, { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import Axios from "axios"
import { toast } from "react-toastify"
import { BsPencilSquare, BsFillXSquareFill } from "react-icons/bs"
import Image from '../Image/Image'
import "./styles.scss"
import styled from "styled-components"
import Grid from "../Grid/Grid"

const ContactCard = ({
  contact,
  onChange,
  toCreate = false,
  closeModal = () => {},
}) => {
  const [isEdditable, setIsEdditable] = useState(toCreate)
  const [name, setName] = useState(contact.name || "")
  const [phone, setPhone] = useState(contact.phone || "")
  const [address, setAddress] = useState(contact.address || "")
  const [email, setEmail] = useState(contact.email || "")

  const handleContactCreate = () => {
    Axios.post(`${process.env.GATSBY_API_URL}/contact`, {
      name,
      address,
      phone,
      email,
    })
      .then(response => {
        const { data } = response
        onChange('Create', data)
        closeModal()
      })
      .catch(error => toast.error(error.message))
  }
  const handleContactUpdate = () => {
    Axios.put(`${process.env.GATSBY_API_URL}/contact/${contact._id}`, {
      ...contact,
      name,
      address,
      phone,
      email,
    })
      .then(response => {
        const { data } = response
        if (response.status === 200) {
          setIsEdditable(false)
          onChange('Update',data);
        } else {
         
          setName(data.name)
          setPhone(data.phone)
          setAddress(data.address)
          setEmail(data.email)
          toast.error("Contact update error")
          setIsEdditable(false)
        }
      })
      .catch(error => toast.error(error.message))
  }
  const handleDeleteContact = () => {
    Axios.delete(`${process.env.GATSBY_API_URL}/contact/${contact._id}`)
      .then(() => {
    
        onChange('Delete', contact);
      })
      .catch(error => toast.error(error.message))
  }

  const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `
  const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  `

  return (
    <div
      className={`contactCard-wrapper border-bottom ${
        isEdditable ? "bg-light" : ""
      }`}
      onDoubleClick={() => setIsEdditable(!isEdditable)}
    >
      <Image
        src="contacts/masculino.png"
        className="rounded-circle contact-image"
        debug
      ></Image>
      {isEdditable ? (
        <Form className="pr-3">
        <Grid columns={12} style={{ gridColumnGap: "10px" }}>
        <ColumnWrapper>
        <Form.Label htmlFor="inlineFormInputName">Name</Form.Label>
              <Form.Control
                className="mb-2 mx-sm-2"
                id="inlineFormInputName"
                value={name}
                onChange={e => setName(e.target.value)}
                size="sm"
                type="text"
                required
              />
        </ColumnWrapper>
        <ColumnWrapper>
        <Form.Label htmlFor="inlineFormInputPhone">Phone</Form.Label>
              <Form.Control
                className="mb-2 mx-sm-2"
                id="inlineFormInputPhone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                size="sm"
                type="text"
                required
              />
        </ColumnWrapper>
        <ColumnWrapper>
        <Form.Label htmlFor="inlineFormInputAddress">Address</Form.Label>
              <Form.Control
                className="mb-2 mx-sm-2"
                id="inlineFormInputAddress"
                value={address}
                onChange={e => setAddress(e.target.value)}
                size="sm"
                type="text"
                required
              />
        </ColumnWrapper>
        <ColumnWrapper>
        <Form.Label htmlFor="inlineFormInputEmail">Email</Form.Label>
              <Form.Control
                className="mb-2 mr-sm-2"
                id="inlineFormInputEmail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                size="sm"
                type="text"
                required
              />
        </ColumnWrapper>
        <ColumnWrapper>
        <Form.Label htmlFor="inlineFormInputEmail">Email</Form.Label>
        {toCreate ? (
                <>
                  <Button
                    className="ml-1"
                    size="sm"
                    variant="primary"
                    onClick={() => handleContactCreate()}
                  >
                    Create
                  </Button>
                  <Button
                    className="ml-1"
                    size="sm"
                    variant="danger"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="btn btn-dark btn-light btn-lg"
                   
                    onClick={() => handleContactUpdate()}
                  >
                    Save
                  </Button>
                  <Button
                    className="btn btn-dark btn-light btn-lg"
                  
                    onClick={() => setIsEdditable(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
        </ColumnWrapper>         
         
      </Grid>
        </Form>
      ) : (
        <div className="data-content">
          <div className="attr-container">
            <span className="label">Name</span>
            <span className="value"> {contact.name}</span>
          </div>
          <div className="attr-container">
            <span className="label">Phone</span>
            <span className="value"> {contact.phone}</span>
          </div>
          <div className="attr-container">
            <span className="label">Address</span>
            <span className="value"> {contact.address}</span>
          </div>
          <div className="attr-container">
            <span className="label">Email</span>
            <span className="value"> {contact.email}</span>
          </div>
          <div className="actions-container">
            <Button
              variant="light"
              title="Edit"
              onClick={() => setIsEdditable(true)}
            >
              <BsPencilSquare />
            </Button>
            <Button
              variant="light"
              title="Delete"
              onClick={() => handleDeleteContact()}
            >
              <BsFillXSquareFill />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactCard
