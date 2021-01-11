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
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap"
import { toast } from "react-toastify"
import ContactCard from "../components/ContactCard/ContactCard"
import { BsFillPersonPlusFill, BsFillInfoCircleFill } from "react-icons/bs"
import { RiUserSearchFill } from "react-icons/ri"

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
    
   if(search.length > 0){

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
      }else{
        setFilteredContacts([...contacts])
      }
    
  }, [contacts, search])



  const handleContactChange = (action, contactId) => {
  console.log("🚀 ~ file: index.js ~ line 62 ~ handleContactChange ~ contactId", contactId)
    if (action === "Update") {
      Axios.get(`${process.env.GATSBY_API_URL}/contact/${contactId}`).then(
        response => {
          const { data } = response
          const tmp = contacts.map(c => {
            if (c._id === data._id) {
              return data
            }
            return c
          })

          setConstacts([...tmp])
          toast.success("Contact Updated!")
        
        }
      )
    } else if(action === "Delete"){
      const tmp = contacts.filter(c => c._id !== contactId);
      console.log("🚀 ~ file: index.js ~ line 81 ~ handleContactChange ~ tmp", tmp.length)
      setConstacts([...tmp])
      toast.success("Contact Deleted!")
    }else{
      Axios.get(`${process.env.GATSBY_API_URL}/contact/${contactId}`).then(
        response => {
          const { data } = response
          const tmp = [{...data},...contacts];

          setConstacts([...tmp])
          toast.success("Contact Created!")
          
        }
      )
    
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className="contact-list-wrapper">
        <div className="search-filter bg-dark">
          <Row className="w-100 d-flex align-content-center">
            <Col xs={11}>
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
            </Col>
            <Col xs={1}>
              <Button
                variant="dark"
                title="Add Contact"
                onClick={() => setShowAddConatct(true)}
                size="lg"
              >
                <BsFillPersonPlusFill />
              </Button>
            </Col>

            <Col xs={12}>
              <div className="statistics text-right text-white pb-2">
                <BsFillInfoCircleFill className="mr-1" />
                <span>{`${filteredContacts.length} contacts`}</span>
              </div>
            </Col>
          </Row>
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
    </Layout>
  )
}

export default IndexPage
