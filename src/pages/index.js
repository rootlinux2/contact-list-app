import React, { useEffect, useState } from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Axios from "axios"
import {
  Form,
  FormControl,
  InputGroup,
  Navbar,
  Spinner,
  Modal,
} from "react-bootstrap"
import { toast } from "react-toastify"
import ContactCard from "../components/ContactCard/ContactCard"
import { BsFillPersonPlusFill, BsFillInfoCircleFill } from "react-icons/bs"
import { RiUserSearchFill } from "react-icons/ri"
import styled from "styled-components"
import Grid from "../components/Grid/Grid"

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [contacts, setConstacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [showAddConatct, setShowAddConatct] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    setIsLoading(true)
    Axios.get(`${process.env.GATSBY_API_URL}/contact`).then(response => {
      setConstacts(response.data.docs)
      setFilteredContacts(response.data.docs)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (search.length > 0) {
      const result = contacts.filter(c => {
        if (
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.address.toLowerCase().includes(search.toLowerCase()) ||
          c.phone.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase())
        )
          return c
      })
      setFilteredContacts([...result])
    } else {
      setFilteredContacts([...contacts])
    }
  }, [contacts, search])

  const handleContactChange = (action, contact) => {
    if (action === "Update") {
      const tmp = contacts.map(c => {
        if (c._id === contact._id) {
          return contact
        }
        return c
      })
      setConstacts([...tmp])
      toast.success("Contact Updated!")
    } else if (action === "Delete") {
      const tmp = contacts.filter(c => c._id !== contact._id)
      setConstacts([...tmp])
      toast.success("Contact Deleted!")
    } else {
      const tmp = [{ ...contact }, ...contacts]

      setConstacts([...tmp])
      toast.success("Contact Created!")
    }
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
    <Layout>
      <Grid columns={1} style={{ gridColumnGap: "10px" }}>
        <SEO title="Home" />
        <div className="contact-list-wrapper">
          <div className="search-filter bg-dark">
            <Grid columns={12} style={{ gridColumnGap: "10px" }}>
              <ColumnWrapper style={{ gridColumnStart: 1, gridColumnEnd: 11 }}>
                <Navbar bg="dark" expand="md">
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Form inline className="w-100">
                      <Form.Label htmlFor="searchfilter" srOnly>
                        Search
                      </Form.Label>
                      <InputGroup className="mb-2 w-100" size="sm">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <RiUserSearchFill />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          id="searchfilter"
                          placeholder="Search"
                          className="mr-sm-2 w-75"
                          size="sm"
                          onChange={e => setSearch(e.target.value)}
                        />
                      </InputGroup>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
              </ColumnWrapper>
              <ColumnWrapper style={{ gridColumnStart: 11, gridColumnEnd: 12 }}>
                <Button
                  title="Add Contact"
                  className="btn btn-dark btn-light btn-lg"
                  onClick={() => setShowAddConatct(true)}
                >
                  <BsFillPersonPlusFill />
                </Button>
              </ColumnWrapper>
              <ColumnWrapper style={{  gridColumnStart: 11, gridColumnEnd: 12 }}>
                <div className="w-100 d-flex align-content-center">
                  <div className="statistics text-right text-white pb-3">
                    <BsFillInfoCircleFill className="mr-1" />
                    <span>{`${filteredContacts.length} contacts`}</span>
                  </div>
                </div>
              </ColumnWrapper>
            </Grid>
          </div>
          <div className="content-list">
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" variant="primary" />
                <Spinner animation="border" size="sm" variant="secondary" />
                <Spinner animation="border" size="sm" variant="success" />
                <Spinner animation="border" size="sm" variant="danger" />
                <Spinner animation="border" size="sm" variant="warning" />
                <Spinner animation="border" size="sm" variant="info" />
                <Spinner animation="border" size="sm" variant="dark" />
              </>
            ) : (
              <ol>
                {filteredContacts.map(c => (
                  <li key={JSON.stringify(c)}>
                    <ContactCard contact={c} onChange={handleContactChange} />
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
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
              onChange={handleContactChange}
              toCreate
              formInline={false}
              closeModal={() => setShowAddConatct(false)}
            />
          </Modal.Body>
        </Modal>
      </Grid>
    </Layout>
  )
}

export default IndexPage
