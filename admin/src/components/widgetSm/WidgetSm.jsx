import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]); 

  useEffect( () => {
    const getnewUsers =async ()=> {

      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            "Content-type": "application/json",
            token:
            "Bearer "+(localStorage.getItem('user')).accessToken ,
      
          },
        });
        setNewUsers(res.data);
        
      } catch (err) {
        console.log(err);
        
      }
    };
    getnewUsers();

    }, []);


    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          {newUsers.map((user) => (
            <li className="widgetSmListItem">
              <img
                src={
                  user.profilePic ||
                  "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
