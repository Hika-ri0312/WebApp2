import React, {useRef, useState, useContext } from "react";
import { MdDeleteForever, MdClose, MdPhotoSizeSelectLarge } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const EventModal = (props) => {
  const { daySelected, setShowEventModal, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const host = process.env.REACT_APP_IP_ADDR
  const now = dayjs().toDate()
  const b = dayjs(daySelected.$d)
  if (b.isBefore(now)){return}
  // console.log(props);
  const addAndModifSchedule = (e) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();
    const calendarEvent = {
      title: title,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      uid:props.email,
      dayTime:daySelected.format("YYYY,dddd, MMMM DD"),
    };
    //console.log(localStorage.getItem("savedEvents"));
    if (selectedEvent) {
      if (updateRequestApi(calendarEvent) === 1){
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      }else{
        console.log("update error");
      }
    } else {
      if (pushRequestApi(calendarEvent) === 1){
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }else{
        console.log("push error");
      }
    }
    setShowEventModal(false);
  };

  const deleteSchedule = () => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    if (deleteRequestApi(selectedEvent) === 1){
        dispatchCalEvent({ type: "delete", payload: selectedEvent });
    }else{
        console.log("delete error");
    }

    setShowEventModal(false);
  };
  
  const pushRequestApi = (cal) =>{
      const baseURL = "http://" + host + ":10180/calendar/push/";
      axios.post(baseURL,cal)
          .then(res => {
                if(res.data.res === "ok"){
                    return 1;
                }else{
                    return 0;
                }
          })
      return 1;
  }

  const updateRequestApi = (cal) =>{
      const baseURL = "http://" + host + ":10180/calendar/update/";
      axios.post(baseURL,cal)
          .then(res => {
                if(res.data.res === "ok"){
                    return 1;
                }else{
                    return 0;
                }
          })
      return 1;
  }
  
  const deleteRequestApi = (cal) =>{
      const baseURL = "http://" + host + ":10180/calendar/delete/";
      axios.post(baseURL,cal)
          .then(res => {
                if(res.data.res === "ok"){
                    return 1;
                }else{
                    return 0;
                }
          })
      return 1;
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-end">
          <div className="text-gray-400">
            {selectedEvent && (
              <button onClick={() => {deleteSchedule();}}>
                <MdDeleteForever />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <MdClose />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div> </div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>{daySelected.format("dddd, MMMM DD")}</p>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={addAndModifSchedule}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};
export default EventModal;
