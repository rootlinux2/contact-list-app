import React from "react"
import styled from "styled-components"

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const LayoutWrapper = styled.section`
  main {
    padding: 0 20%;
  }
`

export const Form = styled.form`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
`

export const Input = styled.input`
  width: 100%;
  height: 27px;
  border: ${props => props.border || '1px solid #dadada'};
  background-color: #fff;
  border-radius: 1%;
  margin-left:0!important;
`

// export const Button = styled.button`
//   width: 300px;
//   height: 35px;
//   background-color: #5995ef;
//   color: #fff;
//   border-radius: 3px;
// `;

// Text

export const Title = styled.h1`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`

export const Title2 = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`

export const Text = styled.p`
  font-family: "Raleway", sans-serif;
  color: ${props => props.color || "#4d4d4d"};
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-family: "Raleway", sans-serif;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
`
