import React from "react"
import ParticipantsPageContainer from "./ParticipantsPage/ParticipantsPageContainer"
import SidebarContainer from "./Sidebar/SidebarContainer"

const AdminPanel = (props) => {
  return (<>
    <SidebarContainer />
    <ParticipantsPageContainer />
  </>)
}

export default AdminPanel