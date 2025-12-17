import classes from "../../CSS/ChatDisplay.module.css";
import { UserList } from "./UserList";
import { ChatBox } from "./ChatBox";

export function ChatDisplay({
  users,
  messages,
  onSend,
  onSelectUser,
  currentRoom,
  displayedUser,
}) {
  return (
    <div className={classes.chatDisplay}>
      <div className={classes.chatDisplayContainer}>
        {/* <header className={classes.chatDisplayHeader}>
          
          <Header />

         
          <Status />
        </header>  */}

        {/* Sidebar */}
        {/* <aside className={classes.chatDisplayUserList}>
          <h3>Users</h3>
          <UserList users={users} onSelectUser={onSelectUser} />
        </aside> */}

        {/* Main Chat Section */}
        <section className={classes.chatDisplaySection}>
          {/* <header className={classes.chatDisplaySectionHeader}>
            <h2>{currentRoom || "Public Chat"}</h2>
          </header> */}

          {/* Messages + Input */}
          <ChatBox
            messages={messages}
            onSend={onSend}
            displayedUser={displayedUser}
            onSelectUser={onSelectUser}
            users={users}
          />
        </section>
      </div>
    </div>
  );
}
