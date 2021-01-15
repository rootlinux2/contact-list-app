import React, { useState, useEffect } from "react"
// import { Form } from "react-bootstrap"
import Axios from "axios"
import { toast } from "react-toastify"
import {
  BsPencilSquare,
  BsFillXSquareFill,
  BsCheckBox,
  BsFillTrashFill,
} from "react-icons/bs"
import {
  Form,
  Input,
  Label,
  Text,
  Button,
} from "../StylesComponents/StylesComponents"
import Image from "../Image/Image"
import "./styles.scss"

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
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const err = {}
    const emailFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      String(email).toLowerCase()
      )
    
    if (!emailFormat) {
      err.email = "this is not avalid email!"
    }
    const nameFormat = /^[A-Za-z\d\s]+$/g.test(name);
    if(!nameFormat){
      err.name = "this is not avalid name, only letters allowed!"
    }
    const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
    if(!phoneFormat){
      err.phone = "this is not avalid phone!"
    }
    setErrors({...err});
  }, [name, phone, address, email])
  const handleContactCreate = () => {
    Axios.post(`${process.env.GATSBY_API_URL}/contact`, {
      name,
      address,
      phone,
      email,
    })
      .then(response => {
        const { data } = response
        onChange("Create", data)
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
          onChange("Update", data)
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
        onChange("Delete", contact)
      })
      .catch(error => toast.error(error.message))
  }

  return (
    <div
      className={`contactCard-wrapper border-bottom ${
        isEdditable ? "bg-light" : ""
      }`}
    >
      <Image
        src="contacts/masculino.png"
        className="rounded-circle contact-image"
        debug
      ></Image>
      {isEdditable ? (
        <Form className="form-wrapper">
          <div className="form-field">
            <Label htmlFor="inlineFormInputName">
              Name * {errors.name && <Text color="red">{errors.name}</Text>}
            </Label>
            <Input
              className="mb-2 mx-sm-2"
              id="inlineFormInputName"
              border={errors.name && "1px solid red"}
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              size="sm"
              type="text"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="inlineFormInputPhone">
              Phone * {errors.phone && <Text color="red">{errors.phone}</Text>}
            </Label>
            <Input
              className="mb-2 mx-sm-2"
              id="inlineFormInputPhone"
              border={errors.phone && "1px solid red"}
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              size="sm"
              type="text"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="inlineFormInputAddress">
              Address *{" "}
              {errors.address && <Text color="red">{errors.address}</Text>}
            </Label>
            <Input
              className="mb-2 mx-sm-2"
              id="inlineFormInputAddress"
              value={address}
              border={errors.address && "1px solid red"}
              name="address"
              onChange={e => setAddress(e.target.value)}
              size="sm"
              type="text"
              required
            />
          </div>
          <div className="form-field">
            <Label htmlFor="inlineFormInputEmail">
              Email * {errors.email && <Text color="red">{errors.email}</Text>}
            </Label>
            <Input
              className="mb-2 mr-sm-2"
              id="inlineFormInputEmail"
              value={email}
              border={errors.email && "1px solid red"}
              name="email"
              onChange={e => {
                console.log('eeeee: ', e.target.value)
                setEmail(e.target.value)}}
              size="sm"
              type="text"
              required
            />
          </div>
          <div className="form-controls">
            {toCreate ? (
              <>
                <Button
                  className="btn btn-light btn-sm"
                  title="Create"
                  type="button"
                  onClick={() => handleContactCreate()}
                  disabled={errors && Object.keys(errors).length > 0}
                >
                  <BsCheckBox />
                </Button>
                <Button
                  className="btn btn-light btn-sm"
                  title="Cancel"
                  type="button"
                  onClick={() => closeModal()}
                >
                  <BsFillTrashFill/>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="btn btn-success btn-sm"
                  title="Update"
                  type="button"
                  onClick={() => handleContactUpdate()}
                  disabled={errors && Object.keys(errors).length > 0}
                >
                  <BsCheckBox />
                </Button>
                <Button
                  className="btn btn-light btn-sm"
                  title="Cancel"
                  type="button"
                  onClick={() => setIsEdditable(false)}
                >
                  <BsFillTrashFill />
                </Button>
              </>
            )}
          </div>
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
              className="btn btn-light btn-sm"
              title="Edit"
              onClick={() => setIsEdditable(true)}
            >
              <BsPencilSquare />
            </Button>
            <Button
              className="btn btn-light btn-sm"
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
