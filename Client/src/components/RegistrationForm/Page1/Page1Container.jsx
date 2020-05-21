import React from "react"
import Page1 from "./Page1"

const Page1Container = (props) => {
  return <>
    <Page1 nextPageHandler={props.nextPageHandler}
            pageNumber={props.pageNumber}/>
  </>
}

export default Page1Container