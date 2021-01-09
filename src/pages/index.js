import React, { useEffect, useState } from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./_global.scss"
import Axios from "axios"
import {
  Form,
  FormControl,
  InputGroup,
  Navbar,
  Spinner,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap"
import ContactCard from "../components/ContactCard/ContactCard"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { RiUserSearchFill } from "react-icons/ri"

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [contactChange, setContactChange] = useState(false)
  const [contacts, setConstacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [showAddConatct, setShowAddConatct] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    Axios.get(`${process.env.GATSBY_API_URL}/contact`).then(response => {
      setConstacts(response.data.docs)
      setFilteredContacts(response.data.docs)
      setIsLoading(false)
    })
  }, [contactChange])

  const handlerFilter = value => {
    const result = contacts.filter(c => {
      if (
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.address.toLowerCase().includes(value.toLowerCase()) ||
        c.phone.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase())
      )
        return c
    })
    setFilteredContacts([...result])
  }

  return (
    <Layout>
      <SEO title="Home" />
      {isLoading ? (
        <>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="dark" />
        </>
      ) : (
        <div className="contact-list-wrapper">
          <div className="search-filter bg-light">
            <Row className="w-100 d-flex align-content-center">
              <Col xs={11}>
                <Navbar bg="light" expand="md">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="w-100">
                      <Form.Label htmlFor="searchfilter" srOnly>
                        Search
                      </Form.Label>
                      <InputGroup className="mb-2 w-100">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <RiUserSearchFill />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          id="searchfilter"
                          placeholder="Search"
                          className="mr-sm-2 w-75"
                          onChange={e => handlerFilter(e.target.value)}
                        />
                      </InputGroup>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
              <Col xs={1}>
                <Button
                  variant="light"
                  title="Add Contact"
                  onClick={() => setShowAddConatct(true)}
                  size="lg"
                >
                  <BsFillPersonPlusFill />
                </Button>
              </Col>
            </Row>
          </div>
          <div className="content-list">
            <ol>
              {filteredContacts.map(c => (
                <li key={JSON.stringify(c)}>
                  <ContactCard
                    contact={c}
                    onChange={() => setContactChange(!contactChange)}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      <Modal
        show={showAddConatct}
        onHide={() => setShowAddConatct(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactCard
            contact={{
              name: "",
              phone: "",
              address: "",
              emaiil: "",
            }}
            onChange={() => setContactChange(!contactChange)}
            toCreate
            formInline={false}
            closeModal={() => setShowAddConatct(false)}
          />
        </Modal.Body>
       
      </Modal>
    </Layout>
  )
}

export default IndexPage
