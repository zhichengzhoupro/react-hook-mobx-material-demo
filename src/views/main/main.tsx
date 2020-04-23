import React, {useContext} from "react";
import {UserContext} from "../../context/User.context";

const Main = (props: any) => {
    const userContext: any = useContext(UserContext);
    return(
      <div>
          {userContext.user.username}
      </div>
    );
}

export default Main;