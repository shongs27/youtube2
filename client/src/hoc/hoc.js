import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_redux/user_actions";

export default function (ComponentHandle, level) {
  //props가 뭐지? 어디서 온거임?
  function Authenticate(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res.payload);
        //권한 없는 놈이
        if (!res.payload.isAuth) {
          //감히 들어올려고 한다
          if (level) {
            props.history.push("/login");
          }
        } else {
          //권한 있는 놈이
          if (!level) {
            props.history.push("/");
          }
        }
      });
    }, []);

    return <ComponentHandle {...props} user={user} />;
  }
  return Authenticate;
}
